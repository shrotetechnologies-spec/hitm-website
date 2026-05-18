'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Upload, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    regNum: '',
    name: '',
    mobile: '',
    email: '',
  });
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!screenshot) {
      alert('Please upload the transaction screenshot.');
      return;
    }
    setLoading(true);

    try {
      let ssUrl = '';
      const storageRef = ref(storage, `payments/${Date.now()}_${formData.mobile}_ss`);
      const snapshot = await uploadBytes(storageRef, screenshot);
      ssUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'online_payments'), {
        ...formData,
        screenshotUrl: ssUrl,
        status: 'Pending Verification',
        createdAt: serverTimestamp(),
      });

      // Safe Web3Forms email submission
      try {
        const messageText = `
=== NEW ONLINE PAYMENT VERIFICATION ENQUIRY ===

STUDENT DETAILS:
- Name: ${formData.name}
- Registration Number: ${formData.regNum}
- Mobile Number: ${formData.mobile}
- Email Address: ${formData.email}

TRANSACTION PROOF:
- Receipt Screenshot Link: ${ssUrl}
- Initial Verification Status: Pending Verification

Submitted at: ${new Date().toLocaleString()}
`;

        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: "ea72c4d8-d56a-48f8-af05-7dd8d48268a9",
            subject: `Payment Verification: ${formData.name} (${formData.regNum})`,
            name: formData.name,
            email: formData.email,
            message: messageText
          })
        });
      } catch (mailErr) {
        console.error("Web3Forms payment verification email notification failed:", mailErr);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ regNum: '', name: '', mobile: '', email: '' });
        setScreenshot(null);
      }, 3000);

    } catch (error) {
      console.error(error);
      alert('Error submitting payment details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 bg-hitm-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Secure Portal</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Online Fee Payment</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Submit your transaction details after completing the payment. Our team will verify and send a confirmation email.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Payment Account Details */}
            <Card className="shadow-2xl border-none rounded-[40px] overflow-hidden">
              <CardHeader className="bg-hitm-navy text-white p-8 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-hitm-red/20 flex items-center justify-center text-hitm-red mb-4">
                  <CreditCard size={24} />
                </div>
                <CardTitle className="text-2xl font-black font-serif">Payment Account Details</CardTitle>
                <CardDescription className="text-gray-300">Use these details to make your fee payment</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Bank Name</Label>
                      <p className="text-lg font-bold text-hitm-navy">THE JAMMU AND KASHMIR BANK</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Account Number</Label>
                      <p className="text-lg font-bold text-hitm-navy">0520010100001043</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-600">IFSC Code</Label>
                      <p className="text-lg font-bold text-hitm-navy">JAKA0RANCHI</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Account Holder Name</Label>
                      <p className="text-lg font-bold text-hitm-navy">Haider Institute of Technology and Management</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Branch</Label>
                      <p className="text-lg font-bold text-hitm-navy">Ranchi Branch</p>
                    </div>
                    {/* <div>
                      <Label className="text-sm font-semibold text-gray-600">MICR Code</Label>
                      <p className="text-lg font-bold text-hitm-navy">700002123</p>
                    </div> */}
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <p className="text-sm text-yellow-800 font-medium">
                    <strong>Important:</strong> After completing the payment, please fill the form below to upload your transaction receipt for verification.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Verification Form */}
            <Card className="shadow-2xl border-none rounded-[40px] overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 p-8 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-hitm-red/10 flex items-center justify-center text-hitm-red mb-4">
                  <CreditCard size={24} />
                </div>
                <CardTitle className="text-2xl font-black font-serif">Payment Verification Form</CardTitle>
                <CardDescription>Enter your details and upload payment proof</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="regNum">Registration Number *</Label>
                    <Input 
                      id="regNum" 
                      required 
                      placeholder="e.g. HITM/2026/001" 
                      value={formData.regNum}
                      onChange={(e) => setFormData({ ...formData, regNum: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        required 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Input 
                        id="mobile" 
                        required 
                        type="tel" 
                        placeholder="+91 00000 00000" 
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      required 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Transaction Screenshot (PDF/JPG/PNG) *</Label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl py-10 hover:bg-gray-50 transition-colors cursor-pointer relative group">
                      <input 
                        type="file" 
                        required 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept="image/*,application/pdf"
                        onChange={(e) => setScreenshot(e.target.files[0])}
                      />
                      {screenshot ? (
                        <div className="flex items-center gap-3 text-hitm-red font-bold">
                          <FileText size={32} />
                          <span className="text-sm">{screenshot.name}</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                          </div>
                          <p className="mt-4 text-sm font-semibold text-gray-500">Drag or Click to Upload</p>
                          <p className="text-xs text-gray-400 mt-1">Maximum file size: 5MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 bg-hitm-red hover:bg-hitm-navy text-white font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transition-all"
                  >
                    {loading ? (
                      <><Loader2 className="mr-2 animate-spin" /> Submitting...</>
                    ) : (
                      'Submit Payment Details'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-hitm-navy/40 backdrop-blur-md" />
          <Card className="relative w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-black font-serif text-hitm-navy mb-2">Submitted!</h3>
            <p className="text-gray-500 font-medium">You get confirmation mail once payment is verified</p>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  );
}
