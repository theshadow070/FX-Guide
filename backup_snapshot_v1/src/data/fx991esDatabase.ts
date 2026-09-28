import { CasioFunctionItem } from '../types';

export const FX991ES_DATABASE: CasioFunctionItem[] = [
  // 1. ÉQUATIONS DU SECOND DEGRÉ (Première S2 cœur de programme)
  {
    id: 'eqn-second-degre',
    nom: 'Résoudre une équation du 2nd degré (ax² + bx + c = 0)',
    categorie: 'equations',
    sousCategorie: 'Polynômes & Équations',
    description: 'Trouve instantanément les racines réelles ou complexes d’un trinôme du second degré sans calculer le discriminant à la main.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Chapitre Trinôme & Second degré. Utilisé pour trouver les racines, factoriser f(x) = a(x-x1)(x-x2), dresser le tableau de signes et résoudre les inéquations.',
    redactionConseil: 'Sur ta copie d’examen en Première S2, tu dois impérativement écrire la formule du discriminant Δ = b² - 4ac et son calcul détaillé. Utilise la calculatrice pour vérifier immédiatement tes valeurs de Δ, x1 et x2 avant de continuer.',
    modeCasio: '5: EQN',
    touchesRapides: ['MODE', '5', '3', 'a', '=', 'b', '=', 'c', '=', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Entrer dans le mode Équations',
        action: 'Appuie sur la touche MODE, puis choisis 5 (EQN).',
        keys: ['MODE', '5'],
        screenDisplay: '1: anX+bnY=cn  2: anX+bnY+cnZ=dn\n3: aX²+bX+c=0  4: aX³+bX²+cX+d=0',
        annotation: 'Sur la fx-991ES originale, le mode 5 regroupe tous les solveurs polynomiaux et linéaires.'
      },
      {
        stepNumber: 2,
        title: 'Sélectionner le second degré',
        action: 'Appuie sur 3 pour choisir la forme quadratique aX² + bX + c = 0.',
        keys: ['3'],
        screenDisplay: '      a      b      c\n     0      0      0',
        annotation: 'Un tableau avec 3 colonnes (a, b, c) apparaît à l’écran.'
      },
      {
        stepNumber: 3,
        title: 'Saisir les coefficients a, b et c',
        action: 'Tape la valeur de a puis "=", puis la valeur de b puis "=", puis la valeur de c puis "=".',
        keys: ['a', '=', 'b', '=', 'c', '='],
        screenDisplay: '      a      b      c\n     1      3     -4',
        annotation: 'Pour un nombre négatif, utilise la touche (-) ou le signe - de soustraction.'
      },
      {
        stepNumber: 4,
        title: 'Afficher les solutions',
        action: 'Appuie sur "=" pour obtenir la première solution X1. Appuie sur la flèche vers le bas (ou "=") pour afficher X2.',
        keys: ['=', '▼'],
        screenDisplay: 'X1=\n                1\n(puis ▼) X2=\n               -4',
        annotation: 'Si l’équation admet des racines complexes, la fx-991ES affiche "i" à droite de l’écran.'
      },
      {
        stepNumber: 5,
        title: 'Quitter ou refaire un calcul',
        action: 'Pour modifier un coefficient, appuie sur AC. Pour revenir au mode de calcul classique, fais MODE 1.',
        keys: ['AC', 'MODE', '1'],
        screenDisplay: '0',
        annotation: 'Toujours revenir en MODE 1 (COMP) une fois ton équation résolue !'
      }
    ],
    exemple: {
      enonce: 'Résoudre dans ℝ l’équation x² + 3x - 4 = 0.',
      entree: 'a = 1, b = 3, c = -4',
      touchesDetaillees: ['MODE', '5', '3', '1', '=', '3', '=', '(-)', '4', '=', '='],
      resultatEcran: 'X1 = 1 ; X2 = -4',
      interpretation: 'Le trinôme admet deux racines distinctes réelles x1 = 1 et x2 = -4. On peut ainsi le factoriser : (x - 1)(x + 4).'
    },
    aRetenir: [
      'Sur la Casio fx-991ES originale, le mode EQN 3 ne donne PAS le sommet de la parabole (contrairement aux versions ultérieures comme la 991EX). Ne perds pas de temps à chercher cette information.',
      'Si le résultat affiche une petite lettre "i", cela signifie que Δ < 0 et que les solutions sont dans l’ensemble des nombres complexes ℂ.',
      'Si X1 apparaît sans X2 (ou si X1 = X2), le discriminant est nul (racine double).'
    ],
    astuces: [
      'Tu peux entrer des fractions directement dans les coefficients : par exemple tape 1 [ab/c] 2 pour a = 1/2.',
      'Pour convertir un résultat décimal en fraction ou inversement, utilise la touche [S<=>D].'
    ],
    erreursFrequentes: [
      {
        probleme: 'L’écran affiche une solution avec un "i" (ex: 2 + 3i) alors que tu cherches des réels.',
        cause: 'Le discriminant Δ est négatif, l’équation n’a aucune solution dans ℝ.',
        solution: 'Sur ta copie de Première S2, note Δ < 0 donc l’équation n’admet pas de solution réelle dans ℝ.'
      },
      {
        probleme: 'Erreur de signe lors de la saisie (ex: x² - 5x + 6 = 0).',
        cause: 'Oublier le signe négatif sur b = -5.',
        solution: 'Vérifie bien la case b dans la matrice des coefficients avant d’appuyer sur = final.'
      }
    ],
    motsClesRecherche: ['équation', 'second degré', 'racine', 'trinôme', 'discriminant', 'delta', 'polynome', 'eqn', 'ax2+bx+c'],
    s2Theme: 'second_degre',
    verifie: true
  },

  // 2. DÉRIVÉE NUMÉRIQUE EN UN POINT (Première S2)
  {
    id: 'derivee-numerique-ddx',
    nom: 'Calculer le nombre dérivé f\'(x₀) avec d/dx',
    categorie: 'fonctions_analyse',
    sousCategorie: 'Dérivation & Tangentes',
    description: 'Calcule avec une précision extrême la valeur du nombre dérivé f\'(a) d’une fonction en un point précis.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Dérivation. Permet de vérifier instantanément le coefficient directeur de la tangente, la dérivabilité en un point ou le calcul d’une fonction dérivée.',
    redactionConseil: 'La calculatrice ne donne que la valeur numérique de la dérivée en UN point, elle ne donne JAMAIS l’expression formelle f\'(x). Calcule d’abord f\'(x) avec tes formules de cours, puis compare f\'(x₀) avec la valeur de la fx-991ES.',
    modeCasio: '1: COMP',
    touchesRapides: ['SHIFT', '∫dx', 'expression', 'ALPHA', ')', 'x_valeur', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Appeler la fonction de dérivation',
        action: 'Assure-toi d’être en MODE 1 (COMP), puis appuie sur SHIFT suivi de la touche [∫dx] (située sous la touche de flèche Replay droite).',
        keys: ['SHIFT', '∫dx'],
        screenDisplay: 'd/dx(□)|x=□',
        annotation: 'La fonction d/dx est inscrite en jaune au-dessus de la touche d’intégrale.'
      },
      {
        stepNumber: 2,
        title: 'Saisir la fonction avec la variable X',
        action: 'Tape l’expression de f(X). Pour taper la variable X, utilise la combinaison [ALPHA] [ ) ].',
        keys: ['ALPHA', ')'],
        screenDisplay: 'd/dx(3X² - 5X + 1)|x=□',
        annotation: 'La touche [ ) ] comporte un X rouge au-dessus, activé par ALPHA.'
      },
      {
        stepNumber: 3,
        title: 'Définir la valeur x₀ où calculer la dérivée',
        action: 'Utilise la flèche droite [▶] pour te déplacer dans la zone "x=" puis tape la valeur du point.',
        keys: ['▶', '2'],
        screenDisplay: 'd/dx(3X² - 5X + 1)|x=2',
        annotation: 'C’est l’abscisse du point de contact de la tangente.'
      },
      {
        stepNumber: 4,
        title: 'Calculer le résultat',
        action: 'Appuie sur [=]. La calculatrice calcule la dérivée par méthode numérique.',
        keys: ['='],
        screenDisplay: '7',
        annotation: 'Le résultat f\'(2) = 7 s’affiche directement.'
      }
    ],
    exemple: {
      enonce: 'Pour f(x) = 3x² - 5x + 1, déterminer le coefficient directeur de la tangente en x = 2.',
      entree: 'd/dx(3X² - 5X + 1)|x=2',
      touchesDetaillees: ['SHIFT', '∫dx', '3', 'ALPHA', ')', 'x²', '-', '5', 'ALPHA', ')', '+', '1', '▶', '2', '='],
      resultatEcran: '7',
      interpretation: 'Le nombre dérivé est f\'(2) = 7. L’équation de la tangente est donc de la forme y = 7(x - 2) + f(2).'
    },
    aRetenir: [
      'd/dx utilise une méthode d’approximation numérique (différences finies). Le calcul peut prendre une demi-seconde si l’expression est lourde.',
      'Si la fonction n’est pas dérivable en x₀ (ex: |x| en 0 ou racine carrée en 0), la calculatrice risque de renvoyer une erreur ou une approximation inexacte.'
    ],
    astuces: [
      'Si ta fonction comporte des sinus ou cosinus, vérifie impérativement que ta calculatrice est en RADIAN via SHIFT MODE 4 (Rad) ! En analyse, la dérivation trigonométrique exige toujours le radian.'
    ],
    erreursFrequentes: [
      {
        probleme: 'Erreur "Syntax ERROR" lors de la validation.',
        cause: 'Parenthèse non fermée ou variable tapée avec la touche de multiplication au lieu de [ALPHA] [ ) ].',
        solution: 'Utilise exclusivement [ALPHA] [ ) ] pour insérer le symbole X.'
      }
    ],
    motsClesRecherche: ['dérivée', 'dérivation', 'nombre dérivé', 'tangente', 'pente', 'ddx', 'coefficient directeur'],
    s2Theme: 'fonctions_derivation',
    verifie: true
  },

  // 3. TABLEAU DE VALEURS DE FONCTION (MODE 7 TABLE)
  {
    id: 'mode-table-valeurs',
    nom: 'Générer un tableau de valeurs f(X) (Mode TABLE)',
    categorie: 'fonctions_analyse',
    sousCategorie: 'Étude de fonctions',
    description: 'Calcule une liste de points ordonnés pour tracer rapidement une courbe, trouver un extremum ou conjecturer des zéros.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Indispensable pour tracer précisément la courbe représentative Cf d’une fonction sur papier millimétré lors des devoirs surveillés.',
    redactionConseil: 'Copie 4 à 6 points stratégiques sur ton tableau de valeurs de copie en indiquant les coordonnées (x ; f(x)).',
    modeCasio: '7: TABLE',
    touchesRapides: ['MODE', '7', 'f(X)', '=', 'Start', '=', 'End', '=', 'Step', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Accéder au mode TABLE',
        action: 'Appuie sur MODE puis sur 7 (TABLE).',
        keys: ['MODE', '7'],
        screenDisplay: 'f(X)=',
        annotation: 'Sur la fx-991ES originale, le mode TABLE gère UNIQUEMENT une seule fonction f(X) (contrairement aux modèles ultérieurs qui gèrent g(X)).'
      },
      {
        stepNumber: 2,
        title: 'Saisir l’expression de la fonction',
        action: 'Tape l’expression de la fonction avec la touche [ALPHA] [ ) ] pour insérer X.',
        keys: ['ALPHA', ')', 'x²', '-', '4'],
        screenDisplay: 'f(X)=X²-4',
        annotation: 'Toutes les fonctions scientifiques usuelles (fractions, racines, cos, sin) sont utilisables.'
      },
      {
        stepNumber: 3,
        title: 'Définir la valeur de départ (Start)',
        action: 'Appuie sur [=]. L’invite "Start?" s’affiche. Saisis la borne inférieure de ton intervalle, puis [=].',
        keys: ['=', '(-)', '2', '='],
        screenDisplay: 'Start? -2',
        annotation: 'Par exemple -2 si tu veux étudier la fonction sur [-2 ; 3].'
      },
      {
        stepNumber: 4,
        title: 'Définir la fin (End) et le pas (Step)',
        action: 'Saisis la borne supérieure à "End?", appuie sur [=]. À l’invite "Step?", saisis le pas (ex: 0.5 ou 1) puis [=].',
        keys: ['3', '=', '0', '.', '5', '='],
        screenDisplay: '       X      f(X)\n 1    -2        0\n 2  -1.5    -1.75\n 3    -1       -3',
        annotation: 'Le pas (Step) est l’écart entre deux valeurs successives de X.'
      },
      {
        stepNumber: 5,
        title: 'Naviguer dans le tableau',
        action: 'Utilise les flèches haut [▲] et bas [▼] pour parcourir toutes les valeurs calculées.',
        keys: ['▼', '▲'],
        screenDisplay: 'X = -1.5, f(X) = -1.75',
        annotation: 'La valeur exacte sélectionnée s’affiche en bas d’écran.'
      }
    ],
    exemple: {
      enonce: 'Tracer la courbe de f(x) = x² - 4 sur l’intervalle [-2 ; 3] avec un pas de 1.',
      entree: 'f(X)=X²-4, Start: -2, End: 3, Step: 1',
      touchesDetaillees: ['MODE', '7', 'ALPHA', ')', 'x²', '-', '4', '=', '(-)', '2', '=', '3', '=', '1', '='],
      resultatEcran: 'Tableau : (-2;0), (-1;-3), (0;-4), (1;-3), (2;0), (3;5)',
      interpretation: 'Le minimum de la fonction semble être atteint en x = 0 où f(0) = -4. Les racines visibles sont x = -2 et x = 2.'
    },
    aRetenir: [
      'Sur la fx-991ES originale, le nombre maximal de lignes dans la table dépend de la mémoire disponible (environ 30 points). Si l’intervalle divisé par le pas dépasse cette limite, la calculatrice affichera "Insufficient MEM".',
      'Pour sortir du tableau et faire d’autres calculs, n’oublie pas de faire MODE 1 (COMP).'
    ],
    astuces: [
      'Pour repérer un extremum ou une racine avec plus de précision, refais une table "zoomée" autour du point suspect avec un pas plus fin (ex: Step 0.1).'
    ],
    erreursFrequentes: [
      {
        probleme: 'Message d’erreur "Insufficient MEM".',
        cause: 'L’intervalle [Start, End] est trop grand par rapport au Step (trop de points demandés).',
        solution: 'Augmente le pas (par exemple passe de Step 0.05 à 0.5) ou réduis l’intervalle.'
      }
    ],
    motsClesRecherche: ['table', 'tableau de valeurs', 'courbe', 'tracer', 'extremum', 'step', 'start', 'end', 'points'],
    s2Theme: 'fonctions_derivation',
    verifie: true
  },

  // 4. RÉSOLUTIONS DE SYSTÈMES LINÉAIRES 2x2 et 3x3
  {
    id: 'systemes-lineaires-eqn',
    nom: 'Résoudre un système linéaire à 2 ou 3 inconnues',
    categorie: 'equations',
    sousCategorie: 'Systèmes linéaires',
    description: 'Détermine instantanément le couple solution (x, y) ou le triplet (x, y, z) d’un système d’équations linéaires.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Intersection de droites et de plans dans l’espace, recherche de coefficients d’un polynôme passant par des points donnés.',
    redactionConseil: 'Résous par combinaison linéaire ou substitution sur ta copie, et sers-toi de la fx-991ES pour t’assurer à 100% que ton couple solution est correct avant de conclure.',
    modeCasio: '5: EQN',
    touchesRapides: ['MODE', '5', '1', 'a1', '=', 'b1', '=', 'c1', '=', 'a2', '=', 'b2', '=', 'c2', '=', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Accéder au menu EQN',
        action: 'Appuie sur MODE 5 pour ouvrir le menu d’équations.',
        keys: ['MODE', '5'],
        screenDisplay: '1: anX+bnY=cn\n2: anX+bnY+cnZ=dn',
        annotation: '1 pour 2 inconnues (X, Y) ; 2 pour 3 inconnues (X, Y, Z).'
      },
      {
        stepNumber: 2,
        title: 'Sélectionner 2 inconnues (Option 1)',
        action: 'Appuie sur 1 pour choisir la forme anX + bnY = cn.',
        keys: ['1'],
        screenDisplay: '      a      b      c\n1     0      0      0\n2     0      0      0',
        annotation: 'Attention : le terme constant cn doit être placé à droite du signe égal !'
      },
      {
        stepNumber: 3,
        title: 'Entrer les coefficients de la première équation',
        action: 'Tape a1, "=", b1, "=", c1, "=".',
        keys: ['2', '=', '3', '=', '1', '2', '='],
        screenDisplay: 'Ligne 1 : 2X + 3Y = 12',
        annotation: 'Le curseur passe automatiquement à la deuxième ligne.'
      },
      {
        stepNumber: 4,
        title: 'Entrer les coefficients de la deuxième équation',
        action: 'Tape a2, "=", b2, "=", c2, "=" puis appuie à nouveau sur "=".',
        keys: ['1', '=', '(-)', '1', '=', '1', '=', '='],
        screenDisplay: 'X=\n                3\n(puis ▼) Y=\n                2',
        annotation: 'Appuie sur ▼ pour voir la valeur de Y.'
      }
    ],
    exemple: {
      enonce: 'Résoudre le système : { 2x + 3y = 12 et x - y = 1 }.',
      entree: 'Ligne 1: 2, 3, 12 | Ligne 2: 1, -1, 1',
      touchesDetaillees: ['MODE', '5', '1', '2', '=', '3', '=', '1', '2', '=', '1', '=', '(-)', '1', '=', '1', '=', '='],
      resultatEcran: 'X = 3 ; Y = 2',
      interpretation: 'Le système admet un unique couple solution S = {(3 ; 2)}. Géométriquement, c’est le point d’intersection des deux droites.'
    },
    aRetenir: [
      'Sur la Casio fx-991ES, les constantes c1 et c2 DOIVENT être à droite du signe "=". Si ton équation est 2x + 3y - 12 = 0, tu dois obligatoirement écrire c1 = 12.',
      'Si le système est impossible (droites parallèles non confondues), la calculatrice affiche "No solution".',
      'Si le système a une infinité de solutions (droites confondues), elle affiche "Infinite solution".'
    ],
    astuces: [
      'Pour un système à 3 inconnues en géométrie de l’espace, choisis l’option 2 (anX + bnY + cnZ = dn).'
    ],
    erreursFrequentes: [
      {
        probleme: 'Résultats inversés ou faux.',
        cause: 'Avoir entré la constante avec le mauvais signe car elle était à gauche du "=" dans l’énoncé.',
        solution: 'Isole toujours la constante à droite avant de saisir sur la calculatrice.'
      }
    ],
    motsClesRecherche: ['système', 'inconnues', 'équations linéaires', 'intersection', 'droites', 'x y', 'substitution', 'combinaison'],
    s2Theme: 'systemes_lineaires',
    verifie: true
  },

  // 5. PRODUIT SCALAIRE ET VECTEURS (MODE 8 VECTOR)
  {
    id: 'vecteurs-produit-scalaire',
    nom: 'Produit scalaire et norme de vecteurs (Mode VECTOR)',
    categorie: 'geometrie_vecteurs',
    sousCategorie: 'Géométrie vectorielle',
    description: 'Calcule le produit scalaire u · v, la norme ||u|| et le produit vectoriel u ∧ v en 2D ou 3D.',
    niveau: 'Intermédiaire',
    contexteScolaire: 'Première S2 — Chapitre Produit scalaire dans le plan et l’espace. Orthogonalité, angles de vecteurs, travail d’une force.',
    redactionConseil: 'Rappelle la formule analytique u · v = xx\' + yy\' (+ zz\' en 3D) sur ta copie. Utilise la calculatrice pour valider le calcul sans risque d’erreur de calcul mental.',
    modeCasio: '8: VECTOR',
    touchesRapides: ['MODE', '8', '1', '2', 'SHIFT', '5', '7', 'SHIFT', '5', '4', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Entrer en mode VECTOR',
        action: 'Appuie sur MODE 8.',
        keys: ['MODE', '8'],
        screenDisplay: '1: VctA  2: VctB  3: VctC',
        annotation: 'Tu peux stocker 3 vecteurs en mémoire.'
      },
      {
        stepNumber: 2,
        title: 'Définir la dimension du vecteur A',
        action: 'Choisis 1 (VctA), puis choisis la dimension : 1 pour 3 dimensions, ou 2 pour 2 dimensions.',
        keys: ['1', '2'],
        screenDisplay: 'VctA(2)\n[ 0,  0 ]',
        annotation: 'En Première S2 plane, choisis 2 (2D : X, Y).'
      },
      {
        stepNumber: 3,
        title: 'Saisir les composantes de VctA et valider',
        action: 'Tape la coordonnée X puis "=", la coordonnée Y puis "=". Puis appuie sur [AC] pour sauvegarder.',
        keys: ['3', '=', '4', '=', 'AC'],
        screenDisplay: '0',
        annotation: 'Appuyer sur AC ne supprime pas le vecteur ! Il est enregistré dans VctA.'
      },
      {
        stepNumber: 4,
        title: 'Définir le vecteur B',
        action: 'Appuie sur [SHIFT] [5] (VECTOR) -> 1 (Dim) -> 2 (VctB) -> 2 (2D). Entre les composantes et termine par [AC].',
        keys: ['SHIFT', '5', '1', '2', '2', '(-)', '2', '=', '5', '=', 'AC'],
        screenDisplay: '0',
        annotation: 'Le menu [SHIFT] [5] est le centre de commande de tous les calculs vectoriels.'
      },
      {
        stepNumber: 5,
        title: 'Calculer le produit scalaire (Dot)',
        action: 'Appuie sur [SHIFT] [5] [3] (VctA), puis [SHIFT] [5] [7] (Dot), puis [SHIFT] [5] [4] (VctB), et enfin [=].',
        keys: ['SHIFT', '5', '3', 'SHIFT', '5', '7', 'SHIFT', '5', '4', '='],
        screenDisplay: 'VctA Dot VctB\n               14',
        annotation: 'La commande Dot correspond au produit scalaire mathématique.'
      }
    ],
    exemple: {
      enonce: 'Calculer le produit scalaire des vecteurs u(3 ; 4) et v(-2 ; 5).',
      entree: 'VctA = [3, 4], VctB = [-2, 5], calcul VctA Dot VctB',
      touchesDetaillees: ['SHIFT', '5', '3', 'SHIFT', '5', '7', 'SHIFT', '5', '4', '='],
      resultatEcran: '14',
      interpretation: 'u · v = 3×(-2) + 4×5 = -6 + 20 = 14. Comme u · v ≠ 0, les deux vecteurs ne sont pas orthogonaux.'
    },
    aRetenir: [
      'Pour calculer la NORME d’un vecteur : appuie sur [SHIFT] [hyp] (Abs pour valeur absolue/norme), puis [SHIFT] [5] [3] (VctA) [ ) ] [=]. Exemple : Abs(VctA) pour u(3;4) donne 5 !',
      'Pour le produit vectoriel en 3D : utilise la touche de multiplication standard [×] entre les deux vecteurs (VctA × VctB).'
    ],
    astuces: [
      'Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul (Dot = 0). C’est un test ultra-rapide pour vérifier un angle droit.'
    ],
    erreursFrequentes: [
      {
        probleme: 'Utiliser la touche [×] au lieu de Dot en 2D.',
        cause: 'En 2D, le produit vectoriel n’existe pas et la calculatrice affichera "Dim ERROR".',
        solution: 'Utilise impérativement la fonction "Dot" ([SHIFT] [5] [7]) pour le produit scalaire.'
      }
    ],
    motsClesRecherche: ['vecteur', 'produit scalaire', 'norme', 'orthogonalité', 'dot', 'vector', 'coordonnées', 'longueur'],
    s2Theme: 'produit_scalaire_vecteurs',
    verifie: true
  },

  // 6. STATISTIQUES À 1 VARIABLE (MODE 3 STAT)
  {
    id: 'statistiques-1-var',
    nom: 'Statistiques à 1 variable (Moyenne, Écart-type, Quartiles)',
    categorie: 'statistiques',
    sousCategorie: 'Statistiques descriptives',
    description: 'Calcule instantanément moyenne x̄, effectif total n, écart-type σ, somme des valeurs et quartiles.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Statistiques. Caractéristiques de position (moyenne, médiane, quartiles) et de dispersion (variance, écart-type).',
    redactionConseil: 'Écris la formule de la moyenne x̄ = (∑ ni·xi) / N sur ta copie avant d’écrire la valeur numérique obtenue avec la machine.',
    modeCasio: '3: STAT',
    touchesRapides: ['MODE', '3', '1', 'X_valeurs', 'AC', 'SHIFT', '1', '5', '2', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Passer en mode Statistiques',
        action: 'Appuie sur MODE 3 puis choisis 1 (1-VAR pour une variable).',
        keys: ['MODE', '3', '1'],
        screenDisplay: '        X\n 1\n 2',
        annotation: 'Un tableau de saisie de données s’affiche.'
      },
      {
        stepNumber: 2,
        title: '(Optionnel) Activer les effectifs / fréquences',
        action: 'Si ta série comporte des effectifs (pondérations), active la colonne FREQ via : [SHIFT] [MODE] (SETUP) -> flèche bas [▼] -> 4 (STAT) -> 1 (ON).',
        keys: ['SHIFT', 'MODE', '▼', '4', '1'],
        screenDisplay: '        X     FREQ\n 1',
        annotation: 'Une colonne FREQ s’ajoute automatiquement pour entrer les effectifs !'
      },
      {
        stepNumber: 3,
        title: 'Saisir la série de données',
        action: 'Tape chaque valeur de X suivie de [=]. Si la colonne FREQ est activée, utilise les flèches pour entrer les effectifs correspondants.',
        keys: ['1', '0', '=', '1', '2', '=', '1', '5', '='],
        screenDisplay: '        X     FREQ\n 1     10        2\n 2     12        3\n 3     15        1',
        annotation: 'Une fois la saisie terminée, appuie sur la touche [AC]. Tes données restent en mémoire !'
      },
      {
        stepNumber: 4,
        title: 'Afficher la moyenne et l’écart-type',
        action: 'Appuie sur [SHIFT] [1] (STAT) puis choisis 5 (Var).',
        keys: ['SHIFT', '1', '5'],
        screenDisplay: '1: n       2: x̄\n3: xσn     4: xσn-1',
        annotation: 'Choisis 2 pour la moyenne x̄, ou 3 pour l’écart-type de la population σ.'
      },
      {
        stepNumber: 5,
        title: 'Afficher les quartiles et la médiane',
        action: 'Appuie sur [SHIFT] [1] puis choisis 6 (MinMax).',
        keys: ['SHIFT', '1', '6'],
        screenDisplay: '1: minX    2: maxX\n3: Q1      4: med\n5: Q3',
        annotation: 'Tu obtiens min, max, premier quartile Q1, médiane et troisième quartile Q3 !'
      }
    ],
    exemple: {
      enonce: 'Calculer la moyenne et l’écart-type des notes : 10 (coeff 2), 12 (coeff 3), 15 (coeff 1).',
      entree: 'X = [10, 12, 15] avec FREQ = [2, 3, 1]',
      touchesDetaillees: ['SHIFT', '1', '5', '2', '='],
      resultatEcran: 'x̄ = 11.833... ; xσn ≈ 1.675',
      interpretation: 'La moyenne pondérée de la classe est d’environ 11.83/20 avec un écart-type de 1.68.'
    },
    aRetenir: [
      'Attention au choix de l’écart-type : en Première S2, utilise "xσn" (option 3) pour l’écart-type de la série complète. L’option 4 "xσn-1" est l’écart-type échantillonnel.',
      'N’appuie JAMAIS sur SHIFT 9 (Clear All) pendant l’exercice car cela efface tes données statistiques.'
    ],
    astuces: [
      'Pour vérifier l’effectif total, demande n dans le menu Var ([SHIFT] [1] [5] [1]). Si n ne correspond pas au total de tes élèves, tu as fait une erreur de saisie.'
    ],
    erreursFrequentes: [
      {
        probleme: 'La moyenne est calculée comme si toutes les notes avaient le même coefficient 1.',
        cause: 'La colonne FREQ n’a pas été activée dans le SETUP.',
        solution: 'Fais SHIFT MODE ▼ 4 (STAT) 1 (ON) avant de remplir ton tableau.'
      }
    ],
    motsClesRecherche: ['statistiques', 'moyenne', 'écart-type', 'médiane', 'quartiles', 'effectif', 'freq', '1-var', 'variance'],
    s2Theme: 'statistiques_s2',
    verifie: true
  },

  // 7. NOMBRES COMPLEXES (MODE 2 CMPLX)
  {
    id: 'nombres-complexes-cmplx',
    nom: 'Module, argument et conjugué de complexes (Mode CMPLX)',
    categorie: 'nombres_complexes',
    sousCategorie: 'Nombres complexes',
    description: 'Calcule l’écriture algébrique a + bi, le module |z|, l’argument arg(z) et convertit en forme polaire r∠θ.',
    niveau: 'Intermédiaire',
    contexteScolaire: 'Première S2 — Nombres complexes. Calculs sur les puissances de i, module, argument, forme trigonométrique.',
    redactionConseil: 'Sur la copie, détaille toujours |z| = √(a² + b²) et cos θ = a/|z|, sin θ = b/|z|. La calculatrice te permet de vérifier instantanément ton angle.',
    modeCasio: '2: CMPLX',
    touchesRapides: ['MODE', '2', 'z', 'SHIFT', '2', '1', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Passer en mode Nombres Complexes',
        action: 'Appuie sur MODE 2 (CMPLX).',
        keys: ['MODE', '2'],
        screenDisplay: 'CMPLX s’affiche en haut de l’écran',
        annotation: 'La touche [ENG] devient active pour taper l’unité imaginaire "i".'
      },
      {
        stepNumber: 2,
        title: 'Taper un nombre complexe (ex: 1 + i√3)',
        action: 'Tape "1 + ", puis [√] 3, flèche droite [▶] pour sortir de la racine, puis [ENG] pour taper "i".',
        keys: ['1', '+', '√', '3', '▶', 'ENG'],
        screenDisplay: '1+√3 i',
        annotation: 'Attention : toujours sortir de la racine carrée avant d’appuyer sur "i" !'
      },
      {
        stepNumber: 3,
        title: 'Calculer le module |z|',
        action: 'Appuie sur [SHIFT] [hyp] (Abs), tape le nombre complexe, ferme la parenthèse et appuie sur [=].',
        keys: ['SHIFT', 'hyp', '1', '+', 'ENG', ')', '='],
        screenDisplay: 'Abs(1+i)\n            √2',
        annotation: 'La touche Abs donne directement le module exact sous forme de racine simplifiée.'
      },
      {
        stepNumber: 4,
        title: 'Calculer l’argument arg(z)',
        action: 'Appuie sur [SHIFT] [2] (menu CMPLX), choisis 1 (arg), tape le nombre complexe puis [=].',
        keys: ['SHIFT', '2', '1', '1', '+', 'ENG', ')', '='],
        screenDisplay: 'arg(1+i)\n           π/4  (si Radian) ou 45 (si Degré)',
        annotation: 'Vérifie bien si ta calculatrice est réglée en Radian ou en Degré.'
      },
      {
        stepNumber: 5,
        title: 'Convertir directement en forme polaire r∠θ',
        action: 'Tape ton nombre complexe, puis [SHIFT] [2] 3 (▶r∠θ) puis [=].',
        keys: ['SHIFT', '2', '3', '='],
        screenDisplay: '2∠60 (si en Degré)',
        annotation: 'Donne simultanément le module r et l’argument θ.'
      }
    ],
    exemple: {
      enonce: 'Déterminer le module et un argument du complexe z = 1 + i√3.',
      entree: '1 + √3 i -> Conversion polaire ▶r∠θ',
      touchesDetaillees: ['1', '+', '√', '3', '▶', 'ENG', 'SHIFT', '2', '3', '='],
      resultatEcran: '2∠60°  (ou 2∠(π/3) si en Radian)',
      interpretation: 'Le module est |z| = 2 et un argument est θ = π/3 rad (soit 60°).'
    },
    aRetenir: [
      'L’unité imaginaire "i" s’obtient UNIQUEMENT avec la touche [ENG] en mode 2 (CMPLX). En mode 1 (COMP), appuyer sur ENG ne tapera pas de "i".',
      'L’option 2 du menu CMPLX donne le conjugué : Conjg(a + bi) = a - bi.'
    ],
    astuces: [
      'Pour élever un nombre complexe à une puissance (ex: (1+i)⁸), mets bien le complexe entre parenthèses avant d’appuyer sur la touche de puissance x^.'
    ],
    erreursFrequentes: [
      {
        probleme: 'La touche [ENG] ne fait rien ou n’écrit pas "i".',
        cause: 'Tu es toujours en MODE 1 (COMP) au lieu du MODE 2 (CMPLX).',
        solution: 'Appuie sur [MODE] puis [2] pour afficher l’indicateur CMPLX en haut.'
      }
    ],
    motsClesRecherche: ['complexe', 'imaginaire', 'module', 'argument', 'forme polaire', 'forme algébrique', 'i', 'cmplx', 'conjugué'],
    s2Theme: 'nombres_complexes_s2',
    verifie: true
  },

  // 8. CONFIGURATION DEGRÉS / RADIANS (CRITIQUE S2)
  {
    id: 'setup-degre-radian',
    nom: 'Changer l’unité d’angle (Degrés ⇄ Radians)',
    categorie: 'trigonometrie',
    sousCategorie: 'Angles & Trigonométrie',
    description: 'Bascule entre le mode Degré (D) et Radian (R) pour les calculs de trigonométrie et de dérivation.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Chapitre Trigonométrie & Fonctions circulaires. En géométrie plane, on utilise souvent le Degré ; en étude de fonctions et analyse, le Radian est STRICTEMENT obligatoire.',
    redactionConseil: 'Vérifie systématiquement la petite lettre en haut de l’écran LCD : un "D" indique Degrés, un "R" indique Radians.',
    modeCasio: '1: COMP',
    touchesRapides: ['SHIFT', 'MODE', '3 (Deg)', 'ou', '4 (Rad)'],
    etapes: [
      {
        stepNumber: 1,
        title: 'Ouvrir le menu SETUP',
        action: 'Appuie sur [SHIFT] puis sur la touche [MODE] (SETUP est écrit en jaune au-dessus).',
        keys: ['SHIFT', 'MODE'],
        screenDisplay: '1: MthIO    2: LineIO\n3: Deg      4: Rad\n5: Gra      6: Fix\n7: Sci      8: Norm',
        annotation: 'Le menu SETUP configure tout le comportement d’affichage et d’unités.'
      },
      {
        stepNumber: 2,
        title: 'Choisir Radian (Option 4)',
        action: 'Appuie sur la touche 4 pour passer en Radians.',
        keys: ['4'],
        screenDisplay: 'Un petit "R" apparaît en haut au milieu de l’écran LCD.',
        annotation: 'Indispensable pour calculer sin(π/6), cos(2x), les dérivées trigonométriques, etc.'
      },
      {
        stepNumber: 3,
        title: 'Revenir en Degrés (Option 3)',
        action: 'Pour repasser en Degrés, refais [SHIFT] [MODE] puis choisis 3 (Deg).',
        keys: ['SHIFT', 'MODE', '3'],
        screenDisplay: 'Un petit "D" remplace le "R" en haut de l’écran.',
        annotation: 'À utiliser lorsque les angles sont donnés en degrés dans les problèmes de physique ou de géométrie.'
      }
    ],
    exemple: {
      enonce: 'Calculer sin(30) en degrés, puis sin(π/6) en radians.',
      entree: 'Degré : sin(30) | Radian : sin(π/6)',
      touchesDetaillees: ['sin', '3', '0', ')', '='],
      resultatEcran: 'sin(30°) = 1/2 ; sin(π/6 rad) = 1/2',
      interpretation: 'Les deux calculs donnent exactement la même valeur si la calculatrice est dans l’unité correspondante.'
    },
    aRetenir: [
      'Si tu calcules sin(π/6) alors que la calculatrice est en Degré "D", le résultat sera totalement faux !',
      'Le symbole du nombre π s’obtient par la combinaison [SHIFT] [×10ˣ].'
    ],
    astuces: [
      'Tu peux forcer temporairement une unité sans modifier le SETUP en utilisant le menu DRG : tape [SHIFT] [Ans] (DRG▶), puis choisis 1 (°) ou 2 (r).'
    ],
    erreursFrequentes: [
      {
        probleme: 'cos(60) donne un résultat incompréhensible (-0.9524...).',
        cause: 'La calculatrice est réglée en Radian "R" alors que tu as tapé un angle en degrés.',
        solution: 'Fais SHIFT MODE 3 pour repasser en Degré "D". Tu obtiendras bien 1/2.'
      }
    ],
    motsClesRecherche: ['radian', 'degré', 'angle', 'trigo', 'sinus', 'cosinus', 'setup', 'pi', 'unite'],
    s2Theme: 'trigonometrie_s2',
    verifie: true
  },

  // 9. LE SOLVEUR NUMÉRIQUE (SOLVE) — FONCTION PUISSANTE
  {
    id: 'solveur-solve-fx991es',
    nom: 'Résoudre n’importe quelle équation avec SOLVE',
    categorie: 'equations',
    sousCategorie: 'Solveur universel',
    description: 'Trouve une solution numérique à n’importe quelle équation f(x) = g(x) par l’algorithme de Newton.',
    niveau: 'Avancé',
    contexteScolaire: 'Première S2 — Vérifier les solutions d’équations trigonométriques, exponentielles, rationnelles ou de problèmes de physique.',
    redactionConseil: 'Cette méthode utilise une approximation numérique. Tu ne dois pas écrire "résolu par SOLVE" sur une copie, mais l’utiliser pour trouver la réponse attendue et guider tes calculs.',
    modeCasio: '1: COMP',
    touchesRapides: ['expression', 'ALPHA', 'CALC (=)', 'expression', 'SHIFT', 'CALC (SOLVE)', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Écrire l’équation avec la variable X',
        action: 'Tape le membre de gauche de ton équation. Utilise [ALPHA] [ ) ] pour insérer la variable X.',
        keys: ['ALPHA', ')', 'x²', '-', '5'],
        screenDisplay: 'X²-5',
        annotation: 'Exemple pour résoudre x² - 5 = 0.'
      },
      {
        stepNumber: 2,
        title: 'Insérer le symbole égal (=) de l’équation',
        action: 'N’utilise PAS la touche [=] du pavé numérique ! Utilise [ALPHA] [CALC] pour afficher le symbole "=". Puis tape le membre de droite.',
        keys: ['ALPHA', 'CALC', '0'],
        screenDisplay: 'X²-5=0',
        annotation: 'Le "=" rouge est situé au-dessus de la touche CALC.'
      },
      {
        stepNumber: 3,
        title: 'Lancer le solveur SOLVE',
        action: 'Appuie sur [SHIFT] suivi de la touche [CALC] (SOLVE est écrit en jaune au-dessus).',
        keys: ['SHIFT', 'CALC'],
        screenDisplay: 'X²-5=0\nX?      0',
        annotation: 'La calculatrice demande une valeur de départ pour initialiser son algorithme.'
      },
      {
        stepNumber: 4,
        title: 'Fournir une estimation initiale et valider',
        action: 'Tape une valeur proche de la racine cherchée (ex: 2 pour chercher la racine positive) puis appuie sur [=].',
        keys: ['2', '='],
        screenDisplay: 'X²-5=0\nX=          2.236067977\nL-R=                  0',
        annotation: 'X est la solution trouvée. "L-R=0" confirme que le membre gauche égale le membre droit à la perfection !'
      }
    ],
    exemple: {
      enonce: 'Trouver une solution de l’équation 2x + 3 = 11.',
      entree: '2X+3=11 avec SOLVE',
      touchesDetaillees: ['2', 'ALPHA', ')', '+', '3', 'ALPHA', 'CALC', '1', '1', 'SHIFT', 'CALC', '0', '='],
      resultatEcran: 'X = 4, L-R = 0',
      interpretation: 'La solution unique est x = 4.'
    },
    aRetenir: [
      'La touche [=] du pavé numérique au départ ne lance pas le calcul ! C’est impérativement [SHIFT] [CALC] qui déclenche le solveur.',
      'Si l’équation admet plusieurs solutions (ex: x² = 9), la valeur trouvée dépend de la valeur de départ "X?" fournie. Tape -3 pour trouver la racine négative.'
    ],
    astuces: [
      'Si la calculatrice met du temps ou affiche "Can’t Solve", change la valeur de départ "X?" pour te rapprocher de la solution.'
    ],
    erreursFrequentes: [
      {
        probleme: 'La calculatrice affiche le résultat d’un ancien calcul.',
        cause: 'Avoir appuyé sur la touche [=] standard au lieu de [SHIFT] [CALC] pour recalculer.',
        solution: 'Refais toujours [SHIFT] [CALC] puis [=] pour forcer la mise à jour.'
      }
    ],
    motsClesRecherche: ['solve', 'solveur', 'équation', 'trouver x', 'inconnue', 'newton', 'alpha calc'],
    s2Theme: 'second_degre',
    isMeconnue: true,
    verifie: true
  },

  // 10. FRACTIONS, PUISSANCES ET CONVERSION S<=>D
  {
    id: 'fractions-puissances-sd',
    nom: 'Fractions, puissances et conversion exacte/décimale (S<=>D)',
    categorie: 'fractions_puissances',
    sousCategorie: 'Arithmétique & Calculs',
    description: 'Manipule les fractions à plusieurs étages, les puissances rationnelles et bascule entre fraction exacte et valeur décimale approchée.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Présent dans TOUS les calculs. Permet d’obtenir la valeur exacte exigée en mathématiques.',
    redactionConseil: 'En Première S2, un résultat doit TOUJOURS être donné sous forme de fraction simplifiée ou de racine exacte, jamais sous forme décimale arrondie sauf demande explicite.',
    modeCasio: '1: COMP',
    touchesRapides: ['ab/c (fraction)', 'S<=>D (conversion)'],
    etapes: [
      {
        stepNumber: 1,
        title: 'Insérer une fraction',
        action: 'Appuie sur la touche de fraction [■/■] (située en dessous de CALC).',
        keys: ['■/■'],
        screenDisplay: '□/□',
        annotation: 'Le curseur se place sur le numérateur.'
      },
      {
        stepNumber: 2,
        title: 'Saisir le numérateur et le dénominateur',
        action: 'Tape le numérateur, appuie sur la flèche bas [▼], tape le dénominateur.',
        keys: ['7', '▼', '1', '2'],
        screenDisplay: '7/12',
        annotation: 'Appuie sur la flèche droite [▶] pour sortir de la fraction.'
      },
      {
        stepNumber: 3,
        title: 'Convertir en décimal ou fraction avec S<=>D',
        action: 'Après avoir obtenu un résultat sous forme de fraction avec [=], appuie sur la touche [S<=>D].',
        keys: ['S<=>D'],
        screenDisplay: '0.5833333333',
        annotation: 'Appuie à nouveau sur [S<=>D] pour revenir instantanément à 7/12 !'
      }
    ],
    exemple: {
      enonce: 'Calculer la somme 3/4 + 5/6 sous forme simplifiée.',
      entree: '3/4 + 5/6',
      touchesDetaillees: ['■/■', '3', '▼', '4', '▶', '+', '■/■', '5', '▼', '6', '='],
      resultatEcran: '19/12',
      interpretation: 'La calculatrice réduit automatiquement au même dénominateur et simplifie la fraction.'
    },
    aRetenir: [
      'La touche [S<=>D] bascule entre la forme standard (Symbolique / Fraction / Racine) et la forme décimale.',
      'Pour saisir un nombre mixte (ex: 2 et 3/4), utilise [SHIFT] puis la touche de fraction.'
    ],
    astuces: [
      'Pour convertir une fraction impropre en fraction mixte, fais [SHIFT] [S<=>D] (ab/c ⇄ d/c).'
    ],
    erreursFrequentes: [
      {
        probleme: 'Le signe "+" se retrouve au dénominateur au lieu d’être à côté de la fraction.',
        cause: 'Avoir oublié d’appuyer sur la flèche droite [▶] pour sortir du dénominateur avant de taper le signe opératoire.',
        solution: 'Vérifie la position du curseur clignotant avant de poursuivre ta formule.'
      }
    ],
    motsClesRecherche: ['fraction', 's=d', 'sd', 'décimal', 'simplification', 'dénominateur', 'puissance', 'exacte'],
    s2Theme: 'second_degre',
    verifie: true
  },

  // 11. INTÉGRALE DÉFINIE (NUMÉRIQUE)
  {
    id: 'integrale-definie',
    nom: 'Calculer une intégrale définie ∫ f(x) dx',
    categorie: 'fonctions_analyse',
    sousCategorie: 'Intégration & Aires',
    description: 'Calcule l’intégrale définie numérique d’une fonction entre deux bornes a et b.',
    niveau: 'Intermédiaire',
    contexteScolaire: 'Première S2 / Terminale — Calcul d’aires sous une courbe, vérification d’une primitive F(b) - F(a).',
    redactionConseil: 'Sur la copie, trouve d’abord la primitive F(x), écris [F(x)] de a à b et calcule la différence. La calculatrice te permet de t’assurer que ton résultat final est exact.',
    modeCasio: '1: COMP',
    touchesRapides: ['∫dx', 'f(X)', '▶', 'borne_inf', '▶', 'borne_sup', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Appeler l’intégrale',
        action: 'Appuie sur la touche [∫dx] (directement sous la flèche Replay droite).',
        keys: ['∫dx'],
        screenDisplay: '∫(□)dx',
        annotation: 'La Casio fx-991ES intègre par la méthode numérique de Gauss-Kronrod.'
      },
      {
        stepNumber: 2,
        title: 'Entrer la fonction f(X)',
        action: 'Tape la fonction avec la touche [ALPHA] [ ) ] pour la variable X.',
        keys: ['ALPHA', ')', 'x²'],
        screenDisplay: '∫(X²)dx',
        annotation: 'Tu peux taper des polynômes, exponentielles, fractions, etc.'
      },
      {
        stepNumber: 3,
        title: 'Renseigner les bornes inférieure et supérieure',
        action: 'Utilise la flèche droite [▶] pour te positionner sur la borne inférieure (ex: 0), puis [▶] pour la borne supérieure (ex: 3).',
        keys: ['▶', '0', '▶', '3'],
        screenDisplay: '∫₀³(X²)dx',
        annotation: 'La borne inférieure est en bas, la borne supérieure en haut.'
      },
      {
        stepNumber: 4,
        title: 'Lancer le calcul',
        action: 'Appuie sur [=]. Le calcul peut prendre une à deux secondes selon la complexité.',
        keys: ['='],
        screenDisplay: '9',
        annotation: 'La valeur exacte ou approchée de l’intégrale s’affiche.'
      }
    ],
    exemple: {
      enonce: 'Calculer l’intégrale de 0 à 3 de x² dx.',
      entree: '∫(X², 0, 3)',
      touchesDetaillees: ['∫dx', 'ALPHA', ')', 'x²', '▶', '0', '▶', '3', '='],
      resultatEcran: '9',
      interpretation: 'F(x) = x³/3, donc F(3) - F(0) = 27/3 - 0 = 9. Le calcul est confirmé.'
    },
    aRetenir: [
      'La fx-991ES ne donne PAS la primitive littérale F(x), elle calcule uniquement la valeur numérique entre les deux bornes.',
      'Si la fonction intègre des sinus ou cosinus, la calculatrice DOIT être en mode RADIAN.'
    ],
    astuces: [
      'Si le calcul met trop de temps, tu peux interrompre en appuyant sur AC.'
    ],
    erreursFrequentes: [
      {
        probleme: 'Le calcul tourne indéfiniment ou renvoie une erreur.',
        cause: 'La fonction présente une discontinuité ou une asymptote verticale sur l’intervalle d’intégration (ex: 1/x en 0).',
        solution: 'Vérifie que la fonction est bien continue sur tout l’intervalle [a ; b].'
      }
    ],
    motsClesRecherche: ['intégrale', 'aire', 'primitive', 'integration', 'borne', 'gauss'],
    s2Theme: 'fonctions_derivation',
    verifie: true
  },

  // 12. CALCULS SUR LES MATRICES (MODE 6 MATRIX)
  {
    id: 'matrices-determinant-inverse',
    nom: 'Matrices : Déterminant, Inverse et Produit (Mode MATRIX)',
    categorie: 'matrices',
    sousCategorie: 'Algèbre linéaire',
    description: 'Calcule le déterminant det(A), l’inverse A⁻¹ et le produit de matrices jusqu’à la taille 3x3.',
    niveau: 'Avancé',
    contexteScolaire: 'Première S2 — Systèmes linéaires, transformations géométriques et algèbre matricielle.',
    redactionConseil: 'Détaille le calcul du déterminant ad - bc en 2x2. Utilise la calculatrice pour vérifier les inverses et les produits matriciels complexes.',
    modeCasio: '6: MATRIX',
    touchesRapides: ['MODE', '6', '1', '5 (2x2)', 'AC', 'SHIFT', '4', '7', 'SHIFT', '4', '3', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Passer en mode MATRIX',
        action: 'Appuie sur MODE 6.',
        keys: ['MODE', '6'],
        screenDisplay: '1: MatA   2: MatB   3: MatC',
        annotation: 'Tu disposes de 3 mémoires de matrices.'
      },
      {
        stepNumber: 2,
        title: 'Sélectionner la matrice et sa dimension',
        action: 'Appuie sur 1 (MatA), puis choisis la taille : 1 pour 3x3, 5 pour 2x2.',
        keys: ['1', '5'],
        screenDisplay: 'MatA(2,2)\n[ 0,  0 ]\n[ 0,  0 ]',
        annotation: 'Un tableau 2x2 apparaît.'
      },
      {
        stepNumber: 3,
        title: 'Remplir les coefficients et sauvegarder',
        action: 'Saisis chaque coefficient suivi de [=], puis appuie sur [AC] pour mémoriser.',
        keys: ['2', '=', '1', '=', '5', '=', '3', '=', 'AC'],
        screenDisplay: '0',
        annotation: 'Appuyer sur AC enregistre la matrice dans MatA.'
      },
      {
        stepNumber: 4,
        title: 'Calculer le déterminant',
        action: 'Appuie sur [SHIFT] [4] (MATRIX) -> 7 (det), puis [SHIFT] [4] -> 3 (MatA) -> [ ) ] -> [=].',
        keys: ['SHIFT', '4', '7', 'SHIFT', '4', '3', ')', '='],
        screenDisplay: 'det(MatA)\n                1',
        annotation: 'Le déterminant det(A) = 2×3 - 1×5 = 1.'
      },
      {
        stepNumber: 5,
        title: 'Calculer la matrice inverse MatA⁻¹',
        action: 'Appuie sur [SHIFT] [4] [3] (MatA), puis sur la touche [x⁻¹] (sous le bouton MODE), puis [=].',
        keys: ['SHIFT', '4', '3', 'x⁻¹', '='],
        screenDisplay: '[  3, -1 ]\n[ -5,  2 ]',
        annotation: 'La matrice inverse s’affiche directement à l’écran.'
      }
    ],
    exemple: {
      enonce: 'Pour la matrice A = [[2, 1], [5, 3]], calculer son déterminant et son inverse.',
      entree: 'MatA = [[2,1],[5,3]]',
      touchesDetaillees: ['SHIFT', '4', '3', 'x⁻¹', '='],
      resultatEcran: 'det = 1 ; MatA⁻¹ = [[3, -1], [-5, 2]]',
      interpretation: 'Comme det(A) = 1 ≠ 0, la matrice A est bien inversible.'
    },
    aRetenir: [
      'Pour multiplier deux matrices : saisis MatA et MatB, puis fais [SHIFT] [4] [3] [×] [SHIFT] [4] [4] [=].',
      'Si det(A) = 0, la matrice n’est pas inversible et la calculatrice renverra une erreur "Math ERROR" si tu demandes MatA⁻¹.'
    ],
    astuces: [
      'Pour modifier les valeurs d’une matrice sans réinitialiser toute sa dimension : [SHIFT] [4] -> 2 (Data).'
    ],
    erreursFrequentes: [
      {
        probleme: 'Erreur "Dim ERROR" lors d’une multiplication de matrices.',
        cause: 'Le nombre de colonnes de la première matrice n’est pas égal au nombre de lignes de la seconde.',
        solution: 'Vérifie les dimensions des deux matrices avant de lancer le produit.'
      }
    ],
    motsClesRecherche: ['matrice', 'déterminant', 'inverse', 'produit matriciel', 'dimension', 'det', 'matrix'],
    s2Theme: 'systemes_lineaires',
    verifie: true
  },

  // 13. MÉMOIRES ET VARIABLES (A, B, C, D, E, F, X, Y, M)
  {
    id: 'memoires-variables-sto-rcl',
    nom: 'Stocker et réutiliser des valeurs (STO / RCL)',
    categorie: 'memoires_variables',
    sousCategorie: 'Mémoire & Variables',
    description: 'Enregistre un résultat intermédiaire dans les variables A, B, C, D, E, F, X, Y ou M pour éviter de le retaper.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Évite les erreurs d’arrondis intermédiaires et fait gagner un temps précieux dans les calculs longs à étapes multiples.',
    redactionConseil: 'Garde les valeurs exactes en mémoire dans ta machine pour calculer le résultat final avec une précision totale.',
    modeCasio: '1: COMP',
    touchesRapides: ['valeur', 'SHIFT', 'RCL (STO)', 'touche_variable', 'puis', 'RCL', 'touche_variable'],
    etapes: [
      {
        stepNumber: 1,
        title: 'Calculer ou saisir le résultat à mémoriser',
        action: 'Tape ton calcul ou ton résultat (ex: √(17) + 3) puis appuie sur [=].',
        keys: ['√', '1', '7', '▶', '+', '3', '='],
        screenDisplay: '7.123105626',
        annotation: 'Le nombre s’affiche à l’écran.'
      },
      {
        stepNumber: 2,
        title: 'Stocker dans la variable A',
        action: 'Appuie sur [SHIFT] puis sur la touche [RCL] (STO est écrit en jaune au-dessus), puis appuie sur la touche [(-)] (qui porte la lettre rouge A).',
        keys: ['SHIFT', 'RCL', '(-)'],
        screenDisplay: 'Ans▶A\n          7.123105626',
        annotation: 'Attention : tu n’as PAS besoin d’appuyer sur ALPHA après STO ! Appuie directement sur la touche de la lettre.'
      },
      {
        stepNumber: 3,
        title: 'Rappeler la variable dans un autre calcul',
        action: 'Pour réutiliser A : soit appuie sur [RCL] puis [(-)], soit tape [ALPHA] [(-)] directement dans ton expression.',
        keys: ['2', '×', 'ALPHA', '(-)', '='],
        screenDisplay: '2×A\n          14.24621125',
        annotation: 'La valeur exacte complète est réutilisée sans aucun arrondi intermédiaire.'
      }
    ],
    exemple: {
      enonce: 'Calculer A = √(5) + 1 puis calculer 3×A² - 2×A.',
      entree: '√(5)+1 -> STO A -> 3A² - 2A',
      touchesDetaillees: ['√', '5', '▶', '+', '1', '=', 'SHIFT', 'RCL', '(-)', '3', 'ALPHA', '(-)', 'x²', '-', '2', 'ALPHA', '(-)', '='],
      resultatEcran: '24.94427191',
      interpretation: 'Le calcul s’exécute immédiatement sans avoir eu à recopier les 10 décimales de √(5)+1.'
    },
    aRetenir: [
      'Sur la fx-991ES, 9 variables indépendantes sont disponibles : A, B, C, D, E, F, X, Y et M.',
      'La mémoire M possède des touches dédiées : [M+] pour ajouter le résultat en cours à M, et [SHIFT] [M+] (M-) pour le retrancher.',
      'Pour réinitialiser toutes les mémoires : fais [SHIFT] [9] (CLR) -> 2 (Memory) -> [=] (Yes).'
    ],
    astuces: [
      'La touche [Ans] contient toujours le résultat du tout dernier calcul validé par [=].'
    ],
    erreursFrequentes: [
      {
        probleme: 'Appuyer sur ALPHA entre STO et la touche de variable.',
        cause: 'Sur la fx-991ES, la combinaison STO active automatiquement le mode d’adressage de variable.',
        solution: 'Fais directement SHIFT RCL (-) pour stocker dans A.'
      }
    ],
    motsClesRecherche: ['mémoire', 'variable', 'sto', 'rcl', 'stocker', 'garder', 'ans', 'm+', 'm-'],
    s2Theme: 'second_degre',
    isMeconnue: true,
    verifie: true
  },

  // 14. LES 40 CONSTANTES SCIENTIFIQUES (SHIFT 7 CONST)
  {
    id: 'constantes-scientifiques-const',
    nom: 'Utiliser les 40 constantes physiques et chimiques (SHIFT 7)',
    categorie: 'constantes_conversions',
    sousCategorie: 'Constantes & Conversions',
    description: 'Accède directement aux valeurs exactes des 40 constantes fondamentales (c, h, G, e, me, mp, NA, k, etc.).',
    niveau: 'Intermédiaire',
    contexteScolaire: 'Première S2 — Sciences Physiques & Chimie (spectroscopie, gravitation universelle, constante d’Avogadro, loi des gaz parfaits).',
    redactionConseil: 'Utilise les constantes intégrées pour une précision absolue dans tes calculs de physique-chimie.',
    modeCasio: '1: COMP',
    touchesRapides: ['SHIFT', '7', 'code_01_a_40'],
    etapes: [
      {
        stepNumber: 1,
        title: 'Appeler le menu des constantes',
        action: 'Assure-toi d’être en MODE 1, puis appuie sur [SHIFT] suivi de la touche [7] (CONST).',
        keys: ['SHIFT', '7'],
        screenDisplay: 'CONST\nNumber 01~40?',
        annotation: 'La calculatrice attend un numéro à deux chiffres de 01 à 40.'
      },
      {
        stepNumber: 2,
        title: 'Taper le code de la constante souhaitée',
        action: 'Saisis le code à deux chiffres (ex: 28 pour c₀ vitesse de la lumière, 06 pour h constante de Planck, 39 pour G gravitation).',
        keys: ['2', '8'],
        screenDisplay: 'c₀',
        annotation: 'Le symbole de la constante s’affiche dans l’expression.'
      },
      {
        stepNumber: 3,
        title: 'Afficher sa valeur ou l’utiliser dans un calcul',
        action: 'Appuie sur [=] pour voir sa valeur numérique exacte en unités SI.',
        keys: ['='],
        screenDisplay: '299792458',
        annotation: 'Vitesse de la lumière : 2.99792458 × 10⁸ m/s.'
      }
    ],
    exemple: {
      enonce: 'Calculer l’énergie d’un photon E = h·ν pour une fréquence ν = 5 × 10¹⁴ Hz avec la constante de Planck (Code 06).',
      entree: 'Const 06 × 5 × 10¹⁴',
      touchesDetaillees: ['SHIFT', '7', '0', '6', '×', '5', '×10ˣ', '1', '4', '='],
      resultatEcran: '3.31303... × 10⁻¹⁹ J',
      interpretation: 'L’énergie du photon calculée avec la constante de Planck exacte h ≈ 6.626 × 10⁻³⁴ J·s.'
    },
    aRetenir: [
      'Codes essentiels pour la Première S2 :\n• 06 : h (Constante de Planck)\n• 23 : e (Charge élémentaire de l’électron 1.602×10⁻¹⁹ C)\n• 24 : NA (Nombre d’Avogadro 6.022×10²³ mol⁻¹)\n• 25 : k (Constante de Boltzmann)\n• 28 : c₀ (Vitesse de la lumière 299792458 m/s)\n• 39 : G (Constante de gravitation 6.674×10⁻¹¹ N·m²/kg²)',
      'Le tableau complet des 40 codes est gravé à l’intérieur du couvercle coulissant de ta calculatrice !'
    ],
    astuces: [
      'Plus besoin de mémoriser 10 chiffres pour G ou h : tape juste SHIFT 7 suivi du code à deux chiffres.'
    ],
    erreursFrequentes: [
      {
        probleme: 'Oublier le zéro devant les numéros inférieurs à 10.',
        cause: 'Taper "6" au lieu de "06" pour la constante de Planck.',
        solution: 'Tape toujours DEUX chiffres : 01, 02, ..., 06.'
      }
    ],
    motsClesRecherche: ['constante', 'physique', 'chimie', 'planck', 'lumiere', 'gravitation', 'avogadro', 'const', 'shift 7'],
    s2Theme: 'suites_numeriques',
    isMeconnue: true,
    verifie: true
  },

  // 15. LES 40 CONVERSIONS D’UNITÉS (SHIFT 8 CONV)
  {
    id: 'conversions-unites-conv',
    nom: 'Conversions d’unités métriques et anglo-saxonnes (SHIFT 8)',
    categorie: 'constantes_conversions',
    sousCategorie: 'Constantes & Conversions',
    description: 'Convertit instantanément entre unités usuelles (km/h ⇄ m/s, pouces ⇄ cm, cal ⇄ Joules, atm ⇄ Pa, etc.).',
    niveau: 'Intermédiaire',
    contexteScolaire: 'Première S2 — Sciences Physiques (cinématique, mécanique, thermodynamique, pression).',
    redactionConseil: 'Très utile pour éviter les erreurs de conversion dans les calculs d’énergie cinétique Ec = 1/2 m v² où v DOIT être en m/s.',
    modeCasio: '1: COMP',
    touchesRapides: ['valeur', 'SHIFT', '8', 'code_01_a_40', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Taper la valeur à convertir',
        action: 'Saisis le nombre que tu souhaites convertir (ex: 90 pour 90 km/h).',
        keys: ['9', '0'],
        screenDisplay: '90',
        annotation: 'La valeur initiale doit précéder la commande de conversion.'
      },
      {
        stepNumber: 2,
        title: 'Appeler le menu CONV',
        action: 'Appuie sur [SHIFT] suivi de la touche [8] (CONV).',
        keys: ['SHIFT', '8'],
        screenDisplay: 'CONVERSION\nNumber 01~40?',
        annotation: 'La calculatrice attend un numéro à deux chiffres.'
      },
      {
        stepNumber: 3,
        title: 'Choisir la conversion km/h en m/s (Code 19)',
        action: 'Tape 19 pour convertir km/h en m/s (ou 20 pour m/s en km/h).',
        keys: ['1', '9'],
        screenDisplay: '90km/h▶m/s',
        annotation: 'La formule de conversion s’insère derrière ta valeur.'
      },
      {
        stepNumber: 4,
        title: 'Afficher le résultat',
        action: 'Appuie sur [=].',
        keys: ['='],
        screenDisplay: '25',
        annotation: '90 km/h correspond exactement à 25 m/s !'
      }
    ],
    exemple: {
      enonce: 'Convertir une vitesse de 120 km/h en m/s pour calculer une énergie cinétique.',
      entree: '120 km/h ▶ m/s (Code 19)',
      touchesDetaillees: ['1', '2', '0', 'SHIFT', '8', '1', '9', '='],
      resultatEcran: '100/3 ≈ 33.33 m/s',
      interpretation: '120 km/h équivaut à 33.33 m/s (valeur exacte 100/3).'
    },
    aRetenir: [
      'Codes les plus utiles en Première S2 :\n• 19 : km/h ▶ m/s\n• 20 : m/s ▶ km/h\n• 27 : J ▶ cal\n• 28 : cal ▶ J\n• 33 : atm ▶ Pa\n• 34 : Pa ▶ atm\n• 39 : J ▶ eV\n• 40 : eV ▶ J',
      'Le tableau des 40 conversions est également imprimé au dos du couvercle.'
    ],
    astuces: [
      'Pour convertir en énergie atomique en physique nucléaire : Code 39 convertit les Joules en électron-volts (eV) et 40 fait l’inverse.'
    ],
    erreursFrequentes: [
      {
        probleme: 'Erreur de syntaxe si tu tapes SHIFT 8 avant le nombre.',
        cause: 'La fonction CONV s’applique comme un opérateur suffixe (après la valeur).',
        solution: 'Tape d’abord la valeur, puis SHIFT 8, puis le code.'
      }
    ],
    motsClesRecherche: ['conversion', 'unite', 'vitesse', 'kmh', 'ms', 'joule', 'ev', 'pression', 'conv', 'shift 8'],
    s2Theme: 'suites_numeriques',
    isMeconnue: true,
    verifie: true
  },

  // 16. CALCUL DE SUITES ET TERMES RÉCURRENTS (AVEC ANS)
  {
    id: 'suites-numeriques-ans',
    nom: 'Générer une suite récurrente uₙ₊₁ = f(uₙ) avec [Ans]',
    categorie: 'fonctions_analyse',
    sousCategorie: 'Suites numériques',
    description: 'Calcule successivement tous les termes u₁, u₂, u₃, ... d’une suite définie par récurrence d’un simple clic sur [=].',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Chapitre Suites numériques. Conjecturer le sens de variation, la convergence ou la limite d’une suite récurrente.',
    redactionConseil: 'Utilise cette astuce pour vérifier tes premiers termes calculés à la main et voir immédiatement si la suite semble converger.',
    modeCasio: '1: COMP',
    touchesRapides: ['premier_terme', '=', 'formule_avec_Ans', '=', '=', '=', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Initialiser le premier terme u₀',
        action: 'Tape la valeur initiale de la suite (ex: 2 pour u₀ = 2) et appuie sur [=].',
        keys: ['2', '='],
        screenDisplay: '2',
        annotation: 'La valeur 2 est maintenant stockée dans la mémoire temporaire Ans.'
      },
      {
        stepNumber: 2,
        title: 'Saisir la relation de récurrence avec [Ans]',
        action: 'Tape l’expression en remplaçant uₙ par la touche [Ans]. Par exemple pour uₙ₊₁ = 0.5 × uₙ + 3, tape 0.5 × [Ans] + 3.',
        keys: ['0', '.', '5', '×', 'Ans', '+', '3'],
        screenDisplay: '0.5×Ans+3',
        annotation: 'La touche [Ans] se trouve en bas à côté de la touche [=].'
      },
      {
        stepNumber: 3,
        title: 'Calculer u₁',
        action: 'Appuie sur [=]. Le résultat est le terme u₁.',
        keys: ['='],
        screenDisplay: '4',
        annotation: 'u₁ = 0.5×2 + 3 = 4.'
      },
      {
        stepNumber: 4,
        title: 'Générer les termes suivants en boucle',
        action: 'Appuie simplement à nouveau sur [=] : le résultat devient u₂, appuie encore pour u₃, u₄, etc. !',
        keys: ['=', '=', '='],
        screenDisplay: 'u₂ = 5 ; u₃ = 5.5 ; u₄ = 5.75 ; ...',
        annotation: 'Chaque pression sur = calcule automatiquement le terme suivant à la vitesse de l’éclair !'
      }
    ],
    exemple: {
      enonce: 'Soit la suite (uₙ) définie par u₀ = 1 et uₙ₊₁ = √(uₙ + 2). Conjecturer sa limite.',
      entree: '1 [=] puis √(Ans + 2) [=] [=] [=] ...',
      touchesDetaillees: ['1', '=', '√', 'Ans', '+', '2', '=', '=', '=', '='],
      resultatEcran: 'u₁ = 1.732, u₂ = 1.931, u₃ = 1.982, u₄ = 1.995, ... -> 2',
      interpretation: 'Les termes se rapprochent rapidement de 2. La suite semble croissante et converger vers l = 2.'
    },
    aRetenir: [
      'Cette méthode est la façon la plus rapide et la plus élégante de calculer 20 termes consécutifs d’une suite sans jamais retaper la formule.',
      'Si tu appuies sur AC par mégarde, [Ans] conserve la dernière valeur mais tu devras réécrire la relation de récurrence.'
    ],
    astuces: [
      'Pour compter le rang n en même temps, tu peux utiliser le deux-points ":" ([ALPHA] [∫dx]) pour incrémenter un compteur !'
    ],
    erreursFrequentes: [
      {
        probleme: 'La calculatrice donne toujours le même nombre.',
        cause: 'Avoir tapé la valeur brute au lieu de la touche Ans dans la formule.',
        solution: 'Utilise bien la touche [Ans] à la place de la variable.'
      }
    ],
    motsClesRecherche: ['suite', 'récurrence', 'termes', 'limite', 'convergence', 'ans', 'un+1', 'conjecturer'],
    s2Theme: 'suites_numeriques',
    isMeconnue: true,
    verifie: true
  },

  // 17. COMBINATOIRE : FACTORIELLE, ARRANGEMENTS ET COMBINAISONS
  {
    id: 'denombrement-combinaisons-ncr',
    nom: 'Dénombrement : Factorielle (x!), Permutations (nPr) et Combinaisons (nCr)',
    categorie: 'statistiques',
    sousCategorie: 'Dénombrement & Probabilités',
    description: 'Calcule n!, les arrangements A_n^p et les combinaisons (n p) indispensables pour la loi binomiale.',
    niveau: 'Essentiel',
    contexteScolaire: 'Première S2 — Dénombrement et probabilités, tirages simultanés, coefficients binomiaux.',
    redactionConseil: 'Écris la formule théorique (n p) = n! / (p!(n-p)!) sur ta copie avant de poser le résultat numérique.',
    modeCasio: '1: COMP',
    touchesRapides: ['n', 'SHIFT', '÷ (nCr)', 'p', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Calculer une combinaison (n parmi p) avec nCr',
        action: 'Tape d’abord la valeur de n (le total), puis [SHIFT] puis [÷] (nCr est écrit en jaune), puis tape p, puis [=].',
        keys: ['1', '0', 'SHIFT', '÷', '3', '='],
        screenDisplay: '10C3\n             120',
        annotation: 'Exemple : nombre de façons de choisir 3 élèves parmi 10.'
      },
      {
        stepNumber: 2,
        title: 'Calculer un arrangement avec nPr',
        action: 'Pour un tirage avec ordre (arrangements A_n^p), utilise [SHIFT] puis [×] (nPr).',
        keys: ['5', 'SHIFT', '×', '2', '='],
        screenDisplay: '5P2\n              20',
        annotation: 'A₅² = 5 × 4 = 20.'
      },
      {
        stepNumber: 3,
        title: 'Calculer une factorielle (n!)',
        action: 'Tape le nombre n, puis appuie sur [SHIFT] suivi de la touche [x⁻¹] (x! est écrit en jaune).',
        keys: ['5', 'SHIFT', 'x⁻¹', '='],
        screenDisplay: '5!\n             120',
        annotation: '5! = 5 × 4 × 3 × 2 × 1 = 120.'
      }
    ],
    exemple: {
      enonce: 'Dans une classe de 25 élèves, de combien de manières peut-on former un groupe de 4 élèves ?',
      entree: '25 C 4',
      touchesDetaillees: ['2', '5', 'SHIFT', '÷', '4', '='],
      resultatEcran: '12650',
      interpretation: 'Il y a 12 650 combinaisons possibles de 4 élèves choisis parmi 25.'
    },
    aRetenir: [
      'Attention à l’ordre : sur la Casio fx-991ES, nCr s’écrit toujours "n C p" (donc le grand nombre en premier).',
      'Si tu tapes 3 nCr 10, la calculatrice affichera "Math ERROR" car on ne peut pas choisir 10 éléments parmi 3.'
    ],
    astuces: [
      'Pour le triangle de Pascal ou la formule du binôme de Newton, utilise nCr pour vérifier rapidement chaque coefficient.'
    ],
    erreursFrequentes: [
      {
        probleme: 'Erreur "Math ERROR" lors du calcul de factorielle.',
        cause: 'Calculer une factorielle pour un nombre supérieur à 69 (69! ≈ 1.7×10⁹⁸, 70! dépasse la limite 10¹⁰⁰).',
        solution: 'Simplifie les fractions de factorielles avant de les saisir.'
      }
    ],
    motsClesRecherche: ['combinaison', 'arrangement', 'factorielle', 'probabilité', 'dénombrement', 'ncr', 'npr', 'binomiale'],
    s2Theme: 'statistiques_s2',
    verifie: true
  },

  // 18. NOMBRES ALÉATOIRES (Ran# et RanInt#)
  {
    id: 'nombres-aleatoires-ranint',
    nom: 'Générer des nombres aléatoires entiers (RanInt#)',
    categorie: 'calcul_general',
    sousCategorie: 'Probabilités & Simulation',
    description: 'Simule des lancers de dés, des tirages au sort ou des fluctuations d’échantillonnage.',
    niveau: 'Intermédiaire',
    contexteScolaire: 'Première S2 — Simulations probabilistes, fluctuation d’échantillonnage et intervalles de confiance.',
    redactionConseil: 'Utilise RanInt#(1, 6) pour simuler le lancer d’un dé équilibré à 6 faces.',
    modeCasio: '1: COMP',
    touchesRapides: ['ALPHA', '. (RanInt)', 'min', 'SHIFT', ') (,)', 'max', ')', '='],
    etapes: [
      {
        stepNumber: 1,
        title: 'Appeler la fonction RanInt#',
        action: 'Appuie sur [ALPHA] suivi de la touche [.] (RanInt# est inscrit en rouge).',
        keys: ['ALPHA', '.'],
        screenDisplay: 'RanInt#(□',
        annotation: 'RanInt génère un entier aléatoire compris entre deux bornes incluses.'
      },
      {
        stepNumber: 2,
        title: 'Saisir les bornes séparées par une virgule',
        action: 'Tape la valeur minimale (ex: 1), insère la virgule avec [SHIFT] [ ) ], puis tape la valeur maximale (ex: 6), puis ferme la parenthèse.',
        keys: ['1', 'SHIFT', ')', '6', ')'],
        screenDisplay: 'RanInt#(1, 6)',
        annotation: 'La virgule de séparation d’arguments s’obtient par [SHIFT] [ ) ].'
      },
      {
        stepNumber: 3,
        title: 'Générer le nombre et relancer',
        action: 'Appuie sur [=]. À chaque fois que tu appuies sur [=], un nouveau nombre entier aléatoire est généré instantanément !',
        keys: ['=', '=', '='],
        screenDisplay: '4 (puis 1, puis 6...)',
        annotation: 'Idéal pour faire 50 tirages rapidement en travaux pratiques de statistiques.'
      }
    ],
    exemple: {
      enonce: 'Simuler le tirage au sort d’un numéro entre 1 et 100.',
      entree: 'RanInt#(1, 100)',
      touchesDetaillees: ['ALPHA', '.', '1', 'SHIFT', ')', '1', '0', '0', ')', '='],
      resultatEcran: '73 (valeur pseudo-aléatoire)',
      interpretation: 'Un entier pseudo-aléatoire uniforme dans [[1 ; 100]].'
    },
    aRetenir: [
      'Pour générer un nombre décimal entre 0 et 1 (à 3 décimales), utilise [SHIFT] [.] (Ran#).',
      'Pour simuler un dé de 6 faces : RanInt#(1, 6).'
    ],
    astuces: [
      'En répétant [=], tu réalises une vraie simulation de Monte-Carlo pour estimer une probabilité empirique.'
    ],
    erreursFrequentes: [
      {
        probleme: 'Syntax ERROR.',
        cause: 'Avoir utilisé le point décimal [.] au lieu de la vraie virgule de séparation d’arguments [SHIFT] [ ) ].',
        solution: 'Utilise impérativement SHIFT ) pour séparer les deux arguments.'
      }
    ],
    motsClesRecherche: ['aléatoire', 'hasard', 'ranint', 'ran#', 'simulation', 'dé', 'tirage', 'probabilité'],
    s2Theme: 'statistiques_s2',
    isMeconnue: true,
    verifie: true
  }
];
