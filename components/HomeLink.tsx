import React from 'react';
import NextLink from 'next/link';
import { Link } from '@/system';

export const HomeLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextLink href="/" passHref>
      <Link variant="primary">{children}</Link>
    </NextLink>
  );
};
