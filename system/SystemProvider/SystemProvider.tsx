import * as React from 'react';

import { SystemContext, TypeSystemContext } from './SystemContext';
import { useSystem } from './useSystem';

export type SystemProviderProps = { children: React.ReactNode } & Partial<TypeSystemContext>;

export const SystemProvider = (props: SystemProviderProps) => {
  const prevSystem = useSystem();
  const { children, isDisabled = prevSystem.isDisabled } = props;

  const value = React.useMemo<TypeSystemContext>(
    () => ({
      isDisabled,
    }),
    [isDisabled]
  );

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
};
