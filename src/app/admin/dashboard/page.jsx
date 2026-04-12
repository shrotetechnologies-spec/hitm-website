'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, onSnapshot, query, orderBy, addDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
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
  { id: 'careers', label: 'Careers', icon: <Briefcase size={16} /> },
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
  const [noticesCount, setNoticesCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentNotices, setRecentNotices] = useState([]);

  const [eventsCount, setEventsCount] = useState(0);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    // Stats and Real-time data
    const qNotices = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubNotices = onSnapshot(qNotices, (snapshot) => {
      setNoticesCount(snapshot.size);
      setRecentNotices(snapshot.docs.slice(0, 4).map(d => ({ id: d.id, ...d.data() })));
    });

    const qEnquiries = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubEnquiries = onSnapshot(qEnquiries, (snapshot) => {
      setEnquiriesCount(snapshot.size);
      setRecentEnquiries(snapshot.docs.slice(0, 4).map(d => ({ id: d.id, ...d.data() })));
    });

    const qEvents = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsubEvents = onSnapshot(qEvents, (snapshot) => {
      setEventsCount(snapshot.size);
      setRecentEvents(snapshot.docs.slice(0, 4).map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubNotices(); unsubEnquiries(); unsubEvents(); };
  }, []);

  const stats = [
    { icon: <Users size={22} />, label: 'Total Enquiries', value: enquiriesCount.toString(), change: 'Real-time', color: 'text-hitm-red bg-hitm-red/10' },
    { icon: <CalendarDays size={22} />, label: 'Active Events', value: eventsCount.toString(), change: 'Live', color: 'text-hitm-navy bg-hitm-navy/10' },
    { icon: <Bell size={22} />, label: 'Active Notices', value: noticesCount.toString(), change: 'Live', color: 'text-amber-600 bg-amber-50' },
    { icon: <TrendingUp size={22} />, label: 'Admissions Status', value: 'Open', change: '2026-27', color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow transition-all duration-300">
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
                {recentEnquiries.length > 0 ? recentEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{e.program}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[e.status] || 'bg-gray-100'}`}>
                        {e.status || 'New'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-hitm-navy">
                        <Eye size={12} className="mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center py-10 text-gray-400 text-xs">No recent enquiries</td></tr>
                )}
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
            {recentNotices.length > 0 ? recentNotices.map((n, i) => (
              <div key={n.id || i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors animate-fade-in">
                <Bell size={14} className="text-hitm-red shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.category} · {n.date}</p>
                </div>
                <Badge variant={n.active ? 'green' : 'default'} className="text-[10px] shrink-0">
                  {n.active ? 'Active' : 'Off'}
                </Badge>
              </div>
            )) : (
              <p className="text-center py-10 text-gray-400 text-xs text-center w-full">No active notices</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Notices Manager ───────────────────────────────────────────────────────────
function NoticesManager() {
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Admissions', content: '', date: '', active: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'notices', editingId), { 
          ...form, 
          updatedAt: serverTimestamp() 
        });
      } else {
        await addDoc(collection(db, 'notices'), {
          ...form,
          createdAt: serverTimestamp(),
        });
      }
      setForm({ title: '', category: 'Admissions', content: '', date: '', active: true });
      setShowForm(false);
      setEditingId(null);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleEdit = (notice) => {
    setForm({ title: notice.title, category: notice.category, content: notice.content, date: notice.date, active: notice.active });
    setEditingId(notice.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this notice?')) {
      await deleteDoc(doc(db, 'notices', id));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-serif">Notice Board</h2>
        <Button variant="default" size="sm" onClick={() => { setShowForm(!showForm); if(showForm) setEditingId(null); }}>
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Notice</>}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">{editingId ? 'Edit Notice' : 'Add New Notice'}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
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
                {saving ? 'Saving...' : <><CheckCircle size={14} /> {editingId ? 'Update Notice' : 'Save Notice'}</>}
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
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-hitm-navy" onClick={() => handleEdit(n)}>
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

// ── Events Manager ────────────────────────────────────────────────────────────
function EventsManager() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', type: 'Academic', description: '', active: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'events', editingId), { ...form, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'events'), { ...form, createdAt: serverTimestamp() });
      }
      setForm({ title: '', date: '', type: 'Academic', description: '', active: true });
      setShowForm(false);
      setEditingId(null);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleEdit = (event) => {
    setForm({ title: event.title, date: event.date, type: event.type, description: event.description, active: event.active });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this event?')) {
      await deleteDoc(doc(db, 'events', id));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-serif">College Events</h2>
        <Button variant="default" size="sm" onClick={() => { setShowForm(!showForm); if(showForm) setEditingId(null); }}>
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Event</>}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">{editingId ? 'Edit Event' : 'Add New Event'}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>Event Title *</Label>
                  <Input required placeholder="Event title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Event Type *</Label>
                  <Select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    {['Academic', 'Technical', 'Sports', 'Cultural', 'Social', 'Placement'].map(t => <option key={t}>{t}</option>)}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Date *</Label>
                  <Input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea placeholder="Short description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <Button type="submit" variant="default" disabled={saving}>
                {saving ? 'Saving...' : <><CheckCircle size={14} /> {editingId ? 'Update Event' : 'Save Event'}</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="text-left px-4 py-3">Event</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.length > 0 ? events.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-bold text-gray-900">{ev.title}</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{ev.description}</p>
                  </td>
                  <td className="px-4 py-3"><Badge variant="outline" className="text-[10px] uppercase font-bold">{ev.type}</Badge></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{ev.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ev.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {ev.active ? 'Active' : 'Past'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-hitm-navy" onClick={() => handleEdit(ev)}><Pencil size={12} /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => handleDelete(ev.id)}><Trash2 size={12} /></Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-center py-10 text-gray-400">No events found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Enquiries Manager ─────────────────────────────────────────────────────────
function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [verifyModal, setVerifyModal] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEnquiries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filtered = enquiries.filter(e => e.name?.toLowerCase().includes(search.toLowerCase()) || e.program?.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if (confirm('Delete this enquiry?')) {
      await deleteDoc(doc(db, 'enquiries', id));
    }
  };

  const handleVerifyNow = async (id) => {
     setSaving(true);
     try {
        await updateDoc(doc(db, 'enquiries', id), { status: 'Verified', 'payment.status': 'Verified', updatedAt: serverTimestamp() });
        setVerifyModal(null);
     } catch (err) {
        console.error("Error verifying:", err);
     }
     setSaving(false);
  };

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
                {['#', 'Student Details', 'Program', 'Files', 'Payment', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>

                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? filtered.map((e, i) => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 leading-tight">{e.name} <span className="text-gray-400 font-normal italic text-xs">({e.fatherName})</span></p>
                    <p className="text-[10px] text-gray-500">{e.email}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{e.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                     <p className="font-medium">{e.program}</p>
                     <p className="text-[10px] text-gray-400">{e.qualification} • {e.percentage}%</p>
                  </td>
                  <td className="px-4 py-3">
                     {e.documentUrl ? (
                         <a href={e.documentUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-hitm-navy hover:text-hitm-red flex items-center gap-1"><Eye size={12} /> Document</a>
                     ) : <span className="text-[10px] text-gray-400">N/A</span>}
                  </td>
                  <td className="px-4 py-3">
                     {e.payment?.receiptUrl ? (
                         <div className="flex flex-col gap-1">
                             <a href={e.payment.receiptUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-hitm-navy hover:text-hitm-red flex items-center gap-1"><Eye size={12} /> Receipt</a>
                             <span className="text-[9px] text-gray-500 bg-gray-100 px-1 py-0.5 rounded truncate max-w-[100px]">{e.payment.transactionId}</span>
                         </div>
                     ) : <span className="text-[10px] text-gray-400">Pending</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${e.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{e.status || 'New'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {e.status !== 'Verified' && (
                         <Button variant="default" size="sm" className="h-7 text-[10px] bg-hitm-navy hover:bg-hitm-red px-2" onClick={() => setVerifyModal(e)}>Verify Now</Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors" onClick={() => handleDelete(e.id)}><Trash2 size={14} /></Button>
                    </div>
                  </td>
                </tr>

              )) : (
                <tr><td colSpan="7" className="text-center py-20 text-gray-400 font-serif">Empty Inbox</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {verifyModal && (
         <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
               <div className="bg-hitm-navy p-4 text-white flex justify-between items-center">
                  <h3 className="font-bold font-serif flex items-center gap-2"><AlertCircle size={18} className="text-hitm-gold" /> Verify Application</h3>
                  <button onClick={() => setVerifyModal(null)} className="text-white/50 hover:text-white"><X size={18} /></button>
               </div>
               <div className="p-6">
                  <p className="text-gray-700 mb-6 font-medium text-sm leading-relaxed">
                    Please use the student&apos;s mail ID (<span className="text-hitm-red font-bold">{verifyModal.email}</span>) to manually share the confirmation message first, then verify here.
                    If you have already sent the confirmation, you can verify now.
                  </p>
                  
                  <div className="bg-gray-50 p-4 border rounded-xl space-y-2 mb-6">
                     <p className="text-xs text-gray-500 flex justify-between">Student: <span className="font-bold text-gray-900">{verifyModal.name}</span></p>
                     <p className="text-xs text-gray-500 flex justify-between">Phone ID: <span className="font-bold text-gray-900">{verifyModal.phone}</span></p>
                     <p className="text-xs text-gray-500 flex justify-between">Trx ID: <span className="font-bold text-gray-900">{verifyModal.payment?.transactionId || 'N/A'}</span></p>
                  </div>

                  <div className="flex gap-3 justify-end">
                     <Button variant="outline" onClick={() => setVerifyModal(null)}>Cancel</Button>
                     <Button className="bg-green-600 hover:bg-green-700 text-white" disabled={saving} onClick={() => handleVerifyNow(verifyModal.id)}>
                        {saving ? 'Verifying...' : 'Yes, Verify Now'}
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

// ── Career Manager ────────────────────────────────────────────────────────────
function CareerManager() {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'career_enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setApps(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filtered = apps.filter(a => a.name?.toLowerCase().includes(search.toLowerCase()) || a.jobTitle?.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if (confirm('Delete this application?')) {
      await deleteDoc(doc(db, 'career_enquiries', id));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-bold font-serif">Job Applications</h2>
        <Input placeholder="Search by name or position..." className="w-full md:w-64" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['#', 'Applicant', 'Applied For', 'Exp', 'Resume', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? filtered.map((a, i) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-gray-900">{a.name}</p>
                    <p className="text-[10px] text-gray-500">{a.email}</p>
                    <p className="text-[10px] text-gray-500">{a.phone}</p>
                  </td>
                  <td className="px-4 py-3"><Badge variant="outline">{a.jobTitle}</Badge></td>
                  <td className="px-4 py-3 text-gray-500">{a.exp}</td>
                  <td className="px-4 py-3">
                    {a.resumeUrl ? (
                      <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-hitm-red font-bold flex items-center gap-1 hover:underline">
                        <FileText size={14} /> View CV
                      </a>
                    ) : (
                      <span className="text-gray-300">No Resume</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(a.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="py-20 text-center text-gray-400">No applications found</td></tr>
              )}
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
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const userDoc = await getDoc(doc(db, 'users', u.uid));
          if (userDoc.exists() && userDoc.data().userType === 'admin') {
            setUser({ ...u, ...userDoc.data() });
          } else {
            await signOut(auth);
            router.push('/admin/login');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
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
      case 'events': return <EventsManager />;
      case 'enquiries': return <EnquiriesManager />;
      case 'careers': return <CareerManager />;
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
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-xl font-serif mx-auto mb-2">A</div>
          <h2 className="text-white font-bold font-serif text-sm">AHCT Admin</h2>
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
              <p className="text-xs text-gray-400">Welcome, {user?.name || user?.email}</p>
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
