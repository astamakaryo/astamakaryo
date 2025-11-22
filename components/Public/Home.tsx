
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, Bell, User, ChevronRight, Calendar, Clock, 
  Compass, BookOpen, Heart, Info, Share2, Map, PlayCircle,
  Menu as MenuIcon, X, Calculator, Moon, ChevronLeft, Quote,
  Star, Wind, Wifi, Car, Coffee, Plane, Mic2, Library,
  Home as HomeIcon, LayoutGrid, LogIn, Users, Phone, Globe, CheckCircle,
  Briefcase, ScrollText, Columns, PlusCircle, Camera, Send, Wallet, ArrowRight, Tag, Ticket,
  Book, UserCheck, Percent, Newspaper, Check, Settings as SettingsIcon, Grid,
  FileText, GraduationCap, Layers, MessageCircle, Activity, Target, Copy,
  Accessibility, Utensils
} from 'lucide-react';
import { QUOTES, MOCK_UMRAH_PACKAGES, MOCK_KHUTBAH, MOCK_HADITS, MOCK_EVENTS, MOCK_MOSQUES, MOCK_NEWS, MOCK_KHAZANAH, MOCK_SURAHS, MOCK_DOA, CUSTOM_UMRAH_OPTIONS, MOCK_QURAN_INSTITUTIONS } from '../../services/mockData';
import { PublicSection, MosqueProfile, Article } from '../../types';

// --- Helper Icons ---
const ScaleIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
);

const LightbulbIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5 0-2.2-1.8-4-4-4a4 4 0 0 0-4 4c0 1.5.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);

// --- Helper Components ---

const NavButton = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center h-full w-full pt-3 pb-2 transition-all duration-300 group ${active ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
  >
    {/* Active Indicator */}
    {active && (
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-500 rounded-b-xl shadow-sm shadow-emerald-200"></span>
    )}
    
    <div className={`transition-transform duration-300 ${active ? '-translate-y-1 scale-110' : 'group-hover:-translate-y-0.5'}`}>
      <Icon className={`w-6 h-6 ${active ? 'fill-emerald-50 stroke-emerald-600 stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
    </div>
    <span className={`text-[10px] mt-1 leading-none transition-all duration-300 ${active ? 'font-bold translate-y-0' : 'font-medium text-slate-400'}`}>{label}</span>
  </button>
);

const FloatingCenterButton = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <div className="relative -top-10 flex justify-center items-start h-full pointer-events-none">
     <button 
      onClick={onClick}
      className={`pointer-events-auto group relative flex flex-col items-center justify-center w-16 h-16 rounded-full shadow-xl shadow-emerald-300/40 border-[4px] border-white transition-all duration-300 ${active ? 'bg-emerald-700 scale-110 ring-4 ring-emerald-50' : 'bg-gradient-to-br from-emerald-400 to-emerald-600 hover:scale-105 hover:-translate-y-1'}`}
    >
      <Icon className={`w-7 h-7 text-white transition-transform duration-300 ${active ? 'scale-110' : ''}`} strokeWidth={2} />
    </button>
    <span className={`absolute -bottom-6 text-[10px] font-bold transition-all duration-300 ${active ? 'text-emerald-700' : 'text-slate-400'}`}>{label}</span>
  </div>
);

const CategoryIcon = ({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick: () => void }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer active:scale-95 transition-transform">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${color} text-white`}>
      <Icon className="w-7 h-7" />
    </div>
    <span className="text-xs text-slate-600 font-medium text-center leading-tight">{label}</span>
  </div>
);

const PopularMosqueCard: React.FC<{
  title: string;
  location: string;
  image: string;
  rating: number;
  facilities: string[];
  onClick?: () => void;
}> = ({ title, location, image, rating, facilities, onClick }) => {
    
  const getFacilityIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('ac')) return <Wind className="w-3 h-3 text-sky-500" />;
    if (t.includes('wifi')) return <Wifi className="w-3 h-3 text-emerald-500" />;
    if (t.includes('parkir')) return <Car className="w-3 h-3 text-slate-500" />;
    if (t.includes('kopi') || t.includes('makan') || t.includes('kantin')) return <Utensils className="w-3 h-3 text-amber-500" />;
    if (t.includes('perpus')) return <Library className="w-3 h-3 text-indigo-500" />;
    if (t.includes('difabel')) return <Accessibility className="w-3 h-3 text-purple-500" />;
    if (t.includes('klinik') || t.includes('sehat')) return <Activity className="w-3 h-3 text-red-500" />;
    if (t.includes('anak')) return <Users className="w-3 h-3 text-pink-500" />;
    return <CheckCircle className="w-3 h-3 text-slate-400" />;
  };

  return (
    <div onClick={onClick} className="min-w-[280px] w-[280px] bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden snap-start hover:shadow-xl transition-all duration-300 group cursor-pointer relative flex-shrink-0">
      <div className="h-44 bg-slate-200 relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
        
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm z-10">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-slate-800">{rating}</span>
        </div>

         <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h4 className="font-bold text-white text-lg leading-tight truncate mb-1 group-hover:text-emerald-300 transition-colors">{title}</h4>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> {location}
            </p>
         </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex flex-wrap gap-2">
          {facilities.slice(0, 3).map((fac, idx) => (
            <div key={idx} className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 group-hover:border-emerald-100 transition-colors">
              {getFacilityIcon(fac)}
              <span className="text-[10px] font-bold text-slate-600 truncate max-w-[70px]">{fac}</span>
            </div>
          ))}
          {facilities.length > 3 && (
             <div className="flex items-center justify-center bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-[10px] text-slate-500 font-bold">
                +{facilities.length - 3}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SubViewHeader = ({ title, onBack, colorClass }: { title: string, onBack: () => void, colorClass: string }) => (
  <div className={`${colorClass} p-4 text-white flex items-center gap-4 sticky top-0 z-30 shadow-md`}>
    <button onClick={onBack} className="p-1 rounded-full hover:bg-white/20 transition">
      <ChevronLeft className="w-6 h-6" />
    </button>
    <h2 className="font-bold text-lg tracking-wide">{title}</h2>
  </div>
);

const KhazanahCard: React.FC<{ article: Article }> = ({ article }) => (
    <div className="min-w-[140px] w-[140px] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col snap-start cursor-pointer hover:shadow-md transition">
        <div className="h-24 w-full bg-slate-200">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-3 flex flex-col flex-1">
            <span className="text-[9px] text-rose-500 font-bold uppercase mb-1">{article.category}</span>
            <h4 className="text-xs font-bold text-slate-800 line-clamp-3 leading-tight mb-2">{article.title}</h4>
            <div className="mt-auto">
                 <span className="text-[9px] text-slate-400 block">{article.author}</span>
            </div>
        </div>
    </div>
);

// --- Full Screen Sub-Views ---

const InstitutionDetailView = ({ institution, onBack }: { institution: any, onBack: () => void }) => (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
        <SubViewHeader title="Profil Lembaga" onBack={onBack} colorClass="bg-slate-800" />
        
        <div className="relative h-64 w-full">
            <img src={institution.image} className="w-full h-full object-cover" alt={institution.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-2xl font-bold text-white mb-1">{institution.name}</h1>
                <p className="text-slate-300 text-sm">Founder: {institution.founder}</p>
            </div>
        </div>

        <div className="p-6 space-y-6 -mt-6 relative z-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-3">Tentang Lembaga</h3>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">{institution.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Visi</h4>
                    <p className="text-sm text-emerald-700 italic">"{institution.vision}"</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2"><Compass className="w-4 h-4" /> Misi</h4>
                    <p className="text-sm text-amber-700">{institution.mission}</p>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-slate-800 mb-3">Program Unggulan</h3>
                <div className="grid grid-cols-2 gap-3">
                    {institution.programs.map((prog: string, i: number) => (
                        <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            {prog}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3">Dukung Program Kami</h3>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                    <p className="text-xs text-slate-500 mb-1">Transfer Donasi ke:</p>
                    <p className="font-bold text-slate-800 text-lg">{institution.donationInfo.bank}</p>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xl font-bold text-slate-900 tracking-wider">{institution.donationInfo.account}</span>
                        <Copy className="w-4 h-4 text-slate-400 cursor-pointer" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">a.n {institution.donationInfo.name}</p>
                </div>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition">
                    Konfirmasi Donasi
                </button>
            </div>
        </div>
    </div>
);

const CustomUmrahView = ({ onBack }: { onBack: () => void }) => {
    const [selections, setSelections] = useState<Record<string, {id: number, name: string, price: number}>>({});
    
    const handleSelect = (category: string, item: any) => {
        setSelections({ ...selections, [category]: item });
    };

    const categories = [
        { key: 'visa', label: 'Pilih Visa', data: CUSTOM_UMRAH_OPTIONS.visa },
        { key: 'flight', label: 'Maskapai Penerbangan', data: CUSTOM_UMRAH_OPTIONS.flight },
        { key: 'hotelMakkah', label: 'Hotel Makkah', data: CUSTOM_UMRAH_OPTIONS.hotelMakkah },
        { key: 'hotelMadinah', label: 'Hotel Madinah', data: CUSTOM_UMRAH_OPTIONS.hotelMadinah },
        { key: 'transport', label: 'Transportasi', data: CUSTOM_UMRAH_OPTIONS.transport },
        { key: 'meals', label: 'Konsumsi', data: CUSTOM_UMRAH_OPTIONS.meals },
        { key: 'muthawif', label: 'Pembimbing (Muthawif)', data: CUSTOM_UMRAH_OPTIONS.muthawif },
        { key: 'gear', label: 'Perlengkapan', data: CUSTOM_UMRAH_OPTIONS.gear },
    ];

    // Auto-select first options on mount to show a base price
    useEffect(() => {
        const defaults: any = {};
        Object.keys(CUSTOM_UMRAH_OPTIONS).forEach((key) => {
             // @ts-ignore
             if(CUSTOM_UMRAH_OPTIONS[key] && CUSTOM_UMRAH_OPTIONS[key].length > 0) {
                 // @ts-ignore
                 defaults[key] = CUSTOM_UMRAH_OPTIONS[key][0];
             }
        });
        setSelections(defaults);
    }, []);

    const calculateTotal = () => {
        let total = 0;
        Object.values(selections).forEach((item: any) => total += item.price);
        return total;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
            <SubViewHeader title="Custom Umrah Builder" onBack={onBack} colorClass="bg-amber-500" />
            
            <div className="p-4 pb-32">
                 <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                        <h3 className="font-bold text-amber-800 text-sm">Sesuaikan Ibadahmu</h3>
                        <p className="text-xs text-amber-700 mt-1">Pilih fasilitas sesuai budget dan kenyamanan Anda. Total harga akan terupdate otomatis.</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {categories.map((cat) => (
                        <div key={cat.key} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-700">{cat.label}</h3>
                                {selections[cat.key] && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            </div>
                            <div className="p-2 space-y-2">
                                {cat.data.map((item) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => handleSelect(cat.key, item)}
                                        className={`p-3 rounded-lg border flex justify-between items-center cursor-pointer transition ${selections[cat.key]?.id === item.id ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:bg-slate-50'}`}
                                    >
                                        <div>
                                            <p className="font-medium text-sm text-slate-800">{item.name}</p>
                                            <p className="text-xs text-slate-400">{item.price === 0 ? 'Termasuk / Gratis' : `+ Rp ${item.price.toLocaleString()}`}</p>
                                        </div>
                                        {selections[cat.key]?.id === item.id && <div className="w-4 h-4 bg-amber-500 rounded-full"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-lg z-40 max-w-md mx-auto right-0">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-500">Estimasi Total</span>
                    <span className="text-xl font-bold text-amber-600">Rp {calculateTotal().toLocaleString()}</span>
                </div>
                <button 
                    onClick={() => {
                         const items = Object.entries(selections).map(([k, v]: any) => `- ${v.name}`).join('\n');
                         alert(`Ringkasan Paket Umroh Custom Anda:\n\n${items}\n\nTotal Estimasi: Rp ${calculateTotal().toLocaleString()}\n\nTim kami akan menghubungi Anda untuk finalisasi.`);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition"
                >
                    Lanjut Pemesanan
                </button>
            </div>
        </div>
    );
};

const KhutbahDetailView = ({ khutbah, onBack }: { khutbah: any, onBack: () => void }) => (
    <div className="min-h-screen bg-white pb-24 animate-fade-in z-50">
        <div className="relative h-48 bg-indigo-600 flex items-end p-6">
             <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-white">
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase">{khutbah.theme}</span>
                <h1 className="text-xl font-bold mt-2">{khutbah.title}</h1>
            </div>
        </div>
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                     <Mic2 className="w-6 h-6" />
                 </div>
                 <div>
                     <p className="text-sm text-slate-500 font-medium">Khatib</p>
                     <p className="font-bold text-slate-800">{khutbah.khatib}</p>
                 </div>
            </div>
            <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                     <Calendar className="w-6 h-6" />
                 </div>
                 <div>
                     <p className="text-sm text-slate-500 font-medium">Tanggal</p>
                     <p className="font-bold text-slate-800">{khutbah.date}</p>
                 </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">Ringkasan Khutbah</h3>
                <p className="text-slate-600 leading-relaxed text-justify">
                    {khutbah.description || "Ringkasan belum tersedia untuk khutbah ini."}
                </p>
            </div>

            <button className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Bagikan Ringkasan
            </button>
        </div>
    </div>
);

const RegisterMosqueForm = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
      <SubViewHeader title="Daftar Masjid Baru" onBack={onBack} colorClass="bg-slate-800" />
      
      <div className="p-4 space-y-6">
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <div className="text-sm text-emerald-800">
            <p className="font-bold mb-1">Bantu Lengkapi Database Masjid</p>
            <p className="text-xs leading-relaxed">Informasi yang Anda kirimkan akan divalidasi oleh tim kami sebelum ditampilkan secara publik. Pastikan data akurat.</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Nama Masjid</label>
            <input type="text" placeholder="Contoh: Masjid Raya Al-Falah" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Kota / Kab</label>
              <input type="text" placeholder="Jakarta Selatan" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Kecamatan</label>
              <input type="text" placeholder="Tebet" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Alamat Lengkap</label>
            <textarea rows={3} placeholder="Jl. Keadilan No. 45..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
          </div>

          <button type="button" onClick={onBack} className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 mt-4">
            <Send className="w-4 h-4" /> Kirim Data Masjid
          </button>
        </form>
      </div>
    </div>
  );
};

const ZakatCalculatorView = ({ onBack }: { onBack: () => void }) => {
  const [income, setIncome] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);
  
  const GOLD_PRICE = 1200000; // IDR per gram
  const NISAB_EMAS = 85; // grams
  const NISAB_INCOME_MONTHLY = 6859394; // Example value equivalent to 524kg rice

  const calculateZakat = () => {
    let totalZakat = 0;
    
    // Zakat Maal (Assets)
    const totalAssets = savings + (gold * GOLD_PRICE);
    if (totalAssets >= (NISAB_EMAS * GOLD_PRICE)) {
       totalZakat += totalAssets * 0.025;
    }

    // Zakat Penghasilan (Monthly)
    if (income >= NISAB_INCOME_MONTHLY) {
       totalZakat += income * 0.025;
    }

    return totalZakat;
  };

  const total = calculateZakat();

  return (
     <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
        <SubViewHeader title="Kalkulator Zakat" onBack={onBack} colorClass="bg-emerald-600" />
        
        <div className="p-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 text-center">
               <p className="text-sm text-slate-500 font-medium mb-1">Total Zakat Wajib Dikeluarkan</p>
               <h2 className="text-4xl font-bold text-emerald-600">Rp {total.toLocaleString()}</h2>
               <p className="text-xs text-slate-400 mt-2">Perhitungan berdasarkan asumsi Nisab Emas & Penghasilan</p>
            </div>

            <div className="space-y-4">
               <h3 className="font-bold text-slate-800">Hitung Aset Anda</h3>
               
               <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                     <Wallet className="w-4 h-4 text-emerald-500" /> Penghasilan Bulanan
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                    onChange={(e) => setIncome(Number(e.target.value))}
                  />
               </div>

               <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                     <Briefcase className="w-4 h-4 text-emerald-500" /> Tabungan & Deposito
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                    onChange={(e) => setSavings(Number(e.target.value))}
                  />
               </div>

               <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                     <ScaleIcon className="w-4 h-4 text-emerald-500" /> Emas / Perak (Gram)
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                    onChange={(e) => setGold(Number(e.target.value))}
                  />
               </div>
            </div>
            
            <button className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg">
               Bayar Zakat Sekarang
            </button>
        </div>
     </div>
  );
}

const DonationView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in relative z-50">
       <div className="relative h-64 w-full">
         <img src="https://images.unsplash.com/photo-1598555638852-122296037d38?q=80&w=1000" alt="Wakaf Construction" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
         <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition">
            <ChevronLeft className="w-6 h-6" />
         </button>
         <div className="absolute bottom-0 left-0 w-full p-6">
           <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Wakaf Produktif</span>
           <h1 className="text-2xl font-bold text-white leading-tight">Wakaf Pembebasan Lahan & Pembangunan Menara</h1>
         </div>
       </div>

       <div className="p-4 space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100 -mt-10 relative z-10">
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                 <span>Terkumpul</span>
                 <span className="text-emerald-600">Rp 650.000.000</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                 <div className="bg-emerald-500 h-3 rounded-full w-[65%] animate-pulse"></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mb-4">
                 <span>65% Terpenuhi</span>
                 <span>Target: 1 Miliar</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                 <div className="text-center">
                    <span className="block font-bold text-slate-800 text-lg">1,204</span>
                    <span className="text-xs text-slate-500">Donatur</span>
                 </div>
                 <div className="h-8 w-[1px] bg-slate-200"></div>
                 <div className="text-center">
                    <span className="block font-bold text-slate-800 text-lg">24</span>
                    <span className="text-xs text-slate-500">Hari Lagi</span>
                 </div>
                 <div className="h-8 w-[1px] bg-slate-200"></div>
                 <button className="bg-emerald-50 text-emerald-600 p-2 rounded-full hover:bg-emerald-100">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>
          </div>

          <div className="space-y-3">
             <h3 className="font-bold text-slate-800">Deskripsi Program</h3>
             <p className="text-sm text-slate-600 leading-relaxed text-justify">
               Kami mengajak kaum muslimin untuk berpartisipasi dalam program wakaf pembebasan lahan seluas 500m2 yang akan digunakan untuk perluasan area masjid dan pembangunan menara. Pahala wakaf akan terus mengalir selama aset tersebut dimanfaatkan untuk kepentingan umat.
             </p>
          </div>

          <div className="space-y-3">
             <h3 className="font-bold text-slate-800">Donatur Terbaru</h3>
             <div className="space-y-2">
                {[1,2,3].map(i => (
                   <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                            HA
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-700">Hamba Allah</p>
                            <p className="text-[10px] text-slate-400">Baru saja berdonasi</p>
                         </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Rp 100.000</span>
                   </div>
                ))}
             </div>
          </div>
       </div>
       
       {/* Sticky Donate Button */}
       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-slate-200 z-30 max-w-md mx-auto">
          <button className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
             <Wallet className="w-5 h-5" /> Donasi Sekarang
          </button>
       </div>
    </div>
  );
}

const MasjidDetailView = ({ mosque, onBack }: { mosque: MosqueProfile, onBack: () => void }) => {
  const [activeSchedule, setActiveSchedule] = useState<'KHUTBAH' | 'KAJIAN'>('KHUTBAH');

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in relative z-50">
      {/* Hero Image */}
      <div className="relative h-72 w-full">
        <img src={mosque.image} className="w-full h-full object-cover" alt={mosque.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-0 left-0 w-full p-6 pt-10 bg-gradient-to-t from-slate-900 to-transparent">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Terverifikasi</span>
             <div className="flex items-center gap-1 bg-amber-400/20 backdrop-blur px-2 py-0.5 rounded">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-amber-400">{mosque.rating} ({mosque.reviewsCount})</span>
             </div>
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight mb-1">{mosque.name}</h1>
          <p className="text-slate-300 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {mosque.location}
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="grid grid-cols-4 gap-2 px-4 -mt-6 relative z-10">
        <div className="bg-white p-3 rounded-xl shadow-md text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-emerald-50 group">
           <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition">
             <Map className="w-4 h-4" />
           </div>
           <span className="text-[10px] font-bold text-slate-600">Rute</span>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-blue-50 group">
           <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition">
             <Phone className="w-4 h-4" />
           </div>
           <span className="text-[10px] font-bold text-slate-600">Kontak</span>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-purple-50 group">
           <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:scale-110 transition">
             <Globe className="w-4 h-4" />
           </div>
           <span className="text-[10px] font-bold text-slate-600">Web</span>
        </div>
         <div className="bg-white p-3 rounded-xl shadow-md text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-rose-50 group">
           <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 group-hover:scale-110 transition">
             <Share2 className="w-4 h-4" />
           </div>
           <span className="text-[10px] font-bold text-slate-600">Share</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 mt-2">
         
         {/* Description & Vision & History */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
             
             <div className="relative z-10 space-y-4">
                <div>
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                       <Info className="w-4 h-4 text-emerald-600" /> Tentang Masjid
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">{mosque.description}</p>
                </div>
                
                {mosque.history ? (
                    <div className="pt-2 border-t border-slate-100">
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                        <ScrollText className="w-3 h-3 text-slate-400" /> Sejarah Singkat
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed text-justify">{mosque.history}</p>
                    </div>
                ) : (
                    <p className="text-xs text-slate-400 italic">Sejarah belum ditambahkan.</p>
                )}
             </div>
         </div>
         
         {/* Struktur DKM */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" /> Struktur Pengurus (DKM)
            </h3>
            {mosque.dkmStructure && mosque.dkmStructure.length > 0 ? (
                <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
                {mosque.dkmStructure.map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[100px]">
                    <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-white shadow-md flex items-center justify-center mb-2 overflow-hidden">
                        {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                        <span className="text-lg font-bold text-slate-400">{member.name.charAt(0)}</span>
                        )}
                    </div>
                    <p className="text-xs font-bold text-slate-800 text-center leading-tight">{member.name}</p>
                    <p className="text-[10px] text-emerald-600 text-center mt-1 bg-emerald-50 px-2 py-0.5 rounded-full">{member.role}</p>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-sm text-slate-400 text-center py-4">Data pengurus belum tersedia.</p>
            )}
        </div>

        {/* Program Unggulan */}
        <div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 px-1">
              <LightbulbIcon className="w-4 h-4 text-amber-500" /> Program Unggulan
            </h3>
            {mosque.programs && mosque.programs.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                {mosque.programs.map((prog, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-3 hover:border-amber-300 transition">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{prog.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{prog.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="bg-slate-50 p-4 rounded-xl text-center text-slate-400 text-sm">Belum ada program unggulan yang ditampilkan.</div>
            )}
        </div>

         {/* Jadwal Ibadah & Belajar (1 Year Schedule) */}
         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Jadwal Kegiatan
               </h3>
            </div>
            <div className="flex border-b border-slate-100">
                <button 
                    onClick={() => setActiveSchedule('KHUTBAH')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${activeSchedule === 'KHUTBAH' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                    Khutbah Jumat
                </button>
                <button 
                    onClick={() => setActiveSchedule('KAJIAN')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${activeSchedule === 'KAJIAN' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                    Kajian Rutin
                </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto no-scrollbar p-4 bg-white">
                 {activeSchedule === 'KHUTBAH' ? (
                    <div className="space-y-3">
                        {mosque.khutbahSchedule && mosque.khutbahSchedule.length > 0 ? (
                            mosque.khutbahSchedule.map((sch, i) => (
                                <div key={i} className="flex gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="w-12 text-center flex-shrink-0 bg-slate-50 rounded p-1">
                                        <span className="block text-[10px] text-slate-500 uppercase font-bold">{sch.date.split(' ')[0]}</span>
                                        <span className="block text-sm font-bold text-slate-800">{sch.date.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">{sch.title}</h4>
                                        <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1"><Mic2 className="w-3 h-3" /> {sch.khatib}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-slate-400 text-xs">Jadwal belum tersedia.</p>
                            </div>
                        )}
                    </div>
                 ) : (
                    <div className="space-y-3">
                        {mosque.kajianSchedule && mosque.kajianSchedule.length > 0 ? (
                             mosque.kajianSchedule.map((sch, i) => (
                                <div key={i} className="flex items-center gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center text-purple-700 text-xs font-bold shrink-0">
                                        {sch.day.substring(0,3)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800 text-sm">{sch.title}</h4>
                                            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{sch.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">Bersama: {sch.teacher}</p>
                                    </div>
                                </div>
                             ))
                        ) : (
                             <div className="text-center py-8">
                                <p className="text-slate-400 text-xs">Jadwal belum tersedia.</p>
                             </div>
                        )}
                    </div>
                 )}
            </div>
         </div>

         {/* Facilities */}
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
               <Wifi className="w-4 h-4 text-slate-600" /> Fasilitas & Layanan
            </h3>
            <div className="grid grid-cols-2 gap-3">
               {mosque.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600">
                     <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                     <span className="text-xs font-medium">{fac}</span>
                  </div>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
}

const KhutbahView = ({ onBack }: { onBack: () => void }) => {
  const [selectedKhutbah, setSelectedKhutbah] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKhutbahs = MOCK_KHUTBAH.filter(k => 
    k.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    k.khatib.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (k.mosqueName && k.mosqueName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (k.city && k.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pastKhutbahs = [
      { id: 1, title: "Membangun Generasi Qurani dalam Keluarga Modern", khatib: "KH. Abdullah Gymnastiar", date: "22 Mar", duration: "25:30" },
      { id: 2, title: "Bahaya Hasad dan Dengki bagi Jiwa", khatib: "Ust. Abdul Somad", date: "15 Mar", duration: "32:15" },
      { id: 3, title: "Keutamaan Sedekah di Waktu Subuh", khatib: "Syekh Ali Jaber (Arsip)", date: "08 Mar", duration: "28:45" },
      { id: 4, title: "Tafsir Al-Fatihah: Ummul Kitab", khatib: "Ust. Adi Hidayat", date: "01 Mar", duration: "45:10" },
  ];

  if (selectedKhutbah) {
      return <KhutbahDetailView khutbah={selectedKhutbah} onBack={() => setSelectedKhutbah(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
      <SubViewHeader title="Jadwal Khutbah" onBack={onBack} colorClass="bg-indigo-600" />
      
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
            <input 
                type="text" 
                placeholder="Cari khatib, judul, atau masjid..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4">
          <h3 className="font-bold text-indigo-800 mb-1">Info Jumat Ini</h3>
          <p className="text-sm text-indigo-600">Jangan lupa datang sebelum azan berkumandang untuk mendapatkan pahala maksimal.</p>
        </div>

        <h3 className="font-bold text-slate-800">Jadwal Mendatang</h3>
        <div className="space-y-3">
          {filteredKhutbahs.length > 0 ? filteredKhutbahs.map((k) => (
            <div key={k.id} onClick={() => setSelectedKhutbah(k)} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 cursor-pointer hover:shadow-md transition">
               <div className="bg-indigo-100 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-indigo-700 flex-shrink-0">
                  <span className="text-xs font-bold uppercase">{k.date.split(' ')[1]}</span>
                  <span className="text-2xl font-bold">{k.date.split(' ')[0]}</span>
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-wide">{k.theme}</span>
                    {k.city && <span className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {k.city}</span>}
                 </div>
                 <h4 className="font-bold text-slate-800 mt-1 leading-tight">{k.title}</h4>
                 <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                   <Mic2 className="w-3 h-3" /> {k.khatib}
                 </p>
                 {k.mosqueName && <p className="text-xs text-indigo-600 mt-1 font-medium">{k.mosqueName}</p>}
               </div>
            </div>
          )) : (
              <div className="text-center py-8 text-slate-400">
                  <p>Tidak ada jadwal khutbah yang cocok.</p>
              </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 mb-2">
           <h3 className="font-bold text-slate-800">Khutbah Sebelumnya</h3>
           <span className="text-xs text-indigo-600 font-medium cursor-pointer hover:underline">Lihat Semua</span>
        </div>

        <div className="space-y-3">
          {pastKhutbahs.map((archive) => (
            <div key={archive.id} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition cursor-pointer group">
               <button 
                 className="bg-indigo-50 w-10 h-10 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 hover:scale-110 active:scale-95"
                 onClick={(e) => {
                    e.stopPropagation();
                    alert(`Memutar rekaman audio:\n"${archive.title}"\nOleh: ${archive.khatib}`);
                 }}
                 aria-label="Play Recording"
               >
                 <PlayCircle className="w-5 h-5" />
               </button>
               <div className="flex-1 min-w-0">
                 <h4 className="font-bold text-slate-800 text-sm truncate pr-2">{archive.title}</h4>
                 <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                   <Mic2 className="w-3 h-3 text-slate-400" /> {archive.khatib}
                 </p>
               </div>
               <div className="text-right flex flex-col items-end shrink-0">
                   <span className="text-[10px] text-slate-400 font-medium">{archive.date}</span>
                   <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {archive.duration}
                   </span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const UmrohView = ({ onBack, onCustomClick }: { onBack: () => void, onCustomClick: () => void }) => (
  <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
    <SubViewHeader title="Paket Umroh & Haji" onBack={onBack} colorClass="bg-amber-500" />
    
    <div className="p-4 space-y-6">
      {/* Custom Build CTA */}
      <div onClick={onCustomClick} className="bg-white rounded-2xl p-5 border border-amber-200 shadow-md cursor-pointer hover:bg-amber-50 transition flex items-center gap-4">
         <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <SettingsIcon className="w-7 h-7" />
         </div>
         <div>
             <h3 className="font-bold text-slate-800 text-lg">Buat Paket Sendiri</h3>
             <p className="text-xs text-slate-500">Pilih hotel, maskapai, dan fasilitas sesuai keinginan Anda.</p>
         </div>
         <ChevronRight className="w-5 h-5 text-slate-300 ml-auto" />
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg">
         <div className="absolute right-0 bottom-0 opacity-20 w-32 h-32 bg-amber-500 rounded-full blur-3xl"></div>
         <h3 className="font-bold text-xl mb-1 text-amber-400">Diskon Awal Tahun</h3>
         <p className="text-sm text-slate-300 mb-4 max-w-[70%]">Dapatkan potongan hingga 2 Juta untuk pendaftaran bulan ini.</p>
         <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold text-xs hover:bg-amber-400 transition">Lihat Promo</button>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-3">Paket Rekomendasi</h3>
        <div className="space-y-4">
           {MOCK_UMRAH_PACKAGES.map((pkg) => (
             <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
                <div className="h-40 overflow-hidden relative">
                   <img src={pkg.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Umrah" />
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 shadow">
                     9 Hari
                   </div>
                </div>
                <div className="p-4">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-slate-800 text-lg">{pkg.name}</h4>
                     <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-slate-500">4.8</span>
                     </div>
                   </div>
                   <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                     <span className="bg-slate-100 px-2 py-0.5 rounded">{pkg.agency}</span>
                     <span className="bg-slate-100 px-2 py-0.5 rounded">{pkg.flight}</span>
                   </p>
                   <div className="flex justify-between items-end pt-3 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] text-slate-400">Mulai dari</p>
                        <p className="text-lg font-bold text-emerald-600">Rp {pkg.price.toLocaleString()}</p>
                      </div>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700">
                        Detail
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const KajianView = ({ onBack }: { onBack: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredKajian = MOCK_EVENTS.filter(e => e.type === 'Kajian').filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.speaker?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
        <SubViewHeader title="Jadwal Kajian" onBack={onBack} colorClass="bg-purple-600" />
        
        <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
            <input 
                type="text" 
                placeholder="Cari kajian, ustadz, atau lokasi..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex overflow-x-auto gap-2 mb-6 no-scrollbar">
            {['Semua', 'Fiqih', 'Tauhid', 'Tazkiyatun Nafs', 'Sejarah', 'Parenting'].map(cat => (
            <button key={cat} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 whitespace-nowrap hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition">
                {cat}
            </button>
            ))}
        </div>

        <div className="relative border-l-2 border-purple-200 ml-3 space-y-8">
            {filteredKajian.length > 0 ? filteredKajian.map((ev, i) => (
            <div key={ev.id} className="relative pl-6 group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-white shadow-sm group-hover:scale-125 transition"></div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-purple-300 transition cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{ev.time}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">{ev.title}</h4>
                    <p className="text-sm text-slate-600 font-medium mb-2">🎙️ {ev.speaker}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {ev.location}
                    </p>
                    <button className="w-full mt-3 py-2 border border-purple-200 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
                    Ingatkan Saya
                    </button>
                </div>
            </div>
            )) : (
                <div className="pl-6 text-slate-400">
                    <p>Tidak ada kajian yang ditemukan.</p>
                </div>
            )}
        </div>
        </div>
    </div>
  );
};

const HaditsView = ({ onBack }: { onBack: () => void }) => (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
        <SubViewHeader title="Hadits Harian" onBack={onBack} colorClass="bg-teal-600" />
        <div className="p-4 space-y-4">
        {MOCK_HADITS.map(h => (
            <div key={h.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-100 rotate-12" />
            <div className="relative z-10">
                <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 inline-block">{h.topic}</span>
                <p className="text-lg font-serif text-slate-800 leading-relaxed mb-4">"{h.content}"</p>
                <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-slate-300"></span> {h.source}
                </p>
            </div>
            </div>
        ))}
        </div>
    </div>
);

const IslamPediaView = ({ onBack }: { onBack: () => void }) => (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
        <SubViewHeader title="Khazanah & Wawasan" onBack={onBack} colorClass="bg-indigo-600" />
        <div className="p-4 grid grid-cols-2 gap-4">
            {MOCK_KHAZANAH.map(k => (
            <div key={k.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
                <div className="h-32 bg-slate-200">
                    <img src={k.image} alt={k.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase mb-1">{k.category}</span>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight line-clamp-3">{k.title}</h4>
                </div>
            </div>
            ))}
        </div>
    </div>
);

const NewsListView = ({ onBack }: { onBack: () => void }) => (
    <div className="min-h-screen bg-slate-50 pb-24 animate-fade-in z-50">
        <SubViewHeader title="Berita Dunia Islam" onBack={onBack} colorClass="bg-blue-600" />
        <div className="p-4 space-y-4">
            {MOCK_NEWS.map(n => (
            <div key={n.id} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
                <div className="w-24 h-24 rounded-lg bg-slate-200 shrink-0 overflow-hidden">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">{n.category}</span>
                        <h4 className="font-bold text-slate-800 text-sm leading-snug mt-1 line-clamp-2">{n.title}</h4>
                    </div>
                    <span className="text-xs text-slate-400">{n.date}</span>
                </div>
            </div>
            ))}
        </div>
    </div>
);

const QuotesView = () => (
  <div className="p-4 space-y-4 pb-24">
    <div className="sticky top-0 bg-slate-50/95 backdrop-blur z-10 py-4 border-b border-slate-200 mb-2">
      <h2 className="text-2xl font-bold text-slate-800">Daily Wisdom</h2>
      <p className="text-slate-500 text-sm">Inspirasi harian dari Al-Quran & Hadits</p>
    </div>
    <div className="space-y-6">
      {QUOTES.map((q) => (
        <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
           <div className="h-48 relative">
             <img src={q.image} className="w-full h-full object-cover" alt="Quote Bg" />
             <div className="absolute inset-0 bg-black/40"></div>
             <div className="absolute inset-0 flex items-center justify-center p-6">
               <p className="text-white font-serif text-xl text-center italic leading-relaxed text-shadow">"{q.text}"</p>
             </div>
           </div>
           <div className="p-4 flex justify-between items-center bg-slate-50">
             <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{q.source}</span>
             <div className="flex gap-3">
                <button className="text-slate-400 hover:text-red-500"><Heart className="w-5 h-5" /></button>
                <button className="text-slate-400 hover:text-blue-500"><Share2 className="w-5 h-5" /></button>
             </div>
           </div>
        </div>
      ))}
    </div>
  </div>
);

const HomeTabContent = ({ onViewChange, onLoginClick }: { onViewChange: (view: string, data?: any) => void, onLoginClick: () => void }) => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const quotesCarouselRef = useRef<HTMLDivElement>(null);

  // NEW STATE FOR PRAYER TIMES
  const [prayerData, setPrayerData] = useState<any>(null);
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string, countdown: string} | null>(null);
  const [locationName, setLocationName] = useState("Mencari Lokasi...");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set formatted date
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    setCurrentDate(date.toLocaleDateString('id-ID', options));

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Get Location Name (Optional, basic attempt)
            try {
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`);
                const data = await res.json();
                setLocationName(`${data.locality || data.city || 'Lokasi Terdeteksi'}`);
            } catch(e) {
                setLocationName("Lokasi Anda");
            }

            // Get Prayer Times
            try {
                 // Method 20 = Kemenag RI
                const timestamp = Math.floor(date.getTime() / 1000);
                const res = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=20`);
                const data = await res.json();
                setPrayerData(data.data.timings);
            } catch (e) {
                console.error("Failed to fetch prayer times");
            }

        }, (err) => {
             setLocationName("Jakarta (Default)");
             // Fallback fetch for Jakarta if needed or just static
        });
    }
  }, []);

  // Timer Effect
  useEffect(() => {
      if(!prayerData) return;
      
      const timer = setInterval(() => {
          const now = new Date();
          const prayers = [
              { key: 'Fajr', label: 'Subuh' },
              { key: 'Dhuhr', label: 'Dzuhur' },
              { key: 'Asr', label: 'Ashar' },
              { key: 'Maghrib', label: 'Maghrib' },
              { key: 'Isha', label: 'Isya' },
          ];

          let upcoming = null;
          let upcomingTime = null;

          for (let p of prayers) {
              const timeStr = prayerData[p.key];
              const [h, m] = timeStr.split(':').map(Number);
              const pDate = new Date(now);
              pDate.setHours(h, m, 0, 0);
              
              if (pDate > now) {
                  upcoming = p;
                  upcomingTime = pDate;
                  break;
              }
          }

          if (!upcoming) {
              // Next is Fajr tomorrow
              const p = prayers[0];
              const timeStr = prayerData[p.key];
              const [h, m] = timeStr.split(':').map(Number);
              const pDate = new Date(now);
              pDate.setDate(pDate.getDate() + 1);
              pDate.setHours(h, m, 0, 0);
              upcoming = p;
              upcomingTime = pDate;
          }

          const diff = upcomingTime.getTime() - now.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setNextPrayer({
              name: upcoming.label,
              time: prayerData[upcoming.key],
              countdown: `-${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
          });

      }, 1000);

      return () => clearInterval(timer);
  }, [prayerData]);

  const handleScroll = () => {
      if (quotesCarouselRef.current) {
          const scrollLeft = quotesCarouselRef.current.scrollLeft;
          const width = quotesCarouselRef.current.offsetWidth;
          const index = Math.round(scrollLeft / width);
          setActiveQuoteIndex(index);
      }
  };

  return (
    <div className="pb-24 animate-fade-in">
      {/* Header */}
      <header className="bg-white px-6 pt-6 pb-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">Masajida</span>
        </div>
        <div className="flex gap-4">
          <button className="relative p-1 hover:bg-slate-50 rounded-full transition">
            <Bell className="w-6 h-6 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button onClick={onLoginClick} className="p-1 hover:bg-slate-50 rounded-full transition">
            <LogIn className="w-6 h-6 text-slate-600" />
          </button>
          <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden border border-slate-100">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
        </div>
      </header>

      <div className="px-4 space-y-6 mt-4">
        {/* Quotes Carousel (Slideable) */}
        <div className="relative">
           <div 
              ref={quotesCarouselRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl h-32"
           >
             {QUOTES.map((quote) => (
               <div key={quote.id} className="min-w-full snap-center relative overflow-hidden bg-slate-800 rounded-2xl">
                  <img src={quote.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="quote" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-center relative z-10">
                    <Quote className="w-6 h-6 text-white/80 mb-2 opacity-50" />
                    <p className="text-white font-serif text-sm italic leading-relaxed line-clamp-2">"{quote.text}"</p>
                    <p className="text-emerald-300 text-[10px] font-bold mt-2 uppercase tracking-widest">{quote.source}</p>
                  </div>
               </div>
             ))}
           </div>
           {/* Indicators */}
           <div className="absolute bottom-2 right-4 flex gap-1">
              {QUOTES.slice(0, 5).map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all ${i === (activeQuoteIndex % 5) ? 'w-4 bg-white' : 'w-1 bg-white/50'}`} />
              ))}
           </div>
        </div>

        {/* Prayer Time Widget */}
        <div className="bg-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200 relative overflow-hidden h-32">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="flex justify-between items-start relative z-10 h-full">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <p className="text-[10px] text-emerald-100 font-medium mb-0.5">{currentDate}</p>
                        <div className="flex items-center gap-2 opacity-90 mb-1">
                             <MapPin className="w-3 h-3" />
                             <span className="text-xs font-medium truncate max-w-[120px]">{locationName}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                             <h3 className="text-sm font-medium">Menuju {nextPrayer?.name || '...'}</h3>
                             <span className="text-2xl font-bold tracking-tight">{nextPrayer?.time || '--:--'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] opacity-80">
                         <Clock className="w-3 h-3" /> 
                         <span>{nextPrayer?.countdown || 'Memuat...'}</span>
                    </div>
                </div>
                
                {/* Scrollable Schedule */}
                <div className="w-24 h-full overflow-y-auto no-scrollbar pr-1 text-right space-y-2 text-xs">
                    {prayerData ? (
                        ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((key) => {
                             const labelMap: any = { 'Fajr': 'Subuh', 'Dhuhr': 'Dzuhur', 'Asr': 'Ashar', 'Maghrib': 'Maghrib', 'Isha': 'Isya' };
                             const label = labelMap[key];
                             const time = prayerData[key];
                             const isNext = nextPrayer?.name === label;
                             return (
                                <div key={key} className={`py-0.5 px-2 rounded ${isNext ? 'bg-white text-emerald-700 font-bold' : 'text-emerald-100'}`}>
                                    {label} {time}
                                </div>
                             );
                        })
                    ) : (
                        <div className="text-emerald-200">Memuat...</div>
                    )}
                </div>
            </div>
        </div>

        {/* Search Box */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
            <div className="p-2 text-slate-400"><Search className="w-5 h-5" /></div>
            <input type="text" placeholder="Cari masjid, kajian, atau ustadz..." className="flex-1 outline-none text-sm text-slate-700" />
            <button className="bg-slate-100 p-2 rounded-lg text-slate-600 hover:bg-slate-200"><Map className="w-5 h-5" /></button>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          <CategoryIcon icon={HomeIcon} label="Masjid" color="bg-emerald-500" onClick={() => {}} />
          <CategoryIcon icon={Mic2} label="Khutbah" color="bg-indigo-500" onClick={() => onViewChange('KHUTBAH')} />
          <CategoryIcon icon={Plane} label="Umroh" color="bg-amber-500" onClick={() => onViewChange('UMROH')} />
          <CategoryIcon icon={BookOpen} label="Al-Quran" color="bg-teal-500" onClick={() => onViewChange('ALQURAN_TAB')} />
          <CategoryIcon icon={Users} label="Kajian" color="bg-purple-500" onClick={() => onViewChange('KAJIAN')} />
          <CategoryIcon icon={Library} label="IslamPedia" color="bg-rose-500" onClick={() => onViewChange('ISLAMPEDIA')} />
          <CategoryIcon icon={Book} label="Hadits" color="bg-cyan-600" onClick={() => onViewChange('HADITS')} />
          <CategoryIcon icon={LayoutGrid} label="Lainnya" color="bg-slate-400" onClick={() => {}} />
        </div>

        {/* Popular Mosques */}
        <div className="space-y-4">
           <div className="flex justify-between items-end">
             <div>
               <h3 className="font-bold text-lg text-slate-800">Masjid Populer</h3>
               <p className="text-xs text-slate-500">Destinasi spiritual favorit pekan ini</p>
             </div>
             <span className="text-xs font-bold text-emerald-600 cursor-pointer">Lihat Semua</span>
           </div>
           <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x">
             {MOCK_MOSQUES.map(m => (
               <PopularMosqueCard 
                 key={m.id}
                 title={m.name}
                 location={m.city}
                 image={m.image}
                 rating={m.rating}
                 facilities={m.facilities}
                 onClick={() => onViewChange('MASJID_DETAIL', m)}
               />
             ))}
             {/* Register New Mosque CTA */}
             <div onClick={() => onViewChange('REGISTER_MOSQUE')} className="min-w-[280px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition group snap-start">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-emerald-500 transition">
                   <PlusCircle className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-600 group-hover:text-emerald-700">Daftarkan Masjid</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-[180px]">Bantu kami melengkapi database masjid di seluruh Indonesia.</p>
             </div>
           </div>
        </div>
        
        {/* Kabar / News Section */}
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Kabar Terkini</h3>
                <span onClick={() => onViewChange('NEWS')} className="text-xs font-bold text-emerald-600 cursor-pointer">Lihat Semua</span>
            </div>
            {/* News Filter Pills (Visual Only here) */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {['Nasional', 'Dunia', 'Ekonomi', 'Islam'].map(cat => (
                    <span key={cat} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 whitespace-nowrap">{cat}</span>
                ))}
            </div>
            
            {/* Horizontal Scrollable News Cards */}
            <div className="flex overflow-x-auto gap-3 pb-2 snap-x no-scrollbar">
                {MOCK_NEWS.map(news => (
                    <div key={news.id} className="min-w-[220px] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden snap-start">
                        <div className="h-32 relative">
                            <img src={news.image} className="w-full h-full object-cover" alt={news.title} />
                            <span className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-sm">{news.category}</span>
                        </div>
                        <div className="p-3">
                            <h4 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2 mb-2">{news.title}</h4>
                            <div className="flex justify-between items-center text-[10px] text-slate-400">
                                <span>{news.date}</span>
                                <ArrowRight className="w-3 h-3 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Khazanah Islam Section */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Khazanah Islam</h3>
                <button className="p-1 bg-slate-100 rounded-full"><ChevronRight className="w-4 h-4" /></button>
            </div>
             <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {['Tauhid', 'Syariat', 'Akhlak', 'Sirah', 'Sejarah'].map(cat => (
                    <span key={cat} className="px-3 py-1 border border-slate-200 rounded-full text-[10px] font-medium text-slate-500 whitespace-nowrap">{cat}</span>
                ))}
            </div>
            
            <div className="flex overflow-x-auto gap-3 pb-2 snap-x no-scrollbar">
                {MOCK_KHAZANAH.map((art) => (
                    <KhazanahCard key={art.id} article={art} />
                ))}
            </div>
        </div>

        {/* Donation Banner */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
           <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
              <Heart className="w-8 h-8 fill-emerald-600 text-emerald-600" />
           </div>
           <div className="flex-1">
              <h4 className="font-bold text-slate-800 mb-1">Mari Berbagi Kebaikan</h4>
              <p className="text-xs text-slate-500 mb-3">Salurkan infaq & sedekah terbaikmu untuk pembangunan umat.</p>
              <button onClick={() => onViewChange('DONATION')} className="text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg w-full">Donasi Sekarang</button>
           </div>
        </div>

      </div>
    </div>
  );
};

const MenuSection: React.FC<{ title: string; items: any[] }> = ({ title, items }) => (
  <div className="mb-6">
    <h3 className="font-bold text-slate-700 text-sm mb-3 px-1">{title}</h3>
    <div className="grid grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div key={i} onClick={item.action} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-white ${item.color}`}>
            <item.icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-slate-600 text-center leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const MenuTabContent = ({ onViewChange }: { onViewChange: (v: string) => void }) => {
  const menuItems = [
    {
      title: "Utilitas & Ibadah",
      items: [
        { label: "Kalkulator Zakat", icon: Calculator, color: "bg-emerald-500", action: () => onViewChange('ZAKAT') },
        { label: "Arah Kiblat", icon: Compass, color: "bg-amber-500", action: () => {} },
        { label: "Jadwal Sholat", icon: Clock, color: "bg-indigo-500", action: () => {} },
        { label: "Kalender Hijriyah", icon: Calendar, color: "bg-blue-500", action: () => {} },
        { label: "Tasbih Digital", icon: Activity, color: "bg-teal-500", action: () => {} },
      ]
    },
    {
      title: "Al-Quran & Hadits",
      items: [
        { label: "Al-Quran", icon: BookOpen, color: "bg-emerald-600", action: () => onViewChange('ALQURAN_TAB') },
        { label: "Tafsir", icon: Book, color: "bg-emerald-700", action: () => onViewChange('ISLAMPEDIA') },
        { label: "Hadits", icon: ScrollText, color: "bg-cyan-600", action: () => onViewChange('HADITS') },
        { label: "Doa Harian", icon: MessageCircle, color: "bg-lime-600", action: () => onViewChange('EXPLORE_TAB') },
        { label: "Hafalan", icon: Mic2, color: "bg-teal-600", action: () => {} },
      ]
    },
    {
      title: "Pustaka Islam",
      items: [
        { label: "IslamPedia", icon: Library, color: "bg-rose-500", action: () => onViewChange('ISLAMPEDIA') },
        { label: "Kitab Kuning", icon: Layers, color: "bg-amber-600", action: () => {} },
        { label: "Sirah Nabawi", icon: User, color: "bg-orange-500", action: () => onViewChange('ISLAMPEDIA') },
        { label: "Fiqih", icon: ScaleIcon, color: "bg-indigo-600", action: () => onViewChange('KAJIAN') },
        { label: "E-Books", icon: FileText, color: "bg-blue-600", action: () => {} },
      ]
    },
    {
      title: "Sosial & Masjid",
      items: [
        { label: "Cari Masjid", icon: MapPin, color: "bg-emerald-500", action: () => {} },
        { label: "Infaq & Sedekah", icon: Wallet, color: "bg-green-600", action: () => onViewChange('DONATION') },
        { label: "Event & Kajian", icon: Ticket, color: "bg-purple-500", action: () => onViewChange('KAJIAN') },
        { label: "Berita Umat", icon: Newspaper, color: "bg-slate-600", action: () => onViewChange('NEWS') },
        { label: "Komunitas", icon: Users, color: "bg-indigo-500", action: () => {} },
        { label: "Umroh & Haji", icon: Plane, color: "bg-amber-500", action: () => onViewChange('UMROH') },
      ]
    }
  ];

  return (
    <div className="pb-24 animate-fade-in bg-slate-50 min-h-screen">
       <div className="bg-white px-6 pt-6 pb-4 sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Menu Lengkap</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari fitur, buku, atau amalan..." 
              className="w-full bg-slate-100 py-3 px-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          </div>
       </div>
       
       <div className="p-6 space-y-2">
         {menuItems.map((section, idx) => (
           <MenuSection key={idx} title={section.title} items={section.items} />
         ))}
       </div>
    </div>
  );
};

const ExploreTabContent = () => (
   <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Explore Doa</h2>
      <div className="space-y-3">
         {MOCK_DOA.map((d) => (
            <div key={d.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
               <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-slate-800">{d.title}</h4>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase">{d.tag}</span>
               </div>
               <p className="text-right font-serif text-xl leading-loose text-slate-800 mb-2">{d.arabic}</p>
               <p className="text-xs text-slate-500 italic">"{d.translation}"</p>
            </div>
         ))}
      </div>
   </div>
);

const AlQuranTabContent = ({ onViewChange }: { onViewChange: (view: string, data?: any) => void }) => (
   <div className="p-4 space-y-4 pb-24 animate-fade-in">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-slate-800">Al-Quran</h2>
         <Search className="w-5 h-5 text-slate-400" />
      </div>

      {/* Slider for Institutions */}
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x no-scrollbar">
        {MOCK_QURAN_INSTITUTIONS.map((inst) => (
            <div 
                key={inst.id} 
                onClick={() => onViewChange('INSTITUTION_DETAIL', inst)}
                className="min-w-[260px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden snap-start cursor-pointer hover:shadow-md transition group"
            >
                <div className="h-32 relative">
                    <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <h3 className="absolute bottom-3 left-3 font-bold text-white text-lg leading-tight">{inst.name}</h3>
                </div>
                <div className="p-3">
                     <p className="text-xs text-slate-500 line-clamp-2 mb-2">{inst.description}</p>
                     <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1">
                        Lihat Profil <ChevronRight className="w-3 h-3" />
                     </span>
                </div>
            </div>
        ))}
      </div>

      <h3 className="font-bold text-slate-800 mt-2">Daftar Surat</h3>
      <div className="space-y-2">
         {MOCK_SURAHS.map((s) => (
            <div key={s.number} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 text-sm relative">
                     <div className="absolute inset-0 border-2 border-slate-200 rounded-lg rotate-45"></div>
                     <span className="relative z-10">{s.number}</span>
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-800">{s.name}</h4>
                     <p className="text-xs text-slate-400">{s.meaning} • {s.verses} Ayat</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-serif text-lg text-slate-800">بِسْمِ اللَّهِ</p>
                  <p className="text-[10px] text-slate-400 uppercase">{s.type}</p>
               </div>
            </div>
         ))}
      </div>
   </div>
);

// --- Main Public Home Container ---

const PublicHome = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const [activeTab, setActiveTab] = useState<PublicSection | 'MENU'>('HOME');
  const [subView, setSubView] = useState<string | null>(null);
  const [viewData, setViewData] = useState<any>(null);

  const handleViewChange = (view: string, data?: any) => {
    setSubView(view);
    if (data) setViewData(data);
  };

  const handleBack = () => {
    setSubView(null);
    setViewData(null);
  };

  const renderContent = () => {
    // Handle Full Screen Sub-Views
    if (subView === 'DONATION') return <DonationView onBack={handleBack} />;
    if (subView === 'ZAKAT') return <ZakatCalculatorView onBack={handleBack} />;
    if (subView === 'REGISTER_MOSQUE') return <RegisterMosqueForm onBack={handleBack} />;
    if (subView === 'MASJID_DETAIL') return <MasjidDetailView mosque={viewData} onBack={handleBack} />;
    if (subView === 'KHUTBAH') return <KhutbahView onBack={handleBack} />;
    if (subView === 'KAJIAN') return <KajianView onBack={handleBack} />;
    if (subView === 'HADITS') return <HaditsView onBack={handleBack} />;
    if (subView === 'ISLAMPEDIA') return <IslamPediaView onBack={handleBack} />;
    if (subView === 'NEWS') return <NewsListView onBack={handleBack} />;
    if (subView === 'UMROH') return <UmrohView onBack={handleBack} onCustomClick={() => setSubView('CUSTOM_UMROH')} />;
    if (subView === 'CUSTOM_UMROH') return <CustomUmrahView onBack={() => setSubView('UMROH')} />;
    if (subView === 'ALQURAN_TAB') return <AlQuranTabContent onViewChange={handleViewChange} />; // Routing from shortcuts
    if (subView === 'EXPLORE_TAB') return <ExploreTabContent />;
    if (subView === 'INSTITUTION_DETAIL') return <InstitutionDetailView institution={viewData} onBack={handleBack} />;

    // Handle Main Tabs
    switch (activeTab) {
      case 'HOME': return <HomeTabContent onViewChange={handleViewChange} onLoginClick={onLoginClick} />;
      case 'QUOTES': return <QuotesView />;
      case 'MENU': return <MenuTabContent onViewChange={handleViewChange} />;
      case 'EXPLORE': return <ExploreTabContent />;
      case 'ALQURAN': return <AlQuranTabContent onViewChange={handleViewChange} />;
      default: return <HomeTabContent onViewChange={handleViewChange} onLoginClick={onLoginClick} />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      {renderContent()}

      {/* Bottom Navigation (Hidden on full-screen sub-views) */}
      {!subView && (
        <nav className="fixed bottom-0 z-40 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] left-1/2 -translate-x-1/2 rounded-t-3xl">
          <div className="grid grid-cols-5 h-[76px] px-2">
            <NavButton icon={HomeIcon} label="Home" active={activeTab === 'HOME'} onClick={() => setActiveTab('HOME')} />
            <NavButton icon={Compass} label="Explore" active={activeTab === 'EXPLORE'} onClick={() => setActiveTab('EXPLORE')} />
            
            <FloatingCenterButton icon={BookOpen} label="Quran" active={activeTab === 'ALQURAN'} onClick={() => setActiveTab('ALQURAN')} />
            
            <NavButton icon={Quote} label="Quotes" active={activeTab === 'QUOTES'} onClick={() => setActiveTab('QUOTES')} />
            <NavButton icon={MenuIcon} label="Menu" active={activeTab === 'MENU'} onClick={() => setActiveTab('MENU')} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default PublicHome;
