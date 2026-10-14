/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Headphones, 
  Puzzle, 
  Wand2, 
  Target, 
  Info, 
  Music, 
  Volume2, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { MODULES, LearningModule } from './data/learningData';
import { Navbar } from './components/Navbar';
import { TeacherPresentationBoard } from './components/TeacherPresentationBoard';
import { ListenPickGame } from './components/ListenPickGame';
import { SentenceBuilderGame } from './components/SentenceBuilderGame';
import { MagicMorphLab } from './components/MagicMorphLab';
import { MatchingGame } from './components/MatchingGame';
import { CertificateModal } from './components/CertificateModal';
import { soundManager } from './utils/audio';

type GameTab = 'teacher-board' | 'listen-pick' | 'sentence-builder' | 'magic-morph' | 'matching-arena';

export default function App() {
  const [currentModuleId, setCurrentModuleId] = useState<string>('part-1');
  const [activeTab, setActiveTab] = useState<GameTab>('teacher-board');
  const [starsCount, setStarsCount] = useState<number>(5);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.88); // Kid-friendly default rate
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);
  const [showTeacherGuide, setShowTeacherGuide] = useState<boolean>(false);

  const currentModule = MODULES.find(m => m.id === currentModuleId) || MODULES[0];

  // Try starting BGM on first user interaction if enabled
  const handleToggleBgm = () => {
    soundManager.playPopSound();
    const playing = soundManager.toggleBgm();
    setIsBgmPlaying(playing);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMute(nextMuted);
    if (nextMuted) {
      setIsBgmPlaying(false);
    }
  };

  const handleEarnStar = () => {
    setStarsCount(s => s + 1);
  };

  const handleSelectModule = (id: string) => {
    soundManager.playPopSound();
    setCurrentModuleId(id);
  };

  const handleTabChange = (tab: GameTab) => {
    soundManager.playPopSound();
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 selection:bg-amber-200">
      {/* Top Navbar */}
      <Navbar
        currentModuleId={currentModuleId}
        onSelectModule={handleSelectModule}
        starsCount={starsCount}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        speechRate={speechRate}
        onChangeSpeechRate={setSpeechRate}
        onOpenCertificate={() => setIsCertOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">
        {/* Module Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-amber-200/50 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-xs">
                Part {currentModule.partNumber} / 5
              </span>
              <span className="text-xs font-semibold text-amber-100">
                {currentModule.titleCn}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
              <span>{currentModule.title}</span>
              <span className="text-2xl">{currentModule.items[0]?.badgeEmoji}</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              Target Sentence: <span className="underline font-bold">What is this?</span> ➡️ <span className="font-bold">It is... This ... is {currentModule.pairName.toLowerCase()}.</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTeacherGuide(!showTeacherGuide)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-bold text-xs sm:text-sm transition-all border border-white/30"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{showTeacherGuide ? 'Hide Lesson Guide' : 'Teacher Lesson Guide (备课提示)'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Teacher Lesson Guide */}
        {showTeacherGuide && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-md animate-fade-in space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
              <Info className="w-5 h-5 text-amber-600" />
              <span>小学英语备课教学要点提示 (Teacher's Lesson Plan Notes)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="font-extrabold text-amber-900 block mb-1">🎯 核心句型目标:</span>
                <p>1. 提问: <strong>What is this?</strong> (这是什么？)</p>
                <p>2. 回答: <strong>It is a [noun]. This [noun] is [adjective].</strong></p>
              </div>
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
                <span className="font-extrabold text-sky-900 block mb-1">📖 5大板块词汇对照:</span>
                <p>(1) Tall/short (pencil, tree)</p>
                <p>(2) Thin/thick (book)</p>
                <p>(3) Straight/curved (street) & straight/curly (hair)</p>
                <p>(4) Fat/thin (people/boy)</p>
                <p>(5) Blonde/dark (hair)</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="font-extrabold text-purple-900 block mb-1">💡 课堂活动建议:</span>
                <p>• <strong>大屏带读</strong>: 全班跟读或分角色男女生对答</p>
                <p>• <strong>听音辨图</strong>: 调动学生听力与视觉敏捷度</p>
                <p>• <strong>造句积木</strong>: 强化英文主谓宾词序感知</p>
              </div>
            </div>
          </div>
        )}

        {/* 4 Activity Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white/80 p-2 rounded-2xl border border-amber-200/80 shadow-xs">
          <button
            onClick={() => handleTabChange('teacher-board')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs ${
              activeTab === 'teacher-board'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'text-slate-600 hover:bg-amber-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Classroom Stage (大屏互动教学)</span>
          </button>

          <button
            onClick={() => handleTabChange('listen-pick')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs ${
              activeTab === 'listen-pick'
                ? 'bg-sky-500 text-white shadow-md ring-2 ring-sky-300'
                : 'text-slate-600 hover:bg-sky-100 hover:text-slate-900'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Listen & Pick (听音寻物)</span>
          </button>

          <button
            onClick={() => handleTabChange('sentence-builder')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs ${
              activeTab === 'sentence-builder'
                ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                : 'text-slate-600 hover:bg-indigo-100 hover:text-slate-900'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Sentence Builder (句型积木)</span>
          </button>

          <button
            onClick={() => handleTabChange('magic-morph')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs ${
              activeTab === 'magic-morph'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                : 'text-slate-600 hover:bg-emerald-100 hover:text-slate-900'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Magic Morph (神奇变身器)</span>
          </button>

          <button
            onClick={() => handleTabChange('matching-arena')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs ${
              activeTab === 'matching-arena'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                : 'text-slate-600 hover:bg-purple-100 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Sorting Arena (分类大比拼)</span>
          </button>
        </div>

        {/* Active Tab View */}
        <div>
          {activeTab === 'teacher-board' && (
            <TeacherPresentationBoard
              module={currentModule}
              speechRate={speechRate}
              onEarnStar={handleEarnStar}
            />
          )}

          {activeTab === 'listen-pick' && (
            <ListenPickGame
              module={currentModule}
              speechRate={speechRate}
              onEarnStar={handleEarnStar}
            />
          )}

          {activeTab === 'sentence-builder' && (
            <SentenceBuilderGame
              module={currentModule}
              speechRate={speechRate}
              onEarnStar={handleEarnStar}
            />
          )}

          {activeTab === 'magic-morph' && (
            <MagicMorphLab
              module={currentModule}
              speechRate={speechRate}
            />
          )}

          {activeTab === 'matching-arena' && (
            <MatchingGame
              module={currentModule}
              speechRate={speechRate}
              onEarnStar={handleEarnStar}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-white border-t border-amber-200 text-center text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-700">
          Little Learners: What is This? Adjective Adventure (小学英语高级备课助手)
        </p>
        <p>
          Target Patterns: "What is this? It is... This ... is..." | 5 Core Adjective Contrast Modules
        </p>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        starsCount={starsCount}
      />
    </div>
  );
}
