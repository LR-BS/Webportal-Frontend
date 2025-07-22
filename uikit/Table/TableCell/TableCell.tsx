import { type FC, type ReactNode } from 'react';

import { clsx } from 'clsx';

import styles from './TableCell.module.pcss';

interface TableCellProps {
  className?: string;
  children: ReactNode | undefined;
}

export const TableCell: FC<TableCellProps> = ({ className, children }) => (
  <div className={clsx(styles.tableCell, className)}>{children ?? '-'}</div>
);
