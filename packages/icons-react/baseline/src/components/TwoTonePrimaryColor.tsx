import { normalizeTwoToneColors } from "../utils";
import Icon from "./IconBase";

// type
export type TwoToneColor = string | [string, string];

// 获取双色颜色
export function getTwoToneColor(): TwoToneColor {
	const colors = Icon.getTwoToneColors();

	// 没有计算标记
	if (!colors.calculated) {
		return colors.primaryColor;
	}

	// 双色
	return [colors.primaryColor, colors.secondaryColor];
}

// 设置双色
export function setTwoToneColor(twoToneColor: TwoToneColor): void {
	const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

	return Icon.setTwoToneColors({
		primaryColor,
		secondaryColor,
	});
}
