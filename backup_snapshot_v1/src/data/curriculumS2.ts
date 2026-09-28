import { S2Topic } from '../types';

export interface CurriculumTopicInfo {
  id: S2Topic;
  titre: string;
  sousTitre: string;
  chapitreNumero: string;
  description: string;
  calculatriceRôle: string;
  redactionSurCopie: string;
  fonctionsAssocieesIds: string[];
  piegesExamen: string[];
}

export const CURRICULUM_S2_TOPICS: CurriculumTopicInfo[] = [
  {
    id: 'second_degre',
    titre: 'Second degré & Polynômes',
    sousTitre: 'Forme canonique, discriminant Δ, factorisation et racines',
    chapitreNumero: '01',
    description: 'Résolution des équations ax² + bx + c = 0, signe du trinôme, recherche des racines réelles et factorisation a(x - x₁)(x - x₂).',
    calculatriceRôle: 'Le mode EQN 3 calcule instantanément les racines X1 et X2 ou signale les solutions complexes ("i") quand Δ < 0.',
    redactionSurCopie: 'Tu dois TOUJOURS écrire la formule théorique du discriminant Δ = b² - 4ac, poser le calcul numérique, préciser le signe de Δ (positif, nul ou négatif) et conclure sur le nombre de racines.',
    fonctionsAssocieesIds: ['eqn-second-degre', 'solveur-solve-fx991es', 'fractions-puissances-sd'],
    piegesExamen: [
      'Oublier le coefficient "a" devant la factorisation : écrire (x - x1)(x - x2) au lieu de a(x - x1)(x - x2).',
      'Confondre un trinôme sans racine réelle avec un trinôme nul : si Δ < 0, le trinôme est du signe de "a" sur tout ℝ.',
      'Saisir un mauvais signe sur le coefficient b (ex: x² - 4x + 3 -> b = -4).'
    ]
  },
  {
    id: 'fonctions_derivation',
    titre: 'Fonctions, Dérivation & Tangentes',
    sousTitre: 'Nombre dérivé, équation de tangente et variations',
    chapitreNumero: '02',
    description: 'Calcul du nombre dérivé f\'(x₀), équation de la tangente y = f\'(a)(x - a) + f(a), tracé précis de courbes sur papier millimétré.',
    calculatriceRôle: 'La fonction d/dx calcule la valeur numérique de la dérivée en un point. Le mode 7 TABLE génère les points pour tracer la courbe.',
    redactionSurCopie: 'La calculatrice ne donne PAS l\'expression générale f\'(x). Tu dois appliquer tes règles de dérivation (u+v, uv, u/v) puis seulement vérifier la valeur en un point.',
    fonctionsAssocieesIds: ['derivee-numerique-ddx', 'mode-table-valeurs', 'integrale-definie'],
    piegesExamen: [
      'Tracer la courbe Cf à main levée sans tableau de valeurs : utilise la table de la fx-991ES pour placer 5 à 8 points exacts.',
      'Ne pas être en mode RADIAN lors de la dérivation de fonctions trigonométriques.',
      'Confondre le nombre dérivé f\'(a) et l\'image de f(a).'
    ]
  },
  {
    id: 'systemes_lineaires',
    titre: 'Systèmes linéaires & Algèbre',
    sousTitre: '2 ou 3 équations, intersections de droites et plans',
    chapitreNumero: '03',
    description: 'Résolution de systèmes linéaires à 2 ou 3 inconnues, intersection de courbes, calcul matriciel.',
    calculatriceRôle: 'Le mode EQN 1 (2 inconnues) et EQN 2 (3 inconnues) trouve les valeurs exactes en fraction.',
    redactionSurCopie: 'Détaille la méthode employée (combinaison linéaire, substitution ou pivot de Gauss) sur ta copie. Ne marque jamais "résolu sur calculatrice".',
    fonctionsAssocieesIds: ['systemes-lineaires-eqn', 'matrices-determinant-inverse'],
    piegesExamen: [
      'Oublier de basculer la constante à droite du signe "=" (la fx-991ES attend anX + bnY = cn).',
      'Intervertir les coefficients X et Y lors de la saisie.'
    ]
  },
  {
    id: 'produit_scalaire_vecteurs',
    titre: 'Produit scalaire & Géométrie vectorielle',
    sousTitre: 'Norme, orthogonalité, calcul analytique u · v',
    chapitreNumero: '04',
    description: 'Applications métriques du produit scalaire dans le plan et l’espace, théorème d’Al-Kashi, orthogonalité.',
    calculatriceRôle: 'Le mode VECTOR 8 calcule le produit scalaire exact avec la fonction "Dot" et la norme avec "Abs".',
    redactionSurCopie: 'Écris la formule analytique xx\' + yy\' (+ zz\') sur ta feuille et pose le calcul pas à pas.',
    fonctionsAssocieesIds: ['vecteurs-produit-scalaire'],
    piegesExamen: [
      'Confondre la touche de multiplication [×] (produit vectoriel en 3D) et la commande [Dot] (produit scalaire qui donne un réel).',
      'Utiliser le produit scalaire pour montrer la colinéarité : rappel, u et v sont orthogonaux si u · v = 0.'
    ]
  },
  {
    id: 'trigonometrie_s2',
    titre: 'Trigonométrie & Angles orientés',
    sousTitre: 'Cercle trigonométrique, valeurs remarquables et formules',
    chapitreNumero: '05',
    description: 'Angles orientés, cos(x), sin(x), équations trigonométriques, conversions sexagésimales (° \' ").',
    calculatriceRôle: 'La fx-991ES calcule les valeurs exactes en fractions et racines (ex: sin 60° = √3/2).',
    redactionSurCopie: 'Retiens par cœur les valeurs remarquables du cercle trigonométrique (0, π/6, π/4, π/3, π/2). Sers-toi de la machine comme filet de sécurité.',
    fonctionsAssocieesIds: ['setup-degre-radian'],
    piegesExamen: [
      'Le piège numéro 1 de Première S2 : être en Degré "D" quand l’énoncé donne des radians, ou vice-versa.',
      'Ne pas vérifier la lettre affichée en haut de l\'écran avant de valider un calcul trigonométrique.'
    ]
  },
  {
    id: 'statistiques_s2',
    titre: 'Statistiques & Probabilités',
    sousTitre: 'Moyenne pondérée, écart-type, médiane, quartiles et dénombrement',
    chapitreNumero: '06',
    description: 'Séries statistiques à une variable, paramètres de position et de dispersion, combinaisons nCr et permutations nPr.',
    calculatriceRôle: 'Le mode STAT 1-VAR calcule instantanément x̄, σ, n, Q1, Médiane et Q3.',
    redactionSurCopie: 'Rappelle la formule mathématique de la moyenne pondérée x̄ = ∑(ni·xi)/N et de la variance sur ta copie.',
    fonctionsAssocieesIds: ['statistiques-1-var', 'denombrement-combinaisons-ncr', 'nombres-aleatoires-ranint'],
    piegesExamen: [
      'Oublier d\'activer la colonne FREQ dans le SETUP quand les données ont des coefficients.',
      'Confondre l\'écart-type de la population (xσn) et l\'écart-type échantillonnel (xσn-1).'
    ]
  },
  {
    id: 'nombres_complexes_s2',
    titre: 'Nombres complexes',
    sousTitre: 'Forme algébrique, conjugué, module et argument',
    chapitreNumero: '07',
    description: 'Calculs dans l’ensemble ℂ, puissances de i, module |z|, argument, forme trigonométrique et polaire.',
    calculatriceRôle: 'Le mode CMPLX 2 manipule i, donne le module exact, l\'argument et convertit en forme polaire r∠θ.',
    redactionSurCopie: 'Écris les formules théoriques |z| = √(a²+b²) et tan θ = b/a (ou cos θ et sin θ) avant de donner l\'argument.',
    fonctionsAssocieesIds: ['nombres-complexes-cmplx'],
    piegesExamen: [
      'Taper "i" en dehors du mode 2 CMPLX (la touche ENG ne fonctionne pas en mode normal COMP).',
      'Oublier de sortir de la racine carrée avant de taper le terme imaginaire (ex: √(3)i vs √(3i)).'
    ]
  },
  {
    id: 'suites_numeriques',
    titre: 'Suites numériques & Récurrence',
    sousTitre: 'Génération de termes, sens de variation et conjectures',
    chapitreNumero: '08',
    description: 'Suites arithmétiques, suites géométriques, suites définies par uₙ₊₁ = f(uₙ), calcul de sommes.',
    calculatriceRôle: 'L\'utilisation de la touche [Ans] permet de faire défiler 50 termes en 5 secondes.',
    redactionSurCopie: 'Démontre toujours par récurrence ou calcul algébrique (uₙ₊₁ - uₙ) sur ta copie ; la calculatrice ne fait qu\'une conjecture.',
    fonctionsAssocieesIds: ['suites-numeriques-ans', 'memoires-variables-sto-rcl'],
    piegesExamen: [
      'Prendre une conjecture numérique pour une preuve mathématique rigoureuse.'
    ]
  }
];
