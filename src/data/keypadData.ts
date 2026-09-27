import { KeypadKeyInfo } from '../types';

export const CASIO_KEYPAD_KEYS: KeypadKeyInfo[] = [
  // Ligne 1 : Commande et navigation
  {
    id: 'key-shift',
    primaryLabel: 'SHIFT',
    colorType: 'shift',
    zone: 'navigation',
    description: 'Active les fonctions secondaires imprimées en jaune/or au-dessus des touches. Une petite icône "S" apparaît en haut de l’écran.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Appuie sur SHIFT puis MODE pour ouvrir le menu SETUP.'
  },
  {
    id: 'key-alpha',
    primaryLabel: 'ALPHA',
    colorType: 'alpha',
    zone: 'navigation',
    description: 'Active les fonctions tertiaires imprimées en rouge au-dessus des touches (variables A, B, C, D, E, F, X, Y, M, symbole "=" rouge et RanInt#).',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'ALPHA puis ")" pour taper la variable X dans une fonction.'
  },
  {
    id: 'key-replay-up',
    primaryLabel: '▲',
    colorType: 'replay',
    zone: 'navigation',
    description: 'Flèche vers le haut du pavé REPLAY. Permet de faire défiler l’historique des calculs ou de naviguer dans les tableaux de valeurs.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Remonter dans la table de valeurs ou rappeler un calcul précédent.'
  },
  {
    id: 'key-replay-down',
    primaryLabel: '▼',
    colorType: 'replay',
    zone: 'navigation',
    description: 'Flèche vers le bas du pavé REPLAY. Fait défiler les résultats d’équations (X1 puis X2) ou les lignes de tableaux.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Afficher la deuxième racine X2 dans le mode EQN.'
  },
  {
    id: 'key-replay-left',
    primaryLabel: '◀',
    colorType: 'replay',
    zone: 'navigation',
    description: 'Flèche gauche pour déplacer le curseur d’édition et corriger une faute de frappe sans tout effacer.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Revenir en arrière dans une formule pour corriger un signe.'
  },
  {
    id: 'key-replay-right',
    primaryLabel: '▶',
    colorType: 'replay',
    zone: 'navigation',
    description: 'Flèche droite. Indispensable pour sortir d’une fraction, d’une racine carrée ou d’un exposant !',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Sortir du dénominateur d’une fraction avant d’ajouter un terme.'
  },
  {
    id: 'key-mode',
    primaryLabel: 'MODE',
    shiftLabel: 'SETUP',
    colorType: 'command',
    zone: 'navigation',
    description: 'Permet de basculer entre les 8 modes de travail (1:COMP, 2:CMPLX, 3:STAT, 4:BASE-N, 5:EQN, 6:MATRIX, 7:TABLE, 8:VECTOR). Avec SHIFT, ouvre SETUP.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'MODE 5 pour les équations, SHIFT MODE pour changer Radian/Degré.'
  },
  {
    id: 'key-on',
    primaryLabel: 'ON',
    colorType: 'command',
    zone: 'navigation',
    description: 'Allume la calculatrice ou réinitialise l’écran en cas de blocage.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Allumer la calculatrice ou réinitialiser le curseur.'
  },

  // Ligne 2 : Fonctions avancées
  {
    id: 'key-calc',
    primaryLabel: 'CALC',
    shiftLabel: 'SOLVE',
    alphaLabel: '=',
    colorType: 'function',
    zone: 'scientific',
    description: 'CALC évalue une expression pour une valeur donnée de X. Avec SHIFT, lance le solveur universel SOLVE. Avec ALPHA, insère le signe "=" d’une équation.',
    usageCountInS2: 'Fréquent',
    exampleUsage: 'Résoudre x²-5=0 en tapant l’équation avec ALPHA CALC puis en lançant SHIFT CALC.'
  },
  {
    id: 'key-integral',
    primaryLabel: '∫dx',
    shiftLabel: 'd/dx',
    alphaLabel: ':',
    colorType: 'function',
    zone: 'scientific',
    description: 'Calcule une intégrale définie. Avec SHIFT, calcule la dérivée numérique d/dx en un point x₀.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'SHIFT ∫dx pour trouver le nombre dérivé f\'(2).'
  },
  {
    id: 'key-inverse',
    primaryLabel: 'x⁻¹',
    shiftLabel: 'x!',
    alphaLabel: 'A',
    colorType: 'function',
    zone: 'scientific',
    description: 'Calcule l’inverse (1/x) ou l’inverse d’une matrice en mode MATRIX. Avec SHIFT, calcule la factorielle n!.',
    usageCountInS2: 'Fréquent',
    exampleUsage: '5 SHIFT x⁻¹ donne 5! = 120.'
  },
  {
    id: 'key-log-base',
    primaryLabel: 'log□□',
    shiftLabel: '∑',
    alphaLabel: 'B',
    colorType: 'function',
    zone: 'scientific',
    description: 'Logarithme à base quelconque log_a(b). Avec SHIFT, calcule la somme discrète ∑.',
    usageCountInS2: 'Occasionnel',
    exampleUsage: 'Calculer un logarithme en base 2 ou la somme des k².'
  },

  // Ligne 3 : Fractions et puissances
  {
    id: 'key-frac',
    primaryLabel: '■/■',
    shiftLabel: '■ ■/■',
    alphaLabel: 'C',
    colorType: 'function',
    zone: 'scientific',
    description: 'Insère une barre de fraction naturelle. Avec SHIFT, insère un nombre mixte (partie entière + fraction).',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Calculer avec des fractions exactes simplifiées automatiquement.'
  },
  {
    id: 'key-sqrt',
    primaryLabel: '√',
    shiftLabel: '³√',
    alphaLabel: 'D',
    colorType: 'function',
    zone: 'scientific',
    description: 'Calcule la racine carrée exacte. Avec SHIFT, calcule la racine cubique ³√.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: '√12 renvoie 2√3 sous forme simplifiée.'
  },
  {
    id: 'key-square',
    primaryLabel: 'x²',
    shiftLabel: 'x³',
    alphaLabel: 'E',
    colorType: 'function',
    zone: 'scientific',
    description: 'Élève au carré. Avec SHIFT, élève au cube.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Calcul de distances, discriminant b² ou normes vectorielles.'
  },
  {
    id: 'key-power',
    primaryLabel: 'x^',
    shiftLabel: 'ˣ√',
    alphaLabel: 'F',
    colorType: 'function',
    zone: 'scientific',
    description: 'Élève à n’importe quelle puissance exposante. Avec SHIFT, racine n-ième.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: '2 x^ 10 donne 1024.'
  },
  {
    id: 'key-log',
    primaryLabel: 'log',
    shiftLabel: '10ˣ',
    colorType: 'function',
    zone: 'scientific',
    description: 'Logarithme décimal (base 10). Avec SHIFT, puissance de 10.',
    usageCountInS2: 'Fréquent',
    exampleUsage: 'Calculs de pH en chimie ou de décibels en physique.'
  },
  {
    id: 'key-ln',
    primaryLabel: 'ln',
    shiftLabel: 'eˣ',
    colorType: 'function',
    zone: 'scientific',
    description: 'Logarithme népérien. Avec SHIFT, fonction exponentielle eˣ.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Étude des fonctions exponentielles et logarithmes.'
  },

  // Ligne 4 : Signe, angles et trigonométrie
  {
    id: 'key-neg',
    primaryLabel: '(-)',
    shiftLabel: '',
    alphaLabel: 'A',
    colorType: 'function',
    zone: 'scientific',
    description: 'Signe négatif d’un nombre (différent de l’opération de soustraction). Accède aussi à la variable A avec ALPHA.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Taper un coefficient négatif sans provoquer d’erreur de syntaxe.'
  },
  {
    id: 'key-dms',
    primaryLabel: '° \' "',
    shiftLabel: '←',
    colorType: 'function',
    zone: 'scientific',
    description: 'Saisie et conversion en degrés, minutes, secondes sexagésimales.',
    usageCountInS2: 'Occasionnel',
    exampleUsage: 'Convertir 45.5° en 45° 30\' 0".'
  },
  {
    id: 'key-sin',
    primaryLabel: 'sin',
    shiftLabel: 'sin⁻¹',
    colorType: 'function',
    zone: 'scientific',
    description: 'Fonction sinus. Avec SHIFT, calcule l’arcsinus (angle dont le sinus est connu).',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'SHIFT sin (0.5) donne 30° ou π/6 rad.'
  },
  {
    id: 'key-cos',
    primaryLabel: 'cos',
    shiftLabel: 'cos⁻¹',
    colorType: 'function',
    zone: 'scientific',
    description: 'Fonction cosinus. Avec SHIFT, calcule l’arccosinus.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Théorème d’Al-Kashi pour trouver un angle.'
  },
  {
    id: 'key-tan',
    primaryLabel: 'tan',
    shiftLabel: 'tan⁻¹',
    colorType: 'function',
    zone: 'scientific',
    description: 'Fonction tangente. Avec SHIFT, calcule l’arctangente.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Calculer la pente d’une droite ou l’argument d’un complexe.'
  },

  // Ligne 5 : Mémoires et parenthèses
  {
    id: 'key-rcl',
    primaryLabel: 'RCL',
    shiftLabel: 'STO',
    colorType: 'function',
    zone: 'memory_calc',
    description: 'Rappelle le contenu d’une variable (A à F, X, Y, M). Avec SHIFT, STO enregistre une valeur dans la mémoire choisie.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'SHIFT RCL (-) pour mémoriser dans A.'
  },
  {
    id: 'key-eng',
    primaryLabel: 'ENG',
    shiftLabel: '←',
    secondaryUnderLabel: 'i (en CMPLX)',
    colorType: 'function',
    zone: 'memory_calc',
    description: 'Notation ingénieur (multiples de 10³). En MODE 2 CMPLX, c’est LA touche qui insère l’unité imaginaire "i" !',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Taper "1 + 2 ENG" en mode CMPLX pour écrire 1 + 2i.'
  },
  {
    id: 'key-paren-open',
    primaryLabel: '(',
    colorType: 'function',
    zone: 'memory_calc',
    description: 'Ouvre une parenthèse pour prioriser les opérations.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Toujours entourer un nombre négatif avant de l’élever au carré : (-3)² = 9.'
  },
  {
    id: 'key-paren-close',
    primaryLabel: ')',
    shiftLabel: ',',
    alphaLabel: 'X',
    colorType: 'function',
    zone: 'memory_calc',
    description: 'Ferme une parenthèse. Avec SHIFT, insère la virgule de séparation d’arguments. Avec ALPHA, insère la variable X !',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'ALPHA ) pour insérer la variable X.'
  },
  {
    id: 'key-sd',
    primaryLabel: 'S<=>D',
    shiftLabel: 'a b/c ⇄ d/c',
    alphaLabel: 'Y',
    colorType: 'function',
    zone: 'memory_calc',
    description: 'Convertit instantanément entre la forme exacte (fraction, racine) et la forme décimale approchée.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Passer de 1/2 à 0.5 d’un simple clic.'
  },
  {
    id: 'key-m-plus',
    primaryLabel: 'M+',
    shiftLabel: 'M-',
    alphaLabel: 'M',
    colorType: 'function',
    zone: 'memory_calc',
    description: 'Ajoute la valeur en cours à la mémoire M. Avec SHIFT, la retranche (M-).',
    usageCountInS2: 'Fréquent',
    exampleUsage: 'Accumuler des sommes sans réécrire les nombres.'
  },

  // Pavé numérique et opérations de base
  {
    id: 'key-del',
    primaryLabel: 'DEL',
    shiftLabel: 'INS',
    colorType: 'ac_del',
    zone: 'numeric',
    description: 'Efface le caractère situé immédiatement à gauche du curseur.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Corriger un chiffre sans effacer tout le calcul.'
  },
  {
    id: 'key-ac',
    primaryLabel: 'AC',
    shiftLabel: 'OFF',
    colorType: 'ac_del',
    zone: 'numeric',
    description: 'Efface tout l’écran actuel sans vider les mémoires de variables. Avec SHIFT, éteint la calculatrice (OFF).',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'SHIFT AC pour éteindre la fx-991ES et économiser la pile.'
  },
  {
    id: 'key-const-7',
    primaryLabel: '7',
    shiftLabel: 'CONST',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Chiffre 7. Avec SHIFT, ouvre le menu des 40 constantes physiques et chimiques (CONST 01 à 40).',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'SHIFT 7 puis 28 pour insérer la vitesse de la lumière c₀.'
  },
  {
    id: 'key-conv-8',
    primaryLabel: '8',
    shiftLabel: 'CONV',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Chiffre 8. Avec SHIFT, ouvre le menu des 40 conversions d’unités métriques et anglo-saxonnes.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: '90 SHIFT 8 puis 19 pour convertir 90 km/h en m/s.'
  },
  {
    id: 'key-clr-9',
    primaryLabel: '9',
    shiftLabel: 'CLR',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Chiffre 9. Avec SHIFT, permet de réinitialiser le Setup, la mémoire ou tout le système (Reset).',
    usageCountInS2: 'Fréquent',
    exampleUsage: 'SHIFT 9 puis 3 puis = pour tout réinitialiser à neuf.'
  },
  {
    id: 'key-stat-1',
    primaryLabel: '1',
    shiftLabel: 'STAT',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Chiffre 1. En mode STAT, SHIFT 1 ouvre le menu d’accès aux calculs statistiques (moyenne, écart-type, sommes).',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'SHIFT 1 puis 5 puis 2 pour afficher la moyenne x̄.'
  },
  {
    id: 'key-cmplx-2',
    primaryLabel: '2',
    shiftLabel: 'CMPLX',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Chiffre 2. En mode CMPLX, SHIFT 2 donne accès à arg(), Conjg() et la conversion polaire ▶r∠θ.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'SHIFT 2 puis 1 pour calculer l’argument d’un complexe.'
  },
  {
    id: 'key-matrix-4',
    primaryLabel: '4',
    shiftLabel: 'MATRIX',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Chiffre 4. En mode MATRIX, SHIFT 4 ouvre le gestionnaire de matrices et la commande det().',
    usageCountInS2: 'Fréquent',
    exampleUsage: 'SHIFT 4 puis 7 pour calculer le déterminant d’une matrice.'
  },
  {
    id: 'key-vector-5',
    primaryLabel: '5',
    shiftLabel: 'VECTOR',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Chiffre 5. En mode VECTOR, SHIFT 5 ouvre le gestionnaire de vecteurs et la fonction Dot (produit scalaire).',
    usageCountInS2: 'Fréquent',
    exampleUsage: 'SHIFT 5 puis 7 pour insérer le produit scalaire Dot.'
  },
  {
    id: 'key-ans',
    primaryLabel: 'Ans',
    shiftLabel: 'DRG▶',
    colorType: 'digit',
    zone: 'numeric',
    description: 'Rappelle la dernière réponse calculée. Indispensable pour calculer les termes d’une suite récurrente en boucle.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'uₙ₊₁ = 2×Ans + 1 puis presser = répétitivement.'
  },
  {
    id: 'key-equals',
    primaryLabel: '=',
    colorType: 'command',
    zone: 'numeric',
    description: 'Exécute le calcul en cours et affiche le résultat.',
    usageCountInS2: 'Très fréquent',
    exampleUsage: 'Valider tout calcul ou étape de menu.'
  }
];
