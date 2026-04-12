import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, GraduationCap, CheckCircle, Target, Users, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'About AHCT Ranchi | Overview',
  description: 'Learn about the legacy, excellence, and infrastructure of Al Haider College of Technology.',
};

export default function OverviewPage() {
  const points = [
    { title: 'Academic Excellence', desc: 'Rigorous curriculum designed in collaboration with industry experts to ensure students are job-ready from day one.' },
    { title: 'Modern Infrastructure', desc: 'State-of-the-art labs, a digital library, and a sprawling 50-acre green campus in Ranchi.' },
    { title: 'Industry Connect', desc: 'Over 200+ corporate partners providing internship and placement opportunities to our students.' },
    { title: 'Expert Faculty', desc: 'Mentorship from Ph.D. holders and industry veterans who bring years of practical experience.' }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
               <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800" alt="AHCT Campus" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/80 via-transparent to-transparent" />
               </div>
               <div className="absolute -bottom-8 -right-8 bg-hitm-red text-white p-8 rounded-3xl shadow-2xl transform rotate-3">
                  <p className="text-4xl font-black font-serif">15+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/80">Years of Legacy</p>
               </div>
            </div>
            
            <div>
              <Badge variant="gold" className="mb-4">Institution Profile</Badge>
              <h1 className="text-4xl md:text-6xl font-black font-serif text-hitm-navy mb-6 leading-tight uppercase tracking-tighter italic">About AHCT Ranchi</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Established as Al Haider College of Technology in 2008, our institution has emerged as a premier destination for technical & management education in Jharkhand. 
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We are committed to fostering academic excellence, research innovation, and holistic development. With a focus on state-of-the-art facilities and industry-aligned programs, we prepare our students to excel in the global professional landscape.
              </p>
              <div className="grid grid-cols-2 gap-6">
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">NAAC Accredited</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">AICTE Approved</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">ISO Certified</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">Skill Centers</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {points.map((p, i) => (
              <Card key={i} className="border-none bg-gray-50 p-6 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <CardContent className="pt-4 flex gap-6 items-start">
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:bg-hitm-red group-hover:text-white transition-all duration-500 shrink-0">
                      <Target size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-hitm-navy mb-2 font-serif uppercase">{p.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                   </div>
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

