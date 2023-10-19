/**
 * @File "Foreground" of a hexagon tile
 *  Visual context would describe this component to be the background of a tile
 *
 * @Author Alexander Bassov Thu Jun 29 2023 1:56:05 AM
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

interface HexTileFrontLayer
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  $backgroundColor: string;
  $width: number;
  $height: number;
}

const HexTileFrontLayer: FunctionComponent<HexTileFrontLayer> = (props) => {
  return (
    <SHexTileFrontLayer {...props} $backgroundColor={props.$backgroundColor} />
  );
};

interface HexBackgroundProps extends Partial<HexTileFrontLayer> {
  $backgroundColor?: string;
}

const SHexTileFrontLayer = styled.div<HexBackgroundProps>`
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  clip-path: inherit;
  background: ${(props) => props.$backgroundColor || "white"};

  & > * {
    margin: 0 !important;
  }
`;

export default HexTileFrontLayer;
