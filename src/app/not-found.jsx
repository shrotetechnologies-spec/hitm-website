'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft, Search, GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hitm-gold via-hitm-red to-hitm-navy" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-hitm-red/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-hitm-navy/5 rounded-full blur-3xl" />
      
      <div className="container max-w-2xl mx-auto px-4 text-center z-10">
        <div className="mb-10 relative inline-block">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-50 flex items-center justify-center border-4 border-gray-100 shadow-inner">
            <GraduationCap size={64} className="text-gray-200" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl md:text-8xl font-black text-hitm-navy tracking-tighter opacity-100">404</span>
          </div>
          <div className="absolute -bottom-2 right-0 bg-hitm-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white animate-bounce">
            LOST?
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black font-serif text-gray-900 mb-4 leading-tight">
          Oops! You&apos;ve Wandered <br/>Off-Campus.
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          The page you are looking for has been moved or graduated. Let&apos;s get you back to the right classroom.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="default" size="lg" className="h-14 px-8 bg-hitm-navy hover:bg-hitm-red text-white font-bold rounded-xl shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Home size={20} /> Return to Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="h-14 px-8 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft size={20} /> Go Back One Step
            </span>
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <Link href="/admissions" className="text-sm font-bold text-hitm-red hover:underline">Admissions</Link>
            <Link href="/programs" className="text-sm font-bold text-hitm-red hover:underline">Our Programs</Link>
            <Link href="/contact" className="text-sm font-bold text-hitm-red hover:underline">Help Desk</Link>
          </div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} AHCT Ranchi | <span className="text-hitm-navy">Academic Excellence</span>
          </p>
        </div>
      </div>
    </div>
  );
}
