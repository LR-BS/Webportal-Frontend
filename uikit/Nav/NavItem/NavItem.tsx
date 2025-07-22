import type { FC } from 'react';

import { clsx } from 'clsx';

import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.pcss';

import type { NavRoute } from '@/constants/routes';

export const NavItem: FC<NavRoute> = ({ href, text }) => {
  return (
    <div className={styles.navItem}>
      <NavLink
        to={`/${href}`}
        className={({ isActive, isPending }) => {
          if (isActive) {
            return clsx(styles.navLink, styles.active);
          }

          if (isPending) {
            return clsx(styles.navLink, 'pending');
          }

          return styles.navLink;
        }}
      >
        {text}
      </NavLink>
    </div>
  );
};
