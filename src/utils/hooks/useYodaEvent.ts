import React, { useRef, useState, useEffect, useCallback } from 'react';

export default (name, callback, yoda) => {
  const callbackRef = useRef(() => {});

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const eventHandle = (...args) => {
      typeof callbackRef.current === 'function' && callbackRef.current(...args);
    };
    yoda?.ready().then(() => {
      yoda?.Kwai?.on(
        {
          type: name,
          handler: eventHandle,
        },
        (res) => {
          if (res.result !== 1) {
            console.error('failed: ', JSON.stringify(res));
          } else {
            console.log('success: ', JSON.stringify(res));
          }
        },
      );
    });

    return () => {
      yoda?.Kwai?.off(
        {
          type: name,
          handler: eventHandle,
        },
        (res) => {
          if (res.result !== 1) {
            console.error('failed: ', JSON.stringify(res));
          } else {
            console.log('success: ', JSON.stringify(res));
          }
        },
      );
    };
  }, [name, yoda]);
};
