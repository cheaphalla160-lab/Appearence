import React, { useState } from 'react';
import { Volume2, Sparkles, ArrowRightLeft, Music, CheckCircle2, Play } from 'lucide-react';
import { VocabularyItem, LearningModule } from '../data/learningData';
import { ConceptIllustration } from './illustrations/Illustrations';
import { soundManager } from '../utils/audio';

interface TeacherPresentationBoardProps {
  module: LearningModule;
  speechRate: number;
  onEarnStar?: () => void;
}

export const TeacherPresentationBoard: React.FC<TeacherPresentationBoardProps> = ({
  module,
  speechRate,
  onEarnStar,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(module.items[0]?.id || '');
  const [isComparing, setIsComparing] = useState<boolean>(true);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [isChanting, setIsChanting] = useState<boolean>(false);
  const [chantIndex, setChantIndex] = useState<number>(0);

  const currentItem = module.items.find(i => i.id === selectedItemId) || module.items[0];
  const oppositeItem = module.items.find(i => i.id === currentItem.oppositeId) || module.items[1];

  const handleSpeakQuestion = () => {
    soundManager.playPopSound();
    soundManager.speak(currentItem.question, { rate: speechRate });
  };

  const handleSpeakFullSentence = (item: VocabularyItem) => {
    soundManager.playPopSound();
    soundManager.speak(item.fullSentence, { rate: speechRate });
  };

  const handleSpeakWord = (word: string, index: number) => {
    soundManager.playPopSound();
    setActiveWordIndex(index);
    soundManager.speak(word, {
      rate: speechRate,
      onEnd: () => setActiveWordIndex(null),
    });
  };

  const handlePlayChant = () => {
    if (isChanting) {
      soundManager.stopSpeech();
      setIsChanting(false);
      return;
    }

    setIsChanting(true);
    setChantIndex(0);

    const lines = module.chantRhyme.lines;
    let curr = 0;

    const speakNextLine = () => {
      if (curr >= lines.length) {
        setIsChanting(false);
        soundManager.playSuccessSound();
        onEarnStar?.();
        return;
      }
      setChantIndex(curr);
      soundManager.speak(lines[curr], {
        rate: speechRate * 0.95,
        pitch: 1.1,
        onEnd: () => {
          curr++;
          setTimeout(speakNextLine, 350);
        },
      });
    };

    speakNextLine();
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Item Selector Pills */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            Choose Word:
          </span>
          {module.items.map((item) => {
            const isSelected = item.id === currentItem.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItemId(item.id);
                  soundManager.playPopSound();
                  soundManager.speak(`${item.adjective} ${item.noun}`, { rate: speechRate });
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-102'
                    : 'bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-900'
                }`}
              >
                <span>{item.badgeEmoji}</span>
                <span className="capitalize">{item.adjective} {item.noun}</span>
                <span className="text-[11px] opacity-80 font-normal">({item.nounCn})</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playPopSound();
              setIsComparing(!isComparing);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
              isComparing
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
            <span>{isComparing ? 'Side-by-Side (对比模式)' : 'Single View (单图聚焦)'}</span>
          </button>

          <button
            onClick={handlePlayChant}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all ${
              isChanting
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>{isChanting ? 'Stop Chant' : '🎵 Chant Along (师生跟读)'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left/Main Card: Current Item */}
        <div className={`${isComparing ? 'lg:col-span-6' : 'lg:col-span-12'} bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-200 flex flex-col justify-between relative overflow-hidden transition-all`}>
          <div className="absolute top-4 right-4 bg-amber-100 text-amber-900 font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-amber-300">
            Target Word
          </div>

          {/* Question Banner */}
          <div className="mb-4">
            <div className="flex items-center justify-between bg-amber-50/80 rounded-2xl p-3 sm:p-4 border border-amber-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSpeakQuestion}
                  className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-md shadow-amber-200 transition-all"
                  title="Listen to question"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <div>
                  <span className="text-xs font-bold text-amber-700 tracking-wider uppercase block">
                    Teacher Asks (提问):
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-800 font-sans">
                    What is this?
                  </span>
                  <span className="text-xs text-slate-500 ml-2 font-normal">
                    (这是什么？)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration Stage */}
          <div className="my-3 py-4 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-amber-50/30 rounded-2xl border border-slate-100">
            <ConceptIllustration type={currentItem.id} size="lg" />
            <div className="mt-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-extrabold bg-slate-900 text-white capitalize shadow-sm">
                {currentItem.adjective} {currentItem.noun}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {currentItem.phonetic}
              </span>
            </div>
          </div>

          {/* Sentence Structure Practice */}
          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sentence Practice (点击每个词可发音):
              </span>
              <button
                onClick={() => handleSpeakFullSentence(currentItem)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read Whole Sentence</span>
              </button>
            </div>

            {/* Answer Part 1 */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200 transition-all flex flex-wrap items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">
                1
              </span>
              {currentItem.answerPart1.split(' ').map((word, wIdx) => (
                <button
                  key={wIdx}
                  onClick={() => handleSpeakWord(word, wIdx)}
                  className={`text-lg sm:text-xl font-bold px-2 py-1 rounded-lg transition-all ${
                    activeWordIndex === wIdx
                      ? 'bg-amber-400 text-slate-900 scale-110 shadow-sm'
                      : 'hover:bg-amber-200 text-slate-800'
                  }`}
                >
                  {word}
                </button>
              ))}
              <span className="text-xs text-slate-400 ml-auto font-medium">
                (它是一个{currentItem.nounCn})
              </span>
            </div>

            {/* Answer Part 2 */}
            <div className="bg-amber-50 hover:bg-amber-100/60 p-3.5 rounded-2xl border-2 border-amber-300 transition-all flex flex-wrap items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black shadow-sm">
                2
              </span>
              {currentItem.answerPart2.split(' ').map((word, wIdx) => {
                const isTargetAdjective = word.toLowerCase().includes(currentItem.adjective);
                return (
                  <button
                    key={wIdx}
                    onClick={() => handleSpeakWord(word, wIdx + 10)}
                    className={`text-lg sm:text-2xl font-black px-2 py-1 rounded-lg transition-all ${
                      isTargetAdjective
                        ? 'bg-amber-400 text-amber-950 underline decoration-amber-600 decoration-wavy shadow-sm'
                        : activeWordIndex === wIdx + 10
                        ? 'bg-amber-300 text-slate-900 scale-110 shadow-sm'
                        : 'hover:bg-amber-200 text-slate-800'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
              <span className="text-xs text-amber-800 ml-auto font-medium">
                (这个{currentItem.nounCn}是{currentItem.adjectiveCn})
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: Opposite Item (When Comparing) */}
        {isComparing && oppositeItem && (
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-slate-200 flex flex-col justify-between relative overflow-hidden transition-all">
            <div className="absolute top-4 right-4 bg-slate-100 text-slate-700 font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-slate-300">
              Opposite Pair (反义词对照)
            </div>

            {/* Question Banner */}
            <div className="mb-4">
              <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      soundManager.playPopSound();
                      soundManager.speak(oppositeItem.question, { rate: speechRate });
                    }}
                    className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-800 active:scale-95 text-white flex items-center justify-center shadow-md transition-all"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <div>
                    <span className="text-xs font-bold text-slate-500 tracking-wider uppercase block">
                      Teacher Asks:
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-800">
                      What is this?
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="my-3 py-4 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-sky-50/30 rounded-2xl border border-slate-100">
              <ConceptIllustration type={oppositeItem.id} size="lg" />
              <div className="mt-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-extrabold bg-sky-600 text-white capitalize shadow-sm">
                  {oppositeItem.adjective} {oppositeItem.noun}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {oppositeItem.phonetic}
                </span>
              </div>
            </div>

            {/* Opposite Sentence Practice */}
            <div className="space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Opposite Sentence:
                </span>
                <button
                  onClick={() => handleSpeakFullSentence(oppositeItem)}
                  className="flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-100 hover:bg-sky-200 px-3 py-1 rounded-lg transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Read Whole Sentence</span>
                </button>
              </div>

              {/* Answer Part 1 */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">
                  1
                </span>
                <span className="text-lg sm:text-xl font-bold text-slate-800">
                  {oppositeItem.answerPart1}
                </span>
              </div>

              {/* Answer Part 2 */}
              <div className="bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-300 flex flex-wrap items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-black shadow-sm">
                  2
                </span>
                <span className="text-lg sm:text-2xl font-black text-slate-800">
                  {oppositeItem.answerPart2}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rhyme & Chant Board (Karaoke Style) */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 rounded-3xl p-5 sm:p-6 border-2 border-purple-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎶</span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-purple-900">
                {module.chantRhyme.title}
              </h3>
              <p className="text-xs text-purple-700">
                小学英语律动朗读：跟着节拍一起大声读！
              </p>
            </div>
          </div>

          <button
            onClick={handlePlayChant}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-200 transition-all active:scale-95"
          >
            {isChanting ? <Volume2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isChanting ? 'Reading in Progress...' : 'Start Chant 朗读带读'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {module.chantRhyme.lines.map((line, idx) => {
            const isCurrentLine = isChanting && chantIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  soundManager.playPopSound();
                  soundManager.speak(line, { rate: speechRate });
                }}
                className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                  isCurrentLine
                    ? 'bg-purple-500 text-white border-purple-600 shadow-md scale-102 font-extrabold'
                    : 'bg-white hover:bg-purple-100/60 text-slate-800 border-purple-100 font-bold'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  isCurrentLine ? 'bg-white text-purple-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-base sm:text-lg">{line}</span>
                <Volume2 className={`w-4 h-4 ml-auto opacity-70 ${isCurrentLine ? 'animate-bounce' : ''}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
