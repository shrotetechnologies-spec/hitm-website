'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Contact AHCT Ranchi</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Have questions about admissions, courses, or campus life? We're here to help. 
              Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-lg bg-hitm-navy text-white overflow-hidden relative">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-8 font-serif">Campus Information</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        AHCT Campus, Piska More, Ranchi, Jharkhand 834005
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Phone className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        General: 000-111-9889<br />
                        Admissions: +91 98765 43210
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Mail className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        info@ahctranchi.com<br />
                        admissions@ahctranchi.com
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Clock className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Office Hours: Mon - Sat<br />
                        09:00 AM - 05:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <div className="w-full h-64 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm relative group">
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <Globe size={40} className="mb-2 opacity-50" />
                    <p className="text-xs font-bold uppercase tracking-widest">Interactive Map</p>
                 </div>
                 <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Map" />
              </div>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 border-none shadow-2xl relative">
              <div className="absolute top-0 w-full h-2 bg-hitm-red"></div>
              <CardContent className="p-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-hitm-navy mb-2">Send us a Message</h3>
                  <p className="text-gray-500 text-sm">We'll get back to you within 24 business hours.</p>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="John Doe" className="h-12 bg-gray-50 border-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input type="email" placeholder="john@example.com" className="h-12 bg-gray-50 border-gray-200" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input placeholder="Admission Inquiry" className="h-12 bg-gray-50 border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Message</Label>
                    <Textarea placeholder="Type your message here..." className="min-h-[150px] bg-gray-50 border-gray-200" />
                  </div>
                  <Button className="w-full h-12 bg-hitm-red hover:bg-hitm-navy text-white font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-hitm-red/20 group">
                    Send Message <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
 Broadway
