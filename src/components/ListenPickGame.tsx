import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Check, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabularyItem, LearningModule } from '../data/learningData';
import { ConceptIllustration } from './illustrations/Illustrations';
import { soundManager } from '../utils/audio';

interface ListenPickGameProps {
  module: LearningModule;
  speechRate: number;
  onEarnStar: () => void;
}

export const ListenPickGame: React.FC<ListenPickGameProps> = ({
  module,
  speechRate,
  onEarnStar,
}) => {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [targetItem, setTargetItem] = useState<VocabularyItem>(module.items[0]);
  const [options, setOptions] = useState<VocabularyItem[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Initialize or step to next question
  const setupRound = (roundIdx: number) => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setRoundCompleted(false);

    const target = module.items[roundIdx % module.items.length];
    setTargetItem(target);

    // Shuffle options: always include target + opposite or other items in the module
    const pool = [...module.items];
    const shuffled = pool.sort(() => Math.random() - 0.5);
    setOptions(shuffled);

    // Speak prompt after brief delay
    setTimeout(() => {
      soundManager.speak(`What is this? ${target.answerPart2}`, { rate: speechRate });
    }, 300);
  };

  useEffect(() => {
    setCurrentRound(0);
    setScore(0);
    setupRound(0);
  }, [module.id]);

  const handlePlayPrompt = () => {
    soundManager.playPopSound();
    soundManager.speak(`What is this? ${targetItem.answerPart2}`, { rate: speechRate });
  };

  const handleSelectOption = (item: VocabularyItem) => {
    if (selectedAnswer !== null) return; // Prevent double taps during animation
    setSelectedAnswer(item.id);

    if (item.id === targetItem.id) {
      setIsCorrect(true);
      setScore(s => s + 1);
      soundManager.playSuccessSound();

      // Trigger confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Speak confirmation sentence
      setTimeout(() => {
        soundManager.speak(`Great job! ${item.fullSentence}`, { rate: speechRate });
      }, 350);

      onEarnStar();
      setRoundCompleted(true);
    } else {
      setIsCorrect(false);
      soundManager.playIncorrectSound();
      setTimeout(() => {
        soundManager.speak(`Oops, listen again! ${targetItem.answerPart2}`, { rate: speechRate });
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPopSound();
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    setupRound(nextRound);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-200">
      {/* Game Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎧</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Listen & Pick (听音寻物)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            仔细听老师读的声音，找出对应的图片！
          </p>
        </div>

        {/* Progress & Score */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm border border-amber-200">
            Round { (currentRound % module.items.length) + 1 } / {module.items.length}
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200 flex items-center gap-1">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Score: {score}</span>
          </div>
        </div>
      </div>

      {/* Audio Prompt Box */}
      <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <button
            onClick={handlePlayPrompt}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-amber-300 transition-all group shrink-0"
            title="Listen again"
          >
            <Volume2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider uppercase block">
              Listen carefully (点击大喇叭听题):
            </span>
            <span className="text-lg sm:text-2xl font-black text-slate-900 block mt-0.5">
              "What is this? This {targetItem.noun} is {targetItem.adjective}."
            </span>
            <span className="text-xs text-amber-800">
              Which one is "{targetItem.adjective}"? Click the right picture!
            </span>
          </div>
        </div>

        <button
          onClick={handlePlayPrompt}
          className="px-4 py-2 rounded-xl bg-white text-amber-800 hover:bg-amber-100 font-bold text-xs sm:text-sm border border-amber-300 shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-4 h-4 text-amber-600" />
          <span>Repeat Sound 再听一次</span>
        </button>
      </div>

      {/* Picture Options Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${options.length > 2 ? 'md:grid-cols-4' : 'md:grid-cols-2 max-w-2xl mx-auto'} gap-4 sm:gap-6`}>
        {options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          let cardStyle = 'border-slate-200 hover:border-amber-400 hover:shadow-lg bg-slate-50/50';

          if (isSelected) {
            if (isCorrect) {
              cardStyle = 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-300 shadow-xl';
            } else {
              cardStyle = 'border-rose-400 bg-rose-50 ring-4 ring-rose-200 animate-shake';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option)}
              disabled={roundCompleted}
              className={`p-5 rounded-3xl border-3 flex flex-col items-center justify-between text-center transition-all cursor-pointer relative overflow-hidden group active:scale-98 ${cardStyle}`}
            >
              {/* Top tag */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                  {option.badgeEmoji}
                </span>
                {isSelected && isCorrect && (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Vector SVG illustration */}
              <div className="my-2 py-2 flex items-center justify-center">
                <ConceptIllustration type={option.id} size="md" />
              </div>

              {/* Text label */}
              <div className="mt-3 w-full">
                <p className="text-base sm:text-lg font-black text-slate-800 capitalize">
                  {option.adjective} {option.noun}
                </p>
                <p className="text-xs text-slate-500">
                  {option.nounCn} ({option.adjectiveCn})
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Success Banner & Next Question Button */}
      {roundCompleted && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-sm font-extrabold text-emerald-900">
                Bingo! You got it right!
              </p>
              <p className="text-xs text-emerald-700">
                "{targetItem.fullSentence}"
              </p>
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm shadow-md shadow-emerald-300 transition-all"
          >
            <span>Next Challenge 下一题</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
