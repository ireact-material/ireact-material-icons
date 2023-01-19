// more config: https://d.umijs.org/config
import { defineConfig } from "dumi";
import path from "path";

const libPath = path.resolve(__dirname, "./src");
const iconsPath = path.resolve(__dirname, "./src/icons");

export default defineConfig({
	outputPath: ".doc",
	exportStatic: {},
	styles: [
		`
      .markdown table {
        width: auto !important;
      }
    `,
	],
	alias: {
		"@ireact-material-icons/baseline/lib": libPath,
		"@ireact-material-icons/baseline": iconsPath,
	},
});
