'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SyllabusPage() {
  const courses = [
    { name: 'B.Tech - Computer Science & Engineering', code: 'CSE', term: 'Odd Semester 2026', file: '#' },
    { name: 'B.Tech - Artificial Intelligence (AI)', code: 'AI', term: 'Odd Semester 2026', file: '#' },
    { name: 'B.Tech - Data Science', code: 'DS', term: 'Odd Semester 2026', file: '#' },
    { name: 'B.Tech - Electrical & Electronics', code: 'EEE', term: 'Odd Semester 2026', file: '#' },
    { name: 'B.Tech - Mechanical Engineering', code: 'ME', term: 'Odd Semester 2026', file: '#' },
    { name: 'B.Tech - Civil Engineering', code: 'CE', term: 'Odd Semester 2026', file: '#' },
    { name: 'BCA - Bachelor of Computer Application', code: 'BCA', term: 'Approved Intake: 180', file: '#' },
    { name: 'BBA - Bachelor of Business Administration', code: 'BBA', term: 'Approved Intake: 180', file: '#' },
    { name: 'MCA - Master of Computer Application', code: 'MCA', term: 'Core PG Syllabus', file: '#' },
    { name: 'MBA - Master of Business Administration', code: 'MBA', term: 'Dual Specialization', file: '#' },
    { name: 'Diploma - Engineering (Polytechnic)', code: 'DIP', term: 'All Streams', file: '#' },
  ];

  const syllabusPreview = [
    { title: 'Computer Science', subjects: ['Data Structures', 'Operating Systems', 'Cloud Computing', 'Computer Networks'] },
    { title: 'Management', subjects: ['Marketing Management', 'Digital Marketing', 'HR Analytics', 'Financial Accounting'] },
    { title: 'Mechanical', subjects: ['Thermodynamics', 'Machine Design', 'Automobile Engg', 'Robotics & Automation'] },
    { title: 'Applied Sciences', subjects: ['Engineering Physics', 'Calculus', 'Matrix & Vector Space', 'Discrete Maths'] },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Curriculum & Syllabus</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Designed as per AICTE Choice Based Credit System (CBCS) and Jharkhand University of Technology (JUT) norms to ensure global competency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-hitm-navy mb-6 flex items-center gap-2">
                <Download size={20} className="text-hitm-red" /> Download Syllabus PDF
              </h2>
              <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course, idx) => (
                    <div key={idx} className="flex items-start justify-between p-5 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-hitm-navy/10 text-hitm-navy flex items-center justify-center shrink-0 group-hover:bg-hitm-red group-hover:text-white transition-colors">
                          <BookOpen size={18} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-gray-900 leading-tight">{course.name}</h3>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{course.term}</p>
                        </div>
                      </div>
                      <Link href={course.file} className="shrink-0 p-2 rounded-full hover:bg-hitm-navy hover:text-white text-gray-300 transition-all">
                        <Download size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-xl font-black text-hitm-navy mb-6">Course Content Overview</h2>
               {syllabusPreview.map((s, i) => (
                 <div key={i} className="bg-white p-6 rounded-[32px] shadow-lg border-l-4 border-hitm-red">
                   <h3 className="font-bold text-hitm-navy mb-4">{s.title}</h3>
                   <div className="flex flex-wrap gap-2">
                     {s.subjects.map(item => (
                       <span key={item} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full uppercase tracking-wider">{item}</span>
                     ))}
                   </div>
                 </div>
               ))}
               <div className="bg-hitm-navy rounded-[32px] p-8 text-white">
                 <h4 className="font-bold mb-4">Academic Standards</h4>
                 <p className="text-xs text-white/60 leading-relaxed mb-4">Following the industry 4.0 roadmap, our curriculum is integrated with hands-on projects, industry internships, and professional skill certifications.</p>
                 <Button variant="gold" size="sm" className="w-full">Request Brochure</Button>
               </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
