'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

export default function DynamicNoticePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4 tracking-widest uppercase">Admin Updates</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4 italic uppercase">Official Notice Board</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Real-time updates regarding admissions, examinations, and events.
            </p>
          </div>

          <Card className="border-none shadow-2xl relative bg-white overflow-hidden min-h-[600px]">
             <div className="absolute top-0 w-full h-2 bg-hitm-red"></div>
             <CardContent className="p-0">
                <div className="bg-hitm-navy text-white px-8 py-4 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Bell size={18} className="text-hitm-gold" />
                      <span className="font-bold text-sm tracking-widest uppercase">Latest Announcements</span>
                   </div>
                </div>
                
                {loading ? (
                   <div className="p-20 text-center text-gray-400">Loading notices...</div>
                ) : notices.length === 0 ? (
                  <div className="p-20 text-center text-gray-400 italic">No active notices found.</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notices.map((n) => (
                      <div key={n.id} className="p-6 md:p-8 hover:bg-gray-50 transition-colors group cursor-pointer">
                        <div className="flex gap-6">
                           <div className="bg-hitm-red text-white p-3 rounded-xl h-fit text-center min-w-[60px] shadow-lg shadow-hitm-red/20">
                              <p className="text-xl font-black">{n.date ? new Date(n.date).getDate() : '??'}</p>
                              <p className="text-[10px] uppercase font-bold">{n.date ? new Date(n.date).toLocaleString('default', { month: 'short' }) : 'Mon'}</p>
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="secondary" className="bg-gray-100 text-[10px] uppercase">{n.category || 'General'}</Badge>
                                {n.active && <Badge variant="default" className="bg-green-500 text-[10px] uppercase">Active</Badge>}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-hitm-red transition-colors">{n.title}</h3>
                              <p className="text-gray-500 text-sm leading-relaxed mb-4">{n.content}</p>
                              <div className="flex items-center gap-1 text-hitm-red text-xs font-bold uppercase tracking-wider">
                                 View Document <ChevronRight size={14} />
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
             </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}

