'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Clock, GraduationCap, ChevronRight, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function FeeStructurePage() {
  const fees = [
    { 
      course: 'B.Tech Programs', 
      specialization: 'ME / CSE / EEE / ECE / AI / DS / Civil',
      level: 'Undergraduate',
      duration: '4 Years (8 Semesters)', 
      breakup: [
        { label: 'Tuition Fee (Per Year)', value: '65,000' },
        { label: 'Development Fee', value: '10,000' },
        { label: 'Lab & Library Fee', value: '5,000' },
        { label: 'Examination Fee', value: '2,000' },
      ],
      total: '82,000'
    },
    { 
      course: 'Diploma in Engineering', 
      specialization: 'ME / CSE / EEE / AI / DS / Civil / ECE',
      level: 'Polytechnic',
      duration: '3 Years (6 Semesters)', 
      breakup: [
        { label: 'Tuition Fee (Per Year)', value: '35,000' },
        { label: 'Development Fee', value: '8,000' },
        { label: 'Workshop & Practical Fee', value: '5,000' },
        { label: 'Examination Fee', value: '2,000' },
      ],
      total: '50,000'
    },
    { 
      course: 'MBA Program', 
      specialization: 'Marketing / Finance / HR / IT',
      level: 'Postgraduate',
      duration: '2 Years (4 Semesters)', 
      breakup: [
        { label: 'Tuition Fee (Per Year)', value: '70,000' },
        { label: 'Industry Visit & Seminar', value: '10,000' },
        { label: 'Library & Online Resources', value: '5,000' },
        { label: 'Examination Fee', value: '5,000' },
      ],
      total: '90,000'
    },
    { 
      course: 'BCA / BBA Program', 
      specialization: 'Professional Degree',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)', 
      breakup: [
        { label: 'Tuition Fee (Per Year)', value: '45,000' },
        { label: 'Skill Development', value: '8,000' },
        { label: 'Project & Lab Fee', value: '5,000' },
        { label: 'Examination Fee', value: '2,000' },
      ],
      total: '60,000'
    }
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    const collegeName = "AL-HAIDER COLLEGE OF TECHNOLOGY (AHCT)";
    const contactInfo = "Phone: +91 0000-111-988 | Email: admissions@ahctranchi.com";
    const address = "Hensal, Ormanjhi, Ranchi, Jharkhand - 835219";

    const addHeaderFooter = (data) => {
      // Header
      doc.setFontSize(18);
      doc.setTextColor(180, 20, 20); // AHCT Red
      doc.setFont("helvetica", "bold");
      doc.text(collegeName, 105, 15, { align: "center" });
      
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.setFont("helvetica", "normal");
      doc.text(contactInfo, 105, 22, { align: "center" });
      
      doc.setDrawColor(200);
      doc.line(14, 26, 196, 26);

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text("Page " + pageCount, 196, 285, { align: "right" });
      doc.text(address, 105, 285, { align: "center" });
      doc.line(14, 280, 196, 280);
    };

    let currentY = 35;

    doc.setFontSize(14);
    doc.setTextColor(30);
    doc.text("OFFICIAL FEE STRUCTURE (2026-27)", 105, currentY, { align: "center" });
    currentY += 15;

    fees.forEach((fee, index) => {
      if (currentY > 230) {
        doc.addPage();
        currentY = 35;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 48, 96); // AHCT Navy
      doc.text(`${index + 1}. ${fee.course} (${fee.duration})`, 14, currentY);
      currentY += 5;

      autoTable(doc, {
        startY: currentY,
        head: [['Fee Particulars', 'Amount (INR)']],
        body: [
          ...fee.breakup.map(b => [b.label, b.value]),
          [{ content: 'Total Annual Fee', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }, 
           { content: `Rs. ${fee.total}`, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]
        ],
        theme: 'striped',
        headStyles: { fillColor: [180, 20, 20] },
        margin: { left: 14, right: 14 },
        didDrawPage: addHeaderFooter
      });

      currentY = doc.lastAutoTable.finalY + 15;
    });

    // Final total disclaimer
    if (currentY > 260) { doc.addPage(); currentY = 35; }
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.setFont("helvetica", "italic");
    doc.text("* Note: Fees are subject to university/board norms. Hostel and transport are extra charges.", 14, currentY);

    if (doc.internal.getNumberOfPages() > 0) {
       // Ensure Header/Footer on first page if not added by autoTable
       // Actually autoTable didDrawPage handles it, but let's be safe.
    }

    doc.save("AHCT_Fee_Structure_2026.pdf");
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-hitm-red border-hitm-red/20 font-bold px-4 py-1">Admission 2026-27</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Fee Structure</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Transparent investment in your professional future. We provide various scholarship options 
              based on merit and socio-economic categories.
            </p>
          </div>
          
          <div className="space-y-12">
            {fees.map((fee, idx) => (
              <Card key={idx} className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white group">
                <div className="absolute top-0 left-0 w-2 h-full bg-hitm-red group-hover:w-3 transition-all" />
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Left Column: Course Header */}
                  <div className="p-8 lg:p-10 bg-hitm-navy/5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="flex items-center gap-2 text-hitm-red mb-3">
                      <GraduationCap size={20} />
                      <span className="font-bold text-xs uppercase tracking-widest">{fee.level}</span>
                    </div>
                    <h2 className="text-2xl font-black text-hitm-navy mb-2">{fee.course}</h2>
                    <p className="text-gray-500 text-sm mb-6">{fee.specialization}</p>
                    <div className="flex items-center gap-2 text-gray-700 font-bold">
                      <Clock size={16} className="text-hitm-red" />
                      {fee.duration}
                    </div>
                  </div>

                  {/* Middle Column: Fee Breakup */}
                  <div className="p-8 lg:p-10 lg:col-span-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                      Annual Fee Breakdown <ChevronRight size={14} className="ml-1" />
                    </h3>
                    <div className="space-y-4">
                      {fee.breakup.map((item, i) => (
                        <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-50">
                          <span className="text-gray-600 font-medium">{item.label}</span>
                          <span className="text-hitm-navy font-bold">{item.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-lg font-black text-hitm-navy">Total Yearly Fee</span>
                        <div className="text-right">
                          <p className="text-3xl font-black text-hitm-red flex items-center justify-end">
                            <IndianRupee size={24} className="mr-1" /> {fee.total}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Exclusive of Hostel & Transport</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-hitm-navy rounded-2xl shadow-2xl text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold border-l-4 border-hitm-red pl-3 mb-4">Hostel Fee</h4>
                <p className="text-gray-300 text-sm italic">Standard accommodation with mess facilities provided at competitive rates.</p>
              </div>
              <div>
                <h4 className="font-bold border-l-4 border-hitm-red pl-3 mb-4">Note</h4>
                <p className="text-gray-300 text-sm italic">Fee as per norms of Govt. of Jharkhand / Concerned Board / University.</p>
              </div>
              <div>
                <h4 className="font-bold border-l-4 border-hitm-red pl-3 mb-4">Refund Policy</h4>
                <p className="text-gray-300 text-sm italic">Refund as per AICTE / University norms applicable at the time of withdrawal.</p>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <button 
                  onClick={downloadPDF}
                  className="bg-hitm-red text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white hover:text-hitm-navy transition-all transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <Download size={18} /> Download Fee Structure (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
