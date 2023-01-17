import Context from "./components/Context";

// context
const IconProvider = Context.Provider;

// 渲染svg和自定义组件
export { default } from "./components/Icon";
// 创建 script icon 渲染
export { default as createFromIconFont } from "./components/IconFont";

// 获取双色图标颜色方法
export * from "./components/twoTonePrimaryColor";

// 所有svg图标
export * from "./icons";

// context
export { IconProvider };
