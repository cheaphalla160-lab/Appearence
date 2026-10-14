import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Check, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabularyItem, LearningModule } from '../data/learningData';
import { ConceptIllustration } from './illustrations/Illustrations';
import { soundManager } from '../utils/audio';

interface SentenceBuilderGameProps {
  module: LearningModule;
  speechRate: number;
  onEarnStar: () => void;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({
  module,
  speechRate,
  onEarnStar,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentItem = module.items[currentIndex % module.items.length];

  // Selected tokens in user's sentence rail
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  // Available pool of scrambled tokens
  const [availableTokens, setAvailableTokens] = useState<{ id: string; text: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Initialize round
  const initRound = (item: VocabularyItem) => {
    setSelectedTokens([]);
    setIsCompleted(false);
    setIsError(false);

    // Tokens: ["It is", item.nounWithArticle + ".", `This ${item.noun}`, `is ${item.adjective}.`]
    const correctTokens = [
      'It is',
      `${item.nounWithArticle}.`,
      `This ${item.noun}`,
      `is ${item.adjective}.`,
    ];

    // Scramble with unique IDs
    const tokenObjects = correctTokens
      .map((text, idx) => ({ id: `${text}-${idx}-${Math.random()}`, text }))
      .sort(() => Math.random() - 0.5);

    setAvailableTokens(tokenObjects);

    // Speak prompt question
    setTimeout(() => {
      soundManager.speak(item.question, { rate: speechRate });
    }, 250);
  };

  useEffect(() => {
    initRound(currentItem);
  }, [currentIndex, module.id]);

  const handlePickToken = (tokenObj: { id: string; text: string }) => {
    soundManager.playPopSound();
    soundManager.speak(tokenObj.text, { rate: speechRate });

    const newSelected = [...selectedTokens, tokenObj.text];
    setSelectedTokens(newSelected);
    setAvailableTokens(prev => prev.filter(t => t.id !== tokenObj.id));

    // Check if sentence is complete (all 4 parts placed)
    if (newSelected.length === 4) {
      const targetPattern = [
        'It is',
        `${currentItem.nounWithArticle}.`,
        `This ${currentItem.noun}`,
        `is ${currentItem.adjective}.`,
      ];

      const matches = newSelected.every((tok, idx) => tok === targetPattern[idx]);

      if (matches) {
        setIsCompleted(true);
        setIsError(false);
        soundManager.playSuccessSound();

        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          soundManager.speak(`Super! ${newSelected.join(' ')}`, { rate: speechRate });
        }, 300);

        onEarnStar();
      } else {
        setIsError(true);
        soundManager.playIncorrectSound();
        setTimeout(() => {
          soundManager.speak('Try again! Let us reset the blocks.', { rate: speechRate });
          handleReset();
        }, 1200);
      }
    }
  };

  const handleReset = () => {
    soundManager.playPopSound();
    initRound(currentItem);
  };

  const handleNext = () => {
    soundManager.playPopSound();
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-indigo-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧩</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Sentence Builder (句型积木拼图)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            点击下方拼图积木，按正确顺序拼出句子："It is... This ... is..."
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset 重置</span>
          </button>
          <div className="px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm border border-indigo-200">
            Card {(currentIndex % module.items.length) + 1} / {module.items.length}
          </div>
        </div>
      </div>

      {/* Target Picture & Question Box */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Illustration */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <ConceptIllustration type={currentItem.id} size="md" />
          <span className="mt-2 text-sm font-black text-slate-700 capitalize">
            {currentItem.adjective} {currentItem.noun}
          </span>
          <span className="text-xs text-slate-400">({currentItem.nounCn})</span>
        </div>

        {/* Right Prompt & Building Rail */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <button
              onClick={() => soundManager.speak(currentItem.question, { rate: speechRate })}
              className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm hover:bg-amber-600 transition-all shrink-0"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase">Question:</span>
              <p className="text-xl font-black text-slate-800">
                What is this?
              </p>
            </div>
          </div>

          {/* Sentence Rail (Drop Area) */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Your Sentence (拼接结果):
            </span>
            <div
              className={`min-h-[72px] p-3 rounded-2xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
                isCompleted
                  ? 'border-emerald-500 bg-emerald-50'
                  : isError
                  ? 'border-rose-400 bg-rose-50'
                  : 'border-slate-300 bg-slate-50/70'
              }`}
            >
              {selectedTokens.length === 0 ? (
                <span className="text-sm text-slate-400 font-medium italic mx-auto">
                  👇 Click the blocks below in order to build your sentence...
                </span>
              ) : (
                selectedTokens.map((tok, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-base sm:text-lg shadow-md animate-scale-up"
                  >
                    <span>{tok}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Available Scrambled Tiles */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Available Blocks (点击方块拼装):
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3 min-h-[56px]">
          {availableTokens.map((tokenObj) => (
            <button
              key={tokenObj.id}
              onClick={() => handlePickToken(tokenObj)}
              disabled={isCompleted}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-amber-100 text-slate-800 hover:text-amber-950 font-black text-base sm:text-xl border-2 border-slate-300 hover:border-amber-400 shadow-md active:scale-95 transition-all cursor-pointer ring-2 ring-transparent hover:ring-amber-200"
            >
              {tokenObj.text}
            </button>
          ))}
        </div>
      </div>

      {/* Success banner */}
      {isCompleted && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌟</span>
            <div>
              <p className="text-sm font-extrabold text-emerald-900">
                Sentence Assembled Perfectly!
              </p>
              <p className="text-xs text-emerald-700">
                "{selectedTokens.join(' ')}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => soundManager.speak(selectedTokens.join(' '), { rate: speechRate })}
              className="px-3.5 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-300 shadow-sm flex items-center gap-1"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Listen Sentence</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>Next Card 下一词</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
