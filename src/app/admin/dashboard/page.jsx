'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import {
  LayoutDashboard, Bell, CalendarDays, Image as ImageIcon, GraduationCap, Users, Briefcase,
  Globe, LogOut, Menu, X, Plus, Trash2, Pencil, Eye, TrendingUp, CheckCircle,
  AlertCircle, Clock, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'notices', label: 'Notices', icon: <Bell size={16} /> },
  { id: 'events', label: 'Events', icon: <CalendarDays size={16} /> },
  { id: 'enquiries', label: 'Enquiries', icon: <Users size={16} /> },
  { id: 'programs', label: 'Programs', icon: <GraduationCap size={16} /> },
  { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={16} /> },
  { id: 'placement', label: 'Placement', icon: <Briefcase size={16} /> },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const statsData = [
  { icon: <Users size={22} />, label: 'Total Enquiries', value: '348', change: '+12 today', color: 'text-hitm-red bg-hitm-red/10' },
  { icon: <GraduationCap size={22} />, label: 'Programs Listed', value: '24', change: '6 Schools', color: 'text-hitm-navy bg-hitm-navy/10' },
  { icon: <Bell size={22} />, label: 'Active Notices', value: '15', change: '3 new', color: 'text-amber-600 bg-amber-50' },
  { icon: <TrendingUp size={22} />, label: 'Placements', value: '892', change: 'This year', color: 'text-emerald-600 bg-emerald-50' },
];

const mockEnquiries = [
  { id: '1', name: 'Rahul Kumar', program: 'B.Tech CSE', phone: '9876543210', date: '11 Apr 2026', status: 'New' },
  { id: '2', name: 'Priya Singh', program: 'MBA', phone: '9988776655', date: '11 Apr 2026', status: 'Contacted' },
  { id: '3', name: 'Amit Sharma', program: 'BCA', phone: '9765432198', date: '10 Apr 2026', status: 'New' },
  { id: '4', name: 'Sunita Devi', program: 'B.Com (H)', phone: '9654321987', date: '10 Apr 2026', status: 'Converted' },
];

const statusColors = {
  New: 'bg-red-100 text-red-700',
  Contacted: 'bg-blue-100 text-blue-700',
  Converted: 'bg-green-100 text-green-700',
};

// ── Dashboard View ────────────────────────────────────────────────────────────
function DashboardView() {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    fetch('/api/notices?limit=4').then(r => r.json()).then(d => setNotices(d.data || []));
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((s, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-2xl font-black text-gray-900 leading-tight">{s.value}</p>
                <p className="text-xs text-emerald-600 font-medium">{s.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Recent Enquiries
              <Button variant="ghost" size="sm" className="text-xs text-hitm-red">View All <ChevronRight size={12} /></Button>
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-4 py-2.5">Name</th>
                  <th className="text-left px-4 py-2.5">Program</th>
                  <th className="text-left px-4 py-2.5">Status</th>
                  <th className="text-left px-4 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{e.program}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-hitm-navy">
                        <Eye size={12} className="mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Notices */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Active Notices
              <Button variant="ghost" size="sm" className="text-xs text-hitm-red">Manage <ChevronRight size={12} /></Button>
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-gray-100">
            {notices.slice(0, 4).map((n, i) => (
              <div key={n.id || i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50">
                <Bell size={14} className="text-hitm-red shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.category} · {n.date}</p>
                </div>
                <Badge variant={n.active ? 'green' : 'default'} className="text-[10px] shrink-0">
                  {n.active ? 'Active' : 'Off'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Notices Manager ───────────────────────────────────────────────────────────
function NoticesManager() {
  const [notices, setNotices] = useState([
    { id: '1', title: 'Admission Notice 2026-27', category: 'Admissions', date: '2026-04-11', active: true, content: 'Admissions open for 2026-27.' },
    { id: '2', title: 'End Semester Exam Schedule', category: 'Examination', date: '2026-04-10', active: true, content: 'Exams from May 5.' },
    { id: '3', title: 'Campus Placement Drive – Infosys', category: 'Placement', date: '2026-04-09', active: true, content: 'Drive on April 25.' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Admissions', content: '', date: '' });
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/notices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        setNotices([data.data, ...notices]);
        setForm({ title: '', category: 'Admissions', content: '', date: '' });
        setShowForm(false);
      }
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/notices/${id}`, { method: 'DELETE' });
    setNotices(notices.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-serif">Notice Board</h2>
        <Button variant="default" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Notice</>}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">Add New Notice</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Notice Title *</Label>
                  <Input required placeholder="Notice title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category *</Label>
                  <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {['Admissions', 'Examination', 'Placement', 'Events', 'Administration', 'Scholarship'].map(c => <option key={c}>{c}</option>)}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Content</Label>
                <Textarea placeholder="Notice content..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
              </div>
              <Button type="submit" variant="default" disabled={saving}>
                {saving ? 'Saving...' : <><CheckCircle size={14} /> Save Notice</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Notices ({notices.length})</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="text-left px-4 py-2.5">#</th>
                <th className="text-left px-4 py-2.5">Title</th>
                <th className="text-left px-4 py-2.5">Category</th>
                <th className="text-left px-4 py-2.5">Date</th>
                <th className="text-left px-4 py-2.5">Status</th>
                <th className="text-left px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices.map((n, i) => (
                <tr key={n.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-[260px] truncate">{n.title}</td>
                  <td className="px-4 py-3"><Badge variant="gold" className="text-xs">{n.category}</Badge></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{n.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${n.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {n.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-hitm-navy">
                        <Pencil size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(n.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Enquiries Manager ─────────────────────────────────────────────────────────
function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState(mockEnquiries);
  const [search, setSearch] = useState('');
  const filtered = enquiries.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.program.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-bold font-serif">Student Enquiries</h2>
        <Input placeholder="Search by name or program..." className="w-full md:w-64" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['#', 'Name', 'Program', 'Phone', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((e, i) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{e.name}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{e.program}</td>
                  <td className="px-4 py-3 text-gray-600">{e.phone}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{e.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[e.status]}`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-hitm-navy"><Eye size={12} /></Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-hitm-red"><Pencil size={12} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else router.push('/admin/login');
      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-hitm-red/20 border-t-hitm-red rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardView />;
      case 'notices': return <NoticesManager />;
      case 'enquiries': return <EnquiriesManager />;
      default: return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Clock size={48} className="mb-4 opacity-40" />
          <h3 className="text-xl font-bold font-serif mb-2">Coming Soon</h3>
          <p className="text-sm">This section is under development</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 xl:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-gray-950 z-50 flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
      )}>
        <div className="bg-hitm-red/80 px-4 py-5 text-center shrink-0">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-xl font-serif mx-auto mb-2">H</div>
          <h2 className="text-white font-bold font-serif text-sm">HITM Admin</h2>
          <p className="text-white/60 text-[11px] mt-0.5">Management Portal</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">Main</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={cn("admin-sidebar-link w-full text-left mb-0.5", activeSection === item.id && "active")}
            >
              {item.icon} {item.label}
            </button>
          ))}

          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mt-4 mb-2">Account</p>
          <Link href="/" className="admin-sidebar-link flex w-full">
            <Globe size={16} /> View Website
          </Link>
          <button onClick={handleSignOut} className="admin-sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20">
            <LogOut size={16} /> Sign Out
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 xl:ml-64 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="xl:hidden p-1.5 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight">
                {navItems.find(i => i.id === activeSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-400">Welcome, {user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-hitm-red flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
