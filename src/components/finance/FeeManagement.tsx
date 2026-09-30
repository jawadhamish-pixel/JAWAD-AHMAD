import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  Download,
  Printer,
  Smartphone,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { FeeItem } from '../../types';

export const FeeManagement: React.FC = () => {
  const { feesList, openModal, currentUser, payFee } = useApp();
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending'>('All');
  const [search, setSearch] = useState('');

  const filteredFees = feesList.filter((f) => {
    if (statusFilter !== 'All' && f.status !== statusFilter) return false;
    if (search && !f.studentName.toLowerCase().includes(search.toLowerCase()) && !f.voucherNo.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F37021]">
            Accounts & Bursar Directorate
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Fee Management & Digital Vouchers
          </h2>
          <p className="text-xs text-slate-500">
            Automated bank challan generation, EasyPaisa, JazzCash and 1Link reconciliation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('fee_voucher')}
            className="px-4 py-2.5 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate 3-Part Bank Voucher</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          {['All', 'Pending', 'Paid'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === st
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {st} Vouchers
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by student or voucher #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Student & Class</th>
                <th className="py-3 px-4">Billing Cycle</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-[#0A2540] dark:text-blue-400">
                    {fee.voucherNo}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{fee.studentName}</div>
                    <div className="text-[11px] text-slate-400">{fee.className}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{fee.month}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    PKR {fee.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-red-600 font-semibold">{fee.dueDate}</td>
                  <td className="py-3 px-4">
                    {fee.status === 'Paid' ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Paid ({fee.paymentMethod || 'Online'})</span>
                      </span>
                    ) : (
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openModal('fee_voucher', fee)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-xs text-slate-700 dark:text-slate-200"
                        title="Print Challan"
                      >
                        Print
                      </button>
                      {fee.status !== 'Paid' && (
                        <button
                          onClick={() => openModal('fee_voucher', fee)}
                          className="px-3 py-1 rounded-lg bg-[#F37021] hover:bg-orange-600 text-white text-xs font-bold shadow-xs"
                        >
                          Pay
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
