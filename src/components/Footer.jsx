import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  quickLinks: [
    { label: 'About HITM', href: '/about' },
    { label: 'All Programs', href: '/programs' },
    { label: 'Apply Online', href: '/admissions/apply' },
    { label: 'Academic Calendar', href: '/academics/calendar' },
    { label: 'Placement', href: '/placement' },
    { label: 'Photo Gallery', href: '/campus/gallery' },
    { label: 'Notice Board', href: '/notice' },
    { label: 'Career', href: '/career' },
  ],
  programs: [
    { label: 'B.Tech (CSE)', href: '/programs/btech-cse' },
    { label: 'B.Tech (Mechanical)', href: '/programs/btech-mechanical' },
    { label: 'BCA', href: '/programs/bca' },
    { label: 'MCA', href: '/programs/mca' },
    { label: 'MBA', href: '/programs/mba' },
    { label: 'BBA', href: '/programs/bba' },
    { label: 'B.Com (Hons.)', href: '/programs/bcom' },
    { label: 'Ph.D Programs', href: '/programs/phd' },
  ],
};

const socialLinks = [
  { icon: <FaFacebookF size={16} />, href: '#', label: 'Facebook', className: 'bg-[#1877F2]' },
  { icon: <FaTwitter size={16} />, href: '#', label: 'Twitter', className: 'bg-[#1DA1F2]' },
  { icon: <FaInstagram size={16} />, href: '#', label: 'Instagram', className: 'bg-gradient-to-br from-[#f09433] to-[#bc1888]' },
  { icon: <FaYoutube size={16} />, href: '#', label: 'YouTube', className: 'bg-[#FF0000]' },
  { icon: <FaLinkedinIn size={16} />, href: '#', label: 'LinkedIn', className: 'bg-[#0A66C2]' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hitm-red to-hitm-navy flex items-center justify-center text-white font-black text-xl font-serif shadow-lg">
                H
              </div>
              <div>
                <h3 className="text-white font-bold font-serif text-base leading-tight">HITM Ranchi</h3>
                <p className="text-gray-500 text-[10px]">Est. 2008</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Holistic Institute of Technology & Management, Ranchi — committed to excellence in 
              education, innovation, and producing industry-ready graduates who make a difference.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 hover:opacity-90 ${s.className}`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 pb-2 border-b border-hitm-red/40 font-serif">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-1.5 text-gray-400 text-sm hover:text-hitm-gold transition-all hover:translate-x-1">
                    <ChevronRight size={12} className="text-hitm-red" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4 pb-2 border-b border-hitm-red/40 font-serif">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-1.5 text-gray-400 text-sm hover:text-hitm-gold transition-all hover:translate-x-1">
                    <ChevronRight size={12} className="text-hitm-red" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 pb-2 border-b border-hitm-red/40 font-serif">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-hitm-gold shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">NH-33, Tatisilwai, Ranchi, Jharkhand – 835103</p>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-hitm-gold shrink-0" />
                <p className="text-gray-400 text-sm">+91 651-234-5678<br />+91 651-987-6543</p>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-hitm-gold shrink-0" />
                <p className="text-gray-400 text-sm">admissions@hitmranchi.ac.in<br />info@hitmranchi.ac.in</p>
              </div>
              <div className="flex gap-3">
                <Clock size={16} className="text-hitm-gold shrink-0" />
                <p className="text-gray-400 text-sm">Mon–Sat: 9:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} HITM Ranchi. All rights reserved.</p>
          <span className="hidden md:inline text-gray-700 text-xs">|</span>
          <p className="text-gray-500 text-xs">
            Managed by <a href="https://shrote.com" target="_blank" rel="noopener noreferrer" className="text-hitm-gold font-semibold tracking-wide hover:underline hover:text-white transition-colors">Shrote Technologies</a>
          </p>
        </div>
        <div className="flex gap-4">
          {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((l) => (
            <Link key={l} href="#" className="text-gray-500 text-xs hover:text-hitm-gold transition-colors">{l}</Link>
          ))}
          <Link href="/admin/login" className="text-gray-500 text-xs hover:text-hitm-gold transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
