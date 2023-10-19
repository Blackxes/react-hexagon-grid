/**
 * @File Types for the React Hexagon grid
 *
 * @Author Alexander Bassov Tue Jun 20 2023 5:31:43 PM
 * @Email blackxes.dev@gmail.com
 */

import { ComponentType } from "react";

export type XYObject = { x: number; y: number };
export type HWObject = { h: number; w: number };
export type HexTileSize = HWObject;
export type HexGridSize = HWObject;
export type HexGridTilesCount = XYObject;
export type HexCoordinates = XYObject;

export interface HexTileContentComponentProps {
  coords: { x: number; y: number };
  absoluteCoords: { x: number; y: number };
}
export type HexTileContentComponent =
  ComponentType<HexTileContentComponentProps>;

export interface HexGridConfig {
  // gridTilesCount?: HexGridTilesCount;
  radius: number;
  tileWidth: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  tileContentComponent?: HexTileContentComponent;
}

export interface CalculatedHexTileStyleValues {
  tileShiftTop: number;
  tileLeftShift: number;
  tileLeftShiftCorrection: number;
  frontlayerWidth: number;
  frontlayerHeight: number;
}
