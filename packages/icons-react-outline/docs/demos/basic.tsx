import * as React from "react";
import { AbcOutline, AcUnitOutline } from "../../src";

const Basic = () => (
	<div>
		<AbcOutline onMouseDown={() => console.log("mouse down")} />
		<AcUnitOutline onClick={() => console.log("click")} />
	</div>
);

export default Basic;
