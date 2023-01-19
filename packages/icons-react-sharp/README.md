# IReact Material Icons

## Install

```bash
yarn add @ireact-material-icons/sharp
```

## Basic Usage

You can import it directly or destructure from `@ireact-material-icons/sharp` when tree-shaking enabled.

```ts
import ABC from '@ireact-material-icons/sharp/ABC';
import { ABC } from '@ireact-material-icons/sharp';
```

## Component Interface

```ts
interface IReactMaterialIconProps {
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
}
```

## Release

```bash
npm run g
npm run build
npm publish
```
