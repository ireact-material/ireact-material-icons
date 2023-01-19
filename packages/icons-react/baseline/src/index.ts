import Context from "./components/Context";
// 渲染svg和自定义组件
import Icon from "./components/Icon";

// context
const IconProvider = Context.Provider;

export default Icon;

// 创建 script icon 渲染
export { default as createFromIconFont } from "./components/IconFont";
// 获取双色图标颜色方法
export * from "./components/TwoTonePrimaryColor";
// 所有svg图标
export * from "./icons";
// context
export { IconProvider };
