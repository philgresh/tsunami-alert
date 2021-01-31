import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * Performs deep comparison on dependencies for useEffect.
 * @link https://medium.com/better-programming/how-to-use-the-react-hook-usedeepeffect-815818c0ad9d
 *
 * @param {Function} effectFunc - Effect function to be passed in.
 * @param {Array} deps - Dependencies.
 */
function useDeepEffect(effectFunc, deps) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index]),
    );

    if (isFirst.current || !isSame) {
      effectFunc();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
}

export default useDeepEffect;
