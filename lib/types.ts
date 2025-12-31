export interface Prediction {
  id: string;
  userName: string;
  answers: boolean[];
  timestamp: number;
}

export interface Question {
  id: number;
  text: string;
}

export const QUESTIONS: Question[] = [
  { id: 1, text: 'Vil noen i familien få barn i 2026?' },
  { id: 2, text: 'Vil noen i familien bytte jobb i 2026?' },
  { id: 3, text: 'Vil noen i familien flytte til en ny by i 2026?' },
  { id: 4, text: 'Vil familien samles mer enn 5 ganger i 2026?' },
  { id: 5, text: 'Vil noen i familien dra på en eksotisk ferie i 2026?' },
  { id: 6, text: 'Vil noen i familien kjøpe bil eller bolig i 2026?' },
  { id: 7, text: 'Vil familien ha et større arrangement/fest i 2026?' },
  { id: 8, text: 'Vil noen i familien starte en ny hobby i 2026?' },
  { id: 9, text: 'Vil noen i familien oppnå en stor karrieresuksess i 2026?' },
  { id: 10, text: 'Vil 2026 bli et bedre år enn 2025 for familien?' }
];
