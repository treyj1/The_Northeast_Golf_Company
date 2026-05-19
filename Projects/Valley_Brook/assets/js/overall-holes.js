/* Overall-plan hole geometry, normalized 0..1 relative to overall.webp.
   `label` = where the hole-number badge sits (over the printed number).
   `line`  = a centerline polyline (tee -> ... -> green); the hover
             spotlight is a feathered stroke along this line.

   FIRST PASS — hand-traced by eye from the stylized plan, so positions
   are approximate and meant to be tuned hole-by-hole.
   NOTE: these coordinates are coupled to the CURRENT overall.webp crop.
   If the overall plan is re-cropped/regenerated, re-tune this file. */
window.OVERALL_HOLES = {
  1:  { label: [0.30, 0.66], line: [[0.20, 0.36], [0.25, 0.52], [0.30, 0.66]] },
  2:  { label: [0.31, 0.21], line: [[0.22, 0.30], [0.31, 0.25], [0.41, 0.22]] },
  3:  { label: [0.27, 0.30], line: [[0.41, 0.22], [0.34, 0.26], [0.27, 0.30]] },
  4:  { label: [0.24, 0.34], line: [[0.27, 0.30], [0.25, 0.33], [0.22, 0.37]] },
  5:  { label: [0.31, 0.42], line: [[0.22, 0.37], [0.27, 0.40], [0.34, 0.43]] },
  6:  { label: [0.35, 0.47], line: [[0.34, 0.43], [0.34, 0.45], [0.36, 0.49]] },
  7:  { label: [0.28, 0.55], line: [[0.36, 0.49], [0.32, 0.52], [0.27, 0.56]] },
  8:  { label: [0.40, 0.58], line: [[0.27, 0.56], [0.34, 0.57], [0.43, 0.59]] },
  9:  { label: [0.63, 0.49], line: [[0.50, 0.55], [0.57, 0.52], [0.64, 0.49]] },
  10: { label: [0.62, 0.33], line: [[0.61, 0.46], [0.61, 0.40], [0.62, 0.33]] },
  11: { label: [0.72, 0.23], line: [[0.62, 0.31], [0.67, 0.27], [0.73, 0.23]] },
  12: { label: [0.78, 0.10], line: [[0.74, 0.20], [0.76, 0.15], [0.78, 0.09]] },
  13: { label: [0.55, 0.18], line: [[0.78, 0.09], [0.66, 0.14], [0.52, 0.18]] },
  14: { label: [0.21, 0.17], line: [[0.52, 0.19], [0.36, 0.18], [0.21, 0.16]] },
  15: { label: [0.12, 0.48], line: [[0.20, 0.40], [0.15, 0.44], [0.11, 0.49]] },
  16: { label: [0.34, 0.62], line: [[0.20, 0.55], [0.27, 0.59], [0.35, 0.63]] },
  17: { label: [0.50, 0.63], line: [[0.35, 0.63], [0.43, 0.63], [0.51, 0.63]] },
  18: { label: [0.55, 0.56], line: [[0.51, 0.63], [0.53, 0.60], [0.56, 0.55]] }
};
