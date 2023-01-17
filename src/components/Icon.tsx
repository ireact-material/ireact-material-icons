import classNames from "classnames";
import * as React from "react";

import { svgBaseProps, useInsertStyles, warning } from "../utils";
import Context from "./Context";

// type
export interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {}

// 自定义图标组件props
export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface IconComponentProps extends IconBaseProps {
  viewBox?: string;
  component?:
    | React.ComponentType<
        CustomIconComponentProps | React.SVGProps<SVGSVGElement>
      >
    | React.ForwardRefExoticComponent<CustomIconComponentProps>;
  ariaLabel?: React.AriaAttributes["aria-label"];
}

// 渲染svg和自定义组件
const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>(
  (props, ref) => {
    const {
      // 影响外部 <i>...</i>
      className,

      // 影响内部 <svg>...</svg>
      component: Component,
      viewBox,

      // children
      children,

      tabIndex,
      onClick,
      ...restProps
    } = props;

    // ----------warning------------//

    // 警告
    warning(
      Boolean(Component || children),
      "Should have `component` prop or `children`."
    );

    // ----------class------------//

    // 插入样式
    useInsertStyles();

    const { prefixCls = "ireactmaterialicon", rootClassName } =
      React.useContext(Context);

    // 合并样式
    const classString = classNames(rootClassName, prefixCls, className);

    // svg props
    const innerSvgProps: CustomIconComponentProps = {
      ...svgBaseProps,
    };

    // 有viewBox
    if (viewBox) {
      innerSvgProps.viewBox = viewBox;
    }

    // ----------render------------//

    // tabIndex
    let iconTabIndex = tabIndex;
    if (iconTabIndex === undefined && onClick) {
      iconTabIndex = -1;
    }

    // 渲染子节点

    // component > children
    const renderInnerNode = () => {
      // 有组件
      if (Component) {
        return <Component {...innerSvgProps}>{children}</Component>;
      }

      // 有子节点
      if (children) {
        // 是否有正确的 viewBox 属性
        warning(
          Boolean(viewBox) ||
            (React.Children.count(children) === 1 &&
              React.isValidElement(children) &&
              React.Children.only(children).type === "use"),
          "Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."
        );

        return (
          <svg {...innerSvgProps} viewBox={viewBox}>
            {children}
          </svg>
        );
      }

      return null
    };

    return (
      <span
        className={classString}
        onClick={onClick}
        tabIndex={iconTabIndex}
        {...restProps}
        ref={ref}
      >
        {renderInnerNode()}
      </span>
    );
  }
);

Icon.displayName = "IReactMaterialIcon";

export default Icon;
