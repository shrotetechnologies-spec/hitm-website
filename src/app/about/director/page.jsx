import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Phone, Mail } from 'lucide-react';

export const metadata = {
  title: "Director's Desk | HITM Ranchi",
  description: 'A message from the Director of HITM Ranchi, Prof. (Dr.) A. K. Singh.',
};

export default function DirectorPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            
            {/* Image & Sidebar */}
            <div className="lg:col-span-2 space-y-8">
               <div className="relative group">
                  <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Director HITM" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/90 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-5 rounded-2xl shadow-xl border border-gray-100 w-[90%] text-center">
                     <h2 className="text-xl font-bold text-hitm-navy font-serif uppercase tracking-tighter">Prof. (Dr.) A. K. Singh</h2>
                     <p className="text-hitm-red font-black text-xs uppercase tracking-widest mt-1">Director, HITM Ranchi</p>
                  </div>
               </div>

               <Card className="border-none bg-gray-50 rounded-3xl p-8">
                  <CardContent className="p-0">
                     <h4 className="font-bold text-hitm-navy mb-4 font-serif uppercase tracking-widest text-sm">Qualifications</h4>
                     <ul className="space-y-3 text-sm text-gray-600 font-medium">
                        <li className="flex gap-3">
                           <span className="w-1.5 h-1.5 bg-hitm-red rounded-full mt-1.5 shrink-0" />
                           B.E. (Hons) Mechanical
                        </li>
                        <li className="flex gap-3">
                           <span className="w-1.5 h-1.5 bg-hitm-red rounded-full mt-1.5 shrink-0" />
                           M.Tech (IIT Kanpur)
                        </li>
                        <li className="flex gap-3">
                           <span className="w-1.5 h-1.5 bg-hitm-red rounded-full mt-1.5 shrink-0" />
                           Ph.D. in Robotics &amp; AI
                        </li>
                     </ul>
                  </CardContent>
               </Card>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-3">
              <Badge variant="gold" className="mb-4">Leadership Message</Badge>
              <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-10 leading-tight italic tracking-tighter uppercase">From the Director&apos;s Desk</h1>
              
              <div className="relative mb-10">
                 <Quote size={60} className="text-hitm-red/10 absolute -top-8 -left-8" />
                 <p className="text-xl text-hitm-navy font-serif italic leading-relaxed relative z-10">
                    &quot;Our mission is to nurture not just engineers and managers, but leaders who are ethically grounded and technologically proficient.&quot;
                 </p>
              </div>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                 <p>
                    I welcome you all to Haider Institute of Technology and Management (HITM), a hub of learning and innovation in Ranchi. Our focus is on providing a transformative educational experience that empowers the next generation of skilled, confident, and responsible professionals.
                 </p>
                 <p>
                    The world is changing rapidly, with advancements in Artificial Intelligence, Blockchain, and Sustainable Energy redefining industries. At HITM, we have built our curriculum and infrastructure from the ground up to lead these changes. Our futuristic 2.48 acre campus is equipped with state-of-the-art labs and a vibrant research atmosphere.
                 </p>
                 <p>
                    We believe in holistic development. Beyond academics, our students will be encouraged to participate in fests, technical clubs, and sports, ensuring they graduate as well-rounded individuals. I am proud of our faculty members who act as mentors, and we remain committed to helping every student make a meaningful mark on the world.
                 </p>
                 <p>
                    I invite you to be a part of this journey towards excellence. Together, let us shape a brighter future through education, innovation, and values.
                 </p>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-hitm-red">
                       <Mail size={18} />
                    </div>
                    <p className="text-sm font-bold text-hitm-navy">hitmranchi40@gmail.com</p>
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

