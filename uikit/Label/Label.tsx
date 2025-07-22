import type { FC } from 'react';

import { clsx } from 'clsx';

import styles from './Label.module.pcss';

interface LabelProps {
  percentage: number;
  text: string;
}

export const Label: FC<LabelProps> = ({ percentage = 0, text }) => (
  <div
    className={clsx(styles.label, {
      [styles.green!]: percentage > 80,
      [styles.yellow!]: percentage >= 10 && percentage <= 80,
      [styles.red!]: percentage < 10,
    })}
  >
    <p className={styles.text}>{text}</p>

    <div className={styles.percentage}>{percentage} %</div>
  </div>
);
