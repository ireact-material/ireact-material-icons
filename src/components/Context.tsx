import { createContext } from "react";

// icon 全局 props
export interface IconContextProps {
	prefixCls?: string;
	rootClassName?: string;
	csp?: { nonce?: string };
}

// context
const IconContext = createContext<IconContextProps>({});

export default IconContext;
