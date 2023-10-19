# Hexagon react component

### Examples

#### Most basic grid

```tsx
import { HexagonGrid } from "hexagon-grid";
import { FunctionComponent } from "react";

const BasicGrid: FunctionComponent = (_) => <HexagonGrid />;
```

#### Fully configured grid + little toggle button to switch inner custom tile component

```tsx
import { HexagonGrid, TileContentComponentProps } from "hexagon-grid";
import { FunctionComponent } from "react";

const CoordsComponent: FunctionComponent<TileContentComponentProps> = (
  props
) => (
  <p>
    {props.coords.x} / {props.coords.y}
  </p>
);

const AbsoluteCoordsComponent: FunctionComponent<TileContentComponentProps> = (
  props
) => (
  <p>
    {props.absoluteCoords.x} / {props.absoluteCoords.y}
  </p>
);

const FullyConfiguredGrid: FunctionComponent = (_) => {
  const [useAbsoluteCoords, setUseAbsoluteCoords] = useState(false);
  const onSwitchCoordinatesType = (_: MouseEvent<HTMLButtonElement>) =>
    setUseAbsoluteCoords(!useAbsoluteCoords);
  const usedComponent = useAbsoluteCoords
    ? AbsoluteCoordsComponent
    : CoordsComponent;

  return (
    <>
      <HexagonGrid
        radius={5}
        backgroundColor="#b4d2ff"
        borderColor="#2196f3"
        borderWidth={10}
        tileWidth={100}
        tileContentComponent={usedComponent}
      />
      <button onClick={onSwitchCoordinatesType}>
        Switch to{" "}
        {useAbsoluteCoords ? "centered coordinates" : "absolute coordinates"}
      </button>
    </>
  );
};
```
