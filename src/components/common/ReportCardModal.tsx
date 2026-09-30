import React from 'react';
import { useApp } from '../../context/AppContext';
import { OfficialBranding } from './OfficialBranding';
import { MOCK_REPORT_CARD, SCHOOL_INFO } from '../../data/mockData';
import { X, Printer, Download, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReportCardModalProps {
  onClose: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({ onClose }) => {
  const { currentStudent } = useApp();
  const report = MOCK_REPORT_CARD;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
        {/* Header Controls (no-print) */}
        <div className="no-print p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F37021]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Official Progress Report & Grade Sheet
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Report Card */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-white text-slate-900" id="printable-report-card">
          {/* Institutional Header */}
          <div className="border-b-2 border-[#0A2540] pb-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden ring-1 ring-slate-200 p-1 shrink-0 bg-white">
                <img
                  src={SCHOOL_INFO.images.logo}
                  alt="School Crest"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0A2540] uppercase">
                  Peshawar Model School
                </h1>
                <h2 className="text-sm font-bold text-[#F37021] tracking-widest uppercase">
                  Mardan Campus · Khyber Pakhtunkhwa
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Affiliated with BISE Mardan & Cambridge International Examinations
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:pl-4 border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Evaluation Cycle
              </span>
              <span className="text-xs font-bold text-[#0A2540] block">
                {report.examName}
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                Session {report.academicYear}
              </span>
            </div>
          </div>

          {/* Student Profile Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs mb-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Student Name</span>
              <div className="font-extrabold text-slate-900">{currentStudent.name}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Father's Name</span>
              <div className="font-semibold text-slate-800">{currentStudent.fatherName}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Class & Section</span>
              <div className="font-bold text-slate-900">{currentStudent.className} - {currentStudent.section}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Roll No & ID</span>
              <div className="font-mono font-bold text-[#F37021]">#{currentStudent.rollNo} · {currentStudent.studentId}</div>
            </div>
          </div>

          {/* Marks Breakdown Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-[#0A2540] text-white">
                  <th className="py-2.5 px-3 font-bold border border-slate-300">#</th>
                  <th className="py-2.5 px-3 font-bold border border-slate-300">Subject Course</th>
                  <th className="py-2.5 px-3 font-bold text-center border border-slate-300">Total Marks</th>
                  <th className="py-2.5 px-3 font-bold text-center border border-slate-300">Obtained</th>
                  <th className="py-2.5 px-3 font-bold text-center border border-slate-300">Grade</th>
                  <th className="py-2.5 px-3 font-bold border border-slate-300 hidden sm:table-cell">Academic Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {report.results.map((res, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="py-2 px-3 border border-slate-200 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2 px-3 border border-slate-200 font-semibold text-slate-900">{res.subject}</td>
                    <td className="py-2 px-3 border border-slate-200 text-center font-mono">{res.totalMarks}</td>
                    <td className="py-2 px-3 border border-slate-200 text-center font-mono font-bold text-slate-900">{res.obtainedMarks}</td>
                    <td className="py-2 px-3 border border-slate-200 text-center font-bold text-emerald-700">{res.grade}</td>
                    <td className="py-2 px-3 border border-slate-200 text-slate-600 text-[11px] hidden sm:table-cell">{res.remarks}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-[#0A2540]">
                  <td colSpan={2} className="py-2.5 px-3 border border-slate-300 text-right uppercase tracking-wider">
                    Cumulative Total
                  </td>
                  <td className="py-2.5 px-3 border border-slate-300 text-center font-mono">{report.totalMarks}</td>
                  <td className="py-2.5 px-3 border border-slate-300 text-center font-mono text-emerald-700 text-sm">
                    {report.obtainedMarks}
                  </td>
                  <td className="py-2.5 px-3 border border-slate-300 text-center font-bold text-emerald-700">
                    A1
                  </td>
                  <td className="py-2.5 px-3 border border-slate-300 text-[11px] font-semibold text-slate-700 hidden sm:table-cell">
                    Overall Percentage: {report.percentage}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Performance Summary Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Percentage</span>
              <span className="text-xl font-black text-[#0A2540]">{report.percentage}%</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Letter Grade</span>
              <span className="text-xl font-black text-emerald-600">{report.grade}</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Position</span>
              <span className="text-sm font-extrabold text-[#F37021] mt-1 block">{report.position}</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Attendance Rate</span>
              <span className="text-xl font-black text-blue-600">{report.attendancePercentage}%</span>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="space-y-3 mb-6">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block mb-1">
                Class Teacher Remarks (Ms. Sana Khan)
              </span>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{report.teacherRemarks}"
              </p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[10px] font-bold text-[#F37021] uppercase tracking-wider block mb-1">
                Principal & Controller's Remarks (Dr. Tariq Mahmood)
              </span>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{report.principalRemarks}"
              </p>
            </div>
          </div>

          {/* Signatures & Seal Footer */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center font-serif text-slate-600 italic">
                Sana Khan
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Class Teacher Signature</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-[#0A2540]/30 p-1 flex flex-col items-center justify-center text-[7px] font-bold uppercase text-[#0A2540]">
                <span>Peshawar Model</span>
                <span className="text-[#F37021]">Mardan</span>
                <span>★ Official Seal ★</span>
              </div>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center font-serif text-[#0A2540] font-bold italic">
                Dr. Tariq Mahmood
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Principal Signature</span>
            </div>
          </div>

          <div className="mt-4 text-center text-[9px] text-slate-400 border-t border-slate-100 pt-2">
            Issued on: {report.issueDate} · Document Verification Hash: PMS-MDR-2026-RPT-0418-9A · Keep for Board records
          </div>
        </div>
      </div>
    </div>
  );
};
