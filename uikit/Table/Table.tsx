import { type JSX, type ReactElement, Fragment } from 'react';

import { clsx } from 'clsx';

import { Button, NumberInput, NumberInputField } from '@chakra-ui/react';
import {
  type ColumnDef,
  type Row,
  type PaginationState,
  type OnChangeFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import styles from './Table.module.pcss';

interface TableProps<TData> {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  pageCount?: number;
  pagination?: PaginationState;
  paginationDisabled?: boolean;
  onPaginationChange?: OnChangeFn<PaginationState>;
  renderSubComponent?: (props: { row: Row<TData> }) => ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  className?: string;
}

export const Table = <T extends object>({
  data,
  columns,
  pageCount,
  pagination,
  paginationDisabled,
  onPaginationChange,
  renderSubComponent,
  getRowCanExpand,
  className,
}: TableProps<T>): JSX.Element => {
  const table = useReactTable<T>({
    data,
    columns,
    ...(pagination !== undefined && {
      state: {
        pagination,
      },
      onPaginationChange,
      pageCount,
      manualPagination: true,
    }),
    getRowCanExpand: getRowCanExpand ?? (() => false),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={clsx(styles.table, className)}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.th}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr className={styles.trow}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>

                {row.getIsExpanded() && renderSubComponent !== undefined && (
                  <tr>
                    <td colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>

          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      {pagination !== undefined && pageCount !== undefined && (
        <div className='my-4 flex w-full items-center justify-center'>
          <Button
            size='lg'
            fontSize='5xl'
            marginX='1'
            isDisabled={paginationDisabled === true || !table.getCanPreviousPage()}
            onClick={() => {
              table.setPageIndex(0);
            }}
          >
            {'<<'}
          </Button>

          <Button
            size='lg'
            fontSize='5xl'
            marginX='1'
            isDisabled={paginationDisabled === true || !table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
          >
            {'<'}
          </Button>

          <NumberInput
            min={0}
            max={pageCount}
            marginX='2'
            value={pagination.pageIndex + 1}
            onChange={(value) => {
              table.setPageIndex(Number(value) - 1);
            }}
          >
            <NumberInputField
              fontSize='3xl'
              width='8rem'
              height='3rem'
            />
          </NumberInput>

          <Button
            size='lg'
            fontSize='5xl'
            marginX='1'
            isDisabled={paginationDisabled === true || !table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
          >
            {'>'}
          </Button>

          <Button
            size='lg'
            fontSize='5xl'
            marginX='1'
            isDisabled={paginationDisabled === true || !table.getCanNextPage()}
            onClick={() => {
              table.setPageIndex(table.getPageCount());
            }}
          >
            {'>>'}
          </Button>
        </div>
      )}
    </>
  );
};
