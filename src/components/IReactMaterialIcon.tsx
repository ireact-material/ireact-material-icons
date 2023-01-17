import * as React from "react";

// type
export interface IReactMaterialIconProps {
  // twoToneColor?: TwoToneColor;
}

export interface IconComponentProps extends IReactMaterialIconProps {}

const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>(() => {
  return <span>1212</span>;
});

export default Icon;
