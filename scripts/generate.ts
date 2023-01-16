import * as allIconDefs from "ireact-material-icon-svg";
import { IconDefinition } from "ireact-material-icon-svg/es/types";
import { template } from "lodash";
import { promisify } from "util";

import * as fs from "fs";
import * as path from "path";

// 模版代码
import { iconsIndex, iconsTemplate } from "./code";

// type

// 图标定义与标识符
interface IconDefinitionWithIdentifier extends IconDefinition {
  svgIdentifier: string;
}

// 写入文件
const writeFile = promisify(fs.writeFile);

// walk
function walk<T>(fn: (iconDef: IconDefinitionWithIdentifier) => Promise<T>) {
  // 遍历所有图标
  return Promise.all(
    Object.keys(allIconDefs).map((svgIdentifier) => {
      const iconDef = (allIconDefs as { [id: string]: IconDefinition })[
        svgIdentifier
      ];

      return fn({ svgIdentifier, ...iconDef });
    })
  );
}

async function generateIcons() {
  const iconsDir = path.join(__dirname, "../src/icons");

  // 创建文件
  try {
    await promisify(fs.access)(iconsDir);
  } catch (err) {
    await promisify(fs.mkdir)(iconsDir);
  }

  const render = template(iconsTemplate.trim());

  await walk(async ({ svgIdentifier }) => {
    // 生成图标文件
    await writeFile(
      path.resolve(__dirname, `../src/icons/${svgIdentifier}.tsx`),
      // 写入模版
      render({ svgIdentifier })
    );
  });

  // 生成图标索引
  const entryText = Object.keys(allIconDefs)
    .sort()
    .map((svgIdentifier) => {
      return `export { default as ${svgIdentifier} } from './${svgIdentifier}';`;
    })
    .join("\n");

    console.log('entryText', entryText)
  // 添加入口文件
  await promisify(fs.appendFile)(
    path.resolve(__dirname, "../src/icons/index.tsx"),
    iconsIndex(entryText).trim()
  );
}

// 生成icon图标
generateIcons();
