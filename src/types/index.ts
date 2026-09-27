export type CasioMode =
  | '1: COMP'
  | '2: CMPLX'
  | '3: STAT'
  | '4: BASE-N'
  | '5: EQN'
  | '6: MATRIX'
  | '7: TABLE'
  | '8: VECTOR';

export type FunctionCategory =
  | 'equations'
  | 'fonctions_analyse'
  | 'trigonometrie'
  | 'statistiques'
  | 'geometrie_vecteurs'
  | 'nombres_complexes'
  | 'matrices'
  | 'calcul_general'
  | 'fractions_puissances'
  | 'constantes_conversions'
  | 'memoires_variables'
  | 'base_n';

export type S2Topic =
  | 'second_degre'
  | 'systemes_lineaires'
  | 'fonctions_derivation'
  | 'suites_numeriques'
  | 'trigonometrie_s2'
  | 'statistiques_s2'
  | 'produit_scalaire_vecteurs'
  | 'nombres_complexes_s2';

export interface KeyStep {
  stepNumber: number;
  title: string;
  action: string;
  keys: string[]; // e.g. ["MODE", "5", "3"]
  screenDisplay?: string; // what the screen shows at this step
  annotation?: string; // tip for this specific step
}

export interface CasioFunctionItem {
  id: string;
  nom: string;
  categorie: FunctionCategory;
  sousCategorie: string;
  description: string;
  niveau: 'Essentiel' | 'Intermédiaire' | 'Avancé';
  contexteScolaire: string; // Première S2 context
  redactionConseil?: string; // Ce qu'il faut écrire sur sa copie (et ne pas confondre avec le résultat brut)
  modeCasio: CasioMode;
  touchesRapides: string[]; // Condensed key sequence, e.g. ["MODE", "5", "3", "a", "=", "b", "=", "c", "="]
  etapes: KeyStep[];
  exemple: {
    enonce: string;
    entree: string;
    touchesDetaillees: string[];
    resultatEcran: string;
    interpretation: string;
  };
  aRetenir: string[];
  astuces: string[];
  erreursFrequentes: {
    probleme: string;
    cause: string;
    solution: string;
  }[];
  motsClesRecherche: string[];
  s2Theme?: S2Topic;
  isMeconnue?: boolean; // Featured in "Tu ne savais probablement pas"
  verifie: true; // Verified explicitly against Casio fx-991ES original documentation
}

export interface KeypadKeyInfo {
  id: string;
  primaryLabel: string;
  shiftLabel?: string;
  alphaLabel?: string;
  secondaryUnderLabel?: string;
  colorType: 'shift' | 'alpha' | 'function' | 'digit' | 'command' | 'replay' | 'ac_del';
  zone: 'navigation' | 'scientific' | 'memory_calc' | 'numeric';
  description: string;
  usageCountInS2: 'Très fréquent' | 'Fréquent' | 'Occasionnel' | 'Spécifique';
  exampleUsage: string;
}

export interface CommonCasioError {
  nom: string;
  ecranMessage: string;
  causes: string[];
  solutions: string[];
  exempleTypique: string;
}

export interface HiddenGemTip {
  id: string;
  titre: string;
  accroche: string;
  explication: string;
  touches: string[];
  exemplePratique: string;
  gainDeTemps: string;
}
