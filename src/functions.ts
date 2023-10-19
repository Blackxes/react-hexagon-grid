/**
 * @File @todo FileDescription
 *
 * @Author Alexander Bassov Wed Jul 05 2023 9:32:33 AM
 * @Email blackxes.dev@gmail.com
 */

import { HexTileDimensionRatio } from "./config";
import {
  HWObject,
  HexCoordinates,
  HexGridConfig,
  HexGridTilesCount,
  HexTileSize,
} from "./types";

export const getCalculatedTileSize = (
  tileSideWidth: number,
  usedSideForTileSizeRatioCalculation: "width" | "height"
): HWObject => ({
  w:
    usedSideForTileSizeRatioCalculation == "width"
      ? tileSideWidth
      : tileSideWidth / HexTileDimensionRatio,
  h:
    usedSideForTileSizeRatioCalculation == "height"
      ? tileSideWidth
      : tileSideWidth / HexTileDimensionRatio,
});

export const getAbsoluteCalculatedGridSize = (
  gridRadius: number,
  tileWidth: number,
  borderWidth: number
): number =>
  // Raw width
  (gridRadius * 2 + 1) * tileWidth -
  // Subtract double borders
  gridRadius * 2 * borderWidth +
  // Add another half to account for shifted rows
  tileWidth / 2 -
  // Aaand half a border to account for the edge
  // of the last tile in a row
  borderWidth / 2;

// Defines and calculates how "big" a grid is
export const getGridSizeRatio = (gridConfig: HexGridConfig) =>
  (gridConfig.radius * gridConfig.tileWidth) / 100;

/**
 * Calculates how much a tile needs to shift based on its coordinates
 *
 * @return {object} Object with x/y shift values in pixels
 */
export const calculateTileShift = (
  coords: HexCoordinates,
  tileSize: HexTileSize,
  borderWidth: number
) => ({
  x:
    // Backshift every tile after the first one in a row by a border width
    (!coords.x ? 0 : -borderWidth) +
    // Shift every second rows first tile by half a tile
    (coords.y % 2 && !coords.x ? tileSize.w / 2 : 0) +
    // Backshift every second rows first tile by half a border
    (coords.y % 2 && !coords.x ? -(borderWidth / 2) : 0),
  y:
    // Upshift tiles after the first row
    // vertically 1/4 of their height
    (!coords.y ? 0 : -(tileSize.h / 4)) +
    // Additionally upshift by the border width
    (!coords.y ? 0 : -borderWidth),
  //
});

/**
 * Returns the tile which is considered the most centered
 * @note This function doesn't return the absolute center
 * 	but rather a "visual" centered tile
 */
export const calculateVisuallyCenteredTile = (
  gridTilesCount: HexGridTilesCount
) => ({
  x: Math.floor(gridTilesCount.x / 2 - 0.5),
  y: Math.floor(gridTilesCount.y / 2),
});

/**
 * Calculate the sum of tiles based on a radius in tiles
 * for a hexagon grid
 */
export const calculateTilesSum = (radius: number) =>
  6 * ((radius - 1) * (radius / 2)) + Math.min(1, radius);

/**
 * Calculates the sum of tiles based on a radius in tiles
 * for a hexagon grid of a ring
 */
export const calculateRingTilesSum = (radius: number) =>
  calculateTilesSum(Math.max(radius, 0)) -
  calculateTilesSum(Math.max(radius - 1, 0));

/**
 * Returns an array of object with x/y coords which are in range
 * of a given tile with a given range
 */
export const buildHexagonGridVectors = (
  radius: number,
  _centerTile = { q: 0, r: 0, s: 0 }
) => {
  // Orders the tiles from top left to bottom right
  const tiles = [];

  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      if (Math.abs(q + r) <= radius) tiles.push({ q, r, s: -(q + r) });
    }
  }

  return tiles;
};

/**
 * Checks whether two vec2d are equal
 *
 * @param {object} coordsA Left side of the check
 * @param {object} coordsB Right side of the check
 *
 * @returns boolean
 */
export const isEqual = (vec2A: HexCoordinates, vec2B: HexCoordinates) =>
  vec2A && vec2B && vec2A?.x == vec2B?.x && vec2A?.y == vec2B?.y;

/**
 * Checks if a tile is a neighbour of another tile
 *
 * @param {object} isNeighbourOfCoords X/Y coords of the tile which is checked
 * 	to be a neighbour of thisTileCoords (second parameter)
 * @param {object} thisTileCoords X/Y coords of the tile which serves as the checked against tile
 */
export const isNeighbour = (
  isNeighbourOfCoords: HexCoordinates,
  thisTileCoords: HexCoordinates
) =>
  // Left
  (thisTileCoords.x - 1 == isNeighbourOfCoords.x &&
    thisTileCoords.y == isNeighbourOfCoords.y) ||
  // Right
  (thisTileCoords.x + 1 == isNeighbourOfCoords.x &&
    thisTileCoords.y == isNeighbourOfCoords.y) ||
  // Top 1 (depending on which y axis its left or right top)
  (thisTileCoords.x == isNeighbourOfCoords.x &&
    thisTileCoords.y - 1 == isNeighbourOfCoords.y) ||
  // Bottom 1 (depending on which y axis its left or right bottom)
  (thisTileCoords.x == isNeighbourOfCoords.x &&
    thisTileCoords.y + 1 == isNeighbourOfCoords.y) ||
  // Top 2 (depending on which y axis its left or right top)
  // @todo Make this a shorter check for a vertical neighbour
  (thisTileCoords.x + (thisTileCoords.y % 2) * 2 - 1 == isNeighbourOfCoords.x &&
    thisTileCoords.y - 1 == isNeighbourOfCoords.y) ||
  // Bottom 2 (depending on which y axis its left or right bottom)
  (thisTileCoords.x + (thisTileCoords.y % 2) * 2 - 1 == isNeighbourOfCoords.x &&
    thisTileCoords.y + 1 == isNeighbourOfCoords.y);
