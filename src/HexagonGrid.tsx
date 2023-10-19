/**
 * @File Hexagon grid React component
 *  Customizable and possible to use custom component
 *  for tile contents
 *
 *  Custom component may use HexagonGridCustomTileProps
 *  to intellisense values and usable functions inside the custom component
 *
 * @Author Alexander Bassov Sat Jun 24 2023 12:07:00 AM
 * @Email blackxes.dev@gmail.com
 */

import {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import HexGridRoot from "./Grid/HexGridRoot";
import HexTile from "./Grid/Tiles/HexTile";
import { getAbsoluteCalculatedGridSize } from "./functions";
import { HexGridConfig } from "./types";

interface HexagonGridProps extends Partial<HexGridConfig> {}

export const HexagonGrid: FunctionComponent<HexagonGridProps> = (props) => {
  const gridConfig: Required<HexGridConfig> = {
    tileWidth: 100,
    radius: 3,
    borderWidth: Math.min(Math.max(1, props.borderWidth || 1)),
    backgroundColor: "palegoldenrod",
    borderColor: "palevioletred",
    tileContentComponent: () => null,
    ...props,
  };

  const [builtGridComponents, setBuiltGridComponents] = useState<
    ReactElement[]
  >([]);
  const [isBuilding, setIsBuilding] = useState(true);
  const [calculatedGridWidth, setCalculatedGridWidth] = useState(0);

  const initiateGridBuilding = () => setIsBuilding(true);
  const finishGridBuilding = (gridComponents: ReactElement[]) =>
    !void setBuiltGridComponents(gridComponents) && setIsBuilding(false);

  const buildGridComponents = useCallback(
    async (gridConfig: Required<HexGridConfig>) => {
      const components = await useBuildComponents(gridConfig);

      finishGridBuilding(components);
      setCalculatedGridWidth(
        getAbsoluteCalculatedGridSize(
          gridConfig.radius,
          gridConfig.tileWidth,
          gridConfig.borderWidth
        )
      );
    },
    []
  );

  useEffect(() => {
    !void initiateGridBuilding();
    buildGridComponents(gridConfig);
  }, [
    gridConfig.radius,
    gridConfig.tileWidth,
    gridConfig.borderWidth,
    gridConfig.backgroundColor,
    gridConfig.borderColor,
    gridConfig.tileContentComponent,
  ]);

  return isBuilding ? (
    <i>Building ..</i>
  ) : (
    <HexGridRoot $gridWidth={calculatedGridWidth} tiles={builtGridComponents} />
  );
};

const useBuildComponents = async (gridConfig: Required<HexGridConfig>) => {
  const { radius, backgroundColor, borderColor } = gridConfig;
  const { borderWidth, tileWidth } = gridConfig;
  const components: ReactElement[] = [];

  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      const tileComponent = gridConfig.tileContentComponent;

      const coords = {
        y: q,
        x: r + (radius % 2 ? Math.ceil(-q / 2) : Math.floor(-q / 2)),
      };
      const isGhostTile =
        Math.abs(coords.y + coords.x) > radius || Math.abs(coords.x) > radius;

      // Ghosttiles don't have an index per se
      const index = isGhostTile ? -1 : 0;

      components.push(
        <HexTile
          key={r + "-" + q}
          index={index}
          coords={coords}
          absoluteCoords={{ x: r + radius, y: q + radius }}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderWidth={borderWidth}
          tileContentComponent={tileComponent}
          tileWidth={tileWidth}
          isGhostTile={isGhostTile}
        />
      );
    }
  }

  return components;
};
