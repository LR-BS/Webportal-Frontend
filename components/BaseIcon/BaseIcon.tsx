import type { FC, ReactNode, MouseEventHandler, DetailedHTMLProps, HTMLAttributes } from 'react';

import { clsx } from 'clsx';

import styles from './BaseIcon.module.pcss';

export interface BaseIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  onClick?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
}

export const BaseIcon: FC<BaseIconProps> = ({ onClick, children, className, ...restProps }) => (
  <i
    className={clsx(
      styles.iconBody,
      {
        [styles.iconClickable!]: Boolean(onClick),
      },
      className,
    )}
    {...restProps}
    role='presentation'
    onClick={onClick}
  >
    {children}
  </i>
);
