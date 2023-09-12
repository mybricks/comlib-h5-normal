import { back, close, openPage, share } from '../event';
import { EVT_TYPE } from './const';

export default ({ env, logger, jumpUrl, evtType, customHandler }) => {
  const { yoda } = env || {};
  switch (evtType) {
    case EVT_TYPE.BACK: {
      back(yoda);
      break;
    }
    case EVT_TYPE.CLOSE: {
      close(yoda);
      break;
    }
    case EVT_TYPE.JUMP: {
      openPage(jumpUrl, yoda, true);
      break;
    }
    case EVT_TYPE.SHARE: {
      share(env, logger, {}, () => {});
      break;
    }
    case EVT_TYPE.CUSTOM: {
      typeof customHandler === 'function' && customHandler();
      break;
    }
    case EVT_TYPE.NONE: {
      break;
    }
    default: {
      typeof customHandler === 'function' && customHandler();
    }
  }
};
