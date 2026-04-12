import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { UserCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Governing Body | AHCT Ranchi',
  description: 'Meet the visionaries leading AHCT Ranchi towards excellence.',
};

export default function GoverningBodyPage() {
  const members = [
    { name: 'Dr. S. K. Banerjee', role: 'Chairman', desc: 'Distinguished academician with 30+ years of experience in technical education leadership.' },
    { name: 'Mr. Rajesh Agarwal', role: 'Vice Chairman', desc: 'Industrialist and philanthropist contributing vision for industry-academia collaboration.' },
    { name: 'Prof. (Dr.) A. K. Singh', role: 'Director', desc: 'Former Dean of Engineering, guiding the core academic structure and regulatory compliances.' },
    { name: 'Mrs. Neha Sharma', role: 'Secretary', desc: 'Ensuring seamless administrative policies and fostering a student-centric campus life.' },
    { name: 'Dr. Vivek Ranjan', role: 'Member, Industry Expert', desc: 'Leading tech innovator representing the IT sector to align our curriculum with market demands.' },
    { name: 'Mr. D. P. Yadav', role: 'Member, AICTE Nominee', desc: 'Advising on institutional standards according to AICTE and state university regulations.' },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 flex flex-col items-center pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Governing Body</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              The steering force behind Al Haider College of Technology. Our governing body consists of 
              eminent academicians, industry leaders, and administrators dedicated to institutional excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, idx) => (
              <Card key={idx} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-hitm-navy/5 to-transparent rounded-bl-[100px] -z-0"></div>
                <CardContent className="px-8 pt-10 pb-8 text-center relative z-10">
                  <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border-4 border-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UserCircle2 size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-hitm-red font-semibold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
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
