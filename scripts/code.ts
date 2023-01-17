export const iconsTemplate = `
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import <%= svgIdentifier %>Svg from 'ireact-material-icons-svg/lib/asn/<%= fatherPath %>/<%= svgIdentifier %>';
import IReactMaterialIcon, { IReactMaterialIconProps } from '../../components/IReactMaterialIcon';

const <%= svgIdentifier %> = (
  props: IReactMaterialIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <IReactMaterialIcon {...props} ref={ref} icon={<%= svgIdentifier %>Svg} />;

<%= svgIdentifier %>.displayName = '<%= svgIdentifier %>';
export default React.forwardRef<HTMLSpanElement, IReactMaterialIconProps>(<%= svgIdentifier %>);
`;

export const iconsIndex = (entryText: string) => {
  return `
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

${entryText}
  `;
};
