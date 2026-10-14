import React from 'react';
import { Volume2, VolumeX, Music, FastForward, Award, Sparkles, BookOpen } from 'lucide-react';
import { MODULES } from '../data/learningData';

interface NavbarProps {
  currentModuleId: string;
  onSelectModule: (id: string) => void;
  starsCount: number;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  speechRate: number;
  onChangeSpeechRate: (rate: number) => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModuleId,
  onSelectModule,
  starsCount,
  isBgmPlaying,
  onToggleBgm,
  isMuted,
  onToggleMute,
  speechRate,
  onChangeSpeechRate,
  onOpenCertificate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-200">
            <span className="text-xl sm:text-2xl animate-wiggle">🎒</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                What is this?
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Primary English 英语小课堂
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              小学英语单词句型游戏：It is... This ... is...
            </p>
          </div>
        </div>

        {/* Action Controls: Music, Speech Speed, Stars, Certificate */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* BGM Toggle */}
          <button
            onClick={onToggleBgm}
            title={isBgmPlaying ? 'Pause BGM 音乐' : 'Play cheerful BGM 开启背景音乐'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-sm ${
              isBgmPlaying
                ? 'bg-amber-100 text-amber-900 border-2 border-amber-300 hover:bg-amber-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Music className={`w-4 h-4 ${isBgmPlaying ? 'animate-bounce text-amber-600' : 'text-slate-400'}`} />
            <span className="hidden md:inline">{isBgmPlaying ? 'Music ON' : 'Music OFF'}</span>
          </button>

          {/* Speech Rate Toggle: 0.8x Slow (kids) / 1.0x Normal */}
          <button
            onClick={() => onChangeSpeechRate(speechRate === 1.0 ? 0.78 : 1.0)}
            title="Toggle Voice Speed 切换发音语速"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-50 text-sky-800 border-2 border-sky-200 hover:bg-sky-100 font-semibold text-xs sm:text-sm transition-all shadow-sm"
          >
            <FastForward className="w-3.5 h-3.5 text-sky-600" />
            <span>{speechRate < 1.0 ? '🐢 Slow (慢读)' : '🐇 Normal'}</span>
          </button>

          {/* Mute SFX */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Stars Counter & Trophy */}
          <button
            onClick={onOpenCertificate}
            title="View Rewards & Certificate 荣誉证书"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-200 transition-transform active:scale-95"
          >
            <span className="text-base">⭐</span>
            <span className="font-extrabold">{starsCount}</span>
            <Award className="w-4 h-4 ml-0.5 text-amber-900" />
          </button>
        </div>
      </div>

      {/* 5 Module Navigation Tabs */}
      <div className="bg-amber-100/60 border-t border-amber-200/80 px-2 sm:px-6 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {MODULES.map((m) => {
            const isActive = m.id === currentModuleId;
            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  isActive
                    ? 'bg-white text-slate-900 border-2 border-amber-400 shadow-md scale-102 ring-2 ring-amber-300/40'
                    : 'bg-white/70 text-slate-700 border border-amber-200/60 hover:bg-white hover:text-slate-900'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                  isActive ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {m.partNumber}
                </span>
                <span>{m.pairName}</span>
                <span className="text-[11px] font-normal text-slate-500 hidden lg:inline">
                  ({m.nounsCovered.join(', ')})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
