import { CommonCasioError, HiddenGemTip } from '../types';

export const CASIO_ERRORS_DATABASE: CommonCasioError[] = [
  {
    nom: 'Math ERROR (Erreur mathématique)',
    ecranMessage: 'Math ERROR\n[AC]   :Cancel\n[◀][▶] :Goto',
    causes: [
      'Division par zéro (ex: 5 ÷ 0 ou 1 / tan(90°)).',
      'Racine carrée d’un nombre négatif en mode normal COMP 1 (ex: √(-4)).',
      'Logarithme d’un nombre négatif ou nul (ex: ln(0) ou ln(-2)).',
      'Calcul dont le résultat dépasse la capacité de la machine (> 9.999999999 × 10⁹⁹, comme 70!).',
      'Tentative d’inverser une matrice de déterminant nul (det = 0) en mode MATRIX.'
    ],
    solutions: [
      'Appuie sur [◀] ou [▶] (Goto) : le curseur se positionne exactement à l’endroit où l’erreur s’est produite dans ta formule !',
      'Pour calculer des racines de nombres négatifs ou résoudre avec des imaginaires, passe en MODE 2 (CMPLX).',
      'Vérifie le domaine de définition de ta fonction (dénominateurs, racines, logarithmes).'
    ],
    exempleTypique: 'Taper tan(90) en mode Degré ou calculer √(-9) en MODE 1.'
  },
  {
    nom: 'Syntax ERROR (Erreur de syntaxe)',
    ecranMessage: 'Syntax ERROR\n[AC]   :Cancel\n[◀][▶] :Goto',
    causes: [
      'Parenthèse ouvrante non fermée ou mal ordonnée.',
      'Deux opérateurs mathématiques consécutifs sans parenthèses (ex: 5 × - 2 au lieu de 5 × (-2)).',
      'Séparateur d’argument incorrect (utilisation du point [.] au lieu de la virgule [SHIFT] [ ) ]).',
      'Oubli d’un argument obligatoire dans une fonction (ex: Pol( ou Rec().'
    ],
    solutions: [
      'Appuie immédiatement sur la flèche [◀] (Goto) pour voir exactement où Casio signale l’anomalie.',
      'Utilise la touche de signe négatif [(-)] pour les nombres négatifs plutôt que la touche d’opération de soustraction [-].'
    ],
    exempleTypique: 'Oublier la virgule entre deux arguments : RanInt#(1 6) au lieu de RanInt#(1, 6).'
  },
  {
    nom: 'Stack ERROR (Dépassement de pile)',
    ecranMessage: 'Stack ERROR\n[AC]   :Cancel',
    causes: [
      'Calcul trop imbriqué comportant plus de 24 niveaux de parenthèses ou d’opérations en attente.',
      'Formules complexes enchaînées avec trop de priorités non résolues.'
    ],
    solutions: [
      'Décompose ton calcul lourd en plusieurs étapes intermédiaires.',
      'Stocke les résultats partiels dans les variables A, B ou M avec [SHIFT] [RCL] (STO).'
    ],
    exempleTypique: 'Empiler 15 fractions imbriquées les unes dans les autres sans validation intermédiaire.'
  },
  {
    nom: 'Dimension ERROR (Erreur de dimension)',
    ecranMessage: 'Dim ERROR\n[AC]   :Cancel',
    causes: [
      'Produit scalaire ou vectoriel entre deux vecteurs de dimensions incompatibles (ex: un vecteur 2D et un vecteur 3D).',
      'Multiplication de deux matrices dont le nombre de colonnes de la première ne correspond pas au nombre de lignes de la seconde.',
      'Addition de deux matrices de formats différents.'
    ],
    solutions: [
      'Vérifie les dimensions de tes vecteurs ou matrices dans le menu [SHIFT] [5] (VECTOR) ou [SHIFT] [4] (MATRIX) -> 1 (Dim).'
    ],
    exempleTypique: 'Tenter de multiplier une matrice MatA (2x3) par une matrice MatB (2x2).'
  },
  {
    nom: 'Insufficient MEM (Mémoire insuffisante)',
    ecranMessage: 'Insufficient MEM\n[AC]   :Cancel',
    causes: [
      'En MODE 7 (TABLE) : l’intervalle défini entre Start et End avec le Step choisi génère plus de 30 points.',
      'Formules de tableau excessivement volumineuses.'
    ],
    solutions: [
      'Augmente le pas (Step) : par exemple passe de Step = 0.1 à Step = 0.5.',
      'Réduis l’intervalle [Start ; End] pour étudier la fonction par morceaux.'
    ],
    exempleTypique: 'En mode TABLE, demander Start = 0, End = 100 avec un Step = 0.1 (cela nécessiterait 1 000 lignes).'
  }
];

export const HIDDEN_GEMS_DATABASE: HiddenGemTip[] = [
  {
    id: 'gem-colon-statements',
    titre: 'Le double-point (:) pour enchaîner plusieurs formules d’un coup',
    accroche: 'Exécute 2 ou 3 calculs simultanés sans retaper les formules',
    explication: 'Sur la fx-991ES, la touche [ALPHA] [∫dx] insère un double-point ":". Il permet de séparer plusieurs formules sur une seule ligne. En appuyant sur [=], la calculatrice évalue chaque formule tour à tour !',
    touches: ['ALPHA', '∫dx (:)'],
    exemplePratique: 'Tape "A = A + 1 : B = 2 × A". À chaque appui sur [=], A augmente de 1 et B affiche automatiquement le double ! Idéal pour simuler un algorithme ou une boucle de suite.',
    gainDeTemps: 'Fait gagner 30 secondes par question d’algorithmique ou de récurrence.'
  },
  {
    id: 'gem-solve-equation',
    titre: 'Le solveur universel SOLVE qui trouve n’importe quel X',
    accroche: 'Trouve la solution de f(x) = g(x) par méthode de Newton',
    explication: 'Beaucoup d’élèves pensent que le mode EQN 5 ne sait résoudre que les polynômes du 2nd et 3ème degré. En réalité, le solveur [SHIFT] [CALC] (SOLVE) fonctionne en MODE 1 normal avec N’IMPORTE QUELLE équation mathématique.',
    touches: ['ALPHA', 'CALC (=)', 'puis', 'SHIFT', 'CALC (SOLVE)'],
    exemplePratique: 'Résoudre 3^(X) + X = 10 en tapant l’équation avec le "=" rouge puis [SHIFT] [CALC].',
    gainDeTemps: 'Permet de vérifier instantanément une solution sans développer.'
  },
  {
    id: 'gem-fast-sequence',
    titre: 'Le générateur turbo de suites avec la touche [Ans]',
    accroche: 'Fais défiler 30 termes d’une suite en 5 secondes',
    explication: 'En tapant la valeur initiale u₀ puis [=], il suffit d’écrire la formule avec [Ans] et de matraquer la touche [=]. Chaque pression calcule le terme suivant.',
    touches: ['premier_terme', '=', 'f(Ans)', '=', '=', '='],
    exemplePratique: 'u₀ = 2, uₙ₊₁ = 0.5×uₙ + 3. Tape 2 [=], puis 0.5×Ans + 3, puis presse [=] en boucle pour voir la suite converger vers 6.',
    gainDeTemps: 'Divise par 5 le temps nécessaire pour conjecturer une limite.'
  },
  {
    id: 'gem-40-constants',
    titre: 'Les 40 constantes physiques gravées dans la machine',
    accroche: 'Ne mémorise plus jamais la vitesse de la lumière ou la constante de Planck',
    explication: 'Grâce à [SHIFT] [7] (CONST), tu as accès à 40 constantes universelles avec leurs 10 décimales exactes. Le tableau complet des codes est sous le capot de la machine.',
    touches: ['SHIFT', '7', 'code_01_a_40'],
    exemplePratique: 'SHIFT 7 28 insère c₀ (299 792 458 m/s). SHIFT 7 06 insère la constante de Planck h.',
    gainDeTemps: 'Zéro risque d’erreur de recopie en contrôle de sciences physiques.'
  },
  {
    id: 'gem-auto-simplification-radicaux',
    titre: 'Simplification automatique des racines carrées et radicaux',
    accroche: 'La fx-991ES simplifie √(a) sous la forme b√(c) toute seule',
    explication: 'Grâce au moteur Natural Display MthIO, toute racine carrée saisie est instantanément réduite sous sa forme irréductible a√b.',
    touches: ['√', 'nombre', '='],
    exemplePratique: 'Tape √72 [=] -> la machine affiche directement 6√2. Tape 1/√2 [=] -> elle rationalise le dénominateur en affichant √2/2 !',
    gainDeTemps: 'Évite les erreurs de calcul mental sur les racines carrées.'
  },
  {
    id: 'gem-eng-engineering',
    titre: 'La touche ENG pour convertir instantanément en kilo, méga, micro',
    accroche: 'Passe un nombre en multiples de 10³ en une touche',
    explication: 'Appuyer sur [ENG] déplace la virgule par tranche de 3 zéros pour afficher en puissances de 10³, 10⁶, 10⁻³, 10⁻⁶. Avec [SHIFT] [ENG], le décalage se fait en sens inverse.',
    touches: ['ENG', 'ou', 'SHIFT', 'ENG'],
    exemplePratique: 'Après avoir calculé une résistance de 47000 Ω, appuie sur ENG : l’écran affiche 47 × 10³ (soit 47 kΩ) !',
    gainDeTemps: 'Essentiel pour les notations scientifiques en physique et électricité.'
  }
];
