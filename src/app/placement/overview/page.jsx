import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Award, Globe, Briefcase, GraduationCap, Users, Download } from 'lucide-react';
import { generatePagePDF } from '@/lib/pdf-service';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Placement Overview | AHCT Ranchi',
  description: 'Empowering your professional journey with industry-leading placement opportunities.',
};

export default function PlacementOverviewPage() {
  const handleDownload = () => {
    generatePagePDF("Placement_Overview", "Professional Placement Records", {
      headers: ["Metric", "Details"],
      rows: [
        ["Placement Rate", "95%"],
        ["Highest Package", "12 LPA"],
        ["Average Package", "4.5 LPA"],
        ["Hiring Partners", "200+ Companies"],
        ["Students Placed (2025)", "500+ Students"]
      ]
    });
  };

  const features = [
    { icon: <Target className="text-hitm-red" />, title: 'Pre-Placement Training', desc: 'Special sessions on aptitude, technical skills, and mock interviews from the 2nd year onwards.' },
    { icon: <Award className="text-hitm-red" />, title: 'Skill Development', desc: 'Regular workshops on emerging technologies like AI/ML, Cloud Computing, and Blockchain.' },
    { icon: <Globe className="text-hitm-red" />, title: 'Global Opportunities', desc: 'Partnered with multinational companies to provide students with international career prospects.' },
    { icon: <Briefcase className="text-hitm-red" />, title: 'Campus Drives', desc: 'Hosting over 50+ placement drives annually with top-tier companies like TCS, Infosys, and Amazon.' }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="gold">Placement Cell</Badge>
                <Button variant="ghost" size="sm" onClick={handleDownload} className="text-hitm-red hover:bg-hitm-red/10">
                  <Download size={16} className="mr-2" /> PDF Brochure
                </Button>
              </div>
              <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-6 leading-tight">Empowering Your Professional Journey</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                At AHCT Ranchi, our dedicated Placement Cell acts as a bridge between students & Industry. We don&apos;t just provide job opportunities; we build careers through rigorous training and industry exposure.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-hitm-red font-serif">95%</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Placement Rate</p>
                </div>
                <div className="h-10 w-[1px] bg-gray-200 mt-1"></div>
                <div className="text-center">
                  <p className="text-3xl font-black text-hitm-red font-serif">12 LPA</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Highest Package</p>
                </div>
                <div className="h-10 w-[1px] bg-gray-200 mt-1"></div>
                <div className="text-center">
                  <p className="text-3xl font-black text-hitm-red font-serif">200+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Hiring Partners</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl skew-y-1">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Placement Session" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-hitm-navy p-6 rounded-2xl text-white shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg"><GraduationCap className="text-hitm-gold" /></div>
                  <p className="font-bold">500+ Students Placed in 2025</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="border-none shadow-md bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 text-center px-6">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
