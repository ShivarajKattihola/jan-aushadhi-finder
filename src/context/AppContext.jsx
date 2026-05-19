import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_MEDICINES,
  INITIAL_STORES,
  INITIAL_REVIEWS,
  INITIAL_REFILL_REMINDERS,
  INITIAL_VENDOR_INVENTORY,
  INITIAL_VENDOR_STATS
} from '../utils/mockData';

const AppContext = createContext();

// Defensive local storage JSON recovery helper
const getLocalStorageItem = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    console.warn(`[Local Storage Cache Recovery] Invalid JSON key "${key}" encountered. Cleaning and restoring default backup schemas.`);
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  // --- Navigation & Routing System ---
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [screenHistory, setScreenHistory] = useState(['splash']);

  const navigateTo = (screenName, extraData = null) => {
    if (extraData && extraData.medicine) {
      setSelectedMedicine(extraData.medicine);
    }
    setScreenHistory(prev => [...prev, screenName]);
    setCurrentScreen(screenName);
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      setScreenHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    } else {
      setCurrentScreen('home');
    }
  };

  // --- Theme State ---
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // --- Accessibility Large Sizing Toggle ---
  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    try {
      return localStorage.getItem('accessibility_mode') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('accessibility_mode', accessibilityMode);
    const root = window.document.documentElement;
    if (accessibilityMode) {
      root.classList.add('accessibility-mode');
    } else {
      root.classList.remove('accessibility-mode');
    }
  }, [accessibilityMode]);

  const toggleAccessibilityMode = () => {
    setAccessibilityMode(prev => !prev);
  };

  // --- Search History & Favorites ---
  const [recentSearches, setRecentSearches] = useState(() => getLocalStorageItem('db_recent_searches', ["Lipitor", "Crocin", "Calpol"]));

  const addRecentSearch = (query) => {
    if (!query) return;
    setRecentSearches(prev => {
      const filtered = Array.isArray(prev) ? prev.filter(q => q.toLowerCase() !== query.toLowerCase()) : [];
      const updated = [query, ...filtered].slice(0, 5);
      localStorage.setItem('db_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const [savedMedicines, setSavedMedicines] = useState(() => getLocalStorageItem('db_saved_medicines', []));

  const toggleSaveMedicine = (medId) => {
    setSavedMedicines(prev => {
      const activeArray = Array.isArray(prev) ? prev : [];
      const alreadySaved = activeArray.includes(medId);
      const updated = alreadySaved ? activeArray.filter(id => id !== medId) : [...activeArray, medId];
      localStorage.setItem('db_saved_medicines', JSON.stringify(updated));
      addToast(alreadySaved ? "Removed from bookmarked formulas" : "Formulation added to bookmarks!", "success");
      return updated;
    });
  };

  const [favoriteStores, setFavoriteStores] = useState(() => getLocalStorageItem('db_favorite_stores', []));

  const toggleFavoriteStore = (storeId) => {
    setFavoriteStores(prev => {
      const alreadyFav = prev.includes(storeId);
      const updated = alreadyFav ? prev.filter(id => id !== storeId) : [...prev, storeId];
      localStorage.setItem('db_favorite_stores', JSON.stringify(updated));
      addToast(alreadyFav ? "Removed from favorite Kendras" : "Kendra store favorited!", "success");
      return updated;
    });
  };

  // --- Offline SQLite Cache Simulator ---
  const [offlineMode, setOfflineMode] = useState(false);
  const toggleOfflineMode = () => {
    setOfflineMode(prev => {
      const nextVal = !prev;
      addToast(nextVal ? "Switched to offline local SQLite cache!" : "Online sync active!", nextVal ? "info" : "success");
      return nextVal;
    });
  };

  // --- Drug Interaction Safety Engine ---
  const checkDrugInteraction = (med1, med2) => {
    const interactions = [
      { a: "Atorvastatin", b: "Aspirin", severity: "Moderate", warning: "Increased risk of muscle pain or bleeding. Monitor symptoms." },
      { a: "Amoxicillin + Clavulanate Potassium", b: "Aspirin", severity: "Mild", warning: "Aspirin can increase Amoxicillin system levels." },
      { a: "Metformin Hydrochloride", b: "Contrast Dye", severity: "Severe", warning: "Lactic acidosis risk. Suspend Metformin temporary." }
    ];
    
    return interactions.find(item => 
      (item.a.toLowerCase().includes(med1.toLowerCase()) && item.b.toLowerCase().includes(med2.toLowerCase())) ||
      (item.b.toLowerCase().includes(med1.toLowerCase()) && item.a.toLowerCase().includes(med2.toLowerCase()))
    );
  };

  // --- Database State (Cloud Sync Simulation) ---
  const [medicines, setMedicines] = useState(() => getLocalStorageItem('db_medicines', INITIAL_MEDICINES));

  const [stores, setStores] = useState(INITIAL_STORES);

  const [reviews, setReviews] = useState(() => getLocalStorageItem('db_reviews', INITIAL_REVIEWS));

  const [reminders, setReminders] = useState(() => getLocalStorageItem('db_reminders', INITIAL_REFILL_REMINDERS));

  const [inventory, setInventory] = useState(() => getLocalStorageItem('db_inventory', INITIAL_VENDOR_INVENTORY));

  const [stats, setStats] = useState(() => getLocalStorageItem('db_stats', INITIAL_VENDOR_STATS));

  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Refill Due soon: Atorvastatin",
      body: "Your daily dosage reminder is active. Click to log medication.",
      type: "reminder",
      time: "2 hours ago",
      read: false
    },
    {
      id: "notif-2",
      title: "Massive Savings: Paracetamol alternative available",
      body: "Crocin is ₹42, but government alternative is just ₹10.50! Save 75%.",
      type: "savings",
      time: "1 day ago",
      read: true
    }
  ]);

  // Sync state changes to localStorage (Simulating cloud sync backups)
  useEffect(() => {
    localStorage.setItem('db_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('db_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('db_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('db_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('db_stats', JSON.stringify(stats));
  }, [stats]);

  // --- Auth System ---
  const [currentUser, setCurrentUser] = useState(() => getLocalStorageItem('auth_user', null));

  // Automatically adjust navigate route based on auth
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'vendor') {
        navigateTo('vendor_dashboard');
      } else {
        navigateTo('home');
      }
    } else {
      navigateTo('onboarding');
    }
  }, [currentUser ? currentUser.id : null]);

  const loginWithEmail = (email, password, role) => {
    let name = role === 'vendor' ? 'Rajesh Gupta (Indiranagar Store)' : 'Rohan Sharma';
    const userObj = {
      id: role === 'vendor' ? 'vendor-1' : 'customer-1',
      name,
      email,
      phone: role === 'vendor' ? '+91 98765 43210' : '+91 99887 76655',
      role,
      storeId: role === 'vendor' ? 'store-1' : null
    };
    setCurrentUser(userObj);
    localStorage.setItem('auth_user', JSON.stringify(userObj));
    addToast(`Successfully logged in as ${name}`, 'success');
  };

  const loginWithPhone = (phone, role) => {
    let name = role === 'vendor' ? 'Rajesh Gupta (Indiranagar Store)' : 'Rohan Sharma';
    const userObj = {
      id: role === 'vendor' ? 'vendor-1' : 'customer-1',
      name,
      email: role === 'vendor' ? 'vendor@pmbjp.gov.in' : 'rohan.sharma@gmail.com',
      phone,
      role,
      storeId: role === 'vendor' ? 'store-1' : null
    };
    setCurrentUser(userObj);
    localStorage.setItem('auth_user', JSON.stringify(userObj));
    addToast("OTP verified successfully!", "success");
  };

  const googleSignIn = (role) => {
    let name = role === 'vendor' ? 'Dr. Satish Kumar (Koramangala)' : 'Amit Verma';
    const userObj = {
      id: 'g-user-1',
      name,
      email: role === 'vendor' ? 'satish.bmbjp@gmail.com' : 'amit.verma92@gmail.com',
      phone: '+91 91234 56789',
      role,
      storeId: role === 'vendor' ? 'store-2' : null
    };
    setCurrentUser(userObj);
    localStorage.setItem('auth_user', JSON.stringify(userObj));
    addToast(`Google Sign-In successful for ${name}`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_user');
    setScreenHistory(['onboarding']);
    setCurrentScreen('onboarding');
    addToast("Logged out successfully", "info");
  };

  const registerUser = (name, email, phone, password, role) => {
    const userObj = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      role,
      storeId: role === 'vendor' ? 'store-1' : null
    };
    setCurrentUser(userObj);
    localStorage.setItem('auth_user', JSON.stringify(userObj));
    addToast(`Account created for ${name}!`, 'success');
  };

  const updateUserProfile = (updatedFields) => {
    if (!currentUser) return;
    const newProfile = { ...currentUser, ...updatedFields };
    setCurrentUser(newProfile);
    localStorage.setItem('auth_user', JSON.stringify(newProfile));
    addToast("Profile credentials updated successfully!", "success");
  };

  // --- Real-time updates simulation (onSnapshot listeners) ---
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Live notification updater
  const triggerLiveNotification = (title, body, type = 'reminder') => {
    const newNotif = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      body,
      type,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast(`🔔 ${title}`, 'info');
  };

  // Firestore onSnapshot triggers: simulated random review updates or customer chats
  useEffect(() => {
    if (!currentUser) return;
    
    // Simulate real-time background customer orders or stock warnings
    const interval = setInterval(() => {
      // 1. If user is vendor, simulate customer sending a WhatsApp chat or a review
      if (currentUser.role === 'vendor') {
        const randomChance = Math.random();
        if (randomChance < 0.2) {
          // Trigger customer WhatsApp chat alert
          const customerNames = ["Siddharth Sen", "Meera Nair", "Vijay Patil", "Preeti Jain"];
          const selectedCust = customerNames[Math.floor(Math.random() * customerNames.length)];
          triggerLiveNotification(
            "New Customer Query",
            `${selectedCust} is asking about Atorvastatin generic stock availability via WhatsApp.`,
            "chat"
          );
          setStats(prev => ({
            ...prev,
            activeChats: prev.activeChats + 1
          }));
        } else if (randomChance < 0.3) {
          // Trigger a new review appearing in real-time
          const names = ["Ritu Sen", "Mohit Malhotra", "Aanchal Soni"];
          const meds = ["Ranitidine", "Paracetamol", "Atorvastatin"];
          const selectedName = names[Math.floor(Math.random() * names.length)];
          const selectedMed = meds[Math.floor(Math.random() * meds.length)];
          const newReview = {
            id: Math.random().toString(36).substr(2, 9),
            userName: selectedName,
            rating: 5,
            comment: `Purchased generic ${selectedMed} yesterday. Works brilliantly and saved me a fortune! Great initiative.`,
            date: "Today",
            medicineName: selectedMed,
            likes: 0
          };
          setReviews(prev => [newReview, ...prev]);
          setStats(prev => ({
            ...prev,
            avgRating: parseFloat(((prev.avgRating * 4 + 5) / 5).toFixed(1))
          }));
          triggerLiveNotification(
            "New 5-Star Review!",
            `${selectedName} reviewed generic ${selectedMed} with 5 stars.`,
            "review"
          );
        }
      } else {
        // Customer side: simulate price alerts or daily reminders
        const randomChance = Math.random();
        if (randomChance < 0.15) {
          const savingsAlerts = [
            { title: "Lipitor Price Drop Alert", body: "Generics for Lipitor Atorvastatin are now 90% cheaper at Indiranagar Store!" },
            { title: "Refill Reminder", body: "Time for your evening dose of Atorvastatin." }
          ];
          const selectedAlert = savingsAlerts[Math.floor(Math.random() * savingsAlerts.length)];
          triggerLiveNotification(
            selectedAlert.title,
            selectedAlert.body,
            selectedAlert.title.includes("Price") ? "savings" : "reminder"
          );
        }
      }
    }, 25000); // Trigger occasionally in background

    return () => clearInterval(interval);
  }, [currentUser]);

  // --- Inventory Management Actions (Synced to Client) ---
  const addInventoryItem = (item) => {
    const newItem = {
      id: `inv-${Math.random().toString(36).substr(2, 9)}`,
      name: item.name,
      category: item.category,
      price: parseFloat(item.price),
      stock: parseInt(item.stock),
      minStock: parseInt(item.minStock),
      location: item.location || "General Shelf",
      lastUpdated: "Just Now"
    };

    setInventory(prev => [newItem, ...prev]);
    setStats(prev => ({
      ...prev,
      totalStockCount: prev.totalStockCount + newItem.stock
    }));

    addToast(`Added ${item.name} to Firestore Inventory!`, 'success');
  };

  const updateInventoryItem = (updatedItem) => {
    let stockDifference = 0;
    setInventory(prev => prev.map(item => {
      if (item.id === updatedItem.id) {
        stockDifference = updatedItem.stock - item.stock;
        return {
          ...item,
          ...updatedItem,
          lastUpdated: "Just Now"
        };
      }
      return item;
    }));

    setStats(prev => ({
      ...prev,
      totalStockCount: prev.totalStockCount + stockDifference
    }));

    addToast(`Updated stock levels for ${updatedItem.name}!`, 'success');

    // Trigger critical notifications to other mock devices if low/empty
    if (updatedItem.stock <= 0) {
      triggerLiveNotification(
        "Critical Alert: Out of Stock",
        `${updatedItem.name} has run out of stock in the inventory!`,
        "alert"
      );
    } else if (updatedItem.stock < updatedItem.minStock) {
      triggerLiveNotification(
        "Warning: Low Stock",
        `${updatedItem.name} is running below minimum threshold level.`,
        "alert"
      );
    }
  };

  // --- Customer Actions ---
  const addCustomerReview = (medName, comment, stars) => {
    const newRev = {
      id: `rev-${Math.random().toString(36).substr(2, 9)}`,
      userName: currentUser ? currentUser.name : "Guest Customer",
      rating: stars,
      comment: comment,
      date: "Just Now",
      medicineName: medName,
      likes: 0
    };
    setReviews(prev => [newRev, ...prev]);
    addToast("Review published in real-time!", "success");
  };

  const addMedReminder = (reminderObj) => {
    // Audit for adverse drug interactions with existing active reminders
    let interactionAlert = null;
    for (let rem of reminders) {
      if (rem.isActive) {
        const interaction = checkDrugInteraction(rem.medicineName, reminderObj.medicineName);
        if (interaction) {
          interactionAlert = interaction;
          break;
        }
      }
    }

    if (interactionAlert) {
      addToast(`⚠️ Interaction Warning: ${interactionAlert.warning}`, 'error');
      triggerLiveNotification(
        "Clinical Contraindication Alert", 
        `Possible adverse reaction between ${reminderObj.medicineName} and existing ${interactionAlert.a}/${interactionAlert.b}. ${interactionAlert.warning}`, 
        "alert"
      );
    }

    const newRem = {
      id: `rem-${Math.random().toString(36).substr(2, 9)}`,
      medicineName: reminderObj.medicineName,
      dosage: reminderObj.dosage || "1 Tablet",
      frequency: reminderObj.frequency || "Daily",
      time: reminderObj.time || "09:00",
      takenDays: [],
      isActive: true
    };
    setReminders(prev => [...prev, newRem]);
    
    if (!interactionAlert) {
      addToast(`Set daily reminder for ${reminderObj.medicineName}!`, 'success');
    }
  };

  const toggleReminderActive = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const recordAdherence = (id, dateStr) => {
    setReminders(prev => prev.map(r => {
      if (r.id === id) {
        const alreadyTaken = r.takenDays.includes(dateStr);
        return {
          ...r,
          takenDays: alreadyTaken 
            ? r.takenDays.filter(d => d !== dateStr)
            : [...r.takenDays, dateStr]
        };
      }
      return r;
    }));
    addToast("Medication adherence logged!", "success");
  };

  // Clear notification feeds
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      screenHistory,
      navigateTo,
      navigateBack,
      
      theme,
      toggleTheme,
      
      accessibilityMode,
      toggleAccessibilityMode,
      
      recentSearches,
      addRecentSearch,
      
      savedMedicines,
      toggleSaveMedicine,
      
      favoriteStores,
      toggleFavoriteStore,
      
      offlineMode,
      toggleOfflineMode,
      checkDrugInteraction,
      
      medicines,
      stores,
      reviews,
      reminders,
      inventory,
      stats,
      notifications,
      toasts,
      currentUser,
      selectedMedicine,
      setSelectedMedicine,
      
      loginWithEmail,
      loginWithPhone,
      googleSignIn,
      logout,
      registerUser,
      updateUserProfile,
      
      addInventoryItem,
      updateInventoryItem,
      addCustomerReview,
      addMedReminder,
      toggleReminderActive,
      recordAdherence,
      markAllNotificationsRead,
      addToast,
      triggerLiveNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
