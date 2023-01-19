# IReact Material Icons

## Install

```bash
yarn add @ireact-material-icons/outline
```

## Basic Usage

You can import it directly or destructure from `@ireact-material-icons/outline` when tree-shaking enabled.

```ts
import SmileOutlined from '@ireact-material-icons/outline/SmileOutlined';
import { SmileOutlined } from '@ireact-material-icons/outline';
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
npm run generate
npm run compile
npm publish
```
