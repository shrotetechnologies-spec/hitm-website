'use client';
import { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdmissionPopup() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show after 3 seconds, only once per session
    const hasSeen = sessionStorage.getItem('admission-popup-seen');
    if (!hasSeen) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShow(false);
    sessionStorage.setItem('admission-popup-seen', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'modelPopup'), {
        ...formData,
        source: 'Landing Popup',
        createdAt: serverTimestamp()
      });
      setStep(2);
      setTimeout(closePopup, 3000);
    } catch (err) {
      console.error("Error saving popup data:", err);
    }
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-500 animate-in fade-in">
      <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative flex flex-col md:flex-row border border-white/20 animate-in zoom-in-95">
        
        <button onClick={closePopup} className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-400 hover:text-hitm-navy transition-all shadow-sm">
          <X size={18} />
        </button>

        {/* Left Visual Side */}
        <div className="md:w-2/5 bg-hitm-navy p-8 flex flex-col justify-between relative overflow-hidden text-white">
           <div className="relative z-10">
              <Sparkles className="text-hitm-gold mb-4" />
              <h2 className="text-2xl font-serif font-black leading-tight mb-2 uppercase tracking-tighter">Admission <br/><span className="text-hitm-gold">Open 2026</span></h2>
              <p className="text-white/60 text-xs font-light">Join the elite league of future innovators.</p>
           </div>
           
           <div className="mt-8 text-[10px] text-white/40 uppercase tracking-widest relative z-10">Limited Seats Available</div>

           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-32 h-32 bg-hitm-red/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-hitm-gold/10 rounded-full translate-x-1/3 translate-y-1/3 blur-xl" />
        </div>

        {/* Right Form Side */}
        <div className="md:w-3/5 p-8 bg-white">
           {step === 1 ? (
             <>
               <h3 className="text-lg font-bold text-hitm-navy mb-1">Get Career Guidance</h3>
               <p className="text-xs text-gray-500 mb-6 italic">Fill details and our counselor will call you.</p>

               <form onSubmit={handleSubmit} className="space-y-4">
                  <Input 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                    className="border-gray-100 bg-gray-50 focus:bg-white transition-all rounded-xl h-12"
                  />
                  <Input 
                    placeholder="Phone Number" 
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    required
                    className="border-gray-100 bg-gray-50 focus:bg-white transition-all rounded-xl h-12"
                  />
                  <Input 
                    placeholder="Email ID (Optional)" 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="border-gray-100 bg-gray-50 focus:bg-white transition-all rounded-xl h-12"
                  />
                  
                  <Button type="submit" className="w-full bg-hitm-red hover:bg-hitm-red-dark text-white rounded-xl h-12 font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2" disabled={loading}>
                    {loading ? "Submitting..." : (
                      <>
                        <Send size={16} /> Request Callback
                      </>
                    )}
                  </Button>
               </form>
             </>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 border border-green-100 animate-bounce">
                   <CheckCircle2 className="text-green-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-hitm-navy mb-2">Thank You!</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Your interest has been registered. Our counselor will contact you shortly.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
