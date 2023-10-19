/**
 * @File "Background" of a hexagon tile
 *  Visual context would describe this component to be the border of a tile
 *
 * @Author Alexander Bassov Thu Jun 29 2023 1:56:28 AM
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import { HexTilePolygonClipPath } from "../../config";

interface HexTileBackLayerProps
  extends HexBorderProps,
    PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

const HexTileBackLayer: FunctionComponent<HexTileBackLayerProps> = (props) => {
  return <SHexTileBackLayer {...props} />;
};

interface HexBorderProps {
  $backgroundColor: string;
}

export const SHexTileBackLayer = styled.div<HexBorderProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$backgroundColor || "black"};
  clip-path: polygon(${HexTilePolygonClipPath});
`;

export default HexTileBackLayer;
