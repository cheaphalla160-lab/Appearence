import React from 'react';

interface IllustrationProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const ConceptIllustration: React.FC<IllustrationProps> = ({
  type,
  className = '',
  size = 'lg',
  animated = true,
}) => {
  // Size classes
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-56 h-56 md:w-64 md:h-64',
    xl: 'w-72 h-72 md:w-80 md:h-80',
  };

  const containerClass = `relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`;

  switch (type) {
    // ----------------------------------------
    // Part 1: Tall / Short (Pencil, Tree)
    // ----------------------------------------
    case 'tall-pencil':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="pencilYellowTall" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="ferruleSilver" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
            </defs>
            {/* Height measurement guideline */}
            <g opacity="0.45" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
              <line x1="25" y1="20" x2="25" y2="260" />
              <line x1="15" y1="20" x2="35" y2="20" />
              <line x1="15" y1="260" x2="35" y2="260" />
            </g>
            <text x="18" y="145" fill="#059669" fontSize="12" fontWeight="bold" transform="rotate(-90 18 145)">TALL 📏</text>

            {/* Eraser */}
            <rect x="75" y="25" width="50" height="30" rx="8" fill="#F472B6" />
            {/* Ferrule */}
            <rect x="73" y="55" width="54" height="20" rx="3" fill="url(#ferruleSilver)" />
            <line x1="75" y1="62" x2="125" y2="62" stroke="#475569" strokeWidth="1.5" />
            <line x1="75" y1="68" x2="125" y2="68" stroke="#475569" strokeWidth="1.5" />

            {/* Tall Body */}
            <rect x="75" y="75" width="50" height="150" fill="url(#pencilYellowTall)" rx="3" />
            <line x1="91" y1="75" x2="91" y2="225" stroke="#D97706" strokeWidth="2" />
            <line x1="108" y1="75" x2="108" y2="225" stroke="#FDE68A" strokeWidth="2" />

            {/* Cute Face on Pencil */}
            <circle cx="90" cy="110" r="3.5" fill="#1E293B" />
            <circle cx="110" cy="110" r="3.5" fill="#1E293B" />
            <circle cx="89" cy="109" r="1" fill="#FFFFFF" />
            <circle cx="109" cy="109" r="1" fill="#FFFFFF" />
            <path d="M 94 118 Q 100 124 106 118" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="84" cy="116" rx="3" ry="2" fill="#F472B6" opacity="0.6" />
            <ellipse cx="116" cy="116" rx="3" ry="2" fill="#F472B6" opacity="0.6" />

            {/* Wood sharpened cone */}
            <polygon points="75,225 125,225 100,265" fill="#FDE68A" />
            {/* Graphite tip */}
            <polygon points="92,252 108,252 100,265" fill="#334155" />

            {/* Star sparkles */}
            <polygon points="145,45 148,53 156,56 148,59 145,67 142,59 134,56 142,53" fill="#FBBF24" />
            <polygon points="152,110 154,115 159,117 154,119 152,124 150,119 145,117 150,115" fill="#34D399" />
          </svg>
        </div>
      );

    case 'short-pencil':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-md">
            {/* Height measurement guideline */}
            <g opacity="0.45" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4">
              <line x1="25" y1="130" x2="25" y2="260" />
              <line x1="15" y1="130" x2="35" y2="130" />
              <line x1="15" y1="260" x2="35" y2="260" />
            </g>
            <text x="18" y="200" fill="#D97706" fontSize="12" fontWeight="bold" transform="rotate(-90 18 200)">SHORT ✏️</text>

            {/* Eraser */}
            <rect x="75" y="135" width="50" height="25" rx="8" fill="#F472B6" />
            {/* Ferrule */}
            <rect x="73" y="160" width="54" height="15" rx="3" fill="#94A3B8" />

            {/* Short stubby body */}
            <rect x="75" y="175" width="50" height="50" fill="#FBBF24" rx="3" />
            <line x1="91" y1="175" x2="91" y2="225" stroke="#D97706" strokeWidth="2" />
            <line x1="108" y1="175" x2="108" y2="225" stroke="#FDE68A" strokeWidth="2" />

            {/* Chubby cute face */}
            <circle cx="90" cy="192" r="3.5" fill="#1E293B" />
            <circle cx="110" cy="192" r="3.5" fill="#1E293B" />
            <circle cx="89" cy="191" r="1" fill="#FFFFFF" />
            <circle cx="109" cy="191" r="1" fill="#FFFFFF" />
            <path d="M 94 200 Q 100 205 106 200" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="84" cy="197" rx="3" ry="2" fill="#F472B6" opacity="0.6" />
            <ellipse cx="116" cy="197" rx="3" ry="2" fill="#F472B6" opacity="0.6" />

            {/* Wood sharpened cone */}
            <polygon points="75,225 125,225 100,265" fill="#FDE68A" />
            {/* Graphite tip */}
            <polygon points="92,252 108,252 100,265" fill="#334155" />
          </svg>
        </div>
      );

    case 'tall-tree':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-md">
            {/* Height guideline */}
            <g opacity="0.45" stroke="#059669" strokeWidth="2" strokeDasharray="4 4">
              <line x1="20" y1="15" x2="20" y2="265" />
              <line x1="10" y1="15" x2="30" y2="15" />
              <line x1="10" y1="265" x2="30" y2="265" />
            </g>
            <text x="14" y="145" fill="#047857" fontSize="12" fontWeight="bold" transform="rotate(-90 14 145)">TALL TREE 🌳</text>

            {/* Tall Trunk */}
            <path d="M 90 130 L 85 265 L 115 265 L 110 130 Z" fill="#78350F" />
            <path d="M 95 160 Q 98 200 96 240" stroke="#92400E" strokeWidth="2.5" fill="none" />
            <path d="M 105 180 Q 102 210 104 250" stroke="#92400E" strokeWidth="2" fill="none" />

            {/* Green Grass Mound */}
            <ellipse cx="100" cy="265" rx="45" ry="12" fill="#10B981" />

            {/* Foliage - Layer 3 (Back) */}
            <circle cx="100" cy="70" r="50" fill="#047857" />
            {/* Foliage - Layer 2 (Middle) */}
            <circle cx="68" cy="115" r="42" fill="#059669" />
            <circle cx="132" cy="115" r="42" fill="#059669" />
            {/* Foliage - Layer 1 (Front bright) */}
            <circle cx="100" cy="100" r="48" fill="#10B981" />

            {/* Apples on tree */}
            <circle cx="75" cy="85" r="6" fill="#EF4444" />
            <circle cx="125" cy="80" r="6" fill="#EF4444" />
            <circle cx="95" cy="125" r="6" fill="#EF4444" />
            <circle cx="135" cy="120" r="6" fill="#EF4444" />

            {/* Friendly Little Bird */}
            <circle cx="65" cy="55" r="8" fill="#38BDF8" />
            <polygon points="58,55 52,53 58,58" fill="#F59E0B" />
            <circle cx="63" cy="53" r="1.5" fill="#0F172A" />
          </svg>
        </div>
      );

    case 'short-tree':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-md">
            {/* Height guideline */}
            <g opacity="0.45" stroke="#84CC16" strokeWidth="2" strokeDasharray="4 4">
              <line x1="20" y1="160" x2="20" y2="265" />
              <line x1="10" y1="160" x2="30" y2="160" />
              <line x1="10" y1="265" x2="30" y2="265" />
            </g>
            <text x="14" y="215" fill="#65A30D" fontSize="12" fontWeight="bold" transform="rotate(-90 14 215)">SHORT 🌱</text>

            {/* Plant Pot */}
            <polygon points="70,225 130,225 122,265 78,265" fill="#EA580C" />
            <rect x="66" y="220" width="68" height="10" rx="3" fill="#C2410C" />
            {/* Pot cute smiley */}
            <circle cx="92" cy="245" r="2.5" fill="#FFFFFF" />
            <circle cx="108" cy="245" r="2.5" fill="#FFFFFF" />
            <path d="M 96 250 Q 100 254 104 250" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Little short trunk */}
            <rect x="94" y="195" width="12" height="30" fill="#78350F" rx="3" />

            {/* Cute compact round canopy */}
            <circle cx="100" cy="180" r="32" fill="#84CC16" />
            <circle cx="85" cy="175" r="22" fill="#65A30D" />
            <circle cx="115" cy="175" r="22" fill="#65A30D" />
            <circle cx="100" cy="165" r="24" fill="#A3E635" />

            {/* Little pink blossom */}
            <circle cx="100" cy="155" r="5" fill="#F472B6" />
            <circle cx="100" cy="155" r="2" fill="#FEF08A" />
          </svg>
        </div>
      );

    // ----------------------------------------
    // Part 2: Thin / Thick (Book)
    // ----------------------------------------
    case 'thick-book':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-lg">
            {/* Thick stack of pages indicator */}
            <g opacity="0.6" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3">
              <line x1="210" y1="80" x2="210" y2="185" />
              <line x1="205" y1="80" x2="215" y2="80" />
              <line x1="205" y1="185" x2="215" y2="185" />
            </g>
            <text x="215" y="135" fill="#0369A1" fontSize="11" fontWeight="bold">THICK 📖</text>

            {/* Thick Book Isometric/Perspective Angle */}
            {/* Pages block (white/creamy with lines) */}
            <path d="M 45 130 L 140 185 L 195 155 L 105 100 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            {/* Page edge texture layers */}
            <path d="M 140 185 L 140 135 L 195 105 L 195 155 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="140" y1="145" x2="195" y2="115" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="140" y1="155" x2="195" y2="125" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="140" y1="165" x2="195" y2="135" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="140" y1="175" x2="195" y2="145" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Bottom cover */}
            <path d="M 40 185 L 138 238 L 198 205 L 198 198 L 138 230 L 40 178 Z" fill="#1E3A8A" />

            {/* Thick spine */}
            <path d="M 40 120 L 40 180 L 138 238 L 138 180 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
            <line x1="45" y1="135" x2="133" y2="188" stroke="#60A5FA" strokeWidth="3" />
            <line x1="45" y1="165" x2="133" y2="218" stroke="#60A5FA" strokeWidth="3" />

            {/* Top hardcover */}
            <path d="M 40 120 L 100 65 L 195 95 L 138 152 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />

            {/* Gold emblem on cover */}
            <polygon points="120,95 123,103 131,105 125,111 127,119 120,115 113,119 115,111 109,105 117,103" fill="#FBBF24" />

            {/* Red bookmark ribbon */}
            <path d="M 100 65 Q 110 50 115 45 L 122 48 L 118 68 Z" fill="#EF4444" />
            <path d="M 170 140 Q 180 170 175 190 L 182 195 L 180 170 Z" fill="#EF4444" />
          </svg>
        </div>
      );

    case 'thin-book':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
            {/* Thin indicator */}
            <g opacity="0.6" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3">
              <line x1="210" y1="140" x2="210" y2="165" />
              <line x1="205" y1="140" x2="215" y2="140" />
              <line x1="205" y1="165" x2="215" y2="165" />
            </g>
            <text x="215" y="156" fill="#0284C7" fontSize="11" fontWeight="bold">THIN 📄</text>

            {/* Thin Single Booklet / Workbook */}
            {/* Thin pages edge */}
            <path d="M 140 160 L 140 152 L 195 122 L 195 130 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />

            {/* Bottom cover */}
            <path d="M 40 152 L 138 208 L 198 178 L 140 160 Z" fill="#0284C7" />

            {/* Thin spine */}
            <path d="M 40 142 L 40 152 L 138 208 L 138 198 Z" fill="#0EA5E9" />

            {/* Top cover */}
            <path d="M 40 142 L 100 87 L 195 117 L 138 174 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />

            {/* Cover illustration on thin workbook */}
            <circle cx="120" cy="130" r="14" fill="#BAE6FD" />
            <path d="M 112 130 Q 120 138 128 130" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="116" cy="126" r="1.5" fill="#0369A1" />
            <circle cx="124" cy="126" r="1.5" fill="#0369A1" />
          </svg>
        </div>
      );

    // ----------------------------------------
    // Part 3: Straight / Curved & Curly
    // ----------------------------------------
    case 'straight-hair':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
            {/* Guide line */}
            <line x1="25" y1="60" x2="25" y2="190" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
            <text x="18" y="130" fill="#7C3AED" fontSize="10" fontWeight="bold" transform="rotate(-90 18 130)">STRAIGHT ||</text>

            {/* Cute Cartoon Face */}
            <circle cx="100" cy="115" r="45" fill="#FED7AA" />
            <ellipse cx="78" cy="125" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
            <ellipse cx="122" cy="125" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
            <circle cx="85" cy="112" r="4" fill="#1E293B" />
            <circle cx="115" cy="112" r="4" fill="#1E293B" />
            <circle cx="84" cy="110" r="1.5" fill="#FFFFFF" />
            <circle cx="114" cy="110" r="1.5" fill="#FFFFFF" />
            <path d="M 94 125 Q 100 132 106 125" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Straight Hair: Sleek, glossy, flat vertical strands */}
            {/* Back hair */}
            <rect x="52" y="75" width="96" height="115" rx="10" fill="#7C3AED" />

            {/* Hair bangs straight */}
            <path d="M 52 100 Q 100 65 148 100 L 148 70 Q 100 45 52 70 Z" fill="#6D28D9" />
            <rect x="58" y="70" width="84" height="26" fill="#7C3AED" />

            {/* Straight vertical strands */}
            <line x1="60" y1="90" x2="60" y2="185" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="95" x2="70" y2="190" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
            <line x1="130" y1="95" x2="130" y2="190" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
            <line x1="140" y1="90" x2="140" y2="185" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />

            {/* Hair clip */}
            <circle cx="62" cy="85" r="7" fill="#F43F5E" />
            <circle cx="62" cy="85" r="3" fill="#FECDD3" />
          </svg>
        </div>
      );

    case 'curly-hair':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
            {/* Spiral guide indicator */}
            <path d="M 22 80 Q 28 90 22 100 Q 16 110 22 120 Q 28 130 22 140 Q 16 150 22 160" stroke="#A855F7" strokeWidth="2.5" fill="none" opacity="0.6" />
            <text x="16" y="180" fill="#9333EA" fontSize="9" fontWeight="bold">CURLY 🌀</text>

            {/* Cute Cartoon Face */}
            <circle cx="100" cy="115" r="45" fill="#FED7AA" />
            <ellipse cx="78" cy="125" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
            <ellipse cx="122" cy="125" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
            <circle cx="85" cy="112" r="4" fill="#1E293B" />
            <circle cx="115" cy="112" r="4" fill="#1E293B" />
            <circle cx="84" cy="110" r="1.5" fill="#FFFFFF" />
            <circle cx="114" cy="110" r="1.5" fill="#FFFFFF" />
            <path d="M 94 125 Q 100 132 106 125" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Curly voluminous Hair: bouncy round spirals */}
            {/* Top curls */}
            <circle cx="65" cy="65" r="22" fill="#7E22CE" />
            <circle cx="90" cy="55" r="24" fill="#9333EA" />
            <circle cx="115" cy="55" r="24" fill="#7E22CE" />
            <circle cx="138" cy="65" r="22" fill="#9333EA" />

            {/* Side bouncy coils */}
            <circle cx="52" cy="90" r="20" fill="#9333EA" />
            <circle cx="48" cy="120" r="22" fill="#7E22CE" />
            <circle cx="54" cy="150" r="20" fill="#9333EA" />
            <circle cx="50" cy="175" r="16" fill="#A855F7" />

            <circle cx="148" cy="90" r="20" fill="#7E22CE" />
            <circle cx="152" cy="120" r="22" fill="#9333EA" />
            <circle cx="146" cy="150" r="20" fill="#7E22CE" />
            <circle cx="150" cy="175" r="16" fill="#A855F7" />

            {/* Swirl highlights */}
            <path d="M 45 115 Q 52 110 52 125 Q 46 130 50 140" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 148 115 Q 155 110 155 125 Q 148 130 152 140" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'straight-street':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
            {/* Sky */}
            <rect x="15" y="15" width="210" height="90" rx="12" fill="#E0F2FE" />
            {/* Sun */}
            <circle cx="190" cy="45" r="16" fill="#FBBF24" />
            <circle cx="50" cy="50" r="12" fill="#FFFFFF" opacity="0.8" />
            <circle cx="65" cy="46" r="16" fill="#FFFFFF" opacity="0.8" />

            {/* Mountains in background */}
            <polygon points="30,105 85,55 140,105" fill="#93C5FD" opacity="0.5" />
            <polygon points="110,105 160,65 210,105" fill="#60A5FA" opacity="0.4" />

            {/* Green Hills & grass */}
            <rect x="15" y="105" width="210" height="120" rx="8" fill="#10B981" />

            {/* Straight Road perspective */}
            <polygon points="105,105 135,105 185,225 55,225" fill="#475569" />
            {/* Curbs */}
            <line x1="105" y1="105" x2="55" y2="225" stroke="#CBD5E1" strokeWidth="3" />
            <line x1="135" y1="105" x2="185" y2="225" stroke="#CBD5E1" strokeWidth="3" />

            {/* Dashed center line - Perfectly straight */}
            <line x1="120" y1="110" x2="120" y2="125" stroke="#FDE047" strokeWidth="2" />
            <line x1="120" y1="135" x2="120" y2="155" stroke="#FDE047" strokeWidth="3" />
            <line x1="120" y1="168" x2="120" y2="192" stroke="#FDE047" strokeWidth="4" />
            <line x1="120" y1="205" x2="120" y2="225" stroke="#FDE047" strokeWidth="5" />

            {/* Trees lined up straight along the road */}
            <circle cx="70" cy="140" r="10" fill="#059669" />
            <line x1="70" y1="140" x2="70" y2="160" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="45" cy="180" r="15" fill="#059669" />
            <line x1="45" y1="180" x2="45" y2="205" stroke="#78350F" strokeWidth="3.5" />

            <circle cx="170" cy="140" r="10" fill="#059669" />
            <line x1="170" y1="140" x2="170" y2="160" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="195" cy="180" r="15" fill="#059669" />
            <line x1="195" y1="180" x2="195" y2="205" stroke="#78350F" strokeWidth="3.5" />
          </svg>
        </div>
      );

    case 'curved-street':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
            {/* Sky */}
            <rect x="15" y="15" width="210" height="85" rx="12" fill="#E0F2FE" />
            <circle cx="45" cy="45" r="14" fill="#FBBF24" />

            {/* Rolling green landscape */}
            <rect x="15" y="90" width="210" height="135" rx="8" fill="#34D399" />
            <ellipse cx="60" cy="130" rx="55" ry="35" fill="#10B981" />
            <ellipse cx="180" cy="150" rx="55" ry="40" fill="#059669" opacity="0.3" />

            {/* Winding / Curved Road */}
            <path
              d="M 120 90 Q 70 120 80 150 Q 90 180 160 185 Q 200 190 180 225 L 140 225 Q 150 205 130 195 Q 50 170 50 140 Q 50 105 105 90 Z"
              fill="#475569"
            />

            {/* Curved dashed center line */}
            <path
              d="M 112 92 Q 62 125 65 145 Q 70 175 145 190 Q 170 195 160 225"
              fill="none"
              stroke="#FDE047"
              strokeWidth="3.5"
              strokeDasharray="9 7"
            />

            {/* Road sign: Curved Road */}
            <polygon points="195,85 215,105 195,125 175,105" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <path d="M 190 115 Q 200 110 195 105 Q 190 100 200 95" stroke="#1E293B" strokeWidth="2" fill="none" />
            <line x1="195" y1="125" x2="195" y2="150" stroke="#64748B" strokeWidth="3" />

            {/* Flowers along curve */}
            <circle cx="100" cy="130" r="4" fill="#F43F5E" />
            <circle cx="130" cy="165" r="4" fill="#EC4899" />
            <circle cx="70" cy="180" r="4" fill="#8B5CF6" />
          </svg>
        </div>
      );

    // ----------------------------------------
    // Part 4: Fat / Thin (People / Boy)
    // ----------------------------------------
    case 'fat-boy':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 220 260" className="w-full h-full drop-shadow-md">
            {/* Guide circle showing fullness */}
            <circle cx="110" cy="160" r="50" stroke="#FB7185" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.4" />
            <text x="110" y="235" textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">FAT 👦</text>

            {/* Legs */}
            <rect x="85" y="195" width="20" height="35" rx="8" fill="#3B82F6" />
            <rect x="115" y="195" width="20" height="35" rx="8" fill="#3B82F6" />
            {/* Red Shoes */}
            <ellipse cx="90" cy="230" rx="15" ry="8" fill="#EF4444" />
            <ellipse cx="130" cy="230" rx="15" ry="8" fill="#EF4444" />

            {/* Round Chubby Tummy & Body */}
            <ellipse cx="110" cy="160" rx="46" ry="42" fill="#F43F5E" />
            {/* Cheerful stripes on shirt */}
            <path d="M 72 150 Q 110 165 148 150" stroke="#FECDD3" strokeWidth="5" fill="none" />
            <path d="M 68 170 Q 110 185 152 170" stroke="#FECDD3" strokeWidth="5" fill="none" />

            {/* Arms - Left waving, Right holding snack */}
            <circle cx="62" cy="150" r="14" fill="#FED7AA" />
            <circle cx="158" cy="150" r="14" fill="#FED7AA" />
            {/* Yummy shiny apple in hand */}
            <circle cx="160" cy="148" r="9" fill="#DC2626" />
            <path d="M 160 139 Q 163 134 165 133" stroke="#15803D" strokeWidth="2" fill="none" />

            {/* Round smiling face */}
            <circle cx="110" cy="85" r="36" fill="#FED7AA" />
            {/* Chubby Rosy Cheeks */}
            <ellipse cx="86" cy="95" rx="7" ry="5" fill="#FDA4AF" />
            <ellipse cx="134" cy="95" rx="7" ry="5" fill="#FDA4AF" />
            {/* Eyes */}
            <circle cx="94" cy="82" r="4" fill="#1E293B" />
            <circle cx="126" cy="82" r="4" fill="#1E293B" />
            <circle cx="93" cy="80" r="1.5" fill="#FFFFFF" />
            <circle cx="125" cy="80" r="1.5" fill="#FFFFFF" />
            {/* Big happy mouth */}
            <path d="M 98 94 Q 110 108 122 94 Z" fill="#E11D48" />

            {/* Brown Hair cap */}
            <path d="M 75 78 Q 110 40 145 78 Q 148 60 135 52 Q 110 45 85 52 Z" fill="#78350F" />
          </svg>
        </div>
      );

    case 'thin-boy':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 220 260" className="w-full h-full drop-shadow-md">
            {/* Thin guide line */}
            <g opacity="0.4" stroke="#F43F5E" strokeWidth="2" strokeDasharray="3 3">
              <line x1="88" y1="120" x2="88" y2="200" />
              <line x1="132" y1="120" x2="132" y2="200" />
            </g>
            <text x="110" y="235" textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">THIN 🏃</text>

            {/* Long slender legs */}
            <rect x="96" y="180" width="10" height="48" rx="4" fill="#2563EB" />
            <rect x="114" y="180" width="10" height="48" rx="4" fill="#2563EB" />
            {/* Running shoes */}
            <ellipse cx="98" cy="228" rx="12" ry="6" fill="#F59E0B" />
            <ellipse cx="124" cy="228" rx="12" ry="6" fill="#F59E0B" />

            {/* Lean, slender torso */}
            <rect x="94" y="125" width="32" height="60" rx="8" fill="#FB7185" />
            <line x1="110" y1="125" x2="110" y2="185" stroke="#FFE4E6" strokeWidth="2" />

            {/* Arms - Slender, sporty thumbs up */}
            <path d="M 94 135 Q 75 145 78 165" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="78" cy="168" r="5" fill="#FED7AA" />
            <path d="M 126 135 Q 145 130 148 115" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="148" cy="112" r="5" fill="#FED7AA" />

            {/* Lean face */}
            <circle cx="110" cy="85" r="28" fill="#FED7AA" />
            <circle cx="100" cy="83" r="3.5" fill="#1E293B" />
            <circle cx="120" cy="83" r="3.5" fill="#1E293B" />
            <circle cx="99" cy="81" r="1.2" fill="#FFFFFF" />
            <circle cx="119" cy="81" r="1.2" fill="#FFFFFF" />
            <path d="M 103 93 Q 110 99 117 93" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="94" cy="90" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.6" />
            <ellipse cx="126" cy="90" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.6" />

            {/* Hair with sporty headband */}
            <path d="M 83 80 Q 110 50 137 80 Q 135 60 110 55 Q 85 60 83 80 Z" fill="#92400E" />
            <rect x="85" y="70" width="50" height="7" rx="3" fill="#3B82F6" />
          </svg>
        </div>
      );

    // ----------------------------------------
    // Part 5: Blonde / Dark (Hair)
    // ----------------------------------------
    case 'blonde-hair':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
            {/* Sparkles indicating golden shine */}
            <polygon points="45,45 47,52 54,54 47,56 45,63 43,56 36,54 43,52" fill="#F59E0B" />
            <polygon points="155,50 157,56 163,58 157,60 155,66 153,60 147,58 153,56" fill="#FBBF24" />
            <text x="100" y="232" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="bold">BLONDE ✨</text>

            {/* Face */}
            <circle cx="100" cy="118" r="42" fill="#FEF08A" opacity="0.2" />
            <circle cx="100" cy="120" r="40" fill="#FED7AA" />
            <ellipse cx="80" cy="128" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
            <ellipse cx="120" cy="128" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
            <circle cx="86" cy="116" r="3.5" fill="#1E293B" />
            <circle cx="114" cy="116" r="3.5" fill="#1E293B" />
            <circle cx="85" cy="114" r="1" fill="#FFFFFF" />
            <circle cx="113" cy="114" r="1" fill="#FFFFFF" />
            <path d="M 94 128 Q 100 135 106 128" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Bright Golden Blonde Hair */}
            {/* Back hair layers */}
            <path d="M 50 110 Q 40 160 55 190 Q 75 195 80 165 Z" fill="#FBBF24" />
            <path d="M 150 110 Q 160 160 145 190 Q 125 195 120 165 Z" fill="#FBBF24" />

            {/* Main Blonde Canopy */}
            <circle cx="100" cy="85" r="45" fill="#FACC15" />
            <circle cx="70" cy="90" r="30" fill="#F59E0B" />
            <circle cx="130" cy="90" r="30" fill="#F59E0B" />
            <circle cx="100" cy="75" r="38" fill="#FEF08A" />

            {/* Side bangs */}
            <path d="M 60 95 Q 85 110 80 140 Q 65 130 60 95 Z" fill="#FDE047" />
            <path d="M 140 95 Q 115 110 120 140 Q 135 130 140 95 Z" fill="#FDE047" />

            {/* Golden Star Hairpin */}
            <polygon points="65,95 68,103 76,105 70,111 72,119 65,115 58,119 60,111 54,105 62,103" fill="#FB923C" />
          </svg>
        </div>
      );

    case 'dark-hair':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
            {/* Night sparkle */}
            <polygon points="155,50 157,56 163,58 157,60 155,66 153,60 147,58 153,56" fill="#94A3B8" />
            <text x="100" y="232" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="bold">DARK 🌙</text>

            {/* Face */}
            <circle cx="100" cy="120" r="40" fill="#FED7AA" />
            <ellipse cx="80" cy="128" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
            <ellipse cx="120" cy="128" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
            <circle cx="86" cy="116" r="3.5" fill="#1E293B" />
            <circle cx="114" cy="116" r="3.5" fill="#1E293B" />
            <circle cx="85" cy="114" r="1" fill="#FFFFFF" />
            <circle cx="113" cy="114" r="1" fill="#FFFFFF" />
            <path d="M 94 128 Q 100 135 106 128" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Deep Midnight Obsidian Dark Hair */}
            {/* Back hair layers */}
            <path d="M 50 110 Q 38 160 52 190 Q 75 195 80 165 Z" fill="#0F172A" />
            <path d="M 150 110 Q 162 160 148 190 Q 125 195 120 165 Z" fill="#0F172A" />

            {/* Main Dark Hair Canopy */}
            <circle cx="100" cy="85" r="45" fill="#1E293B" />
            <circle cx="70" cy="90" r="30" fill="#0F172A" />
            <circle cx="130" cy="90" r="30" fill="#0F172A" />
            <circle cx="100" cy="75" r="38" fill="#334155" />

            {/* Glossy White/Silver Shine Ribbons on dark hair */}
            <path d="M 75 75 Q 100 65 125 75" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 82 82 Q 100 75 118 82" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />

            {/* Side bangs */}
            <path d="M 60 95 Q 85 110 80 140 Q 65 130 60 95 Z" fill="#1E293B" />
            <path d="M 140 95 Q 115 110 120 140 Q 135 130 140 95 Z" fill="#1E293B" />

            {/* Blue Pearl Hairpin */}
            <circle cx="65" cy="100" r="6" fill="#38BDF8" />
            <circle cx="63" cy="98" r="2" fill="#FFFFFF" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={containerClass}>
          <div className="w-24 h-24 rounded-2xl bg-amber-100 flex items-center justify-center text-4xl">
            ✨
          </div>
        </div>
      );
  }
};
