import { IdProvider } from '@radix-ui/react-id';

import { SystemProvider, ThemeProvider } from '@/system';
import React from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <SystemProvider>
    <ThemeProvider>
      <IdProvider>{children}</IdProvider>
    </ThemeProvider>
  </SystemProvider>
);
