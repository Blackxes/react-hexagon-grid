/**
 * @File Main tile component which manages "background"/"foreground",
 *  what is rendered inside and props/state passes down to the custom tile component
 *
 * @Author Alexander Bassov Thu Jun 29 2023 4:48:25 AM
 * @Email blackxes.dev@gmail.com
 */

import { Fragment, FunctionComponent } from "react";
import styled, { keyframes } from "styled-components";
import { HexCoordinates, HexTileContentComponent } from "../../types";
import { useGetCalculatedHexTileStyleValues } from "../hooks";
import HexGhostTile from "./HexGhostTile";
import HexTileBackLayer from "./HexTileBackLayer";
import HexTileFrontLayer from "./HexTileFrontLayer";

interface HexTileProps {
  index: number;
  coords: HexCoordinates;
  absoluteCoords: HexCoordinates;
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  tileWidth: number;
  tileContentComponent: HexTileContentComponent;
  isVisuallyCenteredTile?: boolean;
  isLastRowTile?: boolean;
  isLastColumnTile?: boolean;
  isLastTile?: boolean;
  isGhostTile?: boolean;
  // dontCenterTileContent?: boolean;
}

const HexTile: FunctionComponent<HexTileProps> = (props) => {
  const { coords, absoluteCoords } = props;
  const { tileWidth, borderWidth } = props;
  const { isGhostTile } = props;
  const { tileContentComponent } = props;
  const TileContentComponent = tileContentComponent;
  const calculatedStyles = useGetCalculatedHexTileStyleValues(
    absoluteCoords,
    tileWidth,
    borderWidth
  );
  // const adjustedTileWidth =
  //   props.isLastRowTile && !(absoluteCoords.y % 2) ? tileWidth / 2 : tileWidth;

  // const [showOptions] = useState(false);

  return (
    <Fragment>
      <SHexTile
        $index={props.index}
        $absoluteCoords={absoluteCoords}
        $borderWidth={borderWidth}
        $tileShiftLeft={calculatedStyles.tileLeftShift}
        $tileShiftLeftCorrection={calculatedStyles.tileLeftShiftCorrection}
        $tileShiftTop={calculatedStyles.tileShiftTop}
        $width={tileWidth}
        $height={tileWidth * 1.1547}
      >
        {isGhostTile ? (
          <HexGhostTile coords={coords} />
        ) : (
          <HexTileBackLayer $backgroundColor={props.borderColor}>
            <HexTileFrontLayer
              $backgroundColor={props.backgroundColor}
              $width={calculatedStyles.frontlayerWidth}
              $height={calculatedStyles.frontlayerHeight}
            >
              <TileContentComponent
                coords={coords}
                absoluteCoords={absoluteCoords}
              />
            </HexTileFrontLayer>
          </HexTileBackLayer>
        )}
      </SHexTile>
    </Fragment>
  );
};

interface SHexTileProps {
  $index: number;
  $absoluteCoords: HexCoordinates;
  $borderWidth: number;
  $tileShiftTop: number;
  $tileShiftLeft: number;
  $tileShiftLeftCorrection: number;
  $width: number;
  $height: number;
}

const SlideInKeyFrames = keyframes`
  0% { opacity: 0; }
  10% { opacity: 0; }
  100% { opacity: 1; }
`;

const SHexTile = styled.div<SHexTileProps>`
  margin-top: ${(props) => props.$tileShiftTop}px;
  margin-left: ${(props) => props.$tileShiftLeft}px;
  margin-right: ${(props) => props.$tileShiftLeftCorrection}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  font-size: 1em;
  opacity: 1;
  user-select: none;
  z-index: 0;
  &:hover {
    z-index: 1;
  }
  animation: ${SlideInKeyFrames} ease-in-out
    ${(props) => Math.log(props.$index)}ms;
`;
export default HexTile;
