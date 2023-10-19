/**
 * @File Configurations/Setups for the React Hexagon grid
 *
 * @Author Alexander Bassov Tue Jun 20 2023 3:10:48 AM
 * @Email blackxes.dev@gmail.com
 */

// import HexagonLoadingComponent from "./_Backup/HexagonLoadingComponent";
// import { HexagonGridConfig } from "./types";

// "\2B22"
// ~0.866
export const HexTileDimensionRatio = Math.cos(Math.PI / 6);
export const HexTilePolygonClipPath = `50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%`;

// export const HexagonGridConfigDefaults: HexagonGridConfig = {
//   gridTilesCount: { x: 5, y: 5 },
//   tileSize: { w: 50, h: 50 / HexagonTileDimensionRatio },
//   //
//   usedAxis: "w",
//   loadingComponent: HexagonLoadingComponent,
// };
