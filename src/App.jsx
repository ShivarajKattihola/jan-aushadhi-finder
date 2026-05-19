import React from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  MapPin, 
  Calendar, 
  User, 
  Settings as SettingsIcon, 
  MessageSquare, 
  Award,
  Sparkles,
  Signal,
  Wifi,
  Battery
} from 'lucide-react';
import { AppProvider, useAppContext } from './context/AppContext';

// Import Views
import Onboarding from './views/Onboarding';
import Auth from './views/Auth';
import Home from './views/Home';
import MedicineSearch from './views/MedicineSearch';
import MedicineDetails from './views/MedicineDetails';
import StoreLocator from './views/StoreLocator';
import Reminders from './views/Reminders';
import VendorDashboard from './views/VendorDashboard';
import Settings from './views/Settings';
import Profile from './views/Profile';
import Reviews from './views/Reviews';
import Notifications from './views/Notifications';
import Scanner from './components/Scanner';
import Splash from './views/Splash';
import GovernmentSchemes from './views/GovernmentSchemes';
import SavingsCalculator from './views/SavingsCalculator';
import StockRequest from './views/StockRequest';

function AppContent() {
  const { currentScreen, navigateTo, currentUser, toasts, theme } = useAppContext();

  // Screen router logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <Splash />;
      case 'onboarding':
        return <Onboarding />;
      case 'login':
      case 'signup':
      case 'otp':
      case 'forgot_password':
        return <Auth />;
      case 'home':
        return <Home />;
      case 'search':
        return <MedicineSearch />;
      case 'details':
        return <MedicineDetails />;
      case 'store_locator':
        return <StoreLocator />;
      case 'reminders':
        return <Reminders />;
      case 'vendor_dashboard':
        return <VendorDashboard />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
      case 'reviews':
        return <Reviews />;
      case 'notifications':
        return <Notifications />;
      case 'prescription_scanner':
        return <Scanner />;
      case 'government_schemes':
        return <GovernmentSchemes />;
      case 'savings_calculator':
        return <SavingsCalculator />;
      case 'stock_request':
        return <StockRequest />;
      default:
        return <Splash />;
    }
  };

  // Determine if bottom navigation is visible
  const showNavBar = currentUser && ![
    'splash',
    'onboarding', 
    'login', 
    'signup', 
    'otp', 
    'forgot_password'
  ].includes(currentScreen);

  return (
    <div className="phone-mockup-wrapper">
      {/* Dynamic Notch */}
      <div className="phone-notch">
        <div className="phone-camera" />
      </div>

      <div className="phone-screen">
        {/* Interactive Status Bar */}
        <div className="status-bar">
          <span>10:45 AM</span>
          <div className="status-icons">
            <Signal size={13} />
            <Wifi size={13} />
            <Battery size={15} style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>

        {/* Floating live toast alerts stack */}
        <div style={{
          position: 'absolute',
          top: '56px',
          left: '12px',
          right: '12px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          pointerEvents: 'none'
        }}>
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className="slide-in-up"
              style={{
                backgroundColor: toast.type === 'success' ? 'var(--secondary)' : toast.type === 'error' ? 'var(--error)' : 'var(--primary)',
                color: '#ffffff',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'auto'
              }}
            >
              <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '⚠️' : '🔔'}</span>
              <span>{toast.message}</span>
            </div>
          ))}
        </div>

        {/* Render Primary View Container */}
        {renderScreen()}

        {/* Custom Context-aware Bottom Nav Bar */}
        {showNavBar && (
          <nav className="nav-bar">
            {currentUser.role === 'vendor' ? (
              /* --- Kendra Vendor Nav Navigation --- */
              <>
                <div 
                  className={`nav-item ${currentScreen === 'vendor_dashboard' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('vendor_dashboard')}
                >
                  <Award size={20} />
                  <span>Kendra</span>
                </div>
                <div 
                  className={`nav-item ${currentScreen === 'reviews' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('reviews')}
                >
                  <MessageSquare size={20} />
                  <span>Reviews</span>
                </div>
                <div 
                  className={`nav-item ${currentScreen === 'profile' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('profile')}
                >
                  <User size={20} />
                  <span>Profile</span>
                </div>
                <div 
                  className={`nav-item ${currentScreen === 'settings' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('settings')}
                >
                  <SettingsIcon size={20} />
                  <span>Settings</span>
                </div>
              </>
            ) : (
              /* --- Customer Nav Navigation --- */
              <>
                <div 
                  className={`nav-item ${currentScreen === 'home' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  <HomeIcon size={20} />
                  <span>Home</span>
                </div>
                <div 
                  className={`nav-item ${currentScreen === 'search' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('search')}
                >
                  <Search size={20} />
                  <span>Search</span>
                </div>
                <div 
                  className={`nav-item ${currentScreen === 'store_locator' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('store_locator')}
                >
                  <MapPin size={20} />
                  <span>Locator</span>
                </div>
                <div 
                  className={`nav-item ${currentScreen === 'reminders' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('reminders')}
                >
                  <Calendar size={20} />
                  <span>Reminders</span>
                </div>
                <div 
                  className={`nav-item ${currentScreen === 'profile' ? 'nav-item-active' : ''}`}
                  onClick={() => navigateTo('profile')}
                >
                  <User size={20} />
                  <span>Profile</span>
                </div>
              </>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
