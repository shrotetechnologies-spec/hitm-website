'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Download } from 'lucide-react';
import Link from 'next/link';

export default function SyllabusPage() {
  const courses = [
    { name: 'B.Tech - Computer Science', code: 'CSE-101', term: 'Odd Semester 2026', file: '#' },
    { name: 'B.Tech - Mechanical', code: 'ME-101', term: 'Odd Semester 2026', file: '#' },
    { name: 'B.Tech - Artificial Intelligence', code: 'AI-101', term: 'Odd Semester 2026', file: '#' },
    { name: 'BBA - Bachelor of Business Administration', code: 'BBA-101', term: 'Semester I & II', file: '#' },
    { name: 'BCA - Bachelor of Computer Application', code: 'BCA-101', term: 'Semester I & II', file: '#' },
    { name: 'MBA - Master of Business Administration', code: 'MBA-101', term: 'Core Syllabus', file: '#' },
    { name: 'MCA - Master of Computer Application', code: 'MCA-101', term: 'Core Syllabus', file: '#' },
    { name: 'Diploma (Polytechnic) - Engineering', code: 'DIP-101', term: 'Common Core', file: '#' },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 flex items-center pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Courses & Syllabus</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore the comprehensive syllabus and curriculum designed by Al Haider College of Technology 
              to ensure our students are industry-ready and academically brilliant.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-2">
              {courses.map((course, idx) => (
                <div key={idx} className="flex items-start justify-between p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-hitm-navy/10 text-hitm-navy flex items-center justify-center shrink-0">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-hitm-red transition-colors">{course.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{course.term} • {course.code}</p>
                    </div>
                  </div>
                  <Link href={course.file} className="shrink-0 p-3 rounded-full hover:bg-hitm-red hover:text-white text-gray-400 bg-white shadow-sm border border-gray-200 transition-all focus:outline-none">
                    <Download size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
