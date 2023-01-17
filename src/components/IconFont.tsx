import * as React from "react";
import IconBase, { IconBaseProps } from "./Icon";

// type
export interface IconFontProps<T extends string = string>
  extends IconBaseProps {
  type: T;
}

// 自定义图标选项
export interface CustomIconOptions {
  // url
  scriptUrl?: string | string[];
  // 通用props
  extraCommonProps?: { [key: string]: any };
}

// script链接缓存
const customScriptUrlCache = new Set<string>();

// 是否是有效的链接
function isValidCustomScriptUrl(scriptUrl: string): boolean {
  return Boolean(
    typeof scriptUrl === "string" &&
      scriptUrl.length &&
      !customScriptUrlCache.has(scriptUrl)
  );
}

// 创建 script 标签
function createScriptUrlElements(
  scriptUrls: string[],
  index: number = 0
): void {
  // 当前 script url
  const currentScriptUrl = scriptUrls[index];

  // 是否是有效的链接
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    const script = document.createElement("script");
    script.setAttribute("src", currentScriptUrl);
    script.setAttribute("data-namespace", currentScriptUrl);

    // 创建下一个 script 标签
    if (scriptUrls.length > index + 1) {
      script.onload = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
      script.onerror = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }

    customScriptUrlCache.add(currentScriptUrl);

    // 插入到body
    document.body.appendChild(script);
  }
}

// 创建 script icon 渲染
export default function create<T extends string = string>(
  options: CustomIconOptions = {}
): React.FC<IconFontProps<T>> {
  // options
  const { scriptUrl, extraCommonProps = {} } = options;
  /**
   * 需要 DOM API。
   * 确保在浏览器环境中。
   * 自定义图标将创建一个 <script/>
   * 加载 SVG 符号并将 SVG 元素插入文档主体。
   */

  if (
    scriptUrl &&
    typeof document !== "undefined" &&
    typeof window !== "undefined" &&
    typeof document.createElement === "function"
  ) {
    // 数组
    if (Array.isArray(scriptUrl)) {
      // 因为 iconfont 资源会把svg插入before，
      // 所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
      createScriptUrlElements(scriptUrl.reverse());
    }
    // 普通
    else {
      createScriptUrlElements([scriptUrl]);
    }
  }

  // IconFont
  const IconFont = React.forwardRef<HTMLSpanElement, IconFontProps<T>>(
    (props, ref) => {
      // props
      const { type, children, ...restProps } = props;

      // children > type
      let content: React.ReactNode = null;

      // type
      if (props.type) {
        content = <use xlinkHref={`#${type}`} />;
      }

      // 子节点
      if (children) {
        content = children;
      }

      return (
        <IconBase {...extraCommonProps} {...restProps} ref={ref}>
          {content}
        </IconBase>
      );
    }
  );

  IconFont.displayName = "IconFont";

  return IconFont;
}
