import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfficialBranding } from './OfficialBranding';
import { X, RotateCw, Printer, ShieldCheck, Download, Phone, MapPin, User, Calendar } from 'lucide-react';
import { Student } from '../../types';

interface DigitalIdCardModalProps {
  student?: Student;
  onClose: () => void;
}

export const DigitalIdCardModal: React.FC<DigitalIdCardModalProps> = ({
  student: propStudent,
  onClose
}) => {
  const { currentStudent } = useApp();
  const student = propStudent || currentStudent;
  const [isFlipped, setIsFlipped] = useState(false);

  // SVG QR Code generator string
  const qrData = encodeURIComponent(`PMS-ID:${student.studentId}|REG:${student.registrationNo}|NAME:${student.name}|CLASS:${student.className}-${student.section}|EMERGENCY:${student.emergencyContact}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[95vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Official Digital Student Identity
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Flip Card"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Print ID Card"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card Body with Perspective Flip */}
        <div className="p-6 flex flex-col items-center justify-center overflow-y-auto">
          {!isFlipped ? (
            /* FRONT OF ID CARD */
            <div className="w-full max-w-[340px] aspect-[1/1.58] rounded-2xl bg-gradient-to-b from-[#0A2540] via-[#0D2E50] to-[#0A2540] text-white p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between border-2 border-amber-500/30">
              {/* Background Geometric Accent */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#F37021]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <OfficialBranding size="sm" textColor="light" />
                <span className="text-[10px] font-mono tracking-widest text-[#F37021] font-bold">
                  2025-2026
                </span>
              </div>

              {/* Card Photo & Key Student Info */}
              <div className="relative z-10 flex flex-col items-center my-auto py-2">
                <div className="relative mb-3">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-24 h-28 object-cover rounded-xl border-2 border-white/80 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#F37021] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {student.bloodGroup}
                  </div>
                </div>

                <h4 className="text-lg font-black tracking-tight text-white uppercase text-center">
                  {student.name}
                </h4>
                <p className="text-xs text-amber-300 font-semibold tracking-wide">
                  S/O {student.fatherName}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-center w-full px-2 py-2 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <span className="text-[9px] text-slate-300 uppercase tracking-wider block">Class & Sec</span>
                    <span className="text-xs font-bold text-white">{student.className} - {student.section}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-300 uppercase tracking-wider block">Roll Number</span>
                    <span className="text-xs font-mono font-bold text-[#F37021]">#{student.rollNo}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-300 uppercase tracking-wider block">Student ID</span>
                    <span className="text-[11px] font-mono text-white">{student.studentId}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-300 uppercase tracking-wider block">Bus Route</span>
                    <span className="text-xs font-bold text-white">Route 1 (A/C)</span>
                  </div>
                </div>
              </div>

              {/* Barcode & Security Hologram */}
              <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  {/* CSS Simulated Barcode */}
                  <div className="flex items-center gap-0.5 h-6 bg-white/90 px-2 py-0.5 rounded">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4].map((w, idx) => (
                      <span key={idx} className="bg-slate-950 h-full inline-block" style={{ width: `${w * 1.5}px` }} />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-300 mt-0.5">
                    {student.registrationNo}
                  </span>
                </div>

                <div className="flex flex-col items-end text-right">
                  <span className="text-[9px] font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    VERIFIED
                  </span>
                  <span className="text-[8px] text-slate-400">Principal Signature</span>
                </div>
              </div>
            </div>
          ) : (
            /* BACK OF ID CARD */
            <div className="w-full max-w-[340px] aspect-[1/1.58] rounded-2xl bg-white text-slate-900 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between border-2 border-slate-200">
              <div className="text-center border-b border-slate-100 pb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A2540] block">
                  Peshawar Model School · Mardan Campus
                </span>
                <span className="text-[8px] text-slate-500">
                  Sector F, Phase 2, Sheikh Maltoon Town, Mardan, KPK
                </span>
              </div>

              {/* QR Code and Instructions */}
              <div className="flex items-center gap-4 my-auto py-2">
                <div className="w-28 h-28 bg-slate-50 p-2 rounded-xl border border-slate-200 shrink-0 flex items-center justify-center">
                  {/* Clean SVG QR Code Representation */}
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h4v4h-4v-4zm-4-4h4v2h-4v-2zm2 4h2v2h-2v-2zm-2-2h2v2h-2v-2zm4-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>

                <div className="text-[10px] space-y-1.5 text-slate-600">
                  <div className="flex items-start gap-1">
                    <Phone className="w-3 h-3 text-[#F37021] shrink-0 mt-0.5" />
                    <span><strong>Emergency:</strong> {student.emergencyContact}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <User className="w-3 h-3 text-[#0A2540] shrink-0 mt-0.5" />
                    <span><strong>Guardian:</strong> {student.fatherName}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <Calendar className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                    <span><strong>DOB:</strong> {student.dob}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2"><strong>Address:</strong> {student.address}</span>
                  </div>
                </div>
              </div>

              {/* Card Rules and Instructions */}
              <div className="text-[8px] text-slate-500 space-y-1 border-t border-slate-100 pt-2">
                <p>1. This card is non-transferable and remains property of Peshawar Model School.</p>
                <p>2. Must be visibly displayed at school gates, examinations, and bus transit.</p>
                <p>3. If found, please return to Admin Office or call: +92 937 860124.</p>
              </div>

              <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono">
                <span>Valid Thru: 30 June 2026</span>
                <span>Serial: #0418-9A-MDR</span>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-xs font-semibold text-[#0A2540] dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              {isFlipped ? 'Show Front of Card' : 'Show Back & QR Code'}
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => window.print()}
              className="text-xs font-semibold text-[#F37021] hover:underline flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download / Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
