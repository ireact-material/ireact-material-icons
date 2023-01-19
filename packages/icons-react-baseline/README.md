# IReact Material Icons

[![NPM version](https://img.shields.io/npm/v/@ireact-material-icons/baseline.svg?style=flat)](https://npmjs.org/package/@ireact-material-icons/baseline)

## Install

```bash
yarn add @ireact-material-icons/baseline
```

## Basic Usage

You can import it directly or destructure from `@ireact-material-icons/baseline` when tree-shaking enabled.

```ts
import ABC from '@ireact-material-icons/baseline/ABC';
import { ABC } from '@ireact-material-icons/baseline';
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
