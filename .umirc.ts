// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';
import path from 'path';

const libPath = path.resolve(__dirname, './src');
const iconsPath = path.resolve(__dirname, './src/icons');

export default defineConfig({
  title: 'Ant Design icons',
  favicon: 'https://avatars.githubusercontent.com/u/121840434?s=200&v=4',
  logo: 'https://avatars.githubusercontent.com/u/121840434?s=200&v=4',
  outputPath: '.doc',
  exportStatic: {},
  styles: [
    `
      .markdown table {
        width: auto !important;
      }
    `,
  ],
  alias: {
    'ireact-material-icons/lib': libPath,
    'ireact-material-icons': iconsPath,
  },
});
