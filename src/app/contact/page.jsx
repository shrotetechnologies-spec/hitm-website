'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black font-serif text-hitm-navy mb-4">Contact Us</h1>
            <p className="text-gray-600">Get in touch with us for admissions, queries, or campus visits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center py-8 shadow-sm hover:shadow-md transition-shadow border-0">
              <CardContent>
                <div className="w-16 h-16 bg-hitm-red/10 text-hitm-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Address</h3>
                <p className="text-sm text-gray-600 leading-relaxed px-4">Al Haider College of Technology<br />Ranchi 834006<br />Jharkhand, India</p>
              </CardContent>
            </Card>
            <Card className="text-center py-8 shadow-sm hover:shadow-md transition-shadow border-0">
              <CardContent>
                <div className="w-16 h-16 bg-hitm-navy/10 text-hitm-navy rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Phone</h3>
                <p className="text-sm text-gray-600 leading-relaxed px-4">Admissions & General Enquiries<br /><span className="font-semibold text-hitm-navy text-base">000-111-9889</span></p>
              </CardContent>
            </Card>
            <Card className="text-center py-8 shadow-sm hover:shadow-md transition-shadow border-0">
              <CardContent>
                <div className="w-16 h-16 bg-hitm-gold/30 text-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                <p className="text-sm text-gray-600 leading-relaxed px-4">Official Mail Communication<br /><a href="mailto:support@ahctranchi.com" className="font-semibold text-hitm-navy text-base hover:underline">support@ahctranchi.com</a></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
