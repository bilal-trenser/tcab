/* prettier-ignore */
// Spacing
// ------------------------------
// NOTE: Please don't add any other value in this scale and try to stick to these as much as possible.
export type SpacingScale =
  //   0 |    2 |   4 |    6 | 8 |  12 | 16|  20 | 24| 32| 40| 48| 56| 64| 72| 80 | 88 | 96 | 128| 160
  /**/ 0 | 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 20;
export const spacingScale = (scale: SpacingScale) => scale * 8
