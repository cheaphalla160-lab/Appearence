import React, { useState } from 'react';
import { Volume2, Sparkles, Sliders, RefreshCw, Wand2 } from 'lucide-react';
import { LearningModule } from '../data/learningData';
import { ConceptIllustration } from './illustrations/Illustrations';
import { soundManager } from '../utils/audio';

interface MagicMorphLabProps {
  module: LearningModule;
  speechRate: number;
}

export const MagicMorphLab: React.FC<MagicMorphLabProps> = ({ module, speechRate }) => {
  // slider value: 0 is option A (e.g. short, thin), 1 is option B (tall, thick)
  const [sliderVal, setSliderVal] = useState<number>(0);
  const [selectedNounIndex, setSelectedNounIndex] = useState<number>(0);

  // Group items by noun
  const itemsForNoun = module.items.filter((item, idx) => {
    if (module.nounsCovered.length > 1) {
      return item.noun === module.nounsCovered[selectedNounIndex];
    }
    return true;
  });

  const itemA = itemsForNoun[0] || module.items[0];
  const itemB = itemsForNoun[1] || module.items[1] || itemA;

  const isBActive = sliderVal >= 0.5;
  const currentActiveItem = isBActive ? itemB : itemA;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSliderVal(val);
  };

  const handleSliderEnd = () => {
    const targetItem = sliderVal >= 0.5 ? itemB : itemA;
    soundManager.playPopSound();
    soundManager.speak(targetItem.fullSentence, { rate: speechRate });
  };

  const handleSpeakCurrent = () => {
    soundManager.playPopSound();
    soundManager.speak(currentActiveItem.fullSentence, { rate: speechRate });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪄</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Magic Transformer Lab (神奇变身实验室)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            拖动神奇魔法滑块，观察物体在两极之间的奇妙变化！
          </p>
        </div>

        {/* Noun switcher if module has multiple nouns */}
        {module.nounsCovered.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Object:</span>
            {module.nounsCovered.map((noun, idx) => (
              <button
                key={noun}
                onClick={() => {
                  setSelectedNounIndex(idx);
                  soundManager.playPopSound();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all ${
                  selectedNounIndex === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {noun}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="my-8 max-w-xl mx-auto flex flex-col items-center">
        {/* Dynamic morph display */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-slate-50 to-emerald-50/40 border-2 border-slate-200 shadow-inner">
          <div
            className="transition-all duration-300 transform"
            style={{
              transform: `scale(${0.9 + sliderVal * 0.15})`,
              filter: `drop-shadow(0 10px 15px rgba(0,0,0,0.08))`,
            }}
          >
            <ConceptIllustration type={currentActiveItem.id} size="lg" />
          </div>

          <div className="absolute bottom-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm text-xs font-black capitalize text-slate-800">
            {currentActiveItem.adjective} {currentActiveItem.noun}
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="w-full mt-8 space-y-3 px-4">
          <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-600">
            <span className={`px-2.5 py-1 rounded-lg transition-all ${!isBActive ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-black scale-105' : ''}`}>
              ⬅️ {itemA.adjective.toUpperCase()} ({itemA.adjectiveCn})
            </span>
            <span className={`px-2.5 py-1 rounded-lg transition-all ${isBActive ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-black scale-105' : ''}`}>
              {itemB.adjective.toUpperCase()} ({itemB.adjectiveCn}) ➡️
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sliderVal}
              onChange={handleSliderChange}
              onMouseUp={handleSliderEnd}
              onTouchEnd={handleSliderEnd}
              className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-600 transition-all"
            />
          </div>

          <p className="text-center text-xs text-slate-400">
            👈 Drag left or right to morph 👉
          </p>
        </div>

        {/* Dynamic Sentence Banner */}
        <div className="w-full mt-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSpeakCurrent}
              className="w-12 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-200 active:scale-95 transition-all shrink-0"
              title="Speak sentence"
            >
              <Volume2 className="w-6 h-6" />
            </button>
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase">
                Dynamic Sentence:
              </p>
              <p className="text-base sm:text-xl font-black text-slate-800">
                {currentActiveItem.answerPart1}{' '}
                <span className="text-emerald-700 underline decoration-emerald-400">
                  {currentActiveItem.answerPart2}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={handleSpeakCurrent}
            className="px-4 py-2 rounded-xl bg-white text-slate-800 font-bold text-xs sm:text-sm border border-amber-300 shadow-sm hover:bg-amber-100 shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Read Aloud</span>
          </button>
        </div>
      </div>
    </div>
  );
};
