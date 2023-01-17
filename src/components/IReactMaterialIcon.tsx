import classNames from "classnames";
import * as React from "react";
import Context from "./Context";

// component
import { normalizeTwoToneColors } from "../utils";
import IconBase from "./IconBase";

// type
import { IconDefinition } from "ireact-material-icons-svg/lib/types";
import type { IconBaseProps } from "./Icon";
import type { TwoToneColor } from "./TwoTonePrimaryColor";
import { getTwoToneColor, setTwoToneColor } from "./TwoTonePrimaryColor";

export interface IReactMaterialIconProps extends IconBaseProps {
  twoToneColor?: TwoToneColor;
}

// props
export interface IconComponentProps extends IReactMaterialIconProps {
  icon: IconDefinition;
}

interface IconBaseComponent<Props>
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLSpanElement>
  > {
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
}

const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>(
  (props, ref) => {
    // props
    const {
      // 影响外部 <i>...</i>
      className,

      // 影响内部 <svg>...</svg>
      icon,

      tabIndex,
      onClick,

      twoToneColor,
      ...restProps
    } = props;

    // ----------context------------//

    const { prefixCls = "ireactmaterialicon", rootClassName } =
      React.useContext(Context);

    // ----------class------------//
    const classString = classNames(
      rootClassName,
      prefixCls,
      {
        [`${prefixCls}-${icon.name}`]: !!icon.name,
      },
      className
    );

    // ----------render------------//

    // tabIndex
    let iconTabIndex = tabIndex;
    if (iconTabIndex === undefined && onClick) {
      iconTabIndex = -1;
    }

    const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

    return (
      <span
        tabIndex={iconTabIndex}
        {...restProps}
        onClick={onClick}
        className={classString}
        {...restProps}
        ref={ref}
      >
        {/* 基础icon */}
        <IconBase
          icon={icon}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        ></IconBase>
      </span>
    );
  }
) as IconBaseComponent<IconComponentProps>;

Icon.displayName = "IReactMaterialIcon";
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;
