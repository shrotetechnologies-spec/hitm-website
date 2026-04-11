'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, Calendar, Image, MapPin, ChevronDown, Menu, X,
  BookOpen, GraduationCap, Users, Building2, Trophy, Briefcase,
  ChevronRight, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'About', icon: <Building2 size={14} />,
    children: [
      { label: 'HITM Overview', href: '/about' },
      { label: 'Vision & Mission', href: '/about/vision-mission' },
      { label: "Chancellor's Message", href: '/about/chancellor-message' },
      { label: "Director's Message", href: '/about/director-message' },
      { label: 'Awards & Achievements', href: '/about/awards' },
      { label: 'NAAC Accreditation', href: '/about/naac' },
      { label: 'NIRF Ranking', href: '/about/nirf' },
      { label: 'Anti Ragging', href: '/about/anti-ragging' },
    ],
  },
  {
    label: 'Programs', icon: <BookOpen size={14} />,
    children: [
      { label: 'B.Tech (CSE)', href: '/programs/btech-cse' },
      { label: 'B.Tech (Mechanical)', href: '/programs/btech-mechanical' },
      { label: 'B.Tech (EEE)', href: '/programs/btech-eee' },
      { label: 'BCA', href: '/programs/bca' },
      { label: 'MCA', href: '/programs/mca' },
      { label: 'MBA', href: '/programs/mba' },
      { label: 'BBA', href: '/programs/bba' },
      { label: 'B.Com (Hons.)', href: '/programs/bcom' },
      { label: 'LLB (Hons.)', href: '/programs/llb' },
      { label: 'Ph.D Programs', href: '/programs/phd' },
    ],
  },
  {
    label: 'Academics', icon: <GraduationCap size={14} />,
    children: [
      { label: 'Academic Calendar', href: '/academics/calendar' },
      { label: 'Examinations', href: '/academics/examinations' },
      { label: 'Syllabus', href: '/academics/syllabus' },
      { label: 'Library', href: '/academics/library' },
      { label: 'E-Learning', href: '/academics/e-learning' },
      { label: 'Scholarships', href: '/academics/scholarships' },
    ],
  },
  {
    label: 'Admissions', icon: <Users size={14} />,
    children: [
      { label: 'How to Apply', href: '/admissions/how-to-apply' },
      { label: 'Eligibility Criteria', href: '/admissions/eligibility' },
      { label: 'Course Fee', href: '/admissions/fee' },
      { label: 'Scholarship', href: '/admissions/scholarship' },
      { label: 'Download Brochure', href: '/admissions/brochures' },
    ],
  },
  {
    label: 'Campus Life', icon: <Trophy size={14} />,
    children: [
      { label: 'Photo Gallery', href: '/campus/gallery' },
      { label: 'Events & Fests', href: '/campus/events' },
      { label: 'Clubs & Centers', href: '/campus/clubs' },
      { label: 'Sports', href: '/campus/sports' },
      { label: 'NSS/NCC', href: '/campus/nss-ncc' },
    ],
  },
  {
    label: 'Placement', icon: <Briefcase size={14} />,
    children: [
      { label: 'Placement Overview', href: '/placement' },
      { label: 'Top Recruiters', href: '/placement/recruiters' },
      { label: 'Placement Stats', href: '/placement/statistics' },
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
      {/* Top Banner */}
      <div className="bg-hitm-red text-white text-xs py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+916512345678" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Phone size={12} /> Admission: 0651-234-5678
            </a>
            <a href="tel:+916519876543" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Phone size={12} /> Helpline: 0651-987-6543
            </a>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/notice" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Bell size={12} /> Notice Board
            </Link>
            <Link href="/academics/calendar" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Calendar size={12} /> Academic Calendar
            </Link>
            <Link href="/campus/gallery" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Image size={12} /> Gallery
            </Link>
            <Link href="/contact" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <MapPin size={12} /> Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={cn(
        "bg-white sticky top-0 z-50 transition-all duration-300",
        scrolled ? "shadow-lg" : "shadow-sm"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-hitm-red to-hitm-navy flex items-center justify-center text-white font-black text-2xl font-serif shadow-md group-hover:shadow-lg transition-all">
                H
              </div>
              <div>
                <h2 className="text-lg font-bold text-hitm-red font-serif leading-tight">HITM Ranchi</h2>
                <span className="text-[10px] text-gray-400 font-sans">Holistic Institute of Technology & Management</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden xl:flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.label} className="relative group">
                  <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-md cursor-pointer hover:text-hitm-red hover:bg-hitm-red/5 transition-all">
                    {item.label}
                    <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />
                  </span>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] border-t-2 border-t-hitm-red">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-hitm-red hover:bg-hitm-red/5 hover:pl-5 transition-all"
                        >
                          <ChevronRight size={12} className="text-hitm-red opacity-0 group/link-hover:opacity-100" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              <li>
                <Link href="/career" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-hitm-red hover:bg-hitm-red/5 transition-all">
                  Career
                </Link>
              </li>
            </ul>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Button asChild variant="default" size="sm" className="hidden md:flex animate-pulse-ring">
                <Link href="/admissions/apply">Apply 2026</Link>
              </Button>
              <button
                id="hamburger-btn"
                className="xl:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] xl:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-[85%] max-w-[380px] bg-white z-[70] shadow-2xl xl:hidden transition-transform duration-300 overflow-y-auto",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="bg-hitm-red px-4 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold font-serif text-base">HITM Ranchi</h3>
            <p className="text-white/70 text-xs">Navigation Menu</p>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-white hover:bg-white/20 rounded-md p-1 transition-colors">
            <X size={22} />
          </button>
        </div>

        <ul className="py-2">
          {navItems.map((item) => (
            <li key={item.label} className="border-b border-gray-100">
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-gray-800 hover:text-hitm-red"
                onClick={() => setOpenMobileItem(openMobileItem === item.label ? null : item.label)}
              >
                <span className="flex items-center gap-2">{item.icon}{item.label}</span>
                <ChevronDown size={14} className={cn("transition-transform", openMobileItem === item.label && "rotate-180")} />
              </button>
              {openMobileItem === item.label && (
                <div className="bg-gray-50 py-1 pl-8 pr-4">
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-hitm-red transition-colors">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li className="border-b border-gray-100">
            <Link href="/career" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-800 hover:text-hitm-red">
              <Briefcase size={14} /> Career
            </Link>
          </li>
        </ul>

        <div className="p-4 border-t">
          <Button asChild variant="default" className="w-full" onClick={() => setMobileOpen(false)}>
            <Link href="/admissions/apply">Apply Now 2026 →</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
