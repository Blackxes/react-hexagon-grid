/*
 * @Author Alexander Bassov Sun Sep 17 2023
 * @Email blackxes.dev@gmail.com
 */

import { HexTileDimensionRatio } from "../config";
import { CalculatedHexTileStyleValues, HexCoordinates } from "../types";

export const useGetCalculatedHexTileStyleValues = (
  absoluteCoords: HexCoordinates,
  tileWidth: number,
  borderWidth: number
): CalculatedHexTileStyleValues => {
  const tileHeight = tileWidth / HexTileDimensionRatio;
  const frontlayerWidth = tileWidth - borderWidth * 2;

  return {
    tileShiftTop: !absoluteCoords.y
      ? 0
      : -tileHeight / 4 - (borderWidth * Math.sqrt(3)) / 2,
    tileLeftShift:
      !(absoluteCoords.y % 2) && absoluteCoords.x == 0
        ? tileWidth / 2 - borderWidth / 2
        : 0,
    tileLeftShiftCorrection: -borderWidth,
    frontlayerWidth,
    frontlayerHeight: frontlayerWidth * 1.1547,
  };
};
