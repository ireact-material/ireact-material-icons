# IReact Material Icons

## Install

```bash
yarn add ireact-material-icons
```

## Basic Usage

You can import it directly or destructure from `ireact-material-icons` when tree-shaking enabled.

```ts
import SmileOutlined from 'ireact-material-icons/SmileOutlined';
import { SmileOutlined } from 'ireact-material-icons';
```

## Component Interface

```ts
interface IreactMaterialIconProps {
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
