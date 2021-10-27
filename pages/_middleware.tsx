import type { NextFetchEvent, NextRequest } from 'next/server';

export const middleware = (
  req: NextRequest,
  ev: NextFetchEvent
): Promise<Response | undefined> | Response | undefined => {
  return;
};
