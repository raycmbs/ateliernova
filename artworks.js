// ───────────────────────────────────────────────────────────────
//  GALLERY ARTWORKS  —  EXAMPLES TO REPLACE
//  The titles, artists, and visuals below are fictional EXAMPLES.
//  To put a real artwork:
//    1. drop the image into assets/art/  (e.g. assets/art/strate-3.jpg)
//    2. change the  image  field of the artwork
//    3. update title / artist / year / medium / size
//  Each room contains 4 artworks, in this order:
//    1 = left wall · 2 = right wall · 3 = back left · 4 = back right
//  ratio = height / width of the artwork (1 = square, 1.25 = portrait).
// ───────────────────────────────────────────────────────────────
window.ATELIER = {
  ROOMS: [
    { name: "Matter", line: "Textures, reliefs, and raw gestures." },
    { name: "Color", line: "Pigments that take up all the space." },
    { name: "Geometry", line: "Lines, shapes, and balances." },
    { name: "Light", line: "Artworks that change with the hour." },
    { name: "Silence", line: "Few elements, strong presence." },
  ],
  ARTWORKS: [
    { room: 1, ratio: 1.25, title: "Strata No. 3", artist: "Lucía Marzal", year: 2026, medium: "Mixed media on canvas", size: "100 × 80 cm", image: "assets/art/01.webp" },
    { room: 1, ratio: 0.8, title: "Bark", artist: "Tomás Vidrio", year: 2025, medium: "Acrylic and sand on canvas", size: "80 × 100 cm", image: "assets/art/02.webp" },
    { room: 1, ratio: 1.0, title: "Burnt Sand", artist: "Elia Roure", year: 2026, medium: "Oil and pigments on linen", size: "90 × 90 cm", image: "assets/art/03.webp" },
    { room: 1, ratio: 1.3, title: "Dig", artist: "Pau Esteller", year: 2025, medium: "Mixed media on panel", size: "130 × 100 cm", image: "assets/art/04.webp" },
    { room: 2, ratio: 1.0, title: "Red Afternoon", artist: "Noor Aldeguer", year: 2026, medium: "Acrylic on canvas", size: "100 × 100 cm", image: "assets/art/05.webp" },
    { room: 2, ratio: 1.3, title: "Free Pigment", artist: "Marta Quiroga", year: 2026, medium: "Oil on canvas", size: "130 × 100 cm", image: "assets/art/06.webp" },
    { room: 2, ratio: 0.8, title: "Tide", artist: "Jules Armand", year: 2025, medium: "Acrylic on canvas", size: "80 × 100 cm", image: "assets/art/07.webp" },
    { room: 2, ratio: 1.0, title: "Orchard", artist: "Sofia Bellver", year: 2026, medium: "Oil on linen", size: "90 × 90 cm", image: "assets/art/08.webp" },
    { room: 3, ratio: 1.0, title: "Arc and Horizon", artist: "Hugo Sanz-Ferrer", year: 2026, medium: "Acrylic on canvas", size: "100 × 100 cm", image: "assets/art/09.webp" },
    { room: 3, ratio: 1.25, title: "Three Times Noon", artist: "Ada Lombarte", year: 2025, medium: "Gouache on paper", size: "100 × 80 cm", image: "assets/art/10.webp" },
    { room: 3, ratio: 1.3, title: "Square", artist: "Oriol Camps", year: 2026, medium: "Pigment print", size: "130 × 100 cm", image: "assets/art/11.webp" },
    { room: 3, ratio: 0.8, title: "Threshold", artist: "Leïla Ferrandis", year: 2026, medium: "Acrylic on wood", size: "80 × 100 cm", image: "assets/art/12.webp" },
    { room: 4, ratio: 1.25, title: "Nightlight", artist: "Mateu Brull", year: 2026, medium: "Print on dibond", size: "100 × 80 cm", image: "assets/art/13.webp" },
    { room: 4, ratio: 1.0, title: "Halo", artist: "Irène Solà-Pons", year: 2025, medium: "Digital art, unique print", size: "90 × 90 cm", image: "assets/art/14.webp" },
    { room: 4, ratio: 1.0, title: "Blue Hour", artist: "Gabriel Ortuño", year: 2026, medium: "Oil on canvas", size: "100 × 100 cm", image: "assets/art/15.webp" },
    { room: 4, ratio: 1.3, title: "Dry Neon", artist: "Zoé Marquès", year: 2026, medium: "Digital art, unique print", size: "130 × 100 cm", image: "assets/art/16.webp" },
    { room: 5, ratio: 1.0, title: "A Circle", artist: "Clara Vallès", year: 2026, medium: "Acrylic on canvas", size: "100 × 100 cm", image: "assets/art/17.webp" },
    { room: 5, ratio: 0.8, title: "White on White", artist: "Nil Garrofé", year: 2025, medium: "Mixed media on canvas", size: "80 × 100 cm", image: "assets/art/18.webp" },
    { room: 5, ratio: 1.25, title: "Waterline", artist: "Anaïs Puig", year: 2026, medium: "Oil on linen", size: "100 × 80 cm", image: "assets/art/19.webp" },
    { room: 5, ratio: 1.0, title: "Pause", artist: "Roc Benavent", year: 2026, medium: "Acrylic on canvas", size: "90 × 90 cm", image: "assets/art/20.webp" },
  ],
};
