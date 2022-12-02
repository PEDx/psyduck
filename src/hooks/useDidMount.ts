/**
 * 组件挂载时调用，且只会调用一次
 */

import { useEffect } from 'react';

export default (callback: (...args: any) => any) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};
