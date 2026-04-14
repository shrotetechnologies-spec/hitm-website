'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2, Upload, File as FileIcon, X } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import imageCompression from 'browser-image-compression';

const branchOptions = {
  'B.Tech': ['Computer Science & Engineering (CSE)', 'Data Science', 'Artificial Intelligence & ML', 'Electric & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  'Diploma': ['Computer Science & Engineering', 'Data Science', 'Artificial Intelligence', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Electrical & Electronics Engg.', 'Electronics & Comm. Engg.'],
  'MBA': ['Finance Management', 'Marketing Management', 'Human Resource Management', 'Information Technology'],
};

import { Suspense } from 'react';

function AdmissionApplyPageContent() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [userIp, setUserIp] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', fatherName: '', email: '', phone: '', program: '', branch: '',
    tenthBoard: '', tenthYear: '', tenthPercentage: '',
    twelfthBoard: '', twelfthYear: '', twelfthPercentage: '', 
    pcmPercentage: '', examScore: ''
  });
  const [documentFile, setDocumentFile] = useState(null);
  
  const [paymentData, setPaymentData] = useState({
    transactionId: '', receiptFile: null
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(err => console.error("IP Error:", err));
  }, []);

  // Auto-select course from floating button query param
  useEffect(() => {
    const course = searchParams.get('course');
    if (course) {
      setFormData(prev => ({ ...prev, program: course, branch: '' }));
    }
  }, [searchParams]);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!documentFile) {
        setError('Please upload your document (Marksheet/ID).');
        return;
    }
    
    setLoading(true);
    try {
      // Check if document already exists for this phone number
      const docRef = doc(db, 'enquiries', formData.phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setError("An application with this phone number already exists.");
        setLoading(false);
        return;
      }
      
      // If OK, proceed to payment popup
      setShowPayment(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong verifying your details.");
    }
    setLoading(false);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!paymentData.receiptFile) {
      setError('Please upload your payment screenshot.');
      return;
    }
    if (!paymentData.transactionId) {
      setError('Please enter the transaction ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // File Upload & Compression helper
      const processUpload = async (file, path) => {
        let uploadFile = file;
        if (file.type.startsWith('image/')) {
          uploadFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
        }
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, uploadFile);
        return await getDownloadURL(storageRef);
      };

      // Upload Document
      const docUrl = await processUpload(documentFile, `applications/${formData.phone}/document_${Date.now()}`);
      
      // Upload Payment Receipt
      const receiptUrl = await processUpload(paymentData.receiptFile, `applications/${formData.phone}/payment_${Date.now()}`);

      // Save to Firestore using Phone Number as Document ID
      await setDoc(doc(db, 'enquiries', formData.phone), {
        ...formData,
        documentUrl: docUrl,
        payment: {
            transactionId: paymentData.transactionId,
            receiptUrl: receiptUrl,
            status: 'Pending'
        },
        status: 'New',
        ipAddress: userIp,
        createdAt: serverTimestamp()
      });

      setShowPayment(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error finalizing:", error);
      setError("Something went wrong during submission. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20 relative">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="text-center mb-12">
            <h1 className="text-4xl font-black font-serif text-hitm-navy mb-4">Online Application Form 2026</h1>
            <p className="text-gray-500 italic">Please fill in your details accurately to register for the upcoming session.</p>
          </div>

          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white relative">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-hitm-navy to-hitm-red" />
            <CardContent className="p-10">
              {submitted ? (
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
                  <h3 className="text-2xl font-bold text-hitm-navy mb-2">Application Submitted successfully!</h3>
                  <p className="text-gray-500">Your form and payment details have been recorded. Our admissions cell will review and verify your application shortly.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleInitialSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Student Name</Label><Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Father&apos;s Name</Label><Input required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Mobile Number (Serves as your Application ID)</Label><Input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Email Address</Label><Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Select Preferred Course</Label>
                      <select className="w-full h-10 border rounded-md px-3 bg-gray-50" required value={formData.program} onChange={e => setFormData({...formData, program: e.target.value, branch: ''})}>
                        <option value="">Choose Course...</option>
                        <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                        <option value="Diploma">Diploma in Polytechnic</option>
                        <option value="MBA">MBA</option>
                        <option value="BBA">BBA</option>
                        <option value="MCA">MCA</option>
                        <option value="BCA">BCA</option>
                      </select>
                    </div>

                    {branchOptions[formData.program] ? (
                      <div className="space-y-2 animate-in fade-in zoom-in duration-200">
                        <Label>Select Specialization / Branch</Label>
                        <select className="w-full h-10 border rounded-md px-3 bg-white" required value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})}>
                          <option value="">Choose Branch...</option>
                          {branchOptions[formData.program].map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="hidden md:block"></div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2"><Label>10th Board</Label><Input placeholder="CBSE / ICSE / State" required value={formData.tenthBoard} onChange={e => setFormData({...formData, tenthBoard: e.target.value})} /></div>
                    <div className="space-y-2"><Label>10th Passing Year</Label><Input type="number" placeholder="YYYY" required value={formData.tenthYear} onChange={e => setFormData({...formData, tenthYear: e.target.value})} /></div>
                    <div className="space-y-2"><Label>10th Percentage (%)</Label><Input type="number" step="0.01" required value={formData.tenthPercentage} onChange={e => setFormData({...formData, tenthPercentage: e.target.value})} /></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2"><Label>12th / Diploma Board</Label><Input placeholder="CBSE / Board / Univ" required value={formData.twelfthBoard} onChange={e => setFormData({...formData, twelfthBoard: e.target.value})} /></div>
                    <div className="space-y-2"><Label>12th / Diploma Passing Year</Label><Input type="number" placeholder="YYYY" required value={formData.twelfthYear} onChange={e => setFormData({...formData, twelfthYear: e.target.value})} /></div>
                    <div className="space-y-2"><Label>12th / Diploma Perc. (%)</Label><Input type="number" step="0.01" required value={formData.twelfthPercentage} onChange={e => setFormData({...formData, twelfthPercentage: e.target.value})} /></div>
                  </div>

                  {(formData.program === 'B.Tech' || formData.program === 'Diploma' || formData.program === 'MBA' || formData.program === 'MCA') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-100 animate-in fade-in duration-300">
                      {formData.program === 'B.Tech' && (
                         <div className="space-y-2 animate-in slide-in-from-left duration-300">
                           <Label>PCM Percentage (%)</Label>
                           <Input type="number" step="0.01" required placeholder="Physics, Chem & Math %" className="bg-white" value={formData.pcmPercentage} onChange={e => setFormData({...formData, pcmPercentage: e.target.value})} />
                         </div>
                      )}
                      
                      <div className="space-y-2 animate-in slide-in-from-left duration-300">
                         <Label>
                            {formData.program === 'B.Tech' ? 'JEE Main / JCECEB Score or Percentile' :
                             formData.program === 'Diploma' ? 'JCECEB / Entrance Score' :
                             formData.program === 'MBA' ? 'CAT / MAT / CMAT Score' :
                             'NIMCET / Entrance Score'}
                         </Label>
                         <Input required placeholder="Enter Score (Type NA if none)" className="bg-white" value={formData.examScore} onChange={e => setFormData({...formData, examScore: e.target.value})} />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                     <Label>Upload Document (Photo/Marksheet/ID - Max 5MB)</Label>
                     <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-4 relative flex items-center justify-center min-h-[100px] hover:bg-gray-50 transition-colors">
                        <input type="file" accept="image/*,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setDocumentFile(e.target.files[0])} required />
                        {documentFile ? (
                           <div className="flex items-center gap-2 text-hitm-navy font-bold">
                              <FileIcon className="text-hitm-red" /> {documentFile.name}
                           </div>
                        ) : (
                           <div className="text-center text-gray-500">
                             <Upload className="mx-auto mb-2 opacity-50" />
                             <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Click to Browse</span>
                           </div>
                        )}
                     </div>
                  </div>

                  {error && !showPayment && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
                  <Button type="submit" disabled={loading} className="w-full h-12 bg-hitm-navy hover:bg-hitm-red text-white uppercase font-bold tracking-widest shadow-lg">
                    {loading ? <Loader2 className="animate-spin" /> : 'Proceed to Payment'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Popup Modal */}
        {showPayment && (
           <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
                 <div className="bg-gradient-to-r from-hitm-navy to-hitm-red p-6 text-white flex justify-between items-center relative">
                    <div>
                       <h3 className="text-xl font-black font-serif italic">Complete Payment</h3>
                       <p className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Application Fee: ₹1,000</p>
                    </div>
                    <button onClick={() => setShowPayment(false)} className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-hitm-navy transition-colors text-white absolute top-6 right-6">
                       <X size={16} />
                   </button>
                 </div>
                 
                 <form onSubmit={handleFinalSubmit} className="p-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 space-y-2 shadow-inner">
                       <p className="text-sm text-gray-500 flex justify-between">Organisation: <span className="font-bold text-hitm-navy">HITM Ranchi</span></p>
                       <p className="text-sm text-gray-500 flex justify-between">Bank: <span className="font-bold text-hitm-navy">State Bank of India</span></p>
                       <p className="text-sm text-gray-500 flex justify-between">A/C No: <span className="font-bold text-hitm-navy">301245678910</span></p>
                       <p className="text-sm text-gray-500 flex justify-between">IFSC Code: <span className="font-bold text-hitm-navy">SBIN0001234</span></p>
                       <hr className="border-gray-200 my-2" />
                       <p className="text-sm text-gray-500 flex justify-between font-bold">UPI ID: <span className="text-hitm-red">hitmranchi@sbi</span></p>
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-2">
                          <Label>Upload Payment Screenshot</Label>
                          <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                             <input type="file" accept="image/*,.pdf" className="text-sm cursor-pointer w-full" onChange={e => setPaymentData({...paymentData, receiptFile: e.target.files[0]})} required />
                          </div>
                          <p className="text-[10px] text-gray-400 italic">Clear screenshot showing successful status.</p>
                       </div>
                       
                       <div className="space-y-2">
                          <Label>Transaction ID / UTR Number</Label>
                          <Input placeholder="e.g. 123456789012" className="bg-gray-50" value={paymentData.transactionId} onChange={e => setPaymentData({...paymentData, transactionId: e.target.value})} required />
                       </div>
                    </div>

                    {error && showPayment && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100 mt-4">{error}</p>}
                    
                    <Button type="submit" disabled={loading} className="w-full h-12 bg-hitm-red hover:bg-hitm-navy text-white uppercase font-bold tracking-widest mt-6 shadow-xl hover:-translate-y-0.5 transition-transform">
                       {loading ? <Loader2 className="animate-spin" /> : 'Confirm & Submit Application'}
                    </Button>
                 </form>
              </div>
           </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default function AdmissionApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdmissionApplyPageContent />
    </Suspense>
  );
}
