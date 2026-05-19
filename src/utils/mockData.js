// High-Fidelity Mock Dataset for Jan-Aushadhi Finder App

export const INITIAL_MEDICINES = [
  {
    id: "med-1",
    name: "Lipitor",
    genericName: "Atorvastatin",
    composition: "Atorvastatin Calcium 20mg",
    uses: ["High Cholesterol Management", "Reducing risk of stroke and heart attack"],
    sideEffects: ["Mild muscle pain", "Diarrhea", "Joint pain", "Nausea"],
    precautions: "Avoid excessive alcohol consumption. Regular liver function tests are advised. Do not take during pregnancy.",
    brandPrice: 420.00,
    genericPrice: 42.00,
    savingsPct: 90,
    manufacturer: "Pfizer India Ltd",
    genericManufacturer: "Bureau of Pharma PSUs of India (BPPI)",
    dosageForm: "Tablet",
    packSize: "10 Tablets",
    rating: 4.8,
    category: "Cardiovascular"
  },
  {
    id: "med-2",
    name: "Augmentin 625 DUO",
    genericName: "Amoxicillin + Clavulanate Potassium",
    composition: "Amoxicillin Trihydrate 500mg + Clavulanate Potassium 125mg",
    uses: ["Bacterial Infections", "Middle ear infections", "Sinusitis", "Pneumonia", "Urinary tract infections"],
    sideEffects: ["Diarrhea or loose stools", "Nausea", "Vomiting", "Skin rashes"],
    precautions: "Complete the entire prescribed course even if feeling better. Caution in patients with penicillin allergy or kidney issues.",
    brandPrice: 201.50,
    genericPrice: 38.30,
    savingsPct: 81,
    manufacturer: "GlaxoSmithKline Pharmaceuticals",
    genericManufacturer: "JAS Pharmaceuticals (Government Approved)",
    dosageForm: "Tablet",
    packSize: "6 Tablets",
    rating: 4.6,
    category: "Antibiotics"
  },
  {
    id: "med-3",
    name: "Glucophage 500mg",
    genericName: "Metformin Hydrochloride",
    composition: "Metformin Hydrochloride 500mg",
    uses: ["Type 2 Diabetes Mellitus", "Polycystic Ovary Syndrome (PCOS)"],
    sideEffects: ["Abdominal pain", "Loss of appetite", "Metallic taste in mouth", "Mild diarrhea"],
    precautions: "Take with food to reduce stomach upset. Monitor kidney function and blood sugar levels regularly.",
    brandPrice: 95.00,
    genericPrice: 12.00,
    savingsPct: 87,
    manufacturer: "Merck Specialities Pvt Ltd",
    genericManufacturer: "PM Bhartiya Janaushadhi Pariyojana",
    dosageForm: "Tablet",
    packSize: "15 Tablets",
    rating: 4.7,
    category: "Diabetes"
  },
  {
    id: "med-4",
    name: "Calpol 650",
    genericName: "Paracetamol",
    composition: "Paracetamol 650mg",
    uses: ["Fever relief", "Mild to moderate pain relief (headache, body ache, toothache)"],
    sideEffects: ["Very rare: Skin reactions", "Liver toxicity if taken in overdose"],
    precautions: "Do not exceed 4g (6 tablets of 650mg) in 24 hours. Avoid concurrent use of other paracetamol-containing products.",
    brandPrice: 33.60,
    genericPrice: 7.50,
    savingsPct: 78,
    manufacturer: "GSK Consumer Healthcare",
    genericManufacturer: "Hindustan Antibiotics Ltd",
    dosageForm: "Tablet",
    packSize: "15 Tablets",
    rating: 4.9,
    category: "Analgesics"
  },
  {
    id: "med-5",
    name: "Zantac 150",
    genericName: "Ranitidine",
    composition: "Ranitidine Hydrochloride 150mg",
    uses: ["Gastroesophageal Reflux Disease (GERD)", "Acidity & Heartburn", "Peptic Ulcer disease"],
    sideEffects: ["Headache", "Dizziness", "Mild constipation"],
    precautions: "Inform doctor if you have kidney disease. Avoid spicy foods and lying down immediately after eating.",
    brandPrice: 48.00,
    genericPrice: 9.80,
    savingsPct: 80,
    manufacturer: "GlaxoSmithKline",
    genericManufacturer: "IDPL (Indian Drugs & Pharmaceuticals Ltd)",
    dosageForm: "Tablet",
    packSize: "20 Tablets",
    rating: 4.5,
    category: "Gastrointestinal"
  },
  {
    id: "med-6",
    name: "Ventolin Inhaler",
    genericName: "Albuterol Sulfate (Salbutamol)",
    composition: "Salbutamol Sulfate 100mcg per puff",
    uses: ["Asthma & COPD Relief", "Exercise-induced bronchospasm prevention"],
    sideEffects: ["Tremor (especially hands)", "Increased heart rate", "Headache", "Muscle cramps"],
    precautions: "Rinse mouth after use. Contact emergency services if breathing difficulty worsens rapidly.",
    brandPrice: 165.00,
    genericPrice: 45.00,
    savingsPct: 73,
    manufacturer: "GSK",
    genericManufacturer: "Janaushadhi Respiratory Care",
    dosageForm: "Inhaler",
    packSize: "200 Metered Doses",
    rating: 4.7,
    category: "Respiratory"
  },
  {
    id: "med-7",
    name: "Amlopress 5",
    genericName: "Amlodipine Besylate",
    composition: "Amlodipine Besylate 5mg",
    uses: ["Hypertension (High Blood Pressure)", "Chronic stable angina (chest pain)"],
    sideEffects: ["Ankle swelling", "Flushing", "Headache", "Fatigue"],
    precautions: "Do not stop taking abruptly. May cause dizziness, stand up slowly from sitting position.",
    brandPrice: 78.40,
    genericPrice: 11.20,
    savingsPct: 86,
    manufacturer: "Cipla Ltd",
    genericManufacturer: "PMBJP Cardiovascular Division",
    dosageForm: "Tablet",
    packSize: "15 Tablets",
    rating: 4.6,
    category: "Cardiovascular"
  },
  {
    id: "med-8",
    name: "Crocin Pain Relief",
    genericName: "Paracetamol + Caffeine",
    composition: "Paracetamol 650mg + Caffeine 50mg",
    uses: ["Severe tension headache", "Migraine", "Acute musculoskeletal pain"],
    sideEffects: ["Insomnia (if taken at night)", "Jitteriness", "Increased heart rate"],
    precautions: "Limit caffeine intake from other sources (tea, coffee, cola). Do not exceed daily dosage limits.",
    brandPrice: 42.00,
    genericPrice: 10.50,
    savingsPct: 75,
    manufacturer: "GlaxoSmithKline Asia",
    genericManufacturer: "Government Pharma Wing",
    dosageForm: "Tablet",
    packSize: "10 Tablets",
    rating: 4.8,
    category: "Analgesics"
  }
];

export const INITIAL_STORES = [
  {
    id: "store-1",
    name: "PMBJP Kendra - Indiranagar",
    address: "Metro Pillar 124, 80 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 98765 43210",
    lat: 12.9716,
    lng: 77.6412,
    distance: 0.8,
    pincode: "560038",
    city: "Bengaluru",
    isOpen: true,
    timings: "8:00 AM - 10:00 PM",
    rating: 4.6,
    stockStatus: "High Stock"
  },
  {
    id: "store-2",
    name: "Jan-Aushadhi Store - Koramangala",
    address: "Ground Floor, 4th Block, 100 Feet Road, Koramangala, Bengaluru, Karnataka 560034",
    phone: "+91 98765 43211",
    lat: 12.9352,
    lng: 77.6244,
    distance: 3.2,
    pincode: "560034",
    city: "Bengaluru",
    isOpen: true,
    timings: "8:30 AM - 9:30 PM",
    rating: 4.4,
    stockStatus: "High Stock"
  },
  {
    id: "store-3",
    name: "PMBJP Kendra - Jayanagar 4th T Block",
    address: "Beside General Hospital Road, Jayanagar 4th Block, Bengaluru, Karnataka 560041",
    phone: "+91 98765 43212",
    lat: 12.9279,
    lng: 77.5908,
    distance: 5.5,
    pincode: "560041",
    city: "Bengaluru",
    isOpen: false,
    timings: "9:00 AM - 9:00 PM",
    rating: 4.7,
    stockStatus: "Limited Stock"
  },
  {
    id: "store-4",
    name: "Jan-Aushadhi Store - Whitefield",
    address: "Opposite ITPL Main Gate, Whitefield Main Road, Bengaluru, Karnataka 560066",
    phone: "+91 98765 43213",
    lat: 12.9844,
    lng: 77.7478,
    distance: 12.4,
    pincode: "560066",
    city: "Bengaluru",
    isOpen: true,
    timings: "8:00 AM - 10:00 PM",
    rating: 4.2,
    stockStatus: "High Stock"
  },
  {
    id: "store-5",
    name: "PMBJP Kendra - Malleshwaram",
    address: "15th Cross, Sampige Road, Malleshwaram, Bengaluru, Karnataka 560003",
    phone: "+91 98765 43214",
    lat: 13.0031,
    lng: 77.5714,
    distance: 8.1,
    pincode: "560003",
    city: "Bengaluru",
    isOpen: true,
    timings: "9:00 AM - 9:30 PM",
    rating: 4.8,
    stockStatus: "High Stock"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    userName: "Ramesh Kumar",
    rating: 5,
    comment: "Switched my father's Atorvastatin to Jan Aushadhi generic and we saved nearly ₹3,600 in the last three months! The medicine quality is identical. Highly recommended.",
    date: "May 15, 2026",
    medicineName: "Atorvastatin",
    likes: 42
  },
  {
    id: "rev-2",
    userName: "Priya Sharma",
    rating: 4,
    comment: "The store locator guided me perfectly to the Indiranagar store. Got Paracetamol and Ranitidine at incredibly low prices. Only issue is sometimes there is a short queue, but totally worth it.",
    date: "May 12, 2026",
    medicineName: "Ranitidine",
    likes: 19
  },
  {
    id: "rev-3",
    userName: "Dr. Anish Mehta",
    rating: 5,
    comment: "As a cardiologist, I actively prescribe generic salts. BPPI manages Jan-Aushadhi formulations under strict quality control. Patients, please do not fear buying generics, they are bio-equivalent!",
    date: "May 08, 2026",
    medicineName: "Atorvastatin",
    likes: 128
  },
  {
    id: "rev-4",
    userName: "Sunita Deshmukh",
    rating: 4,
    comment: "My diabetes medications were costing me ₹1,200 a month. Now I pay just ₹150 for government Metformin. Excellent initiative by the government to make healthcare affordable.",
    date: "May 02, 2026",
    medicineName: "Metformin Hydrochloride",
    likes: 27
  }
];

export const INITIAL_REFILL_REMINDERS = [
  {
    id: "rem-1",
    medicineName: "Atorvastatin",
    dosage: "1 Tablet (20mg)",
    frequency: "Daily, Before Bed",
    time: "21:30",
    takenDays: ["2026-05-16", "2026-05-17", "2026-05-18", "2026-05-19"],
    isActive: true
  },
  {
    id: "rem-2",
    medicineName: "Metformin Hydrochloride",
    dosage: "1 Tablet (500mg)",
    frequency: "Daily, With Breakfast",
    time: "08:30",
    takenDays: ["2026-05-16", "2026-05-18", "2026-05-19"],
    isActive: true
  }
];

export const INITIAL_VENDOR_INVENTORY = [
  {
    id: "inv-1",
    name: "Atorvastatin",
    category: "Cardiovascular",
    price: 4.20, // Unit price (tablet)
    stock: 250,
    minStock: 50,
    location: "Rack A-1",
    lastUpdated: "Today, 10:15 AM"
  },
  {
    id: "inv-2",
    name: "Amoxicillin + Clavulanate Potassium",
    category: "Antibiotics",
    price: 6.38,
    stock: 12, // LOW STOCK -> Pulse warning!
    minStock: 25,
    location: "Cold Storage B-3",
    lastUpdated: "Yesterday, 04:30 PM"
  },
  {
    id: "inv-3",
    name: "Metformin Hydrochloride",
    category: "Diabetes",
    price: 0.80,
    stock: 600,
    minStock: 100,
    location: "Rack C-2",
    lastUpdated: "May 18, 2026"
  },
  {
    id: "inv-4",
    name: "Paracetamol",
    category: "Analgesics",
    price: 0.50,
    stock: 1200,
    minStock: 200,
    location: "Rack D-1",
    lastUpdated: "Today, 08:00 AM"
  },
  {
    id: "inv-5",
    name: "Ranitidine",
    category: "Gastrointestinal",
    price: 0.49,
    stock: 0, // OUT OF STOCK -> Pulse Critical!
    minStock: 40,
    location: "Rack B-2",
    lastUpdated: "May 10, 2026"
  },
  {
    id: "inv-6",
    name: "Albuterol Sulfate (Salbutamol)",
    category: "Respiratory",
    price: 45.00, // Unit price (inhaler)
    stock: 80,
    minStock: 15,
    location: "Rack F-1",
    lastUpdated: "Today, 09:12 AM"
  }
];

export const INITIAL_VENDOR_STATS = {
  totalSales: 48920.00,
  activeChats: 8,
  avgRating: 4.6,
  totalStockCount: 2142,
  weeklySalesData: [
    { day: "Mon", sales: 4200 },
    { day: "Tue", sales: 5500 },
    { day: "Wed", sales: 6100 },
    { day: "Thu", sales: 4800 },
    { day: "Fri", sales: 7200 },
    { day: "Sat", sales: 8500 },
    { day: "Sun", sales: 12620 }
  ]
};
