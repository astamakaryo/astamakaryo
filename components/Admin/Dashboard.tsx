
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, Wallet, Calendar, Lightbulb, 
  Menu, X, Bell, Search, Plus, DollarSign, UserPlus, Settings,
  Wrench, Truck, FileText, Award, CheckCircle, AlertCircle, Mic,
  Clock, Map, ChevronRight, MoreHorizontal, Smartphone, Monitor,
  TrendingUp, Image as ImageIcon, Edit, Trash2, Save, ArrowLeft
} from 'lucide-react';
import { AdminSection, JamaahProfile, ProgramIdea, ProgramCategory, EconomicStatus, Employee, Asset, Event, MaintenanceLog } from '../../types';
import { MOCK_JAMAAH, MOCK_EMPLOYEES, MOCK_ASSETS, MOCK_MAINTENANCE, MOCK_EVENTS, MOCK_NEWS, MOCK_KHAZANAH, QUOTES } from '../../services/mockData';
import { getAIProgramSuggestions } from '../../services/geminiService';

// --- Sub-Components for Dashboard Sections ---

const Overview = ({ onChangeSection }: { onChangeSection: (s: AdminSection) => void }) => (
  <div className="space-y-6 animate-fade-in">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 text-sm">Total Kas (IDR)</span>
          <div className="bg-emerald-100 p-2 rounded-full"><DollarSign className="w-4 h-4 text-emerald-600" /></div>
        </div>
        <div className="text-2xl font-bold text-slate-800 mt-2">145.250.000</div>
        <div className="text-xs text-emerald-600 mt-1 flex items-center">
          <span className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-700 mr-1">+12%</span> bulan ini
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50" onClick={() => onChangeSection('CRM')}>
         <div className="flex justify-between items-center">
          <span className="text-slate-500 text-sm">Total Jamaah</span>
          <div className="bg-blue-100 p-2 rounded-full"><Users className="w-4 h-4 text-blue-600" /></div>
        </div>
        <div className="text-2xl font-bold text-slate-800 mt-2">1,204</div>
        <div className="text-xs text-blue-600 mt-1">Data terverifikasi</div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50" onClick={() => onChangeSection('OPS')}>
         <div className="flex justify-between items-center">
          <span className="text-slate-500 text-sm">Aset Wakaf</span>
          <div className="bg-amber-100 p-2 rounded-full"><Briefcase className="w-4 h-4 text-amber-600" /></div>
        </div>
        <div className="text-2xl font-bold text-slate-800 mt-2">42 Item</div>
        <div className="text-xs text-red-500 mt-1 font-medium">3 Perlu maintenance</div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50" onClick={() => onChangeSection('EVENTS')}>
         <div className="flex justify-between items-center">
          <span className="text-slate-500 text-sm">Event Bulan Ini</span>
          <div className="bg-purple-100 p-2 rounded-full"><Calendar className="w-4 h-4 text-purple-600" /></div>
        </div>
        <div className="text-2xl font-bold text-slate-800 mt-2">8</div>
        <div className="text-xs text-purple-600 mt-1">3 Menunggu approval</div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button onClick={() => onChangeSection('EVENTS')} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg transition shadow-sm shadow-emerald-200">
        <Calendar className="w-5 h-5" /> Buat Event
      </button>
      <button onClick={() => onChangeSection('FINANCE')} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-lg transition shadow-sm shadow-slate-400">
        <DollarSign className="w-5 h-5" /> Catat Donasi
      </button>
      <button onClick={() => onChangeSection('CRM')} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 p-3 rounded-lg transition">
        <UserPlus className="w-5 h-5" /> Tambah Jamaah
      </button>
      <button onClick={() => onChangeSection('OPS')} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 p-3 rounded-lg transition">
        <Briefcase className="w-5 h-5" /> Cek Inventaris
      </button>
    </div>

    {/* Recent Activity Table Stub */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Aktivitas Terkini</h3>
            <button className="text-xs text-emerald-600 font-medium">Lihat Semua</button>
        </div>
        <div className="p-4 space-y-3">
            {[1,2,3].map(i => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-800">Donasi Masuk via QRIS</p>
                            <p className="text-xs text-slate-500">Rp 500.000 • Hamba Allah</p>
                        </div>
                    </div>
                    <span className="text-xs text-slate-400">2m yang lalu</span>
                </div>
            ))}
        </div>
    </div>
  </div>
);

const GovernanceHRIS = () => {
  const [activeTab, setActiveTab] = useState<'STAFF' | 'VOLUNTEER'>('STAFF');
  const staff = MOCK_EMPLOYEES.filter(e => e.type === 'Staff');
  const volunteers = MOCK_EMPLOYEES.filter(e => e.type === 'Volunteer');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Governance & HRIS</h2>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('STAFF')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'STAFF' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            Staf & DKM
          </button>
          <button 
             onClick={() => setActiveTab('VOLUNTEER')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'VOLUNTEER' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            Relawan (Volunteers)
          </button>
        </div>
      </div>

      {activeTab === 'STAFF' ? (
        <div className="grid grid-cols-1 gap-4">
          {staff.map(s => (
            <div key={s.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                   {s.name.charAt(0)}
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-800">{s.name}</h3>
                   <p className="text-sm text-slate-500">{s.role} • Sejak {s.joinDate}</p>
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-sm font-medium text-slate-800">
                    {s.salary ? `Rp ${s.salary.toLocaleString()}` : '-'}
                 </div>
                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                   {s.status}
                 </span>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
           <div className="bg-indigo-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-1">Gamification Leaderboard</h3>
              <p className="text-indigo-100 text-sm">Peringkat relawan berdasarkan kontribusi kegiatan.</p>
           </div>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Rank</th>
                    <th className="px-6 py-3">Nama</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3 text-right">Poin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {volunteers.sort((a,b) => (b.points || 0) - (a.points || 0)).map((v, idx) => (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-400">#{idx + 1}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{v.name}</td>
                      <td className="px-6 py-4 text-slate-500">{v.role}</td>
                      <td className="px-6 py-4 text-right font-bold text-indigo-600">{v.points} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};

const Operations = () => {
  const [activeTab, setActiveTab] = useState<'ASSETS' | 'MAINTENANCE'>('ASSETS');
  
  // Summary Stats
  const totalVisitors = 12450; // Mock current month visitors
  const totalAssets = MOCK_ASSETS.length;
  const maintenanceCount = MOCK_MAINTENANCE.filter(m => m.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Operations & Assets</h2>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('ASSETS')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'ASSETS' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            Inventaris
          </button>
          <button 
             onClick={() => setActiveTab('MAINTENANCE')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'MAINTENANCE' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            Jadwal Maintenance
          </button>
        </div>
      </div>

      {/* Operational Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
               <Users className="w-6 h-6" />
            </div>
            <div>
               <p className="text-slate-500 text-xs font-medium uppercase">Total Pengunjung</p>
               <h3 className="text-2xl font-bold text-slate-800">{totalVisitors.toLocaleString()}</h3>
               <p className="text-xs text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span className="bg-emerald-100 px-1 rounded">+18%</span> bulan ini
               </p>
            </div>
         </div>

         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
               <Briefcase className="w-6 h-6" />
            </div>
            <div>
               <p className="text-slate-500 text-xs font-medium uppercase">Total Aset Wakaf</p>
               <h3 className="text-2xl font-bold text-slate-800">{totalAssets} Item</h3>
               <p className="text-xs text-slate-400 mt-0.5">Terdata di sistem</p>
            </div>
         </div>

         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
               <Wrench className="w-6 h-6" />
            </div>
            <div>
               <p className="text-slate-500 text-xs font-medium uppercase">Perlu Maintenance</p>
               <h3 className="text-2xl font-bold text-slate-800">{maintenanceCount} Unit</h3>
               <p className="text-xs text-red-500 font-bold mt-0.5">Segera tindaklanjuti</p>
            </div>
         </div>
      </div>

      {activeTab === 'ASSETS' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_ASSETS.map(asset => (
            <div key={asset.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
              <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold 
                ${asset.condition === 'Good' ? 'bg-green-100 text-green-700' : 
                  asset.condition === 'Fair' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {asset.condition}
              </div>
              <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-slate-500">
                {asset.category === 'Vehicle' ? <Truck className="w-6 h-6" /> : 
                 asset.category === 'Electronic' ? <Mic className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
              </div>
              <h3 className="font-bold text-slate-800 truncate">{asset.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{asset.location}</p>
              <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-50">
                <div>
                   <p className="text-[10px] text-slate-400">Nilai Aset</p>
                   <p className="text-sm font-medium text-slate-700">Rp {asset.value.toLocaleString()}</p>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h3 className="font-bold text-slate-800 mb-4">Jadwal Pemeliharaan Mendatang</h3>
           <div className="space-y-4">
             {MOCK_MAINTENANCE.map(log => {
               const assetName = MOCK_ASSETS.find(a => a.id === log.assetId)?.name || 'Unknown Asset';
               return (
                 <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0">
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <Wrench className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{log.taskName}</h4>
                      <p className="text-sm text-slate-500">Unit: {assetName}</p>
                      <div className="mt-2 flex items-center gap-2">
                         <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {log.date}
                         </span>
                         <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                            {log.status}
                         </span>
                      </div>
                    </div>
                    <button className="text-sm text-emerald-600 font-medium hover:underline">Selesaikan</button>
                 </div>
               )
             })}
           </div>
        </div>
      )}
    </div>
  )
};

const WorshipEvents = () => {
  const [activeTab, setActiveTab] = useState<'EVENTS' | 'KHUTBAH'>('EVENTS');
  
  return (
     <div className="space-y-6 animate-fade-in">
       <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Worship & Events</h2>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('EVENTS')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'EVENTS' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            Agenda Kegiatan
          </button>
          <button 
             onClick={() => setActiveTab('KHUTBAH')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'KHUTBAH' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            Jadwal Khutbah
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {MOCK_EVENTS.filter(e => activeTab === 'KHUTBAH' ? e.type === 'Khutbah' : true).map(ev => (
           <div key={ev.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-emerald-50 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-emerald-700 flex-shrink-0">
                <span className="text-xs font-bold uppercase">{new Date(ev.date).toLocaleString('id-ID', { month: 'short' })}</span>
                <span className="text-xl font-bold">{new Date(ev.date).getDate()}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">{ev.type}</span>
                  {ev.status === 'Upcoming' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{ev.title}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" /> {ev.time} WIB 
                  <span className="text-slate-300">|</span>
                  <Map className="w-4 h-4" /> {ev.location}
                </p>
                {ev.speaker && (
                  <p className="text-sm text-emerald-700 font-medium mt-2 bg-emerald-50 inline-block px-2 py-1 rounded">
                    🎙️ {ev.speaker}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                 <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">Detail</button>
                 <button className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium">Edit</button>
              </div>
           </div>
         ))}
      </div>
     </div>
  );
}

const Finance = () => (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-slate-800">Finance & ZISWAF</h2>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-6 rounded-xl shadow-lg shadow-emerald-200">
            <p className="text-emerald-100 text-sm font-medium mb-1">Total Saldo ZISWAF</p>
            <h3 className="text-3xl font-bold">Rp 145.250.000</h3>
            <div className="mt-4 pt-4 border-t border-emerald-400/30 flex justify-between text-sm">
              <span>Pemasukan: +12jt</span>
              <span>Pengeluaran: -4.5jt</span>
            </div>
         </div>
         
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Wallet className="w-5 h-5" /></div>
               <h4 className="font-bold text-slate-700">Zakat (Restricted)</h4>
             </div>
             <p className="text-2xl font-bold text-slate-800">Rp 45.000.000</p>
             <p className="text-xs text-slate-500 mt-1">Hanya untuk 8 Asnaf</p>
         </div>

         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Award className="w-5 h-5" /></div>
               <h4 className="font-bold text-slate-700">Waqf & Aset</h4>
             </div>
             <p className="text-2xl font-bold text-slate-800">Rp 850.000.000</p>
             <p className="text-xs text-slate-500 mt-1">Valuasi aset tidak bergerak</p>
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200">
         <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Laporan Arus Kas (PSAK 109)</div>
         <div className="p-8 text-center text-slate-400 italic">
           Grafik Chart akan ditampilkan di sini (Integrasi Chart.js)
         </div>
       </div>
    </div>
);

// --- Content Management System (CMS) ---

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<'NEWS' | 'ARTICLES' | 'QUOTES'>('NEWS');
  const [newsData, setNewsData] = useState(MOCK_NEWS);
  const [articleData, setArticleData] = useState(MOCK_KHAZANAH);
  const [quoteData, setQuoteData] = useState(QUOTES);
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', category: '', image: '', content: '', source: '' });

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || item.text,
      category: item.category || '',
      image: item.image || '',
      content: item.content || item.snippet || '',
      source: item.source || ''
    });
    setIsEditorOpen(true);
  };

  const handleDelete = (id: any) => {
    if (!window.confirm('Yakin ingin menghapus konten ini?')) return;
    
    if (activeTab === 'NEWS') setNewsData(newsData.filter(i => i.id !== id));
    if (activeTab === 'ARTICLES') setArticleData(articleData.filter(i => i.id !== id));
    if (activeTab === 'QUOTES') setQuoteData(quoteData.filter(i => i.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of Save Logic
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      title: formData.title, // for News/Articles
      text: formData.title, // for Quotes
      category: formData.category,
      image: formData.image,
      date: new Date().toLocaleDateString(),
      author: 'Admin',
      source: formData.source // for Quotes/Hadits
    };

    if (activeTab === 'NEWS') {
      if (editingItem) {
        setNewsData(newsData.map(i => i.id === editingItem.id ? { ...i, ...newItem } : i));
      } else {
        setNewsData([newItem, ...newsData]);
      }
    } else if (activeTab === 'ARTICLES') {
      if (editingItem) {
        setArticleData(articleData.map(i => i.id === editingItem.id ? { ...i, ...newItem } : i));
      } else {
        setArticleData([newItem, ...articleData]);
      }
    } else if (activeTab === 'QUOTES') {
      if (editingItem) {
        setQuoteData(quoteData.map(i => i.id === editingItem.id ? { ...i, ...newItem } : i));
      } else {
        setQuoteData([newItem, ...quoteData]);
      }
    }

    setIsEditorOpen(false);
    setEditingItem(null);
    setFormData({ title: '', category: '', image: '', content: '', source: '' });
  };

  if (isEditorOpen) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h2 className="text-2xl font-bold text-slate-800">{editingItem ? 'Edit Konten' : 'Tambah Konten Baru'}</h2>
        </div>

        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-3xl">
          <div className="space-y-4">
            {activeTab !== 'QUOTES' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Artikel / Berita</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
            )}

            {activeTab === 'QUOTES' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Isi Kutipan (Quote)</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.title} // Using title field for quote text temporarily
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {activeTab === 'QUOTES' ? 'Sumber (QS/Hadits)' : 'Kategori'}
                </label>
                {activeTab === 'QUOTES' ? (
                   <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.source}
                    onChange={e => setFormData({...formData, source: e.target.value})}
                  />
                ) : (
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Pilih Kategori...</option>
                    {activeTab === 'NEWS' ? 
                      ['Nasional', 'Dunia', 'Ekonomi', 'Islam', 'Teknologi'].map(c => <option key={c} value={c}>{c}</option>) :
                      ['Sejarah', 'Akhlak', 'Muamalah', 'Sahabat', 'Sains'].map(c => <option key={c} value={c}>{c}</option>)
                    }
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar Header</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>
            </div>

            {activeTab !== 'QUOTES' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Isi Konten</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Tulis konten lengkap di sini..."
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                />
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" onClick={() => setIsEditorOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Simpan Konten
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Content Management System (CMS)</h2>
        <button onClick={() => { setEditingItem(null); setIsEditorOpen(true); }} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition">
          <Plus className="w-4 h-4" /> Tambah {activeTab === 'QUOTES' ? 'Quote' : 'Berita/Artikel'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'NEWS', label: 'Berita (News)' },
          { id: 'ARTICLES', label: 'Khazanah (Articles)' },
          { id: 'QUOTES', label: 'Daily Quotes' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Gambar</th>
              <th className="px-6 py-3">Judul / Konten</th>
              <th className="px-6 py-3">{activeTab === 'QUOTES' ? 'Sumber' : 'Kategori & Info'}</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(activeTab === 'NEWS' ? newsData : activeTab === 'ARTICLES' ? articleData : quoteData).map((item: any) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 w-24">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                    {item.image ? (
                      <img src={item.image} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon className="w-6 h-6" /></div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <h4 className="font-bold text-slate-800 line-clamp-2">{item.title || item.text}</h4>
                  {activeTab !== 'QUOTES' && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.content || item.snippet || 'No preview available'}</p>}
                </td>
                <td className="px-6 py-4">
                  {activeTab === 'QUOTES' ? (
                    <span className="text-sm font-medium text-emerald-600">{item.source}</span>
                  ) : (
                    <div>
                      <span className="inline-block bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600 mb-1">{item.category}</span>
                      <p className="text-xs text-slate-400">{item.date} • {item.author || 'Admin'}</p>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {((activeTab === 'NEWS' && newsData.length === 0) || (activeTab === 'ARTICLES' && articleData.length === 0)) && (
          <div className="p-8 text-center text-slate-400">Belum ada data konten.</div>
        )}
      </div>
    </div>
  );
};

// --- Existing CRM & Program Modules ---

const JamaahCRM = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Jamaah Intelligence System</h2>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition">
          <Plus className="w-4 h-4" /> Tambah Data
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Muzakki', 'Mustahik', 'Yatim', 'Lansia'].map(f => (
          <button key={f} className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 whitespace-nowrap">
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Nama / Profesi</th>
                <th className="px-6 py-3">Status Ekonomi</th>
                <th className="px-6 py-3">Spiritual KPI</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_JAMAAH.slice(0, 10).map((j) => (
                <tr key={j.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{j.name}</div>
                    <div className="text-xs text-slate-500">{j.profession}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${j.economicStatus === EconomicStatus.MUZAKKI ? 'bg-emerald-100 text-emerald-700' : 
                        j.economicStatus === EconomicStatus.MUSTAHIK ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {j.economicStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">Quran:</span>
                        <span className="font-medium">{j.spiritualStatus.quranLevel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">Sholat:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full mx-0.5 ${i < j.spiritualStatus.prayerDiscipline ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-emerald-600 transition">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProgramGenerator = () => {
  const [generatedPrograms, setGeneratedPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const jsonString = await getAIProgramSuggestions(MOCK_JAMAAH);
    try {
      const data = JSON.parse(jsonString);
      setGeneratedPrograms(data);
    } catch (e) {
      console.error("Failed to parse AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Lightbulb className="w-6 h-6 text-yellow-300" />
            </div>
            <h2 className="text-2xl font-bold">Innovation Lab</h2>
          </div>
          <p className="text-indigo-100 mb-6 leading-relaxed">
            Gunakan Artificial Intelligence untuk menganalisis data profil jamaah (demografi, ekonomi, minat) dan dapatkan rekomendasi program masjid yang paling berdampak.
          </p>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition flex items-center gap-2 shadow-md disabled:opacity-70"
          >
            {loading ? (
              <>Processing Data...</>
            ) : (
              <><Lightbulb className="w-5 h-5" /> Generate Smart Programs</>
            )}
          </button>
        </div>
      </div>

      {generatedPrograms.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Rekomendasi AI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedPrograms.map((prog, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">New Idea</span>
                  <button className="text-slate-300 hover:text-indigo-600"><CheckCircle className="w-5 h-5" /></button>
                </div>
                <h4 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-indigo-600 transition">{prog.title}</h4>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{prog.description}</p>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Wallet className="w-4 h-4 text-slate-400" /> Est. Budget: {prog.estimatedBudget}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// --- Main Admin Dashboard Layout ---

interface AdminDashboardProps {
  onSwitchToPublic: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSwitchToPublic }) => {
  const [activeSection, setActiveSection] = useState<AdminSection | 'CMS'>('DASHBOARD');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  const menuItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'CMS', label: 'CMS & Konten', icon: FileText }, // New CMS Menu
    { id: 'HRIS', label: 'Governance & HR', icon: Users },
    { id: 'OPS', label: 'Operations', icon: Briefcase },
    { id: 'FINANCE', label: 'Finance', icon: Wallet },
    { id: 'EVENTS', label: 'Worship & Events', icon: Calendar },
    { id: 'CRM', label: 'Jamaah Data', icon: Users },
    { id: 'INNOVATION', label: 'Innovation Lab', icon: Lightbulb },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'DASHBOARD': return <Overview onChangeSection={setActiveSection as any} />;
      case 'CMS': return <ContentManagement />;
      case 'CRM': return <JamaahCRM />;
      case 'INNOVATION': return <ProgramGenerator />;
      case 'HRIS': return <GovernanceHRIS />;
      case 'OPS': return <Operations />;
      case 'EVENTS': return <WorshipEvents />;
      case 'FINANCE': return <Finance />;
      default: return <Overview onChangeSection={setActiveSection as any} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
            <span className="font-bold text-white text-lg">Masajida Admin</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-3 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as any);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id 
                  ? 'bg-emerald-600 text-white font-medium' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={onSwitchToPublic}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white transition py-2"
          >
            Logout to Public View
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-500">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 capitalize">
              {menuItems.find(m => m.id === activeSection)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Mobile Preview Toggle */}
            <button
              onClick={() => setIsMobilePreview(!isMobilePreview)}
              className={`p-2 rounded-full transition-colors ${isMobilePreview ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:bg-slate-100'}`}
              title={isMobilePreview ? "Switch to Desktop View" : "Switch to Mobile Preview"}
            >
              {isMobilePreview ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
            </button>

            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
              A
            </div>
          </div>
        </header>

        <div className={`flex-1 overflow-y-auto ${isMobilePreview ? 'bg-slate-200' : ''}`}>
          <div className={`transition-all duration-300 ${isMobilePreview ? 'max-w-md mx-auto my-8 bg-white min-h-[800px] shadow-2xl border-x-4 border-y-8 border-slate-800 rounded-[2rem] overflow-hidden' : 'max-w-7xl mx-auto p-8'}`}>
             <div className={isMobilePreview ? 'h-full overflow-y-auto p-4 pb-20 no-scrollbar' : ''}>
               {renderContent()}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
