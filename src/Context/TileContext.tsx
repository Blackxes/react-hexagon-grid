/**
 * @File Context for a tile
 *
 * @Author Alexander Bassov Thu Jun 29 2023 4:28:39 AM
 * @Email blackxes.dev@gmail.com
 */

import { createContext } from "react";

export interface TileContextState<D extends object> {
  data: D;
}

export const TileContext = createContext<TileContextState<{}>>({
  data: {},
});
