import {
  Baseline,
  Outline,
  Round,
  Sharp,
  TwoTone,
} from "ireact-material-icons-svg";

import * as AllIconDefs from "ireact-material-icons-svg";

import { camelCase, template } from "lodash";
import { promisify } from "util";

import * as fs from "fs";
import * as path from "path";

// 模版代码
import { iconsIndex, iconsTemplate } from "./code";

// type
import type { IconDefinition } from "ireact-material-icons-svg/lib/types";

// 图标定义与标识符
interface IconDefinitionWithIdentifier extends IconDefinition {
  svgIdentifier: string;
  fatherPath: string;
}

// 写入文件
const writeFile = promisify(fs.writeFile);

// walk
function walk<T>(
  iconDefs,
  fatherPath,
  fn: (iconDef: IconDefinitionWithIdentifier) => Promise<T>
) {
  // 遍历所有 Baseline 图标
  return Promise.all(
    Object.keys(iconDefs).map((svgIdentifier) => {
      const iconDef = (iconDefs as { [id: string]: IconDefinition })[
        svgIdentifier
      ];

      return fn({
        svgIdentifier,
        fatherPath,
        ...iconDef,
      });
    })
  );
}

// 生成图标 索引
async function generateIconIndex(icons: Object, name: string) {
  const entryText = Object.keys(icons)
    .sort()
    .map((svgIdentifier) => {
      return `export { default as ${svgIdentifier} } from './${svgIdentifier}';`;
    })
    .join("\n");

  // 添加入口文件
  await promisify(fs.appendFile)(
    path.resolve(__dirname, `../src/icons/${name}/index.tsx`),
    iconsIndex(entryText).trim()
  );
}

async function generateIcons() {
  let dirList = ["baseline", "outline", "round", "sharp", "twotone"];

  // 创建文件
  try {
    await promisify(fs.access)(path.join(__dirname, "../src/icons"));

    dirList.forEach(async (dir) => {
      await promisify(fs.access)(path.join(__dirname, `../src/icons/${dir}`));
    });
  } catch (err) {
    await promisify(fs.mkdir)(path.join(__dirname, "../src/icons"));

    dirList.forEach(async (dir) => {
      await promisify(fs.mkdir)(path.join(__dirname, `../src/icons/${dir}`));
    });
  }

  const render = template(iconsTemplate.trim());

  // Baseline
  await walk(Baseline, "baseline", async ({ svgIdentifier, fatherPath }) => {
    // 生成图标文件
    await writeFile(
      path.resolve(__dirname, `../src/icons/baseline/${svgIdentifier}.tsx`),
      // 写入模版
      render({ svgIdentifier, fatherPath })
    );
  });

  // Outline
  await walk(Outline, "outline", async ({ svgIdentifier, fatherPath }) => {
    // 生成图标文件
    await writeFile(
      path.resolve(__dirname, `../src/icons/outline/${svgIdentifier}.tsx`),
      // 写入模版
      render({ svgIdentifier, fatherPath })
    );
  });

  // Round
  await walk(Round, "round", async ({ svgIdentifier, fatherPath }) => {
    // 生成图标文件
    await writeFile(
      path.resolve(__dirname, `../src/icons/round/${svgIdentifier}.tsx`),
      // 写入模版
      render({ svgIdentifier, fatherPath })
    );
  });

  // Sharp
  await walk(Sharp, "sharp", async ({ svgIdentifier, fatherPath }) => {
    // 生成图标文件
    await writeFile(
      path.resolve(__dirname, `../src/icons/sharp/${svgIdentifier}.tsx`),
      // 写入模版
      render({ svgIdentifier, fatherPath })
    );
  });

  // TwoTone
  await walk(TwoTone, "twotone", async ({ svgIdentifier, fatherPath }) => {
    // 生成图标文件
    await writeFile(
      path.resolve(__dirname, `../src/icons/twotone/${svgIdentifier}.tsx`),
      // 写入模版
      render({ svgIdentifier, fatherPath })
    );
  });

  // 生成图标索引
  generateIconIndex(Baseline, "baseline");
  generateIconIndex(Outline, "outline");
  generateIconIndex(Round, "round");
  generateIconIndex(Sharp, "sharp");
  generateIconIndex(TwoTone, "twotone");

  // 生成所有图标索引
  const indexText = Object.keys(AllIconDefs)
    .sort()
    .map((svgIdentifier) => {
      return `export * as ${svgIdentifier} from './${camelCase(svgIdentifier)}';
export * from './${camelCase(svgIdentifier)}';
      `;
    })
    .join("\n");

  // 添加入口文件
  await promisify(fs.appendFile)(
    path.resolve(__dirname, "../src/icons/index.tsx"),
    iconsIndex(indexText).trim()
  );
}

// 生成icon图标
generateIcons();
