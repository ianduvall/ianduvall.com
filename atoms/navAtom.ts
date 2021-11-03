import { atom } from 'jotai';

type NavAtomState = 'closed' | 'open';

export const navAtom = atom<NavAtomState>('closed');
