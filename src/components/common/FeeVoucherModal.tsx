import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FeeItem } from '../../types';
import { SCHOOL_INFO } from '../../data/mockData';
import { X, Printer, CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Building, Smartphone } from 'lucide-react';

interface FeeVoucherModalProps {
  fee?: FeeItem;
  onClose: () => void;
}

export const FeeVoucherModal: React.FC<FeeVoucherModalProps> = ({ fee: propFee, onClose }) => {
  const { feesList, payFee, currentStudent } = useApp();
  const fee = propFee || feesList.find((f) => f.studentId === currentStudent.id) || feesList[0];

  const [paymentStep, setPaymentStep] = useState<'voucher' | 'checkout' | 'success'>('voucher');
  const [selectedMethod, setSelectedMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Bank Transfer'>('EasyPaisa');
  const [mobileNumber, setMobileNumber] = useState('03455544332');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnlinePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payFee(fee.id, selectedMethod);
      setIsProcessing(false);
      setPaymentStep('success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="no-print p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#F37021]" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Official School Fee Voucher & Payment Slip
              </h3>
              <p className="text-[11px] text-slate-500">
                Voucher #{fee.voucherNo} · {fee.month}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {fee.status !== 'Paid' && paymentStep === 'voucher' && (
              <button
                onClick={() => setPaymentStep('checkout')}
                className="px-3.5 py-1.5 rounded-lg bg-[#F37021] hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Pay Online (EasyPaisa / JazzCash)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Voucher</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/20">
          {paymentStep === 'checkout' ? (
            /* ONLINE PAYMENT CHECKOUT SCREEN */
            <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-[#F37021] tracking-wider">
                  Secure Digital Gateway
                </span>
                <h4 className="text-lg font-black text-[#0A2540] dark:text-white">
                  Pay School Fees Online
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Voucher #{fee.voucherNo} · Amount: <strong>PKR {fee.totalAmount.toLocaleString()}</strong>
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Select Pakistani Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'EasyPaisa', label: 'EasyPaisa', icon: Smartphone, color: 'text-emerald-600' },
                    { id: 'JazzCash', label: 'JazzCash', icon: Smartphone, color: 'text-red-600' },
                    { id: 'Bank Transfer', label: '1Link / Bank', icon: Building, color: 'text-blue-700' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        selectedMethod === m.id
                          ? 'border-[#F37021] bg-orange-50/50 dark:bg-orange-950/30 text-orange-900 dark:text-white font-bold ring-1 ring-[#F37021]'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <m.icon className={`w-5 h-5 ${m.color}`} />
                      <span className="text-xs">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Input */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {selectedMethod === 'Bank Transfer' ? 'Bank Account / IBAN' : `${selectedMethod} Mobile Account Number`}
                </label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 0345 5544332"
                  className="w-full h-10 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  You will receive an in-app prompt/MPIN verification on your mobile.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentStep('voucher')}
                  className="flex-1 h-10 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleOnlinePay}
                  className="flex-1 h-10 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  {isProcessing ? (
                    <span className="animate-spin text-sm">⏳ Processing...</span>
                  ) : (
                    <>
                      <span>Pay PKR {fee.totalAmount.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit Encrypted Banking Channel</span>
              </div>
            </div>
          ) : paymentStep === 'success' ? (
            /* PAYMENT SUCCESS SCREEN */
            <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                Payment Successful!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Tuition fee of <strong>PKR {fee.totalAmount.toLocaleString()}</strong> for {fee.month} has been cleared and verified by the school accounts wing.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-left text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Voucher No:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{fee.voucherNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction Ref:</span>
                  <span className="font-bold text-[#F37021]">{fee.transactionRef || 'EP-8492019482'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Channel:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{fee.paymentMethod || selectedMethod}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPaymentStep('voucher')}
                  className="flex-1 h-10 rounded-xl bg-[#0A2540] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  View Updated Voucher
                </button>
                <button
                  onClick={onClose}
                  className="px-4 h-10 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* PRINTABLE 3-PART OFFICIAL VOUCHER */
            <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200" id="printable-voucher">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-300 gap-4">
                {['BANK COPY', 'SCHOOL COPY', 'STUDENT / PARENT COPY'].map((copyType, copyIdx) => (
                  <div key={copyIdx} className="space-y-3 pt-4 md:pt-0 md:px-3 first:pl-0 last:pr-0">
                    {/* Header */}
                    <div className="text-center border-b border-slate-200 pb-2">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <div className="w-6 h-6 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-[9px]">
                          PMS
                        </div>
                        <span className="text-[11px] font-black uppercase text-[#0A2540]">
                          Peshawar Model School
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-[#F37021] uppercase tracking-wider block">
                        Mardan Campus
                      </span>
                      <span className="text-[8px] bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-700 inline-block mt-1">
                        {copyType}
                      </span>
                    </div>

                    {/* Bank Info */}
                    <div className="text-[9px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 leading-tight">
                      <div><strong>Habib Bank Ltd / The Bank of Khyber</strong></div>
                      <div>PMS Collection A/C: <strong>0148-79012345-03</strong></div>
                      <div>Branch: Sheikh Maltoon Town, Mardan</div>
                    </div>

                    {/* Voucher Details */}
                    <div className="text-[10px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Voucher No:</span>
                        <span className="font-mono font-bold text-[#0A2540]">{fee.voucherNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Billing Month:</span>
                        <span className="font-semibold text-slate-800">{fee.month}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Due Date:</span>
                        <span className="font-bold text-red-600 font-mono">{fee.dueDate}</span>
                      </div>
                    </div>

                    {/* Student Metadata */}
                    <div className="text-[10px] bg-slate-50 p-2 rounded border border-slate-200 space-y-0.5">
                      <div className="font-bold text-slate-900 truncate">{fee.studentName}</div>
                      <div className="text-slate-500 text-[9px]">ID: {currentStudent.studentId} · Roll #{currentStudent.rollNo}</div>
                      <div className="text-slate-500 text-[9px]">Class: {fee.className}</div>
                    </div>

                    {/* Fee Breakdown Table */}
                    <table className="w-full text-[9px] border-collapse border border-slate-200">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700">
                          <th className="py-1 px-1.5 text-left border border-slate-200">Particulars</th>
                          <th className="py-1 px-1.5 text-right border border-slate-200">Amount (PKR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1 px-1.5 border border-slate-200">Tuition Fee</td>
                          <td className="py-1 px-1.5 border border-slate-200 text-right font-mono">{fee.tuitionFee.toLocaleString()}</td>
                        </tr>
                        {fee.transportFee && (
                          <tr>
                            <td className="py-1 px-1.5 border border-slate-200">Transport Charges</td>
                            <td className="py-1 px-1.5 border border-slate-200 text-right font-mono">{fee.transportFee.toLocaleString()}</td>
                          </tr>
                        )}
                        {fee.labCharges && (
                          <tr>
                            <td className="py-1 px-1.5 border border-slate-200">Science & STEM Lab</td>
                            <td className="py-1 px-1.5 border border-slate-200 text-right font-mono">{fee.labCharges.toLocaleString()}</td>
                          </tr>
                        )}
                        {fee.examFee && (
                          <tr>
                            <td className="py-1 px-1.5 border border-slate-200">Exam Assessment</td>
                            <td className="py-1 px-1.5 border border-slate-200 text-right font-mono">{fee.examFee.toLocaleString()}</td>
                          </tr>
                        )}
                        <tr className="bg-slate-100 font-bold">
                          <td className="py-1.5 px-1.5 border border-slate-300">TOTAL PAYABLE</td>
                          <td className="py-1.5 px-1.5 border border-slate-300 text-right font-mono text-[#0A2540] text-[10px]">
                            PKR {fee.totalAmount.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="text-slate-500">Status:</span>
                      <span className={`font-bold uppercase ${fee.status === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {fee.status === 'Paid' ? `PAID (${fee.paymentMethod || 'Online'})` : 'UNPAID'}
                      </span>
                    </div>

                    {/* Barcode & Signature */}
                    <div className="pt-2 border-t border-dashed border-slate-300 text-center space-y-1">
                      <div className="flex items-center justify-center gap-0.5 h-4">
                        {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 1, 4].map((w, idx) => (
                          <span key={idx} className="bg-slate-900 h-full inline-block" style={{ width: `${w}px` }} />
                        ))}
                      </div>
                      <div className="text-[7px] text-slate-400 font-mono">PMS-VCH-849201</div>
                      <div className="flex justify-between items-end pt-3 text-[8px] text-slate-500">
                        <span className="border-t border-slate-300 pt-0.5">Bank Officer Stamp</span>
                        <span className="border-t border-slate-300 pt-0.5">Depositor Sign</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
