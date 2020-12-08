import React, { useState } from 'react';
import { superTool } from '~/utils';
import { paths } from '../routes.config';
import Codebox from '~/components/SuperCodeInput';

const List = () => {
  const [state, setstate] = useState<string[]>([]);
  return (
    <div>
      <div>{state}</div>
      <Codebox onChange={(v) => setstate(v)}>111</Codebox>
    </div>
  );
};

export default List;
