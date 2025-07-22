import type { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';

import styles from './HeaderLayout.module.pcss';

export const HeaderLayout: FC = () => (
  <div className={styles.headerLayout}>
    <Header />

    <Outlet />
  </div>
);
