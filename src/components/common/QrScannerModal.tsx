import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, QrCode, CheckCircle2, AlertTriangle, ShieldCheck, User, Sparkles } from 'lucide-react';
import { Student } from '../../types';

interface QrScannerModalProps {
  onClose: () => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({ onClose }) => {
  const { allStudents, markAttendance } = useApp();
  const [scannedStudent, setScannedStudent] = useState<Student | null>(null);
  const [scanStatus, setScanStatus] = useState<'ready' | 'success' | 'invalid'>('ready');

  const simulateScan = (student: Student) => {
    setScannedStudent(student);
    setScanStatus('success');

    // Automatically record present attendance at gate
    markAttendance({
      id: `att-gate-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      className: student.className,
      section: student.section,
      date: new Date().toISOString().substring(0, 10),
      status: 'present',
      remarks: 'Verified via RFID / QR Gate Scan at Main Turnstile #1'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#F37021]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Campus QR & Digital ID Verifier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Body */}
        <div className="p-6 space-y-5">
          {/* Scanner Viewport Simulation */}
          <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden border-2 border-slate-800 flex items-center justify-center">
            {/* Viewfinder Target */}
            <div className="absolute inset-8 border-2 border-dashed border-orange-500/80 rounded-xl pointer-events-none flex flex-col justify-between p-2">
              <div className="flex justify-between">
                <span className="w-4 h-4 border-t-2 border-l-2 border-[#F37021]" />
                <span className="w-4 h-4 border-t-2 border-r-2 border-[#F37021]" />
              </div>
              <div className="flex justify-between">
                <span className="w-4 h-4 border-b-2 border-l-2 border-[#F37021]" />
                <span className="w-4 h-4 border-b-2 border-r-2 border-[#F37021]" />
              </div>
            </div>

            {/* Scanning Line Animation */}
            <div className="absolute left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#F37021] to-transparent animate-pulse" />

            <div className="text-center z-10 p-4">
              <QrCode className="w-10 h-10 text-orange-400/80 mx-auto mb-2" />
              <p className="text-xs text-slate-300 font-medium">
                Align student digital QR card within the target area
              </p>
              <span className="text-[10px] text-slate-500 mt-1 block font-mono">
                PMS Secure Gate Scanner · Lens active
              </span>
            </div>
          </div>

          {/* Quick Simulation Buttons */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Simulate Instant ID Scan:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {allStudents.slice(0, 4).map((st) => (
                <button
                  key={st.id}
                  onClick={() => simulateScan(st)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left text-xs transition-colors flex items-center gap-2 group"
                >
                  <img
                    src={st.photo}
                    alt={st.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                  <div className="truncate">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block truncate group-hover:text-[#F37021]">
                      {st.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {st.className} - {st.section}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scanned Result Card */}
          {scannedStudent && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 animate-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Identity Verified · Valid 2025-2026 Session</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={scannedStudent.photo}
                  alt={scannedStudent.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500 shrink-0"
                />
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white">
                    {scannedStudent.name}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    ID: <span className="font-mono font-semibold">{scannedStudent.studentId}</span> · Roll #{scannedStudent.rollNo}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Class {scannedStudent.className}-{scannedStudent.section} · Emergency: {scannedStudent.emergencyContact}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
