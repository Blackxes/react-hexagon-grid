/*
 * @Author Alexander Bassov Sat Sep 16 2023
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent } from "react";
import styled from "styled-components";
import { HexCoordinates } from "../../types";

interface HexGhostTileProps {
  coords: HexCoordinates;
}

const HexGhostTile: FunctionComponent<HexGhostTileProps> = () => {
  return <SHexGhostTile />;
};

const SHexGhostTile = styled.div`
  opacity: 0;
  & * {
    display: none;
  }
`;

export default HexGhostTile;
