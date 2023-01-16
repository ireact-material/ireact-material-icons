export const iconsTemplate = `
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import <%= svgIdentifier %>Svg from 'ireact-material-icons-svg/lib/asn/<%= svgIdentifier %>';
import IReactMaterialIcons, { IReactMaterialIconsProps } from '../components/IReactMaterialIcons';

const <%= svgIdentifier %> = (
  props: IReactMaterialIconsProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <IReactMaterialIcons {...props} ref={ref} icon={<%= svgIdentifier %>Svg} />;

<%= svgIdentifier %>.displayName = '<%= svgIdentifier %>';
export default React.forwardRef<HTMLSpanElement, IReactMaterialIconsProps>(<%= svgIdentifier %>);
`;

export const iconsIndex = (entryText: string) => {
  return `
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

${entryText}
  `;
};
