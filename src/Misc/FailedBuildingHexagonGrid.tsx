/**
 * @File Display information about why the building failed
 *
 * @Author Alexander Bassov Tue Jun 20 2023 5:21:21 PM
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent } from "react";
import { HexGridConfig } from "../types";

interface FailedBuildingHexagonGridProps {
  config: HexGridConfig;
}

const FailedBuildingHexagonGrid: FunctionComponent<
  FailedBuildingHexagonGridProps
> = (props) => {
  const { radius, tileWidth } = props.config;

  return (
    <div>
      <p>Invalid Dimensions</p>
      <p>Grid radius {JSON.stringify(radius)}</p>
      <p>Tile width {JSON.stringify(tileWidth)}</p>
    </div>
  );
};

export default FailedBuildingHexagonGrid;
