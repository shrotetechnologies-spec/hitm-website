'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, Calendar, Image as ImageIcon, MapPin, ChevronDown, Menu, X,
  BookOpen, GraduationCap, Users, Building2, Trophy, Briefcase,
  Bell, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const navItems = [
  {
    label: 'About', icon: <Building2 size={16} />,
    children: [
      { label: 'AHCT Overview', href: '#' },
      { label: 'Vision & Mission', href: '#' },
      { label: 'Governing Body', href: '/about/governing-body' },
      { label: "Director's Message", href: '#' },
      { label: 'Awards & Achievements', href: '#' },
      { label: 'NAAC Accreditation', href: '#' },
      { label: 'NIRF Ranking', href: '#' },
      { label: 'Our Faculty', href: '/about/faculty' },
      { label: 'Anti Ragging', href: '#' },
    ],
  },
  {
    label: 'Programs', icon: <BookOpen size={16} />,
    children: [
      { label: 'B.Tech (CSE)', href: '#' },
      { label: 'B.Tech (Mechanical)', href: '#' },
      { label: 'B.Tech (EEE)', href: '#' },
      { label: 'BCA', href: '#' },
      { label: 'MCA', href: '#' },
      { label: 'MBA', href: '#' },
      { label: 'BBA', href: '#' },
    ],
  },
  {
    label: 'Academics', icon: <GraduationCap size={16} />,
    children: [
      { label: 'Academic Calendar', href: '#' },
      { label: 'Examinations', href: '#' },
      { label: 'Syllabus', href: '/academics/syllabus' },
      { label: 'Library', href: '#' },
      { label: 'E-Learning', href: '#' },
      { label: 'Scholarships', href: '#' },
    ],
  },
  {
    label: 'Admissions', icon: <Users size={16} />,
    children: [
      { label: 'How to Apply', href: '/admissions/apply' },
      { label: 'Eligibility Criteria', href: '#' },
      { label: 'Course Fee', href: '/admissions/fee' },
      { label: 'Scholarship', href: '#' },
      { label: 'Download Brochure', href: '#' },
    ],
  },
  {
    label: 'Campus Life', icon: <Trophy size={16} />,
    children: [
      { label: 'Photo Gallery', href: '#' },
      { label: 'Events & Fests', href: '#' },
      { label: 'Campus Facilities', href: '/campus/facilities' },
      { label: 'Clubs & Centers', href: '#' },
      { label: 'Sports', href: '#' },
      { label: 'NSS/NCC', href: '#' },
    ],
  },
  {
    label: 'Placement', icon: <Briefcase size={16} />,
    children: [
      { label: 'Placement Overview', href: '#' },
      { label: 'Top Recruiters', href: '#' },
      { label: 'Placement Stats', href: '#' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Sleek Top Banner */}
      <div className="bg-hitm-navy text-gray-300 text-[10px] uppercase tracking-widest py-1.5 border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6 font-semibold">
            <a href="tel:0001119889" className="flex items-center gap-2 hover:text-hitm-gold transition-colors">
              <Phone size={12} className="text-hitm-gold" /> Admissions: 000-111-9889
            </a>
            <a href="mailto:support@ahctranchi.com" className="flex items-center gap-2 hover:text-hitm-gold transition-colors">
              <Mail size={12} className="text-hitm-gold" /> support@ahctranchi.com
            </a>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/notice" className="flex items-center gap-2 hover:text-hitm-gold transition-colors">
              <Bell size={12} className="text-hitm-gold" /> Notice Board
            </Link>
            <Link href="/academics/calendar" className="flex items-center gap-2 hover:text-hitm-gold transition-colors">
              <Calendar size={12} className="text-hitm-gold" /> Calendar
            </Link>
            <Link href="/campus/gallery" className="flex items-center gap-2 hover:text-hitm-gold transition-colors">
              <ImageIcon size={12} className="text-hitm-gold" /> Gallery
            </Link>
            <Link href="/contact" className="flex items-center gap-2 hover:text-hitm-gold transition-colors">
              <MapPin size={12} className="text-hitm-gold" /> Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={cn(
        "bg-white sticky top-0 z-50 transition-all duration-300",
        scrolled ? "shadow-xl py-1" : "shadow-md py-3 md:py-4"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">

            {/* Premium Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-lg bg-hitm-navy flex items-center justify-center text-white font-black text-xl md:text-2xl font-serif shadow-inner border-[3px] border-hitm-gold overflow-hidden relative">
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">A</span>
                <div className="absolute inset-0 bg-hitm-red translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-black text-hitm-navy uppercase tracking-tighter leading-none group-hover:text-hitm-red transition-colors flex items-center gap-1">
                  AHCT <span className="font-light text-gray-400">Ranchi</span>
                </h2>
                <span className="text-[8px] md:text-[10px] font-bold text-hitm-gold uppercase mt-1" style={{ letterSpacing: '0.1em' }}>Al Haider College of Technology</span>
              </div>
            </Link>

            {/* Desktop Navigation - Premium Underline Style */}
            <ul className="hidden xl:flex items-center gap-2 mt-1">
              {navItems.map((item) => (
                <li key={item.label} className="relative group">
                  <span className="flex items-center gap-1.5 px-3 py-6 text-[13px] font-bold text-hitm-navy uppercase tracking-wide cursor-pointer transition-colors group-hover:text-hitm-red">
                    {item.label}
                    <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180 text-hitm-gold" />
                    {/* Animated bottom border */}
                    <span className="absolute bottom-0 left-0 w-full h-[4px] bg-hitm-red rounded-t-md opacity-0 group-hover:opacity-100 transition-all scale-x-0 group-hover:scale-x-100 origin-center" />
                  </span>

                  {/* Elegant Dropdown */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-3 min-w-[260px] overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hitm-gold to-hitm-red" />
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="group/link flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-hitm-navy hover:bg-gray-50 rounded-lg transition-all"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-hitm-red group-hover/link:scale-150 transition-all" />
                          <span className="group-hover/link:translate-x-1 transition-transform">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              <li className="relative group">
                <Link href="/career" className="flex items-center gap-1.5 px-3 py-6 text-[13px] font-bold text-hitm-navy uppercase tracking-wide transition-colors group-hover:text-hitm-red">
                  Career
                  <span className="absolute bottom-0 left-0 w-full h-[4px] bg-hitm-red rounded-t-md opacity-0 group-hover:opacity-100 transition-all scale-x-0 group-hover:scale-x-100 origin-center" />
                </Link>
              </li>
            </ul>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Button asChild variant="default" size="default" className="hidden md:flex bg-hitm-navy hover:bg-hitm-red text-white uppercase tracking-widest text-xs font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <Link href="/admissions/apply" className="flex items-center gap-2">Apply 2026 <ArrowRight size={14} /></Link>
              </Button>
              <button
                id="hamburger-btn"
                className="xl:hidden p-2 rounded-lg bg-gray-100 hover:bg-hitm-red hover:text-white transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-hitm-navy/80 backdrop-blur-sm z-[60] xl:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Modern Mobile Menu Drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[70] shadow-2xl xl:hidden transition-transform duration-500 overflow-y-auto flex flex-col",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="bg-gradient-to-r from-hitm-navy to-[#0F2547] px-6 py-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Building2 size={150} />
          </div>
          <div className="relative z-10">
            <h3 className="text-white font-black font-serif text-2xl tracking-tight">AHCT RANCHI</h3>
            <p className="text-hitm-gold font-bold text-[10px] uppercase tracking-widest mt-1">Al Haider College of Technology</p>
          </div>
          <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/10 hover:bg-hitm-red rounded-full p-2 transition-colors z-20">
            <X size={20} />
          </button>
        </div>

        <ul className="py-4 flex-1">
          {navItems.map((item) => (
            <li key={item.label} className="border-b border-gray-100 px-4">
              <button
                className="w-full flex justify-between items-center py-4 text-sm font-bold text-hitm-navy uppercase tracking-wide hover:text-hitm-red transition-colors"
                onClick={() => setOpenMobileItem(openMobileItem === item.label ? null : item.label)}
              >
                <span className="flex items-center gap-3"><span className="text-hitm-gold">{item.icon}</span>{item.label}</span>
                <ChevronDown size={16} className={cn("transition-transform text-gray-400", openMobileItem === item.label && "rotate-180 text-hitm-red")} />
              </button>
              <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openMobileItem === item.label ? "max-h-[800px] opacity-100 mb-4" : "max-h-0 opacity-0")}>
                <div className="bg-gray-50 rounded-xl p-2 border border-gray-100 space-y-1">
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-hitm-red hover:bg-white rounded-lg transition-colors shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-hitm-gold" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
          <li className="px-4">
            <Link href="/career" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-4 text-sm font-bold text-hitm-navy uppercase tracking-wide hover:text-hitm-red transition-colors">
              <span className="text-hitm-gold"><Briefcase size={16} /></span> Career
            </Link>
          </li>
        </ul>

        <div className="p-6 border-t bg-gray-50 mt-auto shadow-inner">
          <Button asChild variant="default" className="w-full bg-hitm-red hover:bg-hitm-navy text-white h-12 uppercase tracking-widest text-sm font-bold shadow-xl" onClick={() => setMobileOpen(false)}>
            <Link href="/admissions/apply">Apply Now 2026</Link>
          </Button>
          <div className="mt-4 text-center pb-2">
            <p className="text-xs font-semibold text-gray-400">Call Admissions: 000-111-9889</p>
          </div>
        </div>
      </div>
    </>
  );
}
