import {
  AbstractNode,
  IconDefinition,
} from "ireact-material-icons-svg/lib/types";
import {
  generate,
  getSecondaryColor,
  isIconDefinition,
  useInsertStyles,
  warning,
} from "../utils";

// type
export interface IconProps {
  icon: IconDefinition;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  // 只用于双色
  primaryColor?: string;
  // 只用于双色
  secondaryColor?: string;
  // 焦点
  focusable?: string;
}

// 双色调调色板
export interface TwoToneColorPalette extends TwoToneColorPaletteSetter {
  // 计算标记
  calculated?: boolean;
}

export interface TwoToneColorPaletteSetter {
  primaryColor: string;
  secondaryColor?: string;
}

interface IconBaseComponent<P> extends React.FC<P> {
  getTwoToneColors: typeof getTwoToneColors;
  setTwoToneColors: typeof setTwoToneColors;
}

// 双色调调色板
const twoToneColorPalette: TwoToneColorPalette = {
  primaryColor: "#000000",
  secondaryColor: "#B3B3B3",
  calculated: false,
};

// 设置双色
function setTwoToneColors({
  primaryColor,
  secondaryColor,
}: TwoToneColorPaletteSetter) {
  // 第一个颜色
  twoToneColorPalette.primaryColor = primaryColor;
  // 第二个颜色
  twoToneColorPalette.secondaryColor =
    secondaryColor || getSecondaryColor(primaryColor);
  // 计算标记
  twoToneColorPalette.calculated = !!secondaryColor;
}

// 获取twoton颜色
function getTwoToneColors(): TwoToneColorPalette {
  return {
    // 双色调调色板
    ...twoToneColorPalette,
  };
}

// 基础icon组件
const IconBase: IconBaseComponent<IconProps> = (props) => {
  const {
    className,
    icon,
    primaryColor,
    secondaryColor,
    onClick,
    style,
    ...restProps
  } = props;

  // ----------warning------------//

  // 是否是图标
  if (!isIconDefinition(icon)) {
    // warning
    warning(
      isIconDefinition(icon),
      `icon should be icon definiton, but got ${icon}`
    );

    return null;
  }

  // ----------class------------//

  // 双色
  let twoToneColors: TwoToneColorPalette = twoToneColorPalette;

  // 设置双色
  if (primaryColor) {
    twoToneColors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor),
    };
  }

  // 插入样式
  useInsertStyles();

  // ----------render------------//

  // 节点
  let target = icon;

  // 节点是一个函数
  if (target && typeof target.icon === "function") {
    target = {
      ...target,
      icon: target.icon(
        twoToneColors.primaryColor,
        twoToneColors.secondaryColor
      ),
    };
  }

  // 渲染
  return generate(target.icon as AbstractNode,
    `svg-${target.name}`, {
    className,
    style,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    onClick,
    ...restProps,
  });
};

IconBase.displayName = "IconBase";

// 获取双色颜色
IconBase.getTwoToneColors = getTwoToneColors;
// 设置双色颜色
IconBase.setTwoToneColors = setTwoToneColors;

export default IconBase;
