import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  LayoutGrid,
  Activity,
  BookOpen,
  ChevronRight,
  X
} from 'lucide-react';

interface HomeViewProps {
  onOpenSettings?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenSettings }) => {
  const {
    openFunctionDetail,
    setActiveTab,
    mastered,
    setSearchQuery,
    setSelectedCategory
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  const totalProcedures = FX991ES_DATABASE.length;
  const masteredCount = mastered.length;

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      setSearchQuery(inputVal.trim());
      setActiveTab('search');
    } else {
      setActiveTab('search');
    }
  };

  const handleOpenProcedure = (id: string) => {
    const item = FX991ES_DATABASE.find(f => f.id === id);
    if (item) {
      openFunctionDetail(item);
    }
  };

  const handleOpenCourseTopic = (topic: 'fonctions_analyse' | 'equations' | 'trigonometrie') => {
    setSelectedCategory(topic);
    setActiveTab('explorer');
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* 1. Header supérieur conforme à la maquette */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-wider text-[#5A7365] dark:text-[#8EA397] uppercase">
            CASIO FX-991ES · ORIGINALE
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123C2A] dark:text-white mt-1">
            Bonjour.
          </h1>
        </div>

        {/* Bouton Paramètres avec l'icône égaliseur/sliders de la maquette */}
        <button
          onClick={onOpenSettings}
          aria-label="Ouvrir les paramètres"
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#123C2A] dark:text-white hover:bg-[#EEF4F0] dark:hover:bg-[#1A3429] active:scale-95 transition-all shadow-xs"
        >
          <svg
            className="w-5 h-5 text-[#123C2A] dark:text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </button>
      </div>

      {/* 2. Champ de recherche conforme à la maquette */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <label htmlFor="home-search" className="sr-only">
          Que veux-tu faire ?
        </label>
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-[#7A8C82] dark:text-[#8EA397] pointer-events-none" />
          <input
            id="home-search"
            type="search"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Que veux-tu faire ?"
            className="w-full h-12 pl-11 pr-12 text-sm bg-white dark:bg-[#10221A] text-[#123C2A] dark:text-white placeholder-[#7A8C82] dark:placeholder-[#8EA397] rounded-2xl border border-[#E2E8E3] dark:border-[#1E3A2D] focus:outline-none focus:border-[#123C2A] dark:focus:border-[#57B88A] transition-colors shadow-xs"
          />
          {inputVal ? (
            <button
              type="button"
              onClick={() => setInputVal('')}
              className="absolute right-12 p-1 text-[#7A8C82] hover:text-[#123C2A] dark:text-[#8EA397] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="submit"
            aria-label="Rechercher"
            className="absolute right-2 w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center hover:bg-[#E2EBE5] dark:hover:bg-[#224737] active:scale-95 transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* 3. Carte Héro « TON GUIDE fx-991ES » conforme à la maquette */}
      <div className="bg-[#123C2A] dark:bg-[#143527] border border-[#1D4E38] dark:border-[#214937] rounded-3xl p-5 space-y-4 shadow-sm text-white">
        {/* Ligne haute de la carte : puce + texte et badge onde */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8E86A] dark:bg-[#57B88A] inline-block" />
            <span className="text-xs font-bold tracking-wider uppercase text-white font-mono">
              TON GUIDE fx-991ES
            </span>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-[#1A4533] dark:bg-[#1B3E2E] border border-[#235841] dark:border-[#25523D] flex items-center justify-center text-[#B8E86A] dark:text-[#57B88A]">
            <Activity className="w-5 h-5 stroke-[2]" />
          </div>
        </div>

        {/* Titre & sous-titre de la carte */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
            Plus clair.<br />Plus rapide.
          </h2>
          <p className="text-xs text-[#C2D6CC] dark:text-[#A5C1B2] mt-2 leading-relaxed max-w-[280px]">
            Trouve les touches justes et comprends pourquoi tu les utilises.
          </p>
        </div>

        {/* Compteurs et bouton flèche haut-droit vers Progression */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-white font-mono leading-none">
                {totalProcedures}
              </div>
              <div className="text-[11px] text-[#C2D6CC] dark:text-[#A5C1B2] mt-1">
                procédures vérifiées
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#245740] dark:bg-[#26533F]" />

            <div>
              <div className="text-2xl font-bold text-white font-mono leading-none">
                {masteredCount}
              </div>
              <div className="text-[11px] text-[#C2D6CC] dark:text-[#A5C1B2] mt-1">
                maîtrisées
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('progress')}
            aria-label="Voir la progression"
            className="w-10 h-10 rounded-xl bg-[#1A4533] dark:bg-[#1B3E2E] border border-[#235841] dark:border-[#26533F] flex items-center justify-center text-white hover:bg-[#225740] dark:hover:bg-[#234F3B] active:scale-95 transition-all shadow-xs"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Section « Accès rapide » avec grille 2x2 conforme à la maquette */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-lg font-bold text-[#123C2A] dark:text-white">
            Accès rapide
          </h2>
          <button
            onClick={() => setActiveTab('explorer')}
            className="text-xs font-semibold text-[#123C2A] dark:text-[#57B88A] hover:underline"
          >
            Tout explorer
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Carte 1 : Résoudre une équation du 2ᵉ degré (avec icône ÷) */}
          <button
            onClick={() => handleOpenProcedure('eqn-second-degre')}
            className="p-3.5 text-left bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl flex flex-col justify-between min-h-[114px] hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.98] transition-all shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center text-base font-bold">
              ÷
            </div>
            <div className="text-xs font-bold text-[#123C2A] dark:text-white leading-snug pt-2">
              Résoudre une équation du 2ᵉ degré
            </div>
          </button>

          {/* Carte 2 : Créer un tableau de valeurs (avec icône 4 carrés) */}
          <button
            onClick={() => handleOpenProcedure('mode-table-valeurs')}
            className="p-3.5 text-left bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl flex flex-col justify-between min-h-[114px] hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.98] transition-all shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#123C2A] dark:text-white leading-snug pt-2">
              Créer un tableau de valeurs
            </div>
          </button>

          {/* Carte 3 : Passer d’une fraction au décimal (avec icône %) */}
          <button
            onClick={() => handleOpenProcedure('fractions-puissances-sd')}
            className="p-3.5 text-left bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl flex flex-col justify-between min-h-[114px] hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.98] transition-all shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center text-sm font-bold">
              %
            </div>
            <div className="text-xs font-bold text-[#123C2A] dark:text-white leading-snug pt-2">
              Passer d’une fraction au décimal
            </div>
          </button>

          {/* Carte 4 : Calculer un sinus en degrés (avec icône onde sinus) */}
          <button
            onClick={() => handleOpenProcedure('setup-degre-radian')}
            className="p-3.5 text-left bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl flex flex-col justify-between min-h-[114px] hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.98] transition-all shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center">
              <Activity className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="text-xs font-bold text-[#123C2A] dark:text-white leading-snug pt-2">
              Calculer un sinus en degrés
            </div>
          </button>
        </div>
      </div>

      {/* 5. Section « Pour ton cours » conforme à la Capture 2 */}
      <div className="space-y-3 pt-1">
        <h2 className="text-lg font-bold text-[#123C2A] dark:text-white px-0.5">
          Pour ton cours
        </h2>

        <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl overflow-hidden divide-y divide-[#E2E8E3] dark:divide-[#1F3C2F] shadow-xs">
          {/* Ligne Fonctions */}
          <button
            onClick={() => handleOpenCourseTopic('fonctions_analyse')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F7F8F4] dark:hover:bg-[#183428] active:bg-[#EEF4F0] dark:active:bg-[#1C3B2E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-[#123C2A] dark:text-white">
                Fonctions
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7A8C82] dark:text-[#8EA397] shrink-0" />
          </button>

          {/* Ligne Équations */}
          <button
            onClick={() => handleOpenCourseTopic('equations')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F7F8F4] dark:hover:bg-[#183428] active:bg-[#EEF4F0] dark:active:bg-[#1C3B2E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-[#123C2A] dark:text-white">
                Équations
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7A8C82] dark:text-[#8EA397] shrink-0" />
          </button>

          {/* Ligne Trigonométrie */}
          <button
            onClick={() => handleOpenCourseTopic('trigonometrie')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F7F8F4] dark:hover:bg-[#183428] active:bg-[#EEF4F0] dark:active:bg-[#1C3B2E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-[#123C2A] dark:text-white">
                Trigonométrie
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7A8C82] dark:text-[#8EA397] shrink-0" />
          </button>

          {/* Ligne Dérivation */}
          <button
            onClick={() => handleOpenProcedure('derivee-numerique-ddx')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F7F8F4] dark:hover:bg-[#183428] active:bg-[#EEF4F0] dark:active:bg-[#1C3B2E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-[#123C2A] dark:text-white">
                Dérivation
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7A8C82] dark:text-[#8EA397] shrink-0" />
          </button>
        </div>
      </div>

      {/* 6. Section « Reprendre » conforme aux Captures 2 & 3 */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-lg font-bold text-[#123C2A] dark:text-white">
            Reprendre
          </h2>
          <button
            onClick={() => setActiveTab('progress')}
            className="text-xs font-semibold text-[#123C2A] dark:text-[#57B88A] hover:underline"
          >
            Historique
          </button>
        </div>

        <div
          onClick={() => handleOpenProcedure('eqn-second-degre')}
          className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 cursor-pointer hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.99] transition-all space-y-3 shadow-xs"
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-[#123C2A] dark:text-[#57B88A]">
              ÉQUATIONS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF4F0] dark:bg-[#1B3E2E] border border-[#DCE5DF] dark:border-[#244F3C] flex items-center justify-center text-[#123C2A] dark:text-[#57B88A]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-[#123C2A] dark:text-white leading-snug">
            Résoudre une équation du 2ᵉ degré
          </h3>

          {/* Bottom badge + level */}
          <div className="flex items-center justify-between pt-1">
            <span className="px-2.5 py-1 rounded-full bg-[#EEF4F0] dark:bg-[#1A3B2D] text-[#123C2A] dark:text-[#57B88A] text-xs font-medium inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#123C2A] dark:bg-[#57B88A]" />
              Procédure vérifiée
            </span>
            <span className="text-xs text-[#7A8C82] dark:text-[#8EA397]">
              Intermédiaire
            </span>
          </div>
        </div>
      </div>

      {/* 7. Section « À découvrir » conforme à la Capture 3 */}
      <div className="space-y-3 pt-1">
        <h2 className="text-lg font-bold text-[#123C2A] dark:text-white px-0.5">
          À découvrir
        </h2>

        <div
          onClick={() => handleOpenProcedure('derivee-numerique-ddx')}
          className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 cursor-pointer hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.99] transition-all space-y-2 shadow-xs"
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-[#123C2A] dark:text-[#57B88A]">
              FONCTIONS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF4F0] dark:bg-[#1B3E2E] border border-[#DCE5DF] dark:border-[#244F3C] flex items-center justify-center text-[#123C2A] dark:text-[#57B88A]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Title & description */}
          <div>
            <h3 className="text-base font-bold text-[#123C2A] dark:text-white leading-snug">
              Calculer une dérivée en un point
            </h3>
            <p className="text-xs text-[#5A7365] dark:text-[#8EA397] mt-1 leading-relaxed">
              La fx-991ES approche numériquement f'(a).
            </p>
          </div>

          {/* Bottom badge + level */}
          <div className="flex items-center justify-between pt-2">
            <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] dark:bg-[#2B2214] text-[#B45309] dark:text-[#E59838] text-xs font-medium inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] dark:bg-[#E59838]" />
              Touches à vérifier
            </span>
            <span className="text-xs text-[#7A8C82] dark:text-[#8EA397]">
              Avancé
            </span>
          </div>
        </div>
      </div>

      {/* 8. Footer notice conforme à la Capture 3 */}
      <div className="text-center pt-2 pb-4">
        <p className="text-xs text-[#7A8C82] dark:text-[#6C8377] max-w-[290px] mx-auto leading-relaxed">
          Guide indépendant pour fx-991ES originale. Les modèles PLUS, EX et CW sont différents.
        </p>
      </div>
    </div>
  );
};
