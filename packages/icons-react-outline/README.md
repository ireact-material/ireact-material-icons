# IReact Material Icons

[![NPM version](https://img.shields.io/npm/v/@ireact-material-icons/outline.svg?style=flat)](https://npmjs.org/package/@ireact-material-icons/outline)

## Install

```bash
yarn add @ireact-material-icons/outline
```

## Basic Usage

You can import it directly or destructure from `@ireact-material-icons/outline` when tree-shaking enabled.

```ts
import ABC from '@ireact-material-icons/outline/ABC';
import { ABC } from '@ireact-material-icons/outline';
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
