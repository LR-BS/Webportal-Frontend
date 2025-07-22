import { type ReactNode, type DetailedHTMLProps, type HTMLAttributes, forwardRef } from 'react';

import { clsx } from 'clsx';

import styles from './Heading.module.pcss';

type HeadingSize = 'main' | '2xl' | '3xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingMap = Record<HeadingSize, HeadingType>;

const headingMap: HeadingMap = {
  main: 'h1',
  '3xl': 'h2',
  '2xl': 'h2',
  xl: 'h2',
  lg: 'h3',
  md: 'h3',
  sm: 'h4',
  xs: 'h4',
};

type HeadingClassType =
  | 'headingMain'
  | 'heading3xl'
  | 'heading2xl'
  | 'headingXl'
  | 'headingLg'
  | 'headingMd'
  | 'headingSm'
  | 'headingXs';

type HeadingClassMap = Record<HeadingSize, HeadingClassType>;

const headingClassMap: HeadingClassMap = {
  main: 'headingMain',
  '3xl': 'heading3xl',
  '2xl': 'heading2xl',
  xl: 'headingXl',
  lg: 'headingLg',
  md: 'headingMd',
  sm: 'headingSm',
  xs: 'headingXs',
};

interface HeadingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  size: HeadingSize;
  children: ReactNode;
  className?: string | undefined;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, children }, ref) => {
    const HeadingComponent = headingMap[size];

    return (
      <HeadingComponent
        className={clsx(styles.heading, styles[headingClassMap[size]], className)}
        ref={ref}
      >
        {children}
      </HeadingComponent>
    );
  },
);
