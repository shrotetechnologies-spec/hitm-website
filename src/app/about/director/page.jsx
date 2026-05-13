import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Phone, Mail } from 'lucide-react';

export const metadata = {
   title: "Chairman's Message | HITM Ranchi",
   description: 'A message from the Chairman of HITM Ranchi, Mohammad Anisuddin Haider.',
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
                           <img src="/images/chairman.png" alt="Chairman HITM" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/90 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-5 rounded-2xl shadow-xl border border-gray-100 w-[90%] text-center">
                           <h2 className="text-xl font-bold text-hitm-navy font-serif uppercase tracking-tighter">Mohammad Anisuddin Haider</h2>
                           <p className="text-hitm-red font-black text-xs uppercase tracking-widest mt-1">Chairman, HITM Ranchi</p>
                        </div>
                     </div>
                  </div>

                  {/* Message Content */}
                  <div className="lg:col-span-3">
                     <Badge variant="gold" className="mb-4">Leadership Message</Badge>
                     <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-10 leading-tight italic tracking-tighter uppercase">From the Chairman&apos;s Desk</h1>

                     <div className="relative mb-10">
                        <Quote size={60} className="text-hitm-red/10 absolute -top-8 -left-8" />
                        <p className="text-xl text-hitm-navy font-serif italic leading-relaxed relative z-10">
                           &quot;At Haider Institute of Technology and Management (HITM), our mission goes beyond traditional schooling; we are dedicated to cultivating an ecosystem where academic rigor meets industrial relevance.&quot;
                        </p>
                     </div>

                     <div className="space-y-8 text-gray-600 text-lg leading-relaxed mb-16">
                        <div>
                           <h3 className="text-hitm-navy font-bold text-xl mb-2">Empowering Minds and Engineering Futures</h3>
                           <p>
                              At Haider Institute of Technology and Management (HITM), our mission goes beyond traditional schooling; we are dedicated to cultivating an ecosystem where academic rigor meets industrial relevance. In an era defined by rapid technological shifts, we believe that education must be as dynamic as the world around us.
                           </p>
                        </div>

                        <div>
                           <h3 className="text-hitm-navy font-bold text-xl mb-2">Bridging the Gap: Innovation & Skill</h3>
                           <p>
                              Our AICTE-approved programs are meticulously designed to transform students into industry-ready professionals. We don't just teach theory; we foster a culture of innovation, hands-on training, and adaptability. At HITM, we bridge the gap between the classroom and the real world, ensuring our graduates are not just job-seekers, but problem-solvers.
                           </p>
                        </div>

                        <div>
                           <h3 className="text-hitm-navy font-bold text-xl mb-2">Placement & Professional Excellence</h3>
                           <p>
                              Career readiness is at the heart of everything we do. Through strategic industry partnerships, intensive internship modules, and dedicated placement cells, we provide our students with the competitive edge required to excel in the global marketplace.
                           </p>
                        </div>

                        <p className="text-center font-bold text-hitm-navy opacity-20 text-2xl">~</p>

                        <div>
                           <h3 className="text-hitm-navy font-bold text-xl mb-2">A Legacy of Social Responsibility</h3>
                           <p>
                              We believe that true leadership is defined by service. Our commitment to Jharkhand&apos;s youth is reflected in our social initiatives, such as providing free IAS/JPSC coaching for the underprivileged. Our foundation is built on resilience and humanity-exemplified by our self-funded humanitarian efforts during the COVID-19 pandemic, where we stood by our community in its toughest hour.
                           </p>
                        </div>

                        <p className="text-center font-bold text-hitm-navy opacity-20 text-2xl">~</p>

                        <div>
                           <h3 className="text-hitm-navy font-bold text-xl mb-2">Building a Brighter Jharkhand</h3>
                           <p>
                              With world-class infrastructure and a faculty of distinguished experts, we are proud to nurture the local talent of Jharkhand, empowering them to achieve global success. We invite you to become a part of HITM, where your ambition meets our excellence.
                           </p>
                        </div>
                     </div>

                     <div className="relative mb-10">
                        <Quote
                           size={60}
                           className="text-hitm-red/10 absolute -top-8 -left-8"
                        />

                        <p className="text-xl text-hitm-navy font-serif italic leading-relaxed relative z-10">
                           &quot;At HITM, we are committed to empowering minds, nurturing innovation,
                           and building engineering futures that create meaningful impact for
                           society and the nation.&quot;
                        </p>
                     </div>

                     <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                        <p>
                           I warmly welcome you to Haider Institute of Technology and Management
                           (HITM), where education goes beyond traditional learning. Our vision is
                           to create an ecosystem where academic excellence meets industrial
                           relevance, enabling students to become confident professionals,
                           innovators, and responsible leaders.
                        </p>

                        <p>
                           In today&apos;s rapidly evolving technological landscape, education must be
                           dynamic and future-focused. At HITM, our AICTE-approved programs are
                           designed to bridge the gap between classroom learning and real-world
                           industry demands. Through practical exposure, hands-on training, research
                           opportunities, and innovation-driven learning, we prepare our students to
                           become not only job-seekers but also problem-solvers and creators of
                           change.
                        </p>

                        <p>
                           Career readiness remains at the core of our mission. With dedicated
                           placement support, strategic industry collaborations, internship programs,
                           and skill development initiatives, we ensure that our students gain the
                           competitive edge required to succeed in the global professional
                           environment.
                        </p>

                        <p>
                           At HITM, we also believe that true leadership is built on compassion and
                           service to society. Our commitment to the youth of Jharkhand is reflected
                           in initiatives such as free IAS/JPSC coaching for underprivileged
                           students, as well as our humanitarian efforts during challenging times
                           like the COVID-19 pandemic. These values of resilience, responsibility,
                           and humanity define the foundation of our institution.
                        </p>

                        <p>
                           Supported by modern infrastructure and a team of distinguished faculty and
                           mentors, we are proud to nurture local talent and empower students to
                           achieve global success. I invite you to become a part of HITM&apos;s journey
                           of excellence, innovation, and transformation as we work together toward
                           building a brighter future for Jharkhand and beyond.
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

