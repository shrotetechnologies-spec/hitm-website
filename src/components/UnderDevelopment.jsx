import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Hammer } from 'lucide-react';

export default function UnderDevPage({ title = "Section" }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 py-20 px-4">
        <div className="w-20 h-20 bg-hitm-navy/10 rounded-full flex items-center justify-center text-hitm-navy mb-6 animate-pulse">
          <Hammer size={40} />
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-serif text-hitm-navy text-center mb-4 uppercase tracking-tighter">
          {title} Under Development
        </h1>
        <p className="text-gray-500 text-lg text-center max-w-md mx-auto">
          We are currently crafting a premium experience for this section. Please check back shortly.
        </p>
      </div>
      <Footer />
    </main>
  );
}
