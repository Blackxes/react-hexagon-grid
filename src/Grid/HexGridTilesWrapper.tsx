/*
 * @Author Alexander Bassov Wed Sep 13 2023
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent } from "react";
import styled from "styled-components";

interface HexGridTilesWrapperProps {
  $tiles: JSX.Element[];
  $gridWidth: number;
}

const HexGridTilesWrapper: FunctionComponent<HexGridTilesWrapperProps> = (
  props
) => {
  return (
    <SHexGridTilesWrapper
      $gridWidth={props.$gridWidth}
      $tiles={props.$tiles}
      children={props.$tiles}
    />
  );
};

const SHexGridTilesWrapper = styled.div<HexGridTilesWrapperProps>`
  margin-inline: auto;
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.$gridWidth}px;
`;

export default HexGridTilesWrapper;
