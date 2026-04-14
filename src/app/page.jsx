'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap, Trophy, Users, Building2, ArrowRight, Star,
  ChevronRight, BookOpen, Award, Briefcase, Globe, Target,
  Phone, Calendar, Clock, Bell, CheckCircle, Play
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// ── Hero Slides ─────────────────────────────────────────────────────────────
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600',
    badge: 'Admissions Open 2026',
    title: 'Launching a New Era of Excellence in Ranchi',
    subtitle: "AHCT Ranchi — Opening Doors on April 20, 2026. Join Jharkhand's most futuristic institute for Engineering, Management &amp; Technology.",
  },
  {
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600',
    badge: 'Opening April 20, 2026',
    title: 'World-Class Infrastructure & Expert Faculty',
    subtitle: 'Designed for the future, AHCT Ranchi provides an environment where innovation meets ambition. Be the first to join our pioneer batch.',
  },
  {
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600',
    badge: 'Premier Campus in Jharkhand',
    title: 'Your Future Begins at AHCT Ranchi',
    subtitle: 'With 200+ global industry tie-ups, we ensure our students are ready for the global stage from day one.',
  },
];

const stats = [
  { icon: <Calendar size={24} />, number: 'April 20', label: 'Grand Opening' },
  { icon: <Users size={24} />, number: '1440+', label: 'Seat Capacity' },
  { icon: <BookOpen size={24} />, number: '16+', label: 'Approved Courses' },
  { icon: <Building2 size={24} />, number: '2.48', label: 'Acres Campus' },
];

const programs = [
  { icon: <BookOpen className="text-white" size={24} />, name: 'B.Tech Programs', desc: '4-Year Undergraduate Engineering (360 Seats)', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', courses: ['CSE (120)', 'EEE (60)', 'Civil (60)', 'Mechanical (60)', 'AI (30)', 'Data Science (30)'] },
  { icon: <Briefcase className="text-white" size={24} />, name: 'Diploma Programs', desc: '3-Year Polytechnic Diploma (360 Seats)', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', courses: ['CSE (120)', 'EEE (60)', 'Civil (60)', 'Mechanical (60)', 'AI (30)', 'Data Science (30)'] },
  { icon: <GraduationCap className="text-white" size={24} />, name: 'Computer Applications', desc: 'UG &amp; PG Programs (360 Seats)', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800', courses: ['BCA (180)', 'MCA (180)'] },
  { icon: <Award className="text-white" size={24} />, name: 'Management Studies', desc: 'UG &amp; PG Programs (360 Seats)', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800', courses: ['BBA (180)', 'MBA (180)'] },
];

// Notices and Events are now handled dynamically inside HomePage component

const testimonials = [
  {
    text: 'AHCT Ranchi is exactly what Jharkhand needed — a forward-thinking institute with world-class facilities and a curriculum designed for the 2026 industry standards.',
    name: 'Dr. Ramesh Singh', role: 'Education Consultant', stars: 5, avatar: 'https://i.pravatar.cc/150?u=hitm1',
  },
  {
    text: "The commitment to innovation and student-centric learning is evident in every aspect of AHCT. Im excited to see the first batch of pioneers graduate.",
    name: 'Sonal Verma', role: 'Industry Expert', stars: 5, avatar: 'https://i.pravatar.cc/150?u=hitm2',
  },
  {
    text: 'A campus that rivals the best in the country. AHCT is set to redefine technical and management education in the region.',
    name: 'Amit Kumar', role: 'Tech Visionary', stars: 5, avatar: 'https://i.pravatar.cc/150?u=hitm3',
  },
];

const recruiters = [
  // IT & Tech
  { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
  { name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
  { name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
  { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
  // Core Engineering (ME/CE/EE)
  { name: 'L&T', logo: 'https://logo.clearbit.com/larsentoubro.com' },
  { name: 'Tata Motors', logo: 'https://logo.clearbit.com/tatamotors.com' },
  { name: 'Siemens', logo: 'https://logo.clearbit.com/siemens.com' },
  { name: 'Bosch', logo: 'https://logo.clearbit.com/bosch.com' },
  { name: 'Ashoka Buildcon', logo: 'https://logo.clearbit.com/ashokabuildcon.com' },
  // Management & Finance
  { name: 'Deloitte', logo: 'https://logo.clearbit.com/deloitte.com' },
  { name: 'ICICI Bank', logo: 'https://logo.clearbit.com/icicibank.com' },
  { name: 'HDFC Bank', logo: 'https://logo.clearbit.com/hdfcbank.com' },
  { name: 'KPMG', logo: 'https://logo.clearbit.com/kpmg.com' },
  { name: 'EY', logo: 'https://logo.clearbit.com/ey.com' },
];

const quickLinks = [
  { icon: <Bell size={18} />, label: 'Apply Online', href: '/admissions/apply' },
  { icon: <BookOpen size={18} />, label: 'Notice Board', href: '/notice' },
  { icon: <Briefcase size={18} />, label: 'Fee Payment', href: '/admissions/fee' },
  { icon: <Trophy size={18} />, label: 'Photo Gallery', href: '/campus/gallery' },
  { icon: <Award size={18} />, label: 'Scholarships', href: '/academics/scholarships' },
  { icon: <Building2 size={18} />, label: 'Campus Tour', href: '/campus' },
  { icon: <Phone size={18} />, label: 'Contact Us', href: '/contact' },
  { icon: <Calendar size={18} />, label: 'Download Brochure', href: '/admissions/brochures' },
];

// ── Hero Slider ──────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);
  const slide = heroSlides[current];

  return (
    <section className="relative h-[calc(100vh-100px)] min-h-[580px] overflow-hidden">
      {heroSlides.map((s, i) => (
        <div key={i} className={cn("absolute inset-0 transition-opacity duration-1000", i === current ? "opacity-100" : "opacity-0")}>
          <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-hitm-navy/80 to-hitm-red/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <Badge variant="gold" className="mb-5 text-sm px-4 py-1.5 font-semibold uppercase tracking-wider">
              <GraduationCap size={14} className="mr-1.5" /> {slide.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-5 font-serif drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-white/85 text-lg mb-8 leading-relaxed max-w-xl">{slide.subtitle}</p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild variant="gold" size="lg" className="shadow-xl">
                <Link href="/admissions/apply">Apply Now 2026 <ArrowRight size={18} /></Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 hover:text-white hover:border-white">
                <Link href="/about" className="flex items-center gap-2"><Play size={16} /> Know More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex gap-8 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
        {stats.map((s) => (
          <div key={s.label} className="text-center text-white">
            <div className="text-hitm-gold text-2xl font-black font-serif">{s.number}</div>
            <div className="text-xs text-white/75 uppercase tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-4 lg:bottom-36 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={cn("h-2.5 rounded-full border-none transition-all cursor-pointer", i === current ? "w-8 bg-hitm-gold" : "w-2.5 bg-white/50")}
          />
        ))}
      </div>
    </section>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [enquiry, setEnquiry] = useState({ name: '', phone: '', program: '' });
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!db) return;
    // Real-time Notices
    const qNotices = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubNotices = onSnapshot(qNotices, (snapshot) => {
      setNotices(snapshot.docs.map(doc => {
        const data = doc.data();
        const dateObj = data.date ? new Date(data.date) : new Date();
        return {
          id: doc.id,
          ...data,
          day: dateObj.getDate().toString().padStart(2, '0'),
          month: dateObj.toLocaleString('default', { month: 'short' })
        };
      }));
    });

    // Real-time Events
    const qEvents = query(collection(db, 'events'), orderBy('date', 'asc'));
    const unsubEvents = onSnapshot(qEvents, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => { unsubNotices(); unsubEvents(); };
  }, []);

  const handleEnquiry = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry),
      });
      alert('Enquiry submitted! We will contact you shortly.');
      setEnquiry({ name: '', phone: '', program: '' });
    } catch (err) {
      alert('Thank you! We will contact you shortly.');
    }
  };

  return (
    <main>
      <Navbar />

      {/* Marquee */}
      <div className="bg-hitm-red py-2.5 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].flatMap(() => [
            '📣 Admissions Open for 2026-27 Academic Year',
            '🏆 AHCT Ranchi is set to achieve record placement rates',
            '💼 Campus drive registrations starting soon',
            '🎉 TechFest HITMX 2026 registrations open',
            '🎓 Apply now for Scholarship 2026 – Last date: April 30',
            '🛡️ Anti-ragging helpline: 1800-180-5522',
            '🚀 New B.Tech in AI & ML starting April 2026',
          ]).map((text, i) => (
            <span key={i} className="inline-block px-12 text-white/90 text-sm font-medium">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <HeroSlider />

      {/* Quick Links */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {quickLinks.map((ql) => (
              <Link key={ql.label} href={ql.href}
                className="flex items-center gap-2.5 bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-hitm-red hover:text-hitm-red hover:bg-hitm-red/5 transition-all hover:-translate-y-1 hover:shadow-sm">
                <span className="text-hitm-red">{ql.icon}</span>
                {ql.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full h-[480px] bg-gray-100 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800" alt="HITM Campus" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/60 to-transparent" />
              </div>
              <Card className="absolute -bottom-5 -right-5 shadow-xl bg-hitm-red text-white border-none">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-black font-serif">2026</div>
                  <div className="text-xs text-white/75 mt-1">Founding Year</div>
                </CardContent>
              </Card>
            </div>

            <div>
              <p className="text-hitm-red font-semibold text-sm uppercase tracking-widest mb-3">Welcome to AHCT Ranchi</p>
              <h2 className="text-4xl font-black font-serif text-gray-900 mb-5 leading-tight">A New Landmark in Higher Education</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Al Haider College of Technology (AHCT Ranchi) is set to redefine the educational landscape of Jharkhand.
                Opening on April 20, 2026, we are a futuristic institution dedicated to excellence in Engineering, Management, and Technology.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to empower the first generation of AHCT pioneers with cutting-edge skills, global industry exposure, and a spirit of innovation that prepares them for the challenges of tomorrow.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Trophy size={20} />, title: 'NAAC Accredited', desc: 'Grade A+ Institution' },
                  { icon: <Users size={20} />, title: '200+ Expert Faculty', desc: 'Industry veterans' },
                  { icon: <Building2 size={20} />, title: '2.48 Acre Campus', desc: 'Modern infrastructure' },
                  { icon: <Globe size={20} />, title: '200+ Industry Tie-ups', desc: 'Global partnerships' },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl bg-hitm-red/5 border border-hitm-red/10">
                    <div className="w-10 h-10 rounded-lg bg-hitm-red/10 flex items-center justify-center text-hitm-red shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{f.title}</p>
                      <p className="text-xs text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button asChild variant="default" size="lg">
                  <Link href="/about">Know More <ArrowRight size={16} /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/admissions/apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-gradient-to-r from-hitm-red to-hitm-navy py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Calendar size={28} />, number: '20 April', label: 'Inauguration' },
              { icon: <Users size={28} />, number: '500+', label: 'Expected First Batch' },
              { icon: <BookOpen size={28} />, number: '50+', label: 'Modern Programs' },
              { icon: <Building2 size={28} />, number: '200+', label: 'Industry Alliances' },
            ].map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="text-hitm-gold mb-2 flex justify-center">{s.icon}</div>
                <div className="text-4xl font-black font-serif text-hitm-gold">{s.number}</div>
                <div className="text-sm text-white/75 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Programs Offered</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Explore our diverse range of diploma, undergraduate, and postgraduate programs designed for the future.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((p, i) => (
              <Card key={i} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-gray-200 hover:border-hitm-red/30 overflow-hidden flex flex-col">
                <div className="h-64 w-full relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-5 w-12 h-12 rounded-xl bg-gradient-to-br from-hitm-red to-hitm-navy flex items-center justify-center shadow-lg border border-hitm-red/20 group-hover:-translate-y-1 transition-transform duration-300 z-10">
                    {p.icon}
                  </div>
                </div>
                <CardHeader className="pt-6">
                  <CardTitle className="text-lg font-bold text-gray-900">{p.name}</CardTitle>
                  <CardDescription className="text-gray-500 leading-relaxed mt-1">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-2">
                    {p.courses.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs bg-gray-100/80 hover:bg-hitm-red hover:text-white transition-colors text-gray-700 border-gray-200">{c}</Badge>
                    ))}
                  </div>
                  <Link href="/programs" className="mt-auto inline-flex items-center gap-1.5 text-hitm-red font-semibold text-sm hover:gap-3 transition-all px-1 py-2 rounded">
                    Explore Program <ArrowRight size={14} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notice + Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold font-serif mb-5 flex items-center gap-2">
                <Bell className="text-hitm-red" size={22} /> Notice Board
              </h2>
              <Card className="relative h-[420px] overflow-hidden bg-white group">
                <div className="absolute w-full animate-marquee-vertical group-hover:[animation-play-state:paused] flex flex-col">
                  {[...notices, ...notices].map((n, i) => (
                    <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100">
                      <div className="bg-hitm-red text-white rounded-lg p-2.5 text-center min-w-[52px] shrink-0 h-fit shadow-sm">
                        <div className="text-xl font-black leading-none">{n.day}</div>
                        <div className="text-[10px] text-white/80 uppercase mt-0.5">{n.month}</div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800 group-hover:text-hitm-red transition-colors">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.dept}</p>
                        <Badge variant="gold" className="mt-1.5 text-[10px]">{n.tag}</Badge>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-hitm-red shrink-0 mt-1 transition-colors" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-5 flex items-center gap-2">
                <Calendar className="text-hitm-navy" size={22} /> Events
              </h2>
              <Card className="overflow-hidden shadow-lg mb-5">
                <div className="bg-hitm-navy px-5 py-3 flex justify-between items-center">
                  <span className="text-white font-semibold text-sm">Upcoming Events</span>
                  <Link href="/campus/events" className="text-white/75 text-xs flex items-center gap-1 hover:text-white">
                    View All <ChevronRight size={12} />
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {events.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-hitm-navy/10 flex items-center justify-center text-hitm-navy shrink-0">
                        {e.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800 leading-tight">{e.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <Calendar size={11} /> {e.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* CTA card */}
              <div className="bg-gradient-to-br from-hitm-red to-hitm-navy rounded-2xl p-5 text-white text-center">
                <GraduationCap size={36} className="mx-auto mb-2 text-hitm-gold" />
                <h4 className="font-bold font-serif mb-1">Ready to Join?</h4>
                <p className="text-white/75 text-xs mb-4">Apply for 2026-27 admissions.</p>
                <Button asChild variant="gold" size="sm" className="w-full">
                  <Link href="/admissions/apply">Apply Now →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2 className="!text-white">Campus Life at <span className="text-hitm-gold">HITM</span></h2>
            <p className="text-gray-400 mt-4">Experience the vibrant campus life with world-class facilities.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[400px]">
            {[
              { label: 'Main Campus', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800', className: 'col-span-2 row-span-2' },
              { label: 'Computer Lab', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400' },
              { label: 'Library', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400' },
              { label: 'Sports Ground', image: 'https://images.unsplash.com/photo-1461896836934-ffe607fa8211?auto=format&fit=crop&q=80&w=400' },
              { label: 'TechFest 2026', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400' },
            ].map((item, i) => (
              <div key={i} className={cn("relative overflow-hidden rounded-xl cursor-pointer group bg-gray-800", item.className)}>
                <img src={item.image} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-hitm-red/90 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-white font-semibold text-sm drop-shadow-md">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline" className="border-white/20 text-white hover:text-white hover:bg-white/10 hover:border-white/40">
              <Link href="/campus/gallery">View Full Gallery <ArrowRight size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Voices of Vision</h2>
            <p className="text-gray-500 mt-4">Hear from the experts and visionaries behind AHCT Ranchi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-hitm-red rounded-l-xl" />
                <CardContent className="pt-6">
                  <div className="flex text-hitm-gold mb-3">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 text-sm italic leading-relaxed mb-5">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-hitm-gold object-cover shrink-0 shadow-sm" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Enquiry CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-hitm-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="gold" className="mb-4">Admissions 2026</Badge>
            <h2 className="text-4xl font-black font-serif text-white mt-3">Start Your Application Today</h2>
            <p className="text-gray-400 mt-3">Fill in a quick form and our admissions team will contact you within 24 hours.</p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center">Quick Enquiry Form</CardTitle>
              <CardDescription className="text-center">We will contact you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEnquiry} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Full Name *</label>
                  <input type="text" required placeholder="Your full name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-hitm-red outline-none"
                    value={enquiry.name} onChange={e => setEnquiry({ ...enquiry, name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Mobile Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-hitm-red outline-none"
                    value={enquiry.phone} onChange={e => setEnquiry({ ...enquiry, phone: e.target.value })} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">Program of Interest *</label>
                  <select required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-hitm-red outline-none"
                    value={enquiry.program} onChange={e => setEnquiry({ ...enquiry, program: e.target.value })}>
                    <option value="">Select Program</option>
                    {['B.Tech CSE', 'B.Tech AI', 'B.Tech Data Science', 'B.Tech Electrical', 'B.Tech EEE', 'B.Tech ECE', 'B.Tech Mechanical', 'B.Tech Civil', 'Diploma CSE', 'Diploma Data Science', 'Diploma AI', 'Diploma Mechanical', 'Diploma Civil', 'Diploma Electrical', 'Diploma EEE', 'Diploma ECE', 'MBA', 'MCA', 'BCA', 'BBA'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <Button type="submit" variant="default" size="lg" className="md:col-span-2 w-full">
                  Submit Enquiry <ArrowRight size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Recruiters */}
      <section className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">Our Placement Partners &amp; Top Recruiters</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {recruiters.map((r) => (
              <div key={r.name} className="group relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-1">
                <div className="h-12 w-32 md:w-40 flex items-center justify-center p-2">
                   <img 
                     src={r.logo} 
                     alt={r.name} 
                     className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all" 
                     onError={(e) => {
                       e.target.style.display = 'none';
                       e.target.nextSibling.style.display = 'block';
                     }}
                   />
                   <span className="hidden text-[10px] font-black text-gray-400 uppercase tracking-tighter text-center leading-tight">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
