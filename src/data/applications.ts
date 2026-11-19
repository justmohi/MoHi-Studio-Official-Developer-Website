export interface AppScreenshot {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface AppFeature {
  title: string;
  description: string;
}

export interface StudioApplication {
  id: string;
  slug: string;
  name: string;
  packageName: string;
  developer: string;
  platform: 'Android' | 'Cross-Platform' | 'Web';
  category: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string[];
  iconUrl: string;
  googlePlayUrl: string;
  isGooglePlayLinkPlaceholder: boolean;
  privacyPolicyPath: string;
  supportEmail: string;
  features: AppFeature[];
  screenshots: AppScreenshot[];
  technicalSpecs: {
    label: string;
    value: string;
    isMonospace?: boolean;
  }[];
}

const getPlayUrl = (): string => {
  try {
    const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
    const val = meta.env?.VITE_ARROW_FLOW_PLAY_URL;
    if (val && val.trim().length > 0) return val.trim();
  } catch {
    // ignore
  }
  return 'https://play.google.com/store/apps/details?id=com.arrowflow.arrowflowpuzzle';
};

export const APPLICATIONS_CATALOG: StudioApplication[] = [
  {
    id: 'arrow-flow-puzzle',
    slug: 'arrow-flow-puzzle',
    name: 'Arrow Flow Puzzle',
    packageName: 'com.arrowflow.arrowflowpuzzle',
    developer: 'MoHi Studio',
    platform: 'Android',
    category: 'Puzzle Game',
    tagline: 'Strategic directional escape puzzles built on spatial logic and sequence planning.',
    shortDescription:
      'A challenging arrow escape puzzle game where players solve increasingly complex arrow arrangements, plan escape sequences, and overcome strategic obstacles.',
    fullDescription: [
      'Arrow Flow Puzzle is a spatial logic and directional escape puzzle game developed by MoHi Studio for Android devices. Each stage presents an interlocked grid of directional arrow tiles where every move directly impacts the board state.',
      'Players must analyze directional dependencies, identify unblocked trajectories, and plan multi-step escape sequences to clear the board without creating gridlock. As stages progress, new strategic obstacles and denser arrangements test spatial foresight and methodical problem-solving.',
      'Designed with responsive touch controls, high-contrast visual clarity, and smooth frame pacing, Arrow Flow Puzzle delivers a focused puzzle experience suitable for both quick sessions and deep strategic play.'
    ],
    iconUrl: '/src/assets/images/arrow_flow_app_icon_1795063019687.jpg',
    googlePlayUrl: getPlayUrl(),
    isGooglePlayLinkPlaceholder: true,
    privacyPolicyPath: '/privacy-policy',
    supportEmail: 'contact@mohistudio.pro.bd',
    features: [
      {
        title: 'Multi-Step Sequence Planning',
        description:
          'Analyze interlocking arrow orientations and determine the exact firing order required to clear pathways without colliding into blocked tiles.'
      },
      {
        title: 'Progressive Spatial Obstacles',
        description:
          'Navigate increasingly intricate board layouts featuring directional bottlenecks, multi-layered paths, and strategic grid constraints.'
      },
      {
        title: 'High-Contrast Tactile Visuals',
        description:
          'Engineered with crisp geometric tiles, clear directional chevrons, and dark-navy contrast for comfortable readability across Android screen sizes.'
      },
      {
        title: 'Responsive Touch Controls',
        description:
          'Low-latency tap recognition and fluid tile exit animations provide immediate visual feedback for every move and sequence evaluation.'
      },
      {
        title: 'Pure Logic & Foresight',
        description:
          'Built around deterministic spatial rules that reward careful observation, step-by-step deduction, and strategic pathfinding.'
      },
      {
        title: 'Optimized Android Performance',
        description:
          'Lightweight architecture tailored for smooth performance and efficient battery usage across modern Android smartphones and tablets.'
      }
    ],
    screenshots: [
      {
        id: 'screen-1',
        title: 'Tactical Grid Layout',
        caption: 'Evaluate interlocking directional arrow tiles and locate the initial escape vector.',
        imageUrl: '/src/assets/images/arrow_flow_screen_1_1795063019407.jpg'
      },
      {
        id: 'screen-2',
        title: 'Multi-Path Trajectory Planning',
        caption: 'Trace complex pathway dependencies around strategic obstacles and bottlenecks.',
        imageUrl: '/src/assets/images/arrow_flow_screen_2_1795063019525.jpg'
      },
      {
        id: 'screen-3',
        title: 'Sequence Resolution',
        caption: 'Execute ordered clears through intricate spatial arrangements to solve the stage.',
        imageUrl: '/src/assets/images/arrow_flow_screen_3_1795063019446.jpg'
      }
    ],
    technicalSpecs: [
      { label: 'Application Name', value: 'Arrow Flow Puzzle' },
      { label: 'Package Name', value: 'com.arrowflow.arrowflowpuzzle', isMonospace: true },
      { label: 'Developer', value: 'MoHi Studio' },
      { label: 'Platform', value: 'Android' },
      { label: 'Category', value: 'Puzzle Game' },
      { label: 'Distribution', value: 'Google Play Store (Editable Listing URL)' }
    ]
  }
];
