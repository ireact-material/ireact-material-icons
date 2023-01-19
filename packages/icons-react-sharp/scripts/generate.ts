import { Sharp } from "@ireact-material-icons/svg";
import { template } from "lodash";
import { promisify } from "util";
import type { IconDefinition } from "@ireact-material-icons/svg/lib/types";

import * as fs from "fs";
import * as path from "path";

// 模版代码
import { iconsIndex, iconsTemplate } from "./code";

// type

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
	fn: (iconDef: IconDefinitionWithIdentifier) => Promise<T>,
) {
	// 遍历所有 Sharp 图标
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
		}),
	);
}

// 生成图标 索引
async function generateIconIndex(icons: Object, name: string) {
	const entryText = Object.keys(icons)
		.sort()
		.map(
			(svgIdentifier) =>
				`export { default as ${svgIdentifier} } from './${svgIdentifier}';`,
		)
		.join("\n");

	// 添加入口文件
	await promisify(fs.appendFile)(
		path.resolve(__dirname, `../src/${name}/index.tsx`),
		iconsIndex(entryText).trim(),
	);
}

async function generateIcons() {
	// 创建文件
	try {
		await promisify(fs.access)(path.join(__dirname, "../src/icons"));
	} catch (err) {
		await promisify(fs.mkdir)(path.join(__dirname, "../src/icons"));
	}

	const render = template(iconsTemplate.trim());

	// Sharp
	await walk(Sharp, "sharp", async ({ svgIdentifier, fatherPath }) => {
		// 生成图标文件
		await writeFile(
			path.resolve(__dirname, `../src/icons/${svgIdentifier}.tsx`),
			// 写入模版
			render({ svgIdentifier, fatherPath }),
		);
	});

	// 生成图标索引
	generateIconIndex(Sharp, "icons");
}

// 生成icon图标
generateIcons();
