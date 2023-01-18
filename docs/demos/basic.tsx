import * as React from 'react';
import {
  AbcBaseline,
  AcUnitBaseline
} from '../../src';

const Basic = () => (
  <div>
    <AbcBaseline onMouseDown={() => console.log('mouse down')} />
    <AcUnitBaseline onClick={() => console.log('click')} />
  </div>
);

export default Basic;
