'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdmissionApplyPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: ''
  });

  const steps = [
    'Register Online and verify your email.',
    'Fill out the detailed application form.',
    'Upload required academic documents.',
    'Pay the application fee securely online.',
    'Submit & track your application status.'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...formData,
        status: 'New',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', program: '' });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 flex items-center pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Admissions 2026</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Take the first step towards a brilliant career. Apply now to join Al Haider College of Technology 
              for the upcoming academic session.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <Card className="bg-white border-0 shadow-2xl rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-hitm-navy to-hitm-red" />
              <CardHeader className="px-8 pt-10 pb-6 border-b border-gray-100">
                <CardTitle className="text-2xl font-bold text-hitm-navy">Apply Online</CardTitle>
                <p className="text-sm text-gray-500 mt-2">Fill in your basic details to start the registration process.</p>
              </CardHeader>
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-10 animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-hitm-navy mb-2">Application Received!</h3>
                    <p className="text-gray-500 mb-8">Thank you for your interest. Our admissions team will contact you shortly on {formData.phone || 'your provided number'}.</p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another Application</Button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input 
                        id="fullname" 
                        placeholder="John Doe" 
                        required 
                        className="h-12 bg-gray-50 focus:bg-white" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          required 
                          className="h-12 bg-gray-50 focus:bg-white" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+91 9876543210" 
                          required 
                          className="h-12 bg-gray-50 focus:bg-white" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Preferred Program</Label>
                      <Select 
                        required 
                        value={formData.program} 
                        onValueChange={(val) => setFormData({...formData, program: val})}
                      >
                        <SelectTrigger className="h-12 bg-gray-50 focus:bg-white text-gray-700">
                          <SelectValue placeholder="Choose a program..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B.Tech (CSE)">B.Tech CSE</SelectItem>
                          <SelectItem value="B.Tech (Mech)">B.Tech Mechanical</SelectItem>
                          <SelectItem value="Diploma">Diploma (Polytechnic)</SelectItem>
                          <SelectItem value="MBA">MBA Program</SelectItem>
                          <SelectItem value="MCA">MCA Program</SelectItem>
                          <SelectItem value="BCA">BCA Program</SelectItem>
                          <SelectItem value="BBA">BBA Program</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-12 bg-hitm-red hover:bg-hitm-navy text-white font-bold tracking-wide uppercase shadow-lg shadow-hitm-red/20 transition-all hover:translate-y-[-2px] mt-4"
                    >
                      {loading ? <><Loader2 className="mr-2 animate-spin" size={18} /> Processing...</> : <>Start Application <ChevronRight className="ml-2" size={18} /></>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Info Section */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-5">
                  <CheckCircle2 size={150} />
                </div>
                <h3 className="text-xl font-bold text-hitm-navy mb-6">Admission Process</h3>
                <div className="space-y-5 relative z-10">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-hitm-navy/10 text-hitm-navy font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 font-medium pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-hitm-navy p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-xl font-bold mb-4 font-serif">Need Help?</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Our admissions counseling team is available from Monday to Saturday to help you with your application process.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Call Us: <span className="text-hitm-gold font-bold">000-111-9889</span></p>
                  <p className="font-semibold">Email: <span className="text-hitm-gold font-bold">support@ahctranchi.com</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
