import * as React from "react";
import { AbcBaseline, createFromIconFont } from "../../src/index";
import IconContext from "../../src/components/Context";

const IconFont = createFromIconFont({
	scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const Basic = () => {
	const rootClassName = React.useMemo(() => ({ rootClassName: "hashCls" }), []);

	return (
		<IconContext.Provider value={rootClassName}>
			<AbcBaseline />
			<IconFont type="icon-tuichu" />
		</IconContext.Provider>
	);
};

export default Basic;
