/**
 * @File Contains the actual tile components
 *  and wraps them into a css flex container
 *
 * @Author Alexander Bassov Tue Jun 27 2023 9:42:41 PM
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent } from "react";
import HexGridTilesWrapper from "./HexGridTilesWrapper";

interface HexTilesWrapperProps
  extends SHexTilesWrapperProps,
    React.HTMLAttributes<HTMLDivElement> {
  tiles: JSX.Element[];
}

const HexGridRoot: FunctionComponent<HexTilesWrapperProps> = (props) => {
  const { tiles, $gridWidth: $gridSize } = props;

  return <HexGridTilesWrapper $gridWidth={$gridSize} $tiles={tiles} />;
};

interface SHexTilesWrapperProps {
  $gridWidth: number;
  $tileSize?: number;
  $gap?: number;
}

export default HexGridRoot;
