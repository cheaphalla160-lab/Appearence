import React, { useState, useEffect } from 'react';
import { Volume2, Trophy, RotateCcw, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabularyItem, LearningModule } from '../data/learningData';
import { ConceptIllustration } from './illustrations/Illustrations';
import { soundManager } from '../utils/audio';

interface MatchingGameProps {
  module: LearningModule;
  speechRate: number;
  onEarnStar: () => void;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({
  module,
  speechRate,
  onEarnStar,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sortedCards, setSortedCards] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ id: string; correct: boolean } | null>(null);

  // Collect distinct opposite adjectives in this module
  const adjectivesInModule = Array.from(new Set(module.items.map(i => i.adjective)));
  const bucketLeft = adjectivesInModule[0] || 'tall';
  const bucketRight = adjectivesInModule[1] || 'short';

  // Shuffle queue of items to sort
  const [itemQueue, setItemQueue] = useState<VocabularyItem[]>([]);

  const initGame = () => {
    const queue = [...module.items, ...module.items]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setItemQueue(queue);
    setCurrentIndex(0);
    setSortedCards([]);
    setIsCompleted(false);
    setFeedback(null);
  };

  useEffect(() => {
    initGame();
  }, [module.id]);

  const currentCard = itemQueue[currentIndex];

  const handleSortIntoBucket = (chosenAdjective: string) => {
    if (!currentCard || feedback !== null) return;

    soundManager.playPopSound();
    const isCorrect = currentCard.adjective.toLowerCase() === chosenAdjective.toLowerCase();

    if (isCorrect) {
      setFeedback({ id: currentCard.id, correct: true });
      soundManager.playSuccessSound();

      setTimeout(() => {
        soundManager.speak(currentCard.answerPart2, { rate: speechRate });
        const nextIdx = currentIndex + 1;
        setSortedCards(prev => [...prev, currentCard.id]);
        setFeedback(null);

        if (nextIdx >= itemQueue.length) {
          setIsCompleted(true);
          soundManager.playFanfareSound();
          confetti({
            particleCount: 90,
            spread: 90,
            origin: { y: 0.5 },
          });
          onEarnStar();
        } else {
          setCurrentIndex(nextIdx);
        }
      }, 500);
    } else {
      setFeedback({ id: currentCard.id, correct: false });
      soundManager.playIncorrectSound();
      setTimeout(() => {
        soundManager.speak(`Look carefully! This ${currentCard.noun} is ${currentCard.adjective}.`, { rate: speechRate });
        setFeedback(null);
      }, 900);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-purple-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Sorting Arena (分类大比拼)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            将出现的图片点击放入正确的词语框中！
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-900 font-bold text-xs sm:text-sm border border-purple-200">
            Card {Math.min(currentIndex + 1, itemQueue.length)} / {itemQueue.length}
          </div>
          <button
            onClick={initGame}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isCompleted && currentCard ? (
        <div className="my-6 max-w-2xl mx-auto flex flex-col items-center">
          {/* Card to sort */}
          <div
            className={`p-6 rounded-3xl border-3 flex flex-col items-center justify-center transition-all bg-white shadow-xl ${
              feedback?.correct === true
                ? 'border-emerald-500 ring-4 ring-emerald-300 scale-105'
                : feedback?.correct === false
                ? 'border-rose-400 ring-4 ring-rose-200 animate-shake'
                : 'border-slate-300'
            }`}
          >
            <ConceptIllustration type={currentCard.id} size="md" />
            <div className="mt-3 text-center">
              <span className="text-sm font-bold text-slate-400 block uppercase">
                What is this?
              </span>
              <span className="text-lg font-black text-slate-800">
                It is {currentCard.nounWithArticle}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 my-4 font-bold tracking-wider uppercase">
            👇 Choose the matching box:
          </p>

          {/* Two Sorting Buckets */}
          <div className="w-full grid grid-cols-2 gap-4 sm:gap-6">
            <button
              onClick={() => handleSortIntoBucket(bucketLeft)}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-sky-50 to-blue-100 hover:from-sky-100 hover:to-blue-200 border-3 border-blue-400 text-center shadow-lg active:scale-95 transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold text-blue-600 uppercase block mb-1">
                Category A
              </span>
              <span className="text-xl sm:text-2xl font-black text-blue-950 capitalize group-hover:scale-105 transition-transform block">
                {bucketLeft}
              </span>
              <span className="text-xs text-blue-700 font-medium">
                Tap to Sort
              </span>
            </button>

            <button
              onClick={() => handleSortIntoBucket(bucketRight)}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-100 hover:from-amber-100 hover:to-orange-200 border-3 border-orange-400 text-center shadow-lg active:scale-95 transition-all cursor-pointer group"
            >
              <span className="text-xs font-bold text-orange-600 uppercase block mb-1">
                Category B
              </span>
              <span className="text-xl sm:text-2xl font-black text-orange-950 capitalize group-hover:scale-105 transition-transform block">
                {bucketRight}
              </span>
              <span className="text-xs text-orange-700 font-medium">
                Tap to Sort
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Completion celebration */
        <div className="my-8 text-center py-6 bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200 p-6">
          <span className="text-5xl">🏆</span>
          <h3 className="text-2xl font-black text-purple-950 mt-2">
            Fantastic Sorting Champion!
          </h3>
          <p className="text-sm text-purple-700 mt-1">
            你已经完成了所有单词的分类挑战！
          </p>

          <button
            onClick={initGame}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base shadow-lg shadow-purple-300 active:scale-95 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again 重新挑战</span>
          </button>
        </div>
      )}
    </div>
  );
};
