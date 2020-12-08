import React, { useEffect, useState } from 'react';
import { superTool } from '~/utils';
import { paths } from '../routes.config';
import Codebox from '~/components/SuperCodeInput';

const List = () => {
  const [state, setstate] = useState<string[]>([]);
  return (
    <div>
      <div>{state}</div>
      <Codebox
        validator={(input, index) => {
          return /\d/.test(input);
        }}
        onChange={(codeArray) => {
          setstate(codeArray);
        }}
      />
    </div>
  );
};

export default List;
