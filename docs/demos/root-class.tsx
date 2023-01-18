import * as React from 'react';
import {
  AbcBaseline,
  createFromIconFont
} from '../../src';
import IconContext from '../../src/components/Context';

const IconFont = createFromIconFont({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const Basic = () => (
  <IconContext.Provider value={{rootClassName: 'hashCls'}}>
    <AbcBaseline />
    <IconFont type="icon-tuichu" />
  </IconContext.Provider>
);

export default Basic;
