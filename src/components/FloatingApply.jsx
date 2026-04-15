'use client';
import Link from 'next/link';

const floatingButtons = [
  { label: 'UG', course: 'B.Tech' },
  { label: 'PG', course: 'MBA' },
  { label: 'Diploma', course: 'Diploma' },
];

export default function FloatingApply() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-[2px] items-end pointer-events-none">
      {floatingButtons.map((btn) => (
        <Link
          key={btn.label}
          href={`/admissions/apply?form=1&course=${encodeURIComponent(btn.course)}`}
          className="pointer-events-auto w-16 md:w-20 bg-[#e67e22] text-white flex flex-col items-center justify-center py-2.5 px-1 rounded-l-md shadow-lg hover:w-20 md:hover:w-24 transition-all duration-300 group border-b border-white/20"
        >
          <span className="text-[11px] md:text-[13px] font-black leading-none uppercase tracking-tight">{btn.label}</span>
          <span className="text-[5px] md:text-[7px] font-bold uppercase tracking-tight text-center leading-tight mt-1 text-white/80 group-hover:text-white">APPLY{'\n'}NOW</span>
        </Link>
      ))}
    </div>
  );
}
