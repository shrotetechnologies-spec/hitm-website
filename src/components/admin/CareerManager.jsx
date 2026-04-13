'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, deleteDoc } from 'firebase/firestore';
import { Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function CareerManager() {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!db) return;
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
