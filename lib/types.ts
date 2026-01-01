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
  { id: 1, text: 'Vil Kong Harald dø i før utgangen av året?' },
  { id: 2, text: 'Blir det fred i Ukraina?' },
  { id: 3, text: 'Kommer Norge til kvartfinalen i VM i fotball?' },
  { id: 4, text: 'Blir gjennomsnittsprisen på laks tom. uke 51 høyere enn i 2025 (81.35 kr/kg)?' },
  { id: 5, text: 'Er Jonas Gahr Støre statsminister 31. desember 2026?' },
  { id: 6, text: 'Blir Donald Trump stilt for riksrett?' },
  { id: 7, text: 'Får demokratene flertall i Kongressen etter valget i november 2026?' },
  { id: 8, text: 'Vil Bodø Glimt kvalifisere seg til Champions League?' },
  { id: 9, text: 'Blir det tropenatt to netter på rad på Selsøyvik i løpet av juli?' },
  { id: 10, text: 'Vinner Martin Ødegaard og Arsenal Premier League?' }
];
