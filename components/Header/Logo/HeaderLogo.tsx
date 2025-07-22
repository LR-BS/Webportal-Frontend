import type { FC } from 'react';

import { clsx } from 'clsx';

import { Link } from 'react-router-dom';

import { BaseIcon } from '@/components/BaseIcon';

import LogoUrl from '@/assets/img/logo.png';

import styles from './HeaderLogo.module.pcss';

interface HeaderLogoProps {
  href?: string | undefined;
  className?: string | undefined;
  imageClassName?: string | undefined;
}

export const HeaderLogo: FC<HeaderLogoProps> = ({ className, href, imageClassName }) => (
  <div className={clsx(styles.logo, className)}>
    <Link
      className={styles.logoLink}
      to={href ?? ''}
    >
      <BaseIcon className={clsx(styles.logoImage, imageClassName)}>
        <img
          src={LogoUrl}
          alt='Logo'
        />
      </BaseIcon>
    </Link>
  </div>
);
