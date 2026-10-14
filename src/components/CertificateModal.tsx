import React, { useState } from 'react';
import { Award, X, Sparkles, CheckCircle2, Printer, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MODULES } from '../data/learningData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  starsCount,
}) => {
  const [studentName, setStudentName] = useState<string>('Super Star Student');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Frame */}
        <div className="border-4 border-dashed border-amber-400 rounded-2xl p-6 text-center bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 relative overflow-hidden">
          {/* Top Badge */}
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>

          <span className="text-xs font-black tracking-widest text-amber-700 uppercase">
            Official English Learning Achievement
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
            Certificate of Excellence
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            小学英语词汇与句型大冒险·通关荣誉证书
          </p>

          <div className="my-6">
            <p className="text-xs font-bold text-slate-400 uppercase">
              Awarded to:
            </p>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter Student Name"
              className="mt-1 text-center text-xl sm:text-2xl font-black text-amber-900 border-b-2 border-amber-400 bg-transparent focus:outline-none focus:border-amber-600 px-4 py-1"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Has successfully demonstrated mastery of English opposites & sentence patterns:{' '}
            <strong className="text-slate-800">
              "What is this? It is... This... is..."
            </strong>{' '}
            (Tall/short, Thin/thick, Straight/curved/curly, Fat/thin, Blonde/dark)!
          </p>

          {/* Badges Earned */}
          <div className="my-6 pt-4 border-t border-amber-200 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {MODULES.map((m) => (
              <div
                key={m.id}
                className="p-2 rounded-xl bg-white border border-amber-200 shadow-xs flex flex-col items-center"
              >
                <span className="text-xl">{m.items[0]?.badgeEmoji}</span>
                <span className="text-[10px] font-black text-slate-700 mt-1">
                  Part {m.partNumber}
                </span>
                <span className="text-[9px] text-slate-500 truncate w-full text-center">
                  {m.pairName}
                </span>
              </div>
            ))}
          </div>

          {/* Stars & Signature */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-200 text-left px-2">
            <div>
              <span className="text-xs text-slate-400 block font-bold">Total Stars Collected:</span>
              <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
                <Star className="w-5 h-5 fill-amber-400" />
                <span>{starsCount} Stars</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-bold">Verified by:</span>
              <span className="text-sm font-black text-slate-800 font-serif">
                English Teacher 🍎
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            onClick={handleCelebration}
            className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Celebrate 🎉</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate 打印证书</span>
          </button>
        </div>
      </div>
    </div>
  );
};
