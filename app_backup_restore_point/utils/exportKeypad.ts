import { CASIO_KEYPAD_KEYS } from '../data/keypadData';

/**
 * Utilitaires d'exportation haute fidélité pour le guide des touches de la Casio fx-991ES originale.
 * Formats supportés :
 * - Document imprimable / Fiche mémo PDF A4 haute définition
 * - Fiche Markdown structurée (.md) pour Notion, Obsidian ou archivage
 * - Tableau CSV / Excel (.csv) encodé en UTF-8 avec BOM
 * - Fichier de données structuré (.json)
 */

export const exportAsMarkdown = (): void => {
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let md = `# Guide Mémo des Touches — Casio fx-991ES (Édition Originale)\n\n`;
  md += `> **Fiche de référence complète** pour calculatrice scientifique Casio fx-991ES originale (Natural-V.P.A.M.).  \n`;
  md += `> *Généré le ${dateStr} via FX Guide.*\n\n`;

  md += `## 1. Principes des Touches Modificatrices\n\n`;
  md += `- **Touche directe** : actionne la fonction imprimée en blanc sur la face de la touche.\n`;
  md += `- **[SHIFT] (Jaune)** : active la fonction secondaire imprimée en jaune/or au-dessus de la touche. (Un indicateur **S** apparaît à l'écran).\n`;
  md += `- **[ALPHA] (Rouge)** : active la fonction tertiaire ou variable alphabétique imprimée en rouge (A, B, C, D, E, F, X, Y, M, =). (Un indicateur **A** apparaît à l'écran).\n\n`;

  md += `## 2. Tableau Récapitulatif des Touches\n\n`;
  md += `| Touche | Fonction Directe | Touche [SHIFT] (Jaune) | Touche [ALPHA] (Rouge) | Zone | Description & Conseils |\n`;
  md += `| :---: | :--- | :--- | :--- | :---: | :--- |\n`;

  CASIO_KEYPAD_KEYS.forEach(k => {
    const shift = k.shiftLabel || '—';
    const alpha = k.alphaLabel || '—';
    const zoneMap: Record<string, string> = {
      navigation: 'Commandes',
      scientific: 'Scientifique',
      memory_calc: 'Mémoire / Calcul',
      numeric: 'Pavé Numérique'
    };
    const zoneName = zoneMap[k.zone] || k.zone;
    md += `| **${k.primaryLabel}** | \`${k.primaryLabel}\` | \`${shift}\` | \`${alpha}\` | ${zoneName} | ${k.description} *(Ex: ${k.exampleUsage})* |\n`;
  });

  md += `\n## 3. Les 8 Modes de Calcul (Touche MODE)\n\n`;
  md += `| N° | Mode | Désignation | Utilisation Principale |\n`;
  md += `| :---: | :--- | :--- | :--- |\n`;
  md += `| **1** | **COMP** | Calculs généraux | Arithmétique, trigonométrie, puissances, fractions standard |\n`;
  md += `| **2** | **CMPLX** | Nombres complexes | Forme algébrique $a+ib$, module, argument $r\\angle\\theta$ |\n`;
  md += `| **3** | **STAT** | Statistiques & Régression | Moyenne, écart-type, régression linéaire ($y=a+bx$), etc. |\n`;
  md += `| **4** | **BASE-N** | Base de numération | Décimal (DEC), Binaire (BIN), Hexadécimal (HEX), Octal (OCT) |\n`;
  md += `| **5** | **EQN** | Résolution d'équations | Systèmes linéaires 2 & 3 inconnues, équations 2ᵉ et 3ᵉ degré |\n`;
  md += `| **6** | **MATRIX** | Calcul matriciel | Déterminant, inverse $M^{-1}$, produit de matrices jusqu'à 3x3 |\n`;
  md += `| **7** | **TABLE** | Tableau de valeurs | Génération de f(x) avec Start, End et Step |\n`;
  md += `| **8** | **VECTOR** | Vecteurs | Produit scalaire, produit vectoriel, norme vectorielle |\n\n`;

  md += `## 4. Indicateurs d'Angle & Menus Essentiels\n\n`;
  md += `- **Degrés [D]** : \`SHIFT\` + \`MODE\` (SETUP) puis \`3\`\n`;
  md += `- **Radians [R]** : \`SHIFT\` + \`MODE\` (SETUP) puis \`4\`\n`;
  md += `- **Grades [G]** : \`SHIFT\` + \`MODE\` (SETUP) puis \`5\`\n`;
  md += `- **Touche S ⇔ D** : Permet de basculer instantanément entre la forme exacte (fraction, racine, $\\pi$) et la valeur décimale approchée.\n`;
  md += `- **Touche Ans** : Rappelle la dernière réponse calculée.\n\n`;

  md += `## 5. Avertissement Important\n\n`;
  md += `> ⚠️ **Attention au modèle** : Ce guide est spécifiquement conçu pour la **Casio fx-991ES originale**. Les modèles postérieurs tels que la *fx-991ES PLUS*, *fx-991EX ClassWiz* ou *fx-991CW* ont des menus et des dispositions de touches différents. Vérifie l'inscription sur la façade de ta calculatrice.\n`;

  downloadBlob(md, 'Guide_Touches_Casio_fx-991ES.md', 'text/markdown;charset=utf-8');
};

export const exportAsCsv = (): void => {
  // UTF-8 with BOM to ensure Microsoft Excel and Numbers display French accents correctly
  const BOM = '\uFEFF';
  const headers = [
    'Touche',
    'Zone',
    'Fonction Principale',
    'Fonction SHIFT (Jaune)',
    'Fonction ALPHA (Rouge)',
    'Description',
    'Exemple d utilisation'
  ];

  const rows = CASIO_KEYPAD_KEYS.map(k => {
    const zoneMap: Record<string, string> = {
      navigation: 'Commandes',
      scientific: 'Scientifique',
      memory_calc: 'Mémoire / Calcul',
      numeric: 'Pavé Numérique'
    };
    return [
      escapeCsv(k.primaryLabel),
      escapeCsv(zoneMap[k.zone] || k.zone),
      escapeCsv(k.primaryLabel),
      escapeCsv(k.shiftLabel || ''),
      escapeCsv(k.alphaLabel || ''),
      escapeCsv(k.description),
      escapeCsv(k.exampleUsage)
    ].join(';');
  });

  const csvContent = BOM + headers.join(';') + '\r\n' + rows.join('\r\n');
  downloadBlob(csvContent, 'Touches_Casio_fx-991ES.csv', 'text/csv;charset=utf-8');
};

export const exportAsJson = (): void => {
  const exportData = {
    titre: 'Guide Répertoire des Touches Casio fx-991ES',
    modele: 'fx-991ES (Édition Originale)',
    version: '1.0',
    dateExport: new Date().toISOString(),
    modes: [
      { id: 1, code: 'COMP', description: 'Calculs arithmétiques généraux' },
      { id: 2, code: 'CMPLX', description: 'Nombres complexes' },
      { id: 3, code: 'STAT', description: 'Statistiques à 1 et 2 variables' },
      { id: 4, code: 'BASE-N', description: 'Calculs binaires, hexadécimaux et octaux' },
      { id: 5, code: 'EQN', description: 'Équations du 2e et 3e degré et systèmes' },
      { id: 6, code: 'MATRIX', description: 'Matrices jusqu’à 3x3' },
      { id: 7, code: 'TABLE', description: 'Tableau de valeurs de fonctions' },
      { id: 8, code: 'VECTOR', description: 'Calculs vectoriels et produits vectoriels' }
    ],
    unitesAngle: {
      D: 'Degrés (SHIFT MODE 3)',
      R: 'Radians (SHIFT MODE 4)',
      G: 'Grades (SHIFT MODE 5)'
    },
    touches: CASIO_KEYPAD_KEYS
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  downloadBlob(jsonContent, 'touches_casio_fx991es.json', 'application/json;charset=utf-8');
};

export const printKeypadMemo = (): void => {
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Fiche Mémo Touches Casio fx-991ES</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 10mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background: #FFFFFF;
      font-size: 10.5pt;
      line-height: 1.35;
      margin: 0;
      padding: 0;
    }
    .header {
      border-bottom: 2px solid #123C2A;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand {
      font-size: 8pt;
      font-family: monospace;
      font-weight: bold;
      color: #123C2A;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    h1 {
      font-size: 16pt;
      margin: 2px 0 0 0;
      color: #123C2A;
      font-weight: 800;
    }
    .meta {
      text-align: right;
      font-size: 8pt;
      color: #4B5563;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      color: #123C2A;
      background: #EEF4F0;
      padding: 4px 8px;
      border-left: 4px solid #123C2A;
      margin: 12px 0 6px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .legend-bar {
      display: flex;
      gap: 12px;
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 8pt;
      margin-bottom: 10px;
    }
    .badge {
      display: inline-block;
      padding: 1px 5px;
      border-radius: 4px;
      font-family: monospace;
      font-weight: 700;
      font-size: 8pt;
    }
    .badge-primary { background: #E5E7EB; color: #111827; border: 1px solid #D1D5DB; }
    .badge-shift { background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; }
    .badge-alpha { background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5; }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      margin-bottom: 8px;
    }
    th {
      background: #123C2A;
      color: #FFFFFF;
      text-align: left;
      padding: 5px 6px;
      font-weight: 600;
      font-size: 8pt;
      text-transform: uppercase;
    }
    td {
      padding: 4.5px 6px;
      border-bottom: 1px solid #E5E7EB;
      vertical-align: middle;
    }
    tr:nth-child(even) td {
      background: #F9FAF9;
    }
    .grid-modes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 4px;
      margin-bottom: 10px;
    }
    .mode-card {
      border: 1px solid #D1D5DB;
      border-radius: 4px;
      padding: 4px 6px;
      background: #F9FAFB;
    }
    .mode-num {
      font-weight: 800;
      color: #123C2A;
      font-family: monospace;
    }
    .mode-desc {
      font-size: 7.5pt;
      color: #4B5563;
      margin-top: 1px;
    }
    .alert-box {
      border: 1px solid #F59E0B;
      background: #FFFBEB;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 8pt;
      color: #92400E;
      margin-top: 10px;
    }
    .footer {
      margin-top: 12px;
      padding-top: 6px;
      border-top: 1px solid #E5E7EB;
      font-size: 7.5pt;
      color: #6B7280;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { margin: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">CASIO fx-991ES · Édition Originale</div>
      <h1>Fiche Mémo Officielle des Touches</h1>
    </div>
    <div class="meta">
      <strong>FX Guide Compagnon</strong><br>
      Édition du ${dateStr}
    </div>
  </div>

  <div class="legend-bar">
    <div><strong>Légende :</strong></div>
    <div><span class="badge badge-primary">Touche</span> Fonction directe (face de touche)</div>
    <div><span class="badge badge-shift">[SHIFT]</span> Fonction secondaire jaune/or (au-dessus)</div>
    <div><span class="badge badge-alpha">[ALPHA]</span> Variable / signe rouge</div>
  </div>

  <div class="section-title">1. Les 8 Modes de Travail (Touche MODE)</div>
  <div class="grid-modes">
    <div class="mode-card"><span class="mode-num">1 COMP</span><div class="mode-desc">Calculs généraux</div></div>
    <div class="mode-card"><span class="mode-num">2 CMPLX</span><div class="mode-desc">Nombres complexes</div></div>
    <div class="mode-card"><span class="mode-num">3 STAT</span><div class="mode-desc">Statistiques & Régressions</div></div>
    <div class="mode-card"><span class="mode-num">4 BASE-N</span><div class="mode-desc">Binaire, Hexa, Octal</div></div>
    <div class="mode-card"><span class="mode-num">5 EQN</span><div class="mode-desc">Équations 2e/3e degré & Systèmes</div></div>
    <div class="mode-card"><span class="mode-num">6 MATRIX</span><div class="mode-desc">Matrices jusqu'à 3x3</div></div>
    <div class="mode-card"><span class="mode-num">7 TABLE</span><div class="mode-desc">Tableau de valeurs f(x)</div></div>
    <div class="mode-card"><span class="mode-num">8 VECTOR</span><div class="mode-desc">Produit scalaire & vectoriel</div></div>
  </div>

  <div class="section-title">2. Répertoire Complet des Touches fx-991ES</div>
  <table>
    <thead>
      <tr>
        <th style="width: 14%;">Touche</th>
        <th style="width: 18%;">SHIFT (Jaune)</th>
        <th style="width: 14%;">ALPHA (Rouge)</th>
        <th style="width: 54%;">Rôle & Astuce d'utilisation</th>
      </tr>
    </thead>
    <tbody>
      ${CASIO_KEYPAD_KEYS.map(k => `
        <tr>
          <td><span class="badge badge-primary">${k.primaryLabel}</span></td>
          <td>${k.shiftLabel ? `<span class="badge badge-shift">${k.shiftLabel}</span>` : '—'}</td>
          <td>${k.alphaLabel ? `<span class="badge badge-alpha">${k.alphaLabel}</span>` : '—'}</td>
          <td><strong>${k.description}</strong> ${k.exampleUsage ? `<em>(Ex : ${k.exampleUsage})</em>` : ''}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="section-title">3. Indicateurs d'Angle & Raccourcis Indispensables</div>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Raccourci</th>
        <th style="width: 30%;">Touches</th>
        <th style="width: 45%;">Fonction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Mode Degré (D)</strong></td>
        <td><code>SHIFT</code> + <code>MODE</code> puis <code>3</code></td>
        <td>Configure les calculs d'angles en Degrés (indicateur D en haut de l'écran).</td>
      </tr>
      <tr>
        <td><strong>Mode Radian (R)</strong></td>
        <td><code>SHIFT</code> + <code>MODE</code> puis <code>4</code></td>
        <td>Configure les calculs d'angles en Radians (indicateur R). Indispensable en analyse.</td>
      </tr>
      <tr>
        <td><strong>Bascule Exact / Décimal</strong></td>
        <td><code>S ⇔ D</code></td>
        <td>Bascule instantanément entre écriture fractionnaire/radicale et écriture à virgule.</td>
      </tr>
      <tr>
        <td><strong>Solveur Universel SOLVE</strong></td>
        <td><code>SHIFT</code> + <code>CALC</code></td>
        <td>Résout numériquement une équation quelconque écrite avec le symbole = (ALPHA CALC).</td>
      </tr>
      <tr>
        <td><strong>Dérivée en un point d/dx</strong></td>
        <td><code>SHIFT</code> + <code>∫dx</code></td>
        <td>Calcule la dérivée numérique f'(a) sans avoir à dériver à la main.</td>
      </tr>
      <tr>
        <td><strong>Mémoriser une valeur (STO)</strong></td>
        <td><code>SHIFT</code> + <code>RCL</code> puis lettre (ex: A)</td>
        <td>Stocke le nombre affiché dans l'un des 9 registres mémoire (A, B, C, D, E, F, X, Y, M).</td>
      </tr>
    </tbody>
  </table>

  <div class="alert-box">
    <strong>Avertissement important :</strong> Cette fiche mémo s'applique exclusivement à la <strong>Casio fx-991ES originale</strong>. Les modèles PLUS, EX ClassWiz et CW possèdent des menus et combinaisons de touches différents.
  </div>

  <div class="footer">
    <div>FX Guide Compagnon · Fiche imprimable non affiliée à Casio Inc.</div>
    <div>Page 1 sur 1 · Format A4 optimisé</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};

function escapeCsv(val: string): string {
  if (!val) return '""';
  const clean = val.replace(/"/g, '""').replace(/[\r\n]+/g, ' ');
  return `"${clean}"`;
}

function downloadBlob(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
