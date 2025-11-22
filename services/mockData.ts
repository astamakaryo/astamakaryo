
import { JamaahProfile, EconomicStatus, SpiritualStatus, Employee, Asset, Event, MaintenanceLog, MosqueProfile, Article } from '../types';

// Curated high-quality images for the app
const ISLAMIC_IMAGES = [
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=500", // Sunset Mosque
  "https://images.unsplash.com/photo-1507643179173-39db2965e658?q=80&w=500", // Geometric Pattern
  "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=500", // Green Nature
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=500", // Quran Book
  "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=500", // Mosque Interior
  "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=500", // Desert/Historical
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500", // Library/Books
  "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=500", // Golden Hour
  "https://images.unsplash.com/photo-1596461404942-80b648c46e1e?q=80&w=500", // Architecture
  "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=500", // Blue Tiles
  "https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?q=80&w=500", // Dome
  "https://images.unsplash.com/photo-1572005869779-99940439c3bd?q=80&w=500"  // Lantern
];

export const MOCK_JAMAAH: JamaahProfile[] = [
  {
    id: '1',
    name: 'Ahmad Dahlan',
    age: 45,
    gender: 'L',
    address: 'Jl. Merdeka No. 1',
    phone: '08123456789',
    profession: 'Pengusaha Tekstil',
    employmentStatus: 'Business Owner',
    economicStatus: EconomicStatus.MUZAKKI,
    spiritualStatus: { hajiUmrah: 'Sudah', quranLevel: SpiritualStatus.INTERMEDIATE, prayerDiscipline: 5 },
    skills: ['Management', 'Finance']
  },
  {
    id: '2',
    name: 'Budi Santoso',
    age: 22,
    gender: 'L',
    address: 'Jl. Kebon Jeruk',
    phone: '08129876543',
    profession: 'Fresh Graduate',
    employmentStatus: 'Unemployed',
    economicStatus: EconomicStatus.MUSTAHIK,
    spiritualStatus: { hajiUmrah: 'Belum', quranLevel: SpiritualStatus.BEGINNER, prayerDiscipline: 3 },
    skills: ['Design', 'Video Editing']
  },
  {
    id: '3',
    name: 'Siti Aminah',
    age: 68,
    gender: 'P',
    address: 'Komp. Griya Sharia',
    phone: '08133344455',
    profession: 'Pensiunan Guru',
    employmentStatus: 'Retired',
    economicStatus: EconomicStatus.MUNFIQ,
    spiritualStatus: { hajiUmrah: 'Sudah', quranLevel: SpiritualStatus.HAFIZ, prayerDiscipline: 5 },
    skills: ['Teaching', 'Counseling']
  }
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Ust. Fauzi', role: 'Imam Besar', type: 'Staff', status: 'Active', joinDate: '2020-01', salary: 5000000 },
  { id: 'e2', name: 'Kang Asep', role: 'Marbot', type: 'Staff', status: 'Active', joinDate: '2021-03', salary: 2500000 },
  { id: 'v1', name: 'Rizky', role: 'Event Organizer', type: 'Volunteer', status: 'Active', joinDate: '2023-05', points: 1250 },
  { id: 'v2', name: 'Sarah', role: 'Social Media', type: 'Volunteer', status: 'Active', joinDate: '2023-06', points: 980 },
];

export const MOCK_ASSETS: Asset[] = [
  { id: 'a1', name: 'Sound System Yamaha', category: 'Electronic', condition: 'Good', location: 'Main Hall', purchaseDate: '2022-01', value: 15000000 },
  { id: 'a2', name: 'Karpet Turki Premium', category: 'Furniture', condition: 'Good', location: 'Main Hall', purchaseDate: '2021-11', value: 45000000 },
  { id: 'a3', name: 'Ambulance Daihatsu', category: 'Vehicle', condition: 'Fair', location: 'Parking', purchaseDate: '2019-05', value: 120000000 },
  { id: 'a4', name: 'AC Daikin 2PK (x4)', category: 'Electronic', condition: 'Poor', location: 'Lt 2', purchaseDate: '2018-06', value: 12000000 },
];

export const MOCK_MAINTENANCE: MaintenanceLog[] = [
  { id: 'm1', assetId: 'a4', taskName: 'Cuci AC Rutin & Tambah Freon', date: '2023-10-25', status: 'Pending' },
  { id: 'm2', assetId: 'a3', taskName: 'Ganti Oli Ambulance', date: '2023-10-20', status: 'Completed' },
];

export const MOCK_EVENTS: Event[] = [
  { id: 'ev1', title: 'Kajian Subuh: Tafsir Al-Jalalain', date: '2023-10-28', time: '04:45', type: 'Kajian', speaker: 'Ust. Adi Hidayat', location: 'Masjid Raya Al-Falah, Jaksel', status: 'Upcoming' },
  { id: 'ev2', title: 'Khutbah Jumat: Menjaga Lisan', date: '2023-10-27', time: '12:00', type: 'Khutbah', speaker: 'KH. Abdullah Gymnastiar', location: 'Masjid Daarut Tauhiid, Bandung', status: 'Upcoming' },
  { id: 'ev3', title: 'Santunan Yatim Bulanan', date: '2023-10-29', time: '09:00', type: 'Social', location: 'Aula Serbaguna Al-Falah', status: 'Upcoming' },
  { id: 'ev4', title: 'Workshop Digital Marketing', date: '2023-11-05', time: '13:00', type: 'Workshop', location: 'Masjid Agung Al-Azhar, Jakarta', status: 'Upcoming' },
  { id: 'ev5', title: 'Fiqih Muamalah: Jual Beli Online', date: '2023-10-30', time: '19:30', type: 'Kajian', speaker: 'Ust. Erwandi Tarmizi', location: 'Masjid Istiqlal, Jakarta', status: 'Upcoming' },
  { id: 'ev6', title: 'Parenting Nabawiyah', date: '2023-11-01', time: '09:00', type: 'Kajian', speaker: 'Ust. Bendri Jaisyurrahman', location: 'Masjid Al-Ikhlas, Bekasi', status: 'Upcoming' },
];

export const MOCK_MOSQUES: MosqueProfile[] = [
  {
    id: 'm1',
    name: 'Masjid Raya Al-Falah',
    image: 'https://images.unsplash.com/photo-1558440392-19c496087577?q=80&w=500',
    location: 'Jl. Sudirman No. 45',
    city: 'Jakarta Selatan',
    rating: 4.9,
    reviewsCount: 1240,
    capacity: 2000,
    landArea: 1500,
    buildingArea: 2500,
    foundingYear: 1998,
    description: 'Masjid Raya Al-Falah adalah pusat kegiatan Islam modern yang mengintegrasikan ibadah dengan pemberdayaan ekonomi umat. Dilengkapi dengan coworking space dan perpustakaan digital.',
    facilities: ['AC Dingin', 'Wifi Gratis', 'Parkir Luas', 'Kopi Gratis', 'Perpustakaan', 'Ramah Anak'],
    activities: ['Kajian Rutin', 'Baitul Mal', 'Klinik Sehat'],
    contact: { phone: '021-1234567', email: 'info@alfalah.id', website: 'www.alfalah.id' },
    imam: 'KH. Syamsul Arifin',
    openHours: '24 Jam',
    history: 'Didirikan pada tahun 1998 oleh Yayasan Al-Falah sebagai respon terhadap kebutuhan pusat dakwah di kawasan bisnis Jakarta Selatan. Telah mengalami 3 kali renovasi besar untuk mengakomodasi jamaah yang terus bertambah.',
    dkmStructure: [
       { role: 'Ketua DKM', name: 'H. Rahmat Hidayat', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahmat' },
       { role: 'Bendahara', name: 'Ir. Budi Santoso', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
       { role: 'Sekretaris', name: 'Ahmad Fauzi', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad' },
       { role: 'Kabid Dakwah', name: 'Ust. Hanif', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hanif' },
    ],
    programs: [
       { title: 'ATM Beras', description: 'Penyediaan beras gratis untuk kaum dhuafa setiap hari Jumat.' },
       { title: 'Beasiswa Tahfidz', description: 'Full scholarship untuk santri penghafal Quran jenjang SD-SMA.' },
       { title: 'Klinik Pratama', description: 'Layanan kesehatan gratis untuk warga sekitar masjid.' },
    ],
    khutbahSchedule: [
        { date: '03 Nov', khatib: 'KH. Syamsul Arifin', title: 'Membangun Keluarga Sakinah' },
        { date: '10 Nov', khatib: 'Ust. Hanan Attaki', title: 'Pemuda Kahfi Zaman Now' },
        { date: '17 Nov', khatib: 'Dr. Syafiq Riza', title: 'Adab Bertetangga' },
        { date: '24 Nov', khatib: 'Ust. Oemar Mita', title: 'Akhir Zaman dan Tanda-tandanya' },
    ], 
    kajianSchedule: [
        { day: 'Senin', time: 'Ba\'da Maghrib', title: 'Tafsir Ibnu Katsir', teacher: 'Ust. Adi Hidayat' },
        { day: 'Rabu', time: 'Ba\'da Isya', title: 'Riyadhus Shalihin', teacher: 'Ust. Khalid Basalamah' },
        { day: 'Sabtu', time: '09:00 WIB', title: 'Sirah Nabawiyah', teacher: 'Ust. Oemar Mita' },
    ]
  },
  {
    id: 'm2',
    name: 'Masjid Jogokariyan',
    image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=500',
    location: 'Mantrijeron',
    city: 'Yogyakarta',
    rating: 5.0,
    reviewsCount: 3500,
    capacity: 1500,
    landArea: 1200,
    buildingArea: 1800,
    foundingYear: 1967,
    description: 'Masjid kampung yang mendunia dengan manajemen saldo nol rupiah. Fokus pada pelayanan maksimal kepada jamaah dan transparansi keuangan.',
    facilities: ['Penginapan Gratis', 'Makan Gratis', 'Wifi', 'Klinik', 'ATM Beras'],
    activities: ['Kampung Ramadhan', 'Sedekah Jumat', 'Pasar Rakyat'],
    contact: { phone: '0274-123456', email: 'admin@jogokariyan.id', website: 'www.jogokariyan.id' },
    imam: 'Ust. M. Jazir ASP',
    openHours: '24 Jam',
    history: 'Berawal dari sebuah langgar kecil di tahun 1967, kini bertransformasi menjadi masjid percontohan nasional dalam manajemen kemasjidan.',
    dkmStructure: [],
    programs: [],
    khutbahSchedule: [],
    kajianSchedule: []
  },
  {
    id: 'm3',
    name: 'Masjid Al-Jabbar',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=500', // Changed to a reliable Unsplash image
    location: 'Gedebage',
    city: 'Bandung',
    rating: 4.8,
    reviewsCount: 8900,
    capacity: 30000,
    landArea: 25000,
    buildingArea: 40000,
    foundingYear: 2022,
    description: 'Masjid terapung ikonik Jawa Barat dengan arsitektur futuristik. Menjadi pusat wisata religi dan edukasi Islam (Galeri Rasulullah).',
    facilities: ['Museum Rasulullah', 'Danau Wisata', 'Taman Tematik', 'Perpus Digital'],
    activities: ['Tabligh Akbar', 'Wisata Religi'],
    contact: { phone: '022-7654321', email: 'info@aljabbar.jabarprov.go.id', website: 'aljabbar.jabarprov.go.id' },
    imam: 'Tim Imam Jabar',
    openHours: '04:00 - 22:00',
    history: 'Diresmikan pada akhir 2022, dirancang oleh Gubernur Ridwan Kamil sebagai ikon baru Jawa Barat.',
    dkmStructure: [],
    programs: [],
    khutbahSchedule: [],
    kajianSchedule: []
  },
];

export const QUOTES = [
  { id: 1, text: "Maka sesungguhnya bersama kesulitan ada kemudahan.", source: "QS. Al-Insyirah: 5", image: ISLAMIC_IMAGES[0] },
  { id: 2, text: "Barangsiapa bertakwa kepada Allah niscaya Dia akan mengadakan baginya jalan keluar.", source: "QS. At-Talaq: 2", image: ISLAMIC_IMAGES[1] },
  { id: 3, text: "Janganlah kamu berduka cita, sesungguhnya Allah beserta kita.", source: "QS. At-Taubah: 40", image: ISLAMIC_IMAGES[2] },
  { id: 4, text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.", source: "HR. Ahmad", image: ISLAMIC_IMAGES[3] },
  { id: 5, text: "Shalat itu adalah tiang agama.", source: "HR. Tirmidzi", image: ISLAMIC_IMAGES[4] },
];

// Generating 70 more quotes using curated background images
for(let i=6; i<=75; i++) {
    QUOTES.push({
        id: i,
        text: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
        source: `QS. Al-Baqarah: 286`,
        image: ISLAMIC_IMAGES[i % ISLAMIC_IMAGES.length]
    });
}

export const MOCK_UMRAH_PACKAGES = [
    { id: 'u1', name: 'Paket Hemat 9 Hari', price: 24500000, agency: 'Al-Falah Travel', flight: 'Lion Air', image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=500' },
    { id: 'u2', name: 'Paket VIP Turki 12 Hari', price: 38000000, agency: 'Arminareka', flight: 'Turkish Airlines', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=500' },
    { id: 'u3', name: 'Paket Ramadhan Full', price: 45000000, agency: 'Maktour', flight: 'Saudia', image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=500' },
];

export const MOCK_KHUTBAH = [
    { id: 1, date: '27 Okt', title: 'Menjaga Lisan di Era Digital', khatib: 'KH. Abdullah Gymnastiar', theme: 'Akhlak', mosqueName: 'Masjid Raya Al-Falah', city: 'Jakarta Selatan' },
    { id: 2, date: '03 Nov', title: 'Pentingnya Shalat Berjamaah', khatib: 'Ust. Adi Hidayat', theme: 'Fiqih', mosqueName: 'Masjid Jogokariyan', city: 'Yogyakarta' },
    { id: 3, date: '10 Nov', title: 'Meneladani Kepahlawanan Rasulullah', khatib: 'Ust. Das\'ad Latif', theme: 'Sirah', mosqueName: 'Masjid Al-Jabbar', city: 'Bandung' },
    { id: 4, date: '17 Nov', title: 'Konsep Wakaf Produktif', khatib: 'Ust. Bobby Heriawan', theme: 'Muamalah', mosqueName: 'Masjid Agung Trans', city: 'Bandung' },
    { id: 5, date: '24 Nov', title: 'Tanda-Tanda Kiamat Sugra', khatib: 'Ust. Zulkifli MA', theme: 'Aqidah', mosqueName: 'Masjid Al-Azhar', city: 'Jakarta Selatan' },
];

export const MOCK_HADITS = [
    { id: 1, content: "Senyummu di hadapan saudaramu adalah sedekah bagimu.", source: "HR. Tirmidzi", topic: "Akhlak" },
    { id: 2, content: "Kebersihan itu sebagian dari iman.", source: "HR. Muslim", topic: "Iman" },
    { id: 3, content: "Tangan di atas lebih baik daripada tangan di bawah.", source: "HR. Bukhari", topic: "Sedekah" },
];

export const MOCK_NEWS = [
    { id: 1, title: "Masjid Istiqlal Jadi Green Mosque Pertama di Dunia", category: "Nasional", date: "2 Jam lalu", image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=500" },
    { id: 2, title: "Ekonomi Syariah Indonesia Tumbuh 5% di Q3 2023", category: "Ekonomi", date: "5 Jam lalu", image: "https://images.unsplash.com/photo-1626265774643-f5b42824db22?q=80&w=500" },
    { id: 3, title: "Teknologi AI Bantu Terjemahkan Manuskrip Kuno Islam", category: "Teknologi", date: "1 Hari lalu", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500" },
    { id: 4, title: "Kisah Mualaf Jepang yang Temukan Kedamaian dalam Islam", category: "Dunia", date: "2 Hari lalu", image: "https://images.unsplash.com/photo-1528360983277-13d901235fde?q=80&w=500" },
];

export const MOCK_KHAZANAH: Article[] = [
    { id: 1, title: "Sejarah Sumur Utsman bin Affan yang Masih Mengalir", category: "Sejarah", author: "Tim Riset", image: "https://images.unsplash.com/photo-1594372365401-3b5e324c6065?q=80&w=500" },
    { id: 2, title: "Adab Bertetangga dalam Islam", category: "Akhlak", author: "Ust. Hanan", image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=500" },
    { id: 3, title: "Keajaiban Sedekah Subuh", category: "Muamalah", author: "Syeikh Ali", image: "https://images.unsplash.com/photo-1507643179173-39db2965e658?q=80&w=500" },
    { id: 4, title: "Kisah Bilal bin Rabah: Muadzin Pertama", category: "Sahabat", author: "Tim Sirah", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=500" },
    { id: 5, title: "Rahasia Sholat Tahajud bagi Kesehatan", category: "Sains", author: "Dr. Zaidul", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=500" },
];

export const MOCK_SURAHS = [
   { number: 1, name: "Al-Fatihah", meaning: "Pembukaan", verses: 7, type: "Makkiyah" },
   { number: 2, name: "Al-Baqarah", meaning: "Sapi Betina", verses: 286, type: "Madaniyah" },
   { number: 3, name: "Ali 'Imran", meaning: "Keluarga Imran", verses: 200, type: "Madaniyah" },
   { number: 4, name: "An-Nisa'", meaning: "Wanita", verses: 176, type: "Madaniyah" },
   { number: 5, name: "Al-Ma'idah", meaning: "Hidangan", verses: 120, type: "Madaniyah" },
];

export const MOCK_DOA = [
   { id: 1, title: "Doa Sebelum Tidur", tag: "Harian", arabic: "بِسْمِكَ اللّهُمَّ اَحْيَا وَ بِسْمِكَ اَمُوْتُ", translation: "Dengan nama-Mu ya Allah aku hidup, dan dengan nama-Mu aku mati." },
   { id: 2, title: "Doa Bangun Tidur", tag: "Harian", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", translation: "Segala puji bagi Allah, yang telah membangunkan kami setelah menidurkan kami dan kepada-Nya lah kami dibangkitkan." },
   { id: 3, title: "Doa Keluar Rumah", tag: "Harian", arabic: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", translation: "Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan kekuatan kecuali dengan Allah." },
];

export const CUSTOM_UMRAH_OPTIONS = {
    visa: [
        { id: 1, name: 'Visa Umrah Reguler', price: 1500000 },
        { id: 2, name: 'Visa Umrah + Tour Turki', price: 2500000 },
    ],
    flight: [
        { id: 1, name: 'Lion Air (Direct)', price: 11000000 },
        { id: 2, name: 'Saudia Airlines (Direct)', price: 14500000 },
        { id: 3, name: 'Garuda Indonesia', price: 15500000 },
        { id: 4, name: 'Emirates (Transit Dubai)', price: 13000000 },
    ],
    hotelMakkah: [
        { id: 1, name: 'Makkah Tower (Bintang 5)', price: 8000000 },
        { id: 2, name: 'Pullman Zamzam (Bintang 5)', price: 9500000 },
        { id: 3, name: 'Le Meridien (Bintang 4)', price: 5000000 },
        { id: 4, name: 'Hotel Bintang 3 (Jarak 500m)', price: 2500000 },
    ],
    hotelMadinah: [
        { id: 1, name: 'Anwar Movenpick (Bintang 5)', price: 6000000 },
        { id: 2, name: 'Rove Hotel (Bintang 4)', price: 4000000 },
        { id: 3, name: 'Artal Hotel (Bintang 3)', price: 2000000 },
    ],
    transport: [
        { id: 1, name: 'Bus AC Executive', price: 0 },
        { id: 2, name: 'GMC / SUV Private', price: 3000000 },
        { id: 3, name: 'Kereta Cepat Haramain', price: 1500000 },
    ],
    meals: [
        { id: 1, name: 'Fullboard (Indonesia Food)', price: 0 },
        { id: 2, name: 'Arabian Food', price: 500000 },
        { id: 3, name: 'International Buffet', price: 1500000 },
    ],
    muthawif: [
        { id: 1, name: 'Ustadz Lokal (Mahasiswa)', price: 0 },
        { id: 2, name: 'Ustadz Senior (Alumni Timteng)', price: 2000000 },
        { id: 3, name: 'Tanpa Pembimbing', price: -1000000 },
    ],
    gear: [
        { id: 1, name: 'Koper & Kain Ihram Standar', price: 0 },
        { id: 2, name: 'Koper Premium + Perlengkapan Lengkap', price: 1500000 },
    ]
};

export const MOCK_QURAN_INSTITUTIONS = [
  {
    id: 'aqu',
    name: 'A Quran University',
    image: 'https://images.unsplash.com/photo-1596461404942-80b648c46e1e?q=80&w=500', // Unique image
    founder: 'Ust. Boby Heriawan',
    description: 'Platform edukasi Al-Quran berbasis digital pertama yang mengintegrasikan teknologi dengan sanad keilmuan yang bersambung.',
    vision: 'Menjadi pusat pembelajaran Al-Quran kelas dunia berbasis teknologi.',
    mission: 'Mencetak 1 juta penghafal Al-Quran yang berakhlak mulia dan kompeten di era digital.',
    programs: ['Tahsin Online', 'Tahfidz Accelerator', 'Sanad Qiraat', 'Beasiswa Huffadz'],
    donationInfo: {
        bank: 'BSI',
        account: '1234567890',
        name: 'Yayasan A Quran University'
    }
  },
  {
    id: 'pedequ',
    name: 'Fahmil Quran Pedequ',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=500',
    founder: 'Ust. Sofyan Sarbini',
    description: 'Pesantren Desa Quran (Pedequ) fokus pada pemahaman Al-Quran secara menyeluruh (Fahmil Quran) dengan metode tadabbur yang aplikatif.',
    vision: 'Mewujudkan masyarakat yang hidup di bawah naungan Al-Quran.',
    mission: 'Mengajarkan Al-Quran dengan pendekatan pemahaman makna dan implementasi dalam kehidupan sehari-hari.',
    programs: ['Kurikulum Level 1-9', 'Pesantren Kilat', 'Kajian Tadabbur', 'Program Dai Pelosok'],
    donationInfo: {
        bank: 'Muamalat',
        account: '0987654321',
        name: 'Pesantren Desa Quran'
    }
  },
  {
    id: 'fkpq',
    name: 'FKPQ Indonesia',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=500',
    founder: 'Dewan Asatidz Nasional',
    description: 'Forum Komunikasi Pengajar Al-Quran Indonesia adalah wadah silaturahmi dan pengembangan kompetensi bagi para guru ngaji di seluruh nusantara.',
    vision: 'Meningkatkan kesejahteraan dan kompetensi pengajar Al-Quran di Indonesia.',
    mission: 'Melakukan standardisasi kurikulum pengajaran dan sertifikasi guru Al-Quran.',
    programs: ['Sertifikasi Guru Ngaji', 'Pelatihan Metode Umi', 'Bantuan Kesejahteraan Guru', 'Seminar Pendidikan Islam'],
    donationInfo: {
        bank: 'BRI Syariah',
        account: '1122334455',
        name: 'FKPQ Pusat'
    }
  }
];
