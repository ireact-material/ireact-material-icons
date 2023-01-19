import * as React from "react";
import { Abc, AcUnit } from "../../src";

const Basic = () => (
	<div>
		<Abc onMouseDown={() => console.log("mouse down")} />
		<AcUnit onClick={() => console.log("click")} />
	</div>
);

export default Basic;
