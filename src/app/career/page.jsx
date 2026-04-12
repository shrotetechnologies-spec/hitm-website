'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, ArrowRight, CheckCircle, Users, GraduationCap, MapPin, X, Upload, FileText, Loader2 } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

export default function CareerPage() {
  const [applyModal, setApplyModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', exp: '', coverLetter: '' });
  const [resume, setResume] = useState(null);

  const jobs = [
    { id: 'ap-cse', title: 'Assistant Professor - CSE', type: 'Full Time', dept: 'Engineering', location: 'Ranchi Campus', exp: '3-5 Years' },
    { id: 'tpo', title: 'Training & Placement Officer', type: 'Full Time', dept: 'Administration', location: 'Ranchi Campus', exp: '5+ Years' },
    { id: 'la-mech', title: 'Lab Assistant - Mechanical', type: 'Full Time', dept: 'Engineering', location: 'Ranchi Campus', exp: '0-2 Years' },
    { id: 'fd-it', title: 'Frontend Developer', type: 'Full Time', dept: 'IT Services', location: 'Remote/In-office', exp: '2+ Years' },
  ];

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let resumeUrl = '';
      if (resume) {
        let fileToUpload = resume;
        // Compress if it's an image
        if (resume.type.startsWith('image/')) {
          const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1920, useWebWorker: true };
          fileToUpload = await imageCompression(resume, options);
        }
        
        const storageRef = ref(storage, `careers/${Date.now()}_${formData.phone}_${resume.name}`);
        const snapshot = await uploadBytes(storageRef, fileToUpload);
        resumeUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'career_enquiries'), {
        ...formData,
        jobId: applyModal.id,
        jobTitle: applyModal.title,
        resumeUrl,
        status: 'New',
        createdAt: serverTimestamp()
      });

      alert('Application submitted successfully!');
      setApplyModal(null);
      setFormData({ name: '', email: '', phone: '', exp: '', coverLetter: '' });
      setResume(null);
    } catch (err) {
      console.error(err);
      alert('Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Work at AHCT</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Build the Future of Education</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Join a vibrant community of educators, researchers, and innovators dedicated to shaping the leaders of tomorrow.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: <Users size={32} />, title: 'Incredible Culture', desc: 'Collaborate with industry veterans and passionate educators in a supportive environment.' },
              { icon: <GraduationCap size={32} />, title: 'Growth & Research', desc: 'Ample opportunities for research funding, Ph.D. support, and professional certifications.' },
              { icon: <CheckCircle size={32} />, title: 'Premium Benefits', desc: 'Competitive salary packages, health insurance, and campus-wide facilities for employees.' }
            ].map((f, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-hitm-red">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-title">
            <h2>Current Openings</h2>
            <p className="text-gray-500 mt-4">We are always looking for exceptional talent. Join our journey.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {jobs.map((j, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all border-gray-100 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-hitm-red/10 text-hitm-red border-none">{j.dept}</Badge>
                        <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                          <MapPin size={10} /> {j.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-hitm-red transition-colors">{j.title}</h3>
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Briefcase size={12} /> {j.type}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><CheckCircle size={12} /> {j.exp} EXP</span>
                      </div>
                    </div>
                    <Button onClick={() => setApplyModal(j)} variant="default" className="bg-hitm-navy hover:bg-hitm-red shadow-lg">
                      Apply Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 bg-gray-950 rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-hitm-red/20 blur-[100px]" />
            <h2 className="text-3xl md:text-4xl font-black font-serif mb-6 relative z-10">Don&apos;t see a matching role?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto relative z-10">
              Send your resume to <span className="text-hitm-gold font-bold">careers@ahctranchi.com</span>. We&apos;ll keep you in our talent pool for future opportunities.
            </p>
            <Button variant="gold" size="lg" className="relative z-10 shadow-2xl" onClick={() => setApplyModal({ id: 'general', title: 'General Application' })}>
               General Interest Application
            </Button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="bg-hitm-navy p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold font-serif text-hitm-gold">Join our Team</h3>
                <p className="text-xs text-white/60">Applying for: {applyModal.title}</p>
              </div>
              <button onClick={() => setApplyModal(null)} className="text-white/50 hover:text-white transition-colors"><X/></button>
            </div>
            <CardContent className="p-8">
              <form onSubmit={handleApply} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address *</Label>
                    <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <Input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 0000 0000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience (Years) *</Label>
                    <Input required value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})} placeholder="e.g. 5 Years" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Brief Cover Note / Why AHCT? (Optional)</Label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hitm-red"
                    value={formData.coverLetter}
                    onChange={e => setFormData({...formData, coverLetter: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload CV/Resume (PDF or Image, Optional)</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl py-6 hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,image/*" onChange={e => setResume(e.target.files[0])} />
                    {resume ? (
                      <div className="flex items-center gap-2 text-hitm-red font-bold">
                        <FileText size={24} /> <span>{resume.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="text-gray-300 mb-2" size={32} />
                        <p className="text-xs text-gray-400">Drag and drop or click to upload</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setApplyModal(null)}>Cancel</Button>
                  <Button type="submit" disabled={submitting} className="flex-1 bg-hitm-red hover:bg-hitm-navy font-bold h-12">
                    {submitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                    ) : 'Submit Application'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  );
}
