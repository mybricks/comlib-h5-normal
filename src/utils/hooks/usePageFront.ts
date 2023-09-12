import React, { useRef, useState, useEffect, useCallback } from 'react';
import { isAndroid } from '@fangzhou/utils';
import useYodaEvent from './useYodaEvent';

export default (callback, yoda) => {
  useYodaEvent(
    'native_reentry',
    () => {
      callback();
    },
    yoda,
  );

  useYodaEvent(
    'native_foreground',
    () => {
      isAndroid && callback();
    },
    yoda,
  );
};
