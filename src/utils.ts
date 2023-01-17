import { generate as generateColor } from "ireact-material-colors";
import { updateCSS } from "rc-util/lib/Dom/dynamicCSS";
import warn from "rc-util/lib/warning";
import React, { useContext, useEffect } from "react";

import IconContext from "./components/Context";

// type
import type {
  AbstractNode,
  IconDefinition,
} from "ireact-material-icons-svg/lib/types";

// 属性
export interface Attrs {
  [key: string]: string;
}

// 格式化属性
export function normalizeAttrs(attrs: Attrs = {}): Attrs {
  return Object.keys(attrs).reduce((acc: Attrs, key) => {
    const value = attrs[key];

    switch (key) {
      // 重命名class
      case "class":
        acc.className = value;

        delete acc.class;

        break;
      default:
        acc[key] = value;
    }

    return acc;
  }, {});
}

// 生成节点
export function generate(
  node: AbstractNode,
  key: string,
  rootProps?: { [key: string]: any } | false
) {
  // 没有传入父级道具
  if (!rootProps) {
    return React.createElement(
      node.tag,
      // 属性
      { key, ...normalizeAttrs(node.attrs) },
      // 子节点
      (node.children || []).map((child, index) =>
        generate(child, `${key}-${node.tag}-${index}`)
      )
    );
  }

  return React.createElement(
    node.tag,
    // 属性
    {
      key,
      ...normalizeAttrs(node.attrs),
      ...rootProps,
    },
    // 子节点
    (node.children || []).map((child, index) =>
      generate(child, `${key}-${node.tag}-${index}`)
    )
  );
}

// 获取双色第二个颜色
export function getSecondaryColor(primaryColor: string): string {
  // 选择第二种颜色
  return generateColor(primaryColor)[0];
}

export const iconStyles = `
.ireactmaterialicon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ireactmaterialicon > * {
  line-height: 1;
}

.ireactmaterialicon svg {
  display: inline-block;
}

.ireactmaterialicon::before {
  display: none;
}

.ireactmaterialicon .ireactmaterialicon-icon {
  display: block;
}

.ireactmaterialicon[tabindex] {
  cursor: pointer;
}
`;

// 插入样式
export const useInsertStyles = (styleStr: string = iconStyles) => {
  const { csp } = useContext(IconContext);

  useEffect(() => {
    updateCSS(styleStr, "@ireact-material-icons", {
      prepend: true,
      csp,
    });
  }, []);
};

// 警告
export function warning(valid: boolean, message: string) {
  warn(valid, `[ireact-material-icons] ${message}`);
}

// 是否是图标
export function isIconDefinition(target: any): target is IconDefinition {
  return (
    typeof target === "object" &&
    typeof target.name === "string" &&
    typeof target.theme === "string" &&
    (typeof target.icon === "object" || typeof target.icon === "function")
  );
}

// 扁平化双色
export function normalizeTwoToneColors(
  twoToneColor: string | [string, string] | undefined
): string[] {
  if (!twoToneColor) {
    return [];
  }

  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}

// 确保 SVG 的行为类似于一般文本
// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false',
};
