import type { FC } from 'react';

import { clsx } from 'clsx';

import { translations } from '@/constants/translations';

import { NavItem } from './NavItem';

import styles from './Nav.module.pcss';

import type { NavRoute } from '@/constants/routes';

export interface NavProps {
  navList: NavRoute[];
  className?: string;
}

export const Nav: FC<NavProps> = ({ navList, className }) => (
  <nav className={clsx(styles.nav, className)}>
    {navList.map(({ id, href, text }) => (
      <NavItem
        key={id}
        id={id}
        href={href}
        text={translations[text]!}
      />
    ))}
  </nav>
);
