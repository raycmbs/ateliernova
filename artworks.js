// ─────────────────────────────────────────────────────────────────────────────
//  ŒUVRES DE LA GALERIE  —  EXEMPLES À REMPLACER
//  Les titres, artistes et visuels ci-dessous sont des EXEMPLES fictifs.
//  Pour mettre une vraie œuvre :
//    1. dépose l'image dans assets/art/  (ex. assets/art/strate-3.jpg)
//    2. change le champ  image  de l'œuvre
//    3. mets à jour title / artist / year / medium / size
//  Chaque salle contient 4 œuvres, dans cet ordre :
//    1 = mur gauche · 2 = mur droit · 3 = fond à gauche · 4 = fond à droite
//  ratio = hauteur / largeur de l'œuvre (1 = carré, 1.25 = portrait).
// ─────────────────────────────────────────────────────────────────────────────
window.ATELIER = {
  ROOMS: [
    { name: "Matière", line: "Textures, reliefs et gestes bruts." },
    { name: "Couleur", line: "Des pigments qui prennent toute la place." },
    { name: "Géométrie", line: "Lignes, formes et équilibres." },
    { name: "Lumière", line: "Des œuvres qui changent avec l'heure." },
    { name: "Silence", line: "Peu d'éléments, beaucoup de présence." },
  ],
  ARTWORKS: [
    { room: 1, ratio: 1.25, title: "Strate n°3", artist: "Lucía Marzal", year: 2026, medium: "Technique mixte sur toile", size: "100 × 80 cm", image: "assets/art/01.webp" },
    { room: 1, ratio: 0.8, title: "Écorce", artist: "Tomás Vidrio", year: 2025, medium: "Acrylique et sable sur toile", size: "80 × 100 cm", image: "assets/art/02.webp" },
    { room: 1, ratio: 1.0, title: "Sable brûlé", artist: "Elia Roure", year: 2026, medium: "Huile et pigments sur lin", size: "90 × 90 cm", image: "assets/art/03.webp" },
    { room: 1, ratio: 1.3, title: "Fouille", artist: "Pau Esteller", year: 2025, medium: "Technique mixte sur panneau", size: "130 × 100 cm", image: "assets/art/04.webp" },
    { room: 2, ratio: 1.0, title: "Après-midi rouge", artist: "Noor Aldeguer", year: 2026, medium: "Acrylique sur toile", size: "100 × 100 cm", image: "assets/art/05.webp" },
    { room: 2, ratio: 1.3, title: "Pigment libre", artist: "Marta Quiroga", year: 2026, medium: "Huile sur toile", size: "130 × 100 cm", image: "assets/art/06.webp" },
    { room: 2, ratio: 0.8, title: "Marée", artist: "Jules Armand", year: 2025, medium: "Acrylique sur toile", size: "80 × 100 cm", image: "assets/art/07.webp" },
    { room: 2, ratio: 1.0, title: "Verger", artist: "Sofia Bellver", year: 2026, medium: "Huile sur lin", size: "90 × 90 cm", image: "assets/art/08.webp" },
    { room: 3, ratio: 1.0, title: "Arc et horizon", artist: "Hugo Sanz-Ferrer", year: 2026, medium: "Acrylique sur toile", size: "100 × 100 cm", image: "assets/art/09.webp" },
    { room: 3, ratio: 1.25, title: "Trois fois midi", artist: "Ada Lombarte", year: 2025, medium: "Gouache sur papier", size: "100 × 80 cm", image: "assets/art/10.webp" },
    { room: 3, ratio: 1.3, title: "Équerre", artist: "Oriol Camps", year: 2026, medium: "Impression pigmentaire", size: "130 × 100 cm", image: "assets/art/11.webp" },
    { room: 3, ratio: 0.8, title: "Seuil", artist: "Leïla Ferrandis", year: 2026, medium: "Acrylique sur bois", size: "80 × 100 cm", image: "assets/art/12.webp" },
    { room: 4, ratio: 1.25, title: "Veilleuse", artist: "Mateu Brull", year: 2026, medium: "Impression sur dibond", size: "100 × 80 cm", image: "assets/art/13.webp" },
    { room: 4, ratio: 1.0, title: "Halo", artist: "Irène Solà-Pons", year: 2025, medium: "Art numérique, tirage unique", size: "90 × 90 cm", image: "assets/art/14.webp" },
    { room: 4, ratio: 1.0, title: "Heure bleue", artist: "Gabriel Ortuño", year: 2026, medium: "Huile sur toile", size: "100 × 100 cm", image: "assets/art/15.webp" },
    { room: 4, ratio: 1.3, title: "Néon sec", artist: "Zoé Marquès", year: 2026, medium: "Art numérique, tirage unique", size: "130 × 100 cm", image: "assets/art/16.webp" },
    { room: 5, ratio: 1.0, title: "Un cercle", artist: "Clara Vallès", year: 2026, medium: "Acrylique sur toile", size: "100 × 100 cm", image: "assets/art/17.webp" },
    { room: 5, ratio: 0.8, title: "Blanc sur blanc", artist: "Nil Garrofé", year: 2025, medium: "Technique mixte sur toile", size: "80 × 100 cm", image: "assets/art/18.webp" },
    { room: 5, ratio: 1.25, title: "Ligne d'eau", artist: "Anaïs Puig", year: 2026, medium: "Huile sur lin", size: "100 × 80 cm", image: "assets/art/19.webp" },
    { room: 5, ratio: 1.0, title: "Pause", artist: "Roc Benavent", year: 2026, medium: "Acrylique sur toile", size: "90 × 90 cm", image: "assets/art/20.webp" },
  ],
};
