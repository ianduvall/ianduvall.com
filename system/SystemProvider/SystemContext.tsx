import * as React from 'react';

export type TypeSystemContext = {
  isDisabled?: boolean;
};

export const SystemContext = React.createContext<TypeSystemContext>({});
