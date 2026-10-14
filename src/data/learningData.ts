/**
 * Comprehensive curriculum data for the 5-part elementary English lesson
 * Adjectives: tall/short, thin/thick, straight/curved/curly, fat/thin, blonde/dark
 * Sentence structure: "What is this? It is ... This ... is ..."
 */

export interface VocabularyItem {
  id: string;
  noun: string;               // e.g. "pencil", "tree", "book", "hair", "street", "boy"
  nounWithArticle: string;    // e.g. "a pencil", "a tree", "a book", "hair", "a street", "a boy"
  nounCn: string;             // e.g. "铅笔", "大树", "书本", "头发", "街道", "男孩"
  adjective: string;          // e.g. "tall"
  adjectiveCn: string;        // e.g. "高的"
  oppositeAdjective: string;  // e.g. "short"
  oppositeId: string;
  category: 'tall_short' | 'thin_thick' | 'straight_curved_curly' | 'fat_thin' | 'blonde_dark';
  question: string;           // "What is this?"
  answerPart1: string;        // "It is a pencil."
  answerPart2: string;        // "This pencil is tall."
  fullSentence: string;       // "It is a pencil. This pencil is tall."
  phonetic: string;           // e.g. "/tɔːl/"
  sentenceTokens: string[];   // ["It is", "a pencil.", "This pencil", "is tall."]
  scrambledTokens: string[];  // randomized for building game
  accentColor: string;
  badgeEmoji: string;
}

export interface LearningModule {
  id: string;
  partNumber: number;
  title: string;
  titleCn: string;
  pairName: string;
  description: string;
  nounsCovered: string[];
  themeColor: {
    bg: string;
    border: string;
    text: string;
    pill: string;
    light: string;
    gradient: string;
  };
  items: VocabularyItem[];
  chantRhyme: {
    title: string;
    lines: string[];
  };
}

export const MODULES: LearningModule[] = [
  {
    id: 'part-1',
    partNumber: 1,
    title: 'Tall & Short',
    titleCn: '第一关：高与矮 / 长与短',
    pairName: 'Tall / Short',
    description: 'Learn to describe pencils and trees with tall and short!',
    nounsCovered: ['pencil', 'tree'],
    themeColor: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-400',
      text: 'text-emerald-700',
      pill: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      light: 'bg-emerald-50',
      gradient: 'from-emerald-400 to-teal-500',
    },
    items: [
      {
        id: 'tall-pencil',
        noun: 'pencil',
        nounWithArticle: 'a pencil',
        nounCn: '铅笔',
        adjective: 'tall',
        adjectiveCn: '长长的 / 高高的',
        oppositeAdjective: 'short',
        oppositeId: 'short-pencil',
        category: 'tall_short',
        question: 'What is this?',
        answerPart1: 'It is a pencil.',
        answerPart2: 'This pencil is tall.',
        fullSentence: 'It is a pencil. This pencil is tall.',
        phonetic: '/tɔːl/',
        sentenceTokens: ['It is', 'a pencil.', 'This pencil', 'is tall.'],
        scrambledTokens: ['This pencil', 'It is', 'is tall.', 'a pencil.'],
        accentColor: '#10B981',
        badgeEmoji: '✏️',
      },
      {
        id: 'short-pencil',
        noun: 'pencil',
        nounWithArticle: 'a pencil',
        nounCn: '铅笔',
        adjective: 'short',
        adjectiveCn: '短短的 / 矮矮的',
        oppositeAdjective: 'tall',
        oppositeId: 'tall-pencil',
        category: 'tall_short',
        question: 'What is this?',
        answerPart1: 'It is a pencil.',
        answerPart2: 'This pencil is short.',
        fullSentence: 'It is a pencil. This pencil is short.',
        phonetic: '/ʃɔːrt/',
        sentenceTokens: ['It is', 'a pencil.', 'This pencil', 'is short.'],
        scrambledTokens: ['is short.', 'a pencil.', 'It is', 'This pencil'],
        accentColor: '#F59E0B',
        badgeEmoji: '✏️',
      },
      {
        id: 'tall-tree',
        noun: 'tree',
        nounWithArticle: 'a tree',
        nounCn: '大树',
        adjective: 'tall',
        adjectiveCn: '高高的大树',
        oppositeAdjective: 'short',
        oppositeId: 'short-tree',
        category: 'tall_short',
        question: 'What is this?',
        answerPart1: 'It is a tree.',
        answerPart2: 'This tree is tall.',
        fullSentence: 'It is a tree. This tree is tall.',
        phonetic: '/tɔːl/',
        sentenceTokens: ['It is', 'a tree.', 'This tree', 'is tall.'],
        scrambledTokens: ['a tree.', 'This tree', 'It is', 'is tall.'],
        accentColor: '#059669',
        badgeEmoji: '🌳',
      },
      {
        id: 'short-tree',
        noun: 'tree',
        nounWithArticle: 'a tree',
        nounCn: '小树',
        adjective: 'short',
        adjectiveCn: '矮矮的小树',
        oppositeAdjective: 'tall',
        oppositeId: 'tall-tree',
        category: 'tall_short',
        question: 'What is this?',
        answerPart1: 'It is a tree.',
        answerPart2: 'This tree is short.',
        fullSentence: 'It is a tree. This tree is short.',
        phonetic: '/ʃɔːrt/',
        sentenceTokens: ['It is', 'a tree.', 'This tree', 'is short.'],
        scrambledTokens: ['This tree', 'is short.', 'a tree.', 'It is'],
        accentColor: '#84CC16',
        badgeEmoji: '🌱',
      },
    ],
    chantRhyme: {
      title: 'Tall & Short Chant 🎵',
      lines: [
        'Pencil, pencil, what is this?',
        'It is a pencil, tall, tall, tall!',
        'Tree, tree, what is this?',
        'It is a tree, short, short, short!',
      ],
    },
  },
  {
    id: 'part-2',
    partNumber: 2,
    title: 'Thin & Thick',
    titleCn: '第二关：薄与厚',
    pairName: 'Thin / Thick',
    description: 'Learn to describe books with thick and thin!',
    nounsCovered: ['book'],
    themeColor: {
      bg: 'bg-sky-500',
      border: 'border-sky-400',
      text: 'text-sky-700',
      pill: 'bg-sky-100 text-sky-800 border-sky-300',
      light: 'bg-sky-50',
      gradient: 'from-sky-400 to-blue-500',
    },
    items: [
      {
        id: 'thick-book',
        noun: 'book',
        nounWithArticle: 'a book',
        nounCn: '厚书 / 大词典',
        adjective: 'thick',
        adjectiveCn: '厚厚的',
        oppositeAdjective: 'thin',
        oppositeId: 'thin-book',
        category: 'thin_thick',
        question: 'What is this?',
        answerPart1: 'It is a book.',
        answerPart2: 'This book is thick.',
        fullSentence: 'It is a book. This book is thick.',
        phonetic: '/θɪk/',
        sentenceTokens: ['It is', 'a book.', 'This book', 'is thick.'],
        scrambledTokens: ['This book', 'is thick.', 'It is', 'a book.'],
        accentColor: '#0284C7',
        badgeEmoji: '📚',
      },
      {
        id: 'thin-book',
        noun: 'book',
        nounWithArticle: 'a book',
        nounCn: '薄书 / 练习册',
        adjective: 'thin',
        adjectiveCn: '薄薄的',
        oppositeAdjective: 'thick',
        oppositeId: 'thick-book',
        category: 'thin_thick',
        question: 'What is this?',
        answerPart1: 'It is a book.',
        answerPart2: 'This book is thin.',
        fullSentence: 'It is a book. This book is thin.',
        phonetic: '/θɪn/',
        sentenceTokens: ['It is', 'a book.', 'This book', 'is thin.'],
        scrambledTokens: ['a book.', 'This book', 'is thin.', 'It is'],
        accentColor: '#38BDF8',
        badgeEmoji: '📖',
      },
    ],
    chantRhyme: {
      title: 'Book Rhyme Time 🎵',
      lines: [
        'Book, book, what is this?',
        'It is a book, thick, thick, thick!',
        'Book, book, open wide,',
        'This book is thin, read with pride!',
      ],
    },
  },
  {
    id: 'part-3',
    partNumber: 3,
    title: 'Straight, Curved & Curly',
    titleCn: '第三关：笔直与弯曲 / 卷卷的',
    pairName: 'Straight / Curved & Curly',
    description: 'Learn straight and curly for hair, and straight and curved for streets!',
    nounsCovered: ['hair', 'street'],
    themeColor: {
      bg: 'bg-violet-500',
      border: 'border-violet-400',
      text: 'text-violet-700',
      pill: 'bg-violet-100 text-violet-800 border-violet-300',
      light: 'bg-violet-50',
      gradient: 'from-violet-400 to-purple-500',
    },
    items: [
      {
        id: 'straight-hair',
        noun: 'hair',
        nounWithArticle: 'hair',
        nounCn: '直发',
        adjective: 'straight',
        adjectiveCn: '顺直的',
        oppositeAdjective: 'curly',
        oppositeId: 'curly-hair',
        category: 'straight_curved_curly',
        question: 'What is this?',
        answerPart1: 'It is hair.',
        answerPart2: 'This hair is straight.',
        fullSentence: 'It is hair. This hair is straight.',
        phonetic: '/streɪt/',
        sentenceTokens: ['It is', 'hair.', 'This hair', 'is straight.'],
        scrambledTokens: ['is straight.', 'This hair', 'It is', 'hair.'],
        accentColor: '#8B5CF6',
        badgeEmoji: '💇‍♀️',
      },
      {
        id: 'curly-hair',
        noun: 'hair',
        nounWithArticle: 'hair',
        nounCn: '卷发',
        adjective: 'curly',
        adjectiveCn: '卷卷的',
        oppositeAdjective: 'straight',
        oppositeId: 'straight-hair',
        category: 'straight_curved_curly',
        question: 'What is this?',
        answerPart1: 'It is hair.',
        answerPart2: 'This hair is curly.',
        fullSentence: 'It is hair. This hair is curly.',
        phonetic: '/ˈkɜːrli/',
        sentenceTokens: ['It is', 'hair.', 'This hair', 'is curly.'],
        scrambledTokens: ['hair.', 'It is', 'This hair', 'is curly.'],
        accentColor: '#A855F7',
        badgeEmoji: '🌀',
      },
      {
        id: 'straight-street',
        noun: 'street',
        nounWithArticle: 'a street',
        nounCn: '笔直的大马路',
        adjective: 'straight',
        adjectiveCn: '笔直的',
        oppositeAdjective: 'curved',
        oppositeId: 'curved-street',
        category: 'straight_curved_curly',
        question: 'What is this?',
        answerPart1: 'It is a street.',
        answerPart2: 'This street is straight.',
        fullSentence: 'It is a street. This street is straight.',
        phonetic: '/streɪt/',
        sentenceTokens: ['It is', 'a street.', 'This street', 'is straight.'],
        scrambledTokens: ['This street', 'a street.', 'is straight.', 'It is'],
        accentColor: '#7C3AED',
        badgeEmoji: '🛣️',
      },
      {
        id: 'curved-street',
        noun: 'street',
        nounWithArticle: 'a street',
        nounCn: '弯曲的小路',
        adjective: 'curved',
        adjectiveCn: '弯曲的',
        oppositeAdjective: 'straight',
        oppositeId: 'straight-street',
        category: 'straight_curved_curly',
        question: 'What is this?',
        answerPart1: 'It is a street.',
        answerPart2: 'This street is curved.',
        fullSentence: 'It is a street. This street is curved.',
        phonetic: '/kɜːrvd/',
        sentenceTokens: ['It is', 'a street.', 'This street', 'is curved.'],
        scrambledTokens: ['is curved.', 'It is', 'This street', 'a street.'],
        accentColor: '#9333EA',
        badgeEmoji: '〰️',
      },
    ],
    chantRhyme: {
      title: 'Lines and Waves Chant 🎵',
      lines: [
        'Look at the hair, straight and neat!',
        'Look at the curls, bouncy and sweet!',
        'Down the road, straight and wide,',
        'Curved and winding, enjoy the ride!',
      ],
    },
  },
  {
    id: 'part-4',
    partNumber: 4,
    title: 'Fat & Thin',
    titleCn: '第四关：圆润与苗条 (人物)',
    pairName: 'Fat / Thin',
    description: 'Learn to describe people and characters with fat and thin!',
    nounsCovered: ['boy', 'person'],
    themeColor: {
      bg: 'bg-rose-500',
      border: 'border-rose-400',
      text: 'text-rose-700',
      pill: 'bg-rose-100 text-rose-800 border-rose-300',
      light: 'bg-rose-50',
      gradient: 'from-rose-400 to-pink-500',
    },
    items: [
      {
        id: 'fat-boy',
        noun: 'boy',
        nounWithArticle: 'a boy',
        nounCn: '胖乎乎的男孩',
        adjective: 'fat',
        adjectiveCn: '胖嘟嘟的 / 圆润的',
        oppositeAdjective: 'thin',
        oppositeId: 'thin-boy',
        category: 'fat_thin',
        question: 'What is this?',
        answerPart1: 'It is a boy.',
        answerPart2: 'This boy is fat.',
        fullSentence: 'It is a boy. This boy is fat.',
        phonetic: '/fæt/',
        sentenceTokens: ['It is', 'a boy.', 'This boy', 'is fat.'],
        scrambledTokens: ['This boy', 'is fat.', 'a boy.', 'It is'],
        accentColor: '#F43F5E',
        badgeEmoji: '👦',
      },
      {
        id: 'thin-boy',
        noun: 'boy',
        nounWithArticle: 'a boy',
        nounCn: '瘦瘦的小男孩',
        adjective: 'thin',
        adjectiveCn: '瘦瘦的 / 苗条的',
        oppositeAdjective: 'fat',
        oppositeId: 'fat-boy',
        category: 'fat_thin',
        question: 'What is this?',
        answerPart1: 'It is a boy.',
        answerPart2: 'This boy is thin.',
        fullSentence: 'It is a boy. This boy is thin.',
        phonetic: '/θɪn/',
        sentenceTokens: ['It is', 'a boy.', 'This boy', 'is thin.'],
        scrambledTokens: ['a boy.', 'It is', 'is thin.', 'This boy'],
        accentColor: '#FB7185',
        badgeEmoji: '🏃‍♂️',
      },
    ],
    chantRhyme: {
      title: 'Happy Friends Chant 🎵',
      lines: [
        'Who is this? What is this?',
        'It is a boy, full of bliss!',
        'This boy is fat, round and sweet,',
        'This boy is thin, fast on his feet!',
      ],
    },
  },
  {
    id: 'part-5',
    partNumber: 5,
    title: 'Blonde & Dark Hair',
    titleCn: '第五关：金发与黑发',
    pairName: 'Blonde / Dark',
    description: 'Learn to describe hair colors with blonde and dark!',
    nounsCovered: ['hair'],
    themeColor: {
      bg: 'bg-amber-500',
      border: 'border-amber-400',
      text: 'text-amber-800',
      pill: 'bg-amber-100 text-amber-900 border-amber-300',
      light: 'bg-amber-50',
      gradient: 'from-amber-400 to-yellow-500',
    },
    items: [
      {
        id: 'blonde-hair',
        noun: 'hair',
        nounWithArticle: 'hair',
        nounCn: '金色头发',
        adjective: 'blonde',
        adjectiveCn: '金黄色的',
        oppositeAdjective: 'dark',
        oppositeId: 'dark-hair',
        category: 'blonde_dark',
        question: 'What is this?',
        answerPart1: 'It is hair.',
        answerPart2: 'This hair is blonde.',
        fullSentence: 'It is hair. This hair is blonde.',
        phonetic: '/blɑːnd/',
        sentenceTokens: ['It is', 'hair.', 'This hair', 'is blonde.'],
        scrambledTokens: ['This hair', 'is blonde.', 'It is', 'hair.'],
        accentColor: '#D97706',
        badgeEmoji: '👱‍♀️',
      },
      {
        id: 'dark-hair',
        noun: 'hair',
        nounWithArticle: 'hair',
        nounCn: '乌黑头发',
        adjective: 'dark',
        adjectiveCn: '深色的 / 乌黑的',
        oppositeAdjective: 'blonde',
        oppositeId: 'blonde-hair',
        category: 'blonde_dark',
        question: 'What is this?',
        answerPart1: 'It is hair.',
        answerPart2: 'This hair is dark.',
        fullSentence: 'It is hair. This hair is dark.',
        phonetic: '/dɑːrk/',
        sentenceTokens: ['It is', 'hair.', 'This hair', 'is dark.'],
        scrambledTokens: ['hair.', 'This hair', 'is dark.', 'It is'],
        accentColor: '#1E293B',
        badgeEmoji: '👧🏻',
      },
    ],
    chantRhyme: {
      title: 'Hair Colors Song 🎵',
      lines: [
        'Touch your hair, what do you see?',
        'Blonde like the sun, shining for me!',
        'Dark like the night, starry and deep,',
        'Blonde and dark, smiles we keep!',
      ],
    },
  },
];

// Helper to find item by id
export function getItemById(id: string): VocabularyItem | undefined {
  for (const module of MODULES) {
    const found = module.items.find(i => i.id === id);
    if (found) return found;
  }
  return undefined;
}
