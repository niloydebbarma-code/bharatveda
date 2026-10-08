export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  historicalContext: string;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 'q1-taj-mahal',
    question: 'Which precious stone inlay technique was used on the white marble walls of the Taj Mahal?',
    options: ['Frescorama', 'Pietra Dura (Parchin Kari)', 'Cloisonné', 'Filigree'],
    correctOptionIndex: 1,
    explanation: 'Pietra Dura (locally called Parchin Kari) is the technique of fitting intricately cut and polished semi-precious stones (such as lapis lazuli, jasper, and jade) into marble.',
    historicalContext: 'Mughal artisans under Emperor Shah Jahan refined this art form to depict lifelike floral vines on the cenotaphs.',
  },
  {
    id: 'q2-kailasa-ellora',
    question: 'How was the monumental Kailasa Temple (Cave 16) at Ellora constructed?',
    options: [
      'Assembled with sandstone blocks from Rajasthan',
      'Carved top-to-bottom out of a single volcanic basalt cliff',
      'Constructed with brick and lime mortar inside a natural cave',
      'Built inside a riverbed and relocated during drought'
    ],
    correctOptionIndex: 1,
    explanation: 'Cave 16 is the largest monolithic rock excavation in the world, sculpted top-down from a single basalt rock face, removing over 200,000 tonnes of rock.',
    historicalContext: 'Commissioned in the 8th century under Rashtrakuta King Krishna I, engineers had zero margin for error as rock once cut could not be replaced.',
  },
  {
    id: 'q3-konark-wheels',
    question: 'What functional astronomical feature do the 24 carved stone wheels of Konark Sun Temple possess?',
    options: [
      'They act as musical instruments when struck',
      'They function as precise sundials to tell exact local solar time',
      'They rotated with water tides to open temple gates',
      'They were used as navigational compasses for merchant ships'
    ],
    correctOptionIndex: 1,
    explanation: 'Each 9.9-foot wheel has 8 major spokes and 8 minor spokes; the shadow cast on the spoke markings accurately indicates the time of day down to minutes.',
    historicalContext: 'Built in 1250 CE by King Narasimhadeva I, the temple celebrated Surya’s daily journey across the heavens.',
  },
  {
    id: 'q4-hampi-stone-chariot',
    question: 'The famous Stone Chariot in Hampi is actually a dedicated shrine to which mythical figure?',
    options: ['Lord Indra', 'Lord Hanuman', 'Garuda (the celestial eagle mount)', 'Lord Murugan'],
    correctOptionIndex: 2,
    explanation: 'The Stone Chariot inside the Vittala Temple complex is a shrine dedicated to Garuda, the divine vahana (mount) of Lord Vishnu.',
    historicalContext: 'Inspired by the Konark Sun Temple, Vijayanagara craftsmen carved it from multiple interlocking granite slabs disguised as a monolithic chariot.',
  },
  {
    id: 'q5-amritsar-langar',
    question: 'What is the guiding spiritual principle behind the 24/7 community kitchen (Langar) at the Golden Temple?',
    options: [
      'VIP meals reserved for aristocracy',
      'Universal equality and selfless community service (Seva) for all humanity',
      'Commercial catering for pilgrims',
      'Seasonal royal banquets during harvest'
    ],
    correctOptionIndex: 1,
    explanation: 'Instituted by Guru Nanak, Langar exemplifies the philosophy of "Pangat and Sangat" — all people, regardless of caste, religion, nationality, or wealth, sit on the same floor to eat free nutritious meals together.',
    historicalContext: 'Over 100,000 visitors are fed daily, cooked and served by volunteer devotees.',
  }
];
