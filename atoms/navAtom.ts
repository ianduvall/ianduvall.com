import { atom, useAtom } from 'jotai';
import React from 'react';

type NavAtomState = 'closed' | 'open';

export const navAtom = atom<NavAtomState>('closed');

export const useOpenNav = () => {
  const [, setNav] = useAtom(navAtom);

  return React.useCallback(() => setNav('open'), [setNav]);
};

export const useCloseNav = () => {
  const [, setNav] = useAtom(navAtom);

  return React.useCallback(() => setNav('closed'), [setNav]);
};
