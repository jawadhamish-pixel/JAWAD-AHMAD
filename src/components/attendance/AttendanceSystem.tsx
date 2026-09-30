import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  Users,
  BellRing,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { AttendanceRecord, AttendanceStatus } from '../../types';

export const AttendanceSystem: React.FC = () => {
  const { allStudents, attendanceRecords, markAttendance, sendAbsentNotice, openModal } = useApp();
  const [selectedClass, setSelectedClass] = useState('Class 9');
  const [selectedDate, setSelectedDate] = useState('2026-09-29');

  const filteredStudents = allStudents.filter((s) => s.className === selectedClass);

  const handleStatusChange = (studentId: string, studentName: string, rollNo: number, status: AttendanceStatus) => {
    const record: AttendanceRecord = {
      id: `att-${studentId}-${selectedDate}`,
      studentId,
      studentName,
      rollNo,
      className: selectedClass,
      section: 'A',
      date: selectedDate,
      status
    };
    markAttendance(record);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Date,Student ID,Student Name,Class,Roll No,Status\n' +
      attendanceRecords.map((r) => `"${r.date}","${r.studentId}","${r.studentName}","${r.className}-${r.section}","${r.rollNo}","${r.status}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PMS_Attendance_${selectedClass}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F37021]">
            Campus Attendance Engine
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Class & Student Attendance Register
          </h2>
          <p className="text-xs text-slate-500">
            Real-time biometric turnstile & teacher register synchronization
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openModal('qr_scanner')}
            className="px-3.5 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 hover:bg-orange-100 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-[#F37021]" />
            <span>Gate Scanner</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Register CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Date Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-9 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
            >
              <option value="Class 9">Class 9 (SSC-I)</option>
              <option value="Class 10">Class 10 (SSC-II)</option>
              <option value="Class 8">Class 8 (Middle)</option>
              <option value="Class 6">Class 6 (Middle)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-9 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>

        {/* Quick batch absentee alert action */}
        <button
          onClick={() => {
            const absentees = filteredStudents.filter((s) => {
              const r = attendanceRecords.find((rec) => rec.studentId === s.id && rec.date === selectedDate);
              return r?.status === 'absent';
            });
            absentees.forEach((a) => sendAbsentNotice(a.name, `${a.className}-${a.section}`));
            alert(`Sent absentee notices to ${absentees.length} parents.`);
          }}
          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-red-200"
        >
          <BellRing className="w-3.5 h-3.5 text-red-500" />
          <span>Dispatch Absentee Notifications</span>
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Attendance Roster · {selectedClass} ({selectedDate})
          </h3>
          <span className="text-xs font-mono text-slate-400">{filteredStudents.length} Students Listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Father Name</th>
                <th className="py-3 px-4">Term %</th>
                <th className="py-3 px-4 text-center">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredStudents.map((st) => {
                const rec = attendanceRecords.find(
                  (r) => r.studentId === st.id && r.date === selectedDate
                );
                const currentStatus = rec ? rec.status : 'present';

                return (
                  <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#F37021]">#{st.rollNo}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img src={st.photo} alt={st.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" />
                        <span className="font-bold text-slate-900 dark:text-white">{st.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{st.studentId}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{st.fatherName}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">{st.attendancePercentage}%</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <button
                          onClick={() => handleStatusChange(st.id, st.name, st.rollNo, 'present')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          P
                        </button>
                        <button
                          onClick={() => handleStatusChange(st.id, st.name, st.rollNo, 'absent')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'absent'
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          A
                        </button>
                        <button
                          onClick={() => handleStatusChange(st.id, st.name, st.rollNo, 'late')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'late'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          L
                        </button>
                        <button
                          onClick={() => handleStatusChange(st.id, st.name, st.rollNo, 'leave')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            currentStatus === 'leave'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          Lv
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
