import { useMemo } from 'react';
import { parseModuleAndActionFromTitle } from '../track';

export const useModuleExposeParams = (title) => {
  const moduleExposeParam = useMemo(() => {
    const { moduleName } = parseModuleAndActionFromTitle(title);
    return JSON.stringify([
      {
        triggerTime: 'SHOW',
        action: 'OP_ACTIVITY_MODULE',
        params: {
          action_name: moduleName,
        },
      },
    ]);
  }, [title]);

  return moduleExposeParam;
};
