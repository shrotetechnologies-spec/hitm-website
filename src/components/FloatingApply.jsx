'use client';
import Link from 'next/link';

export default function FloatingApply() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-1 items-end pointer-events-none">
      {/* UG Button */}
      <Link 
        href="/admissions/apply" 
        className="pointer-events-auto w-16 md:w-20 bg-[#e67e22] text-white flex flex-col items-center justify-center p-2 rounded-l-md shadow-lg hover:pr-4 transition-all duration-300 border-b border-white/20"
      >
        <span className="text-[12px] md:text-[14px] font-black leading-none uppercase">UG</span>
        <span className="text-[6px] md:text-[8px] font-bold uppercase tracking-tight text-center leading-tight mt-1">APPLY<br/>NOW</span>
      </Link>

      {/* PG Button */}
      {/* <Link 
        href="/admissions/apply" 
        className="pointer-events-auto w-16 md:w-20 bg-[#e67e22] text-white flex flex-col items-center justify-center p-2 rounded-l-md shadow-lg hover:pr-4 transition-all duration-300 border-b border-white/20"
      >
        <span className="text-[12px] md:text-[14px] font-black leading-none uppercase">PG</span>
        <span className="text-[6px] md:text-[8px] font-bold uppercase tracking-tight text-center leading-tight mt-1">APPLY<br/>NOW</span>
      </Link> */}

      {/* MBA Button */}
      <Link 
        href="/admissions/apply" 
        className="pointer-events-auto w-16 md:w-20 bg-[#e67e22] text-white flex flex-col items-center justify-center p-2 rounded-l-md shadow-lg hover:pr-4 transition-all duration-300"
      >
        <span className="text-[12px] md:text-[14px] font-black leading-none uppercase">MBA</span>
        <span className="text-[6px] md:text-[8px] font-bold uppercase tracking-tight text-center leading-tight">2026</span>
        <span className="text-[6px] md:text-[8px] font-bold uppercase tracking-tight text-center leading-tight mt-0.5">APPLY<br/>NOW</span>
      </Link>

      {/* Enquire Now Circle */}
      {/* <Link 
        href="/contact" 
        className="pointer-events-auto mt-8 mr-2 w-16 h-16 md:w-20 md:h-20 bg-[#004b93] text-white rounded-full flex items-center justify-center p-3 text-center shadow-2xl hover:scale-110 transition-transform border-[3px] border-white/20"
      >
        <span className="text-[10px] md:text-[12px] font-bold uppercase leading-tight tracking-tighter">Enquire<br/>Now</span>
      </Link> */}
    </div>
  );
}
