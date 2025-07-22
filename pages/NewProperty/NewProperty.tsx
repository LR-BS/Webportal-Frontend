import { type FC, useContext } from 'react';

import { Link, Outlet } from 'react-router-dom';

import { Button, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { fullDateOptions } from '@/constants';
import { translations } from '@/constants/translations';
import { formatDateString } from '@/utils';

import { Heading } from '@/uikit/Heading';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import styles from './NewProperty.module.pcss';

import type { NewProperty } from '@/interfaces/endpoints';

const newPropertyColumns: Array<ColumnDef<NewProperty>> = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Heading size='lg'>{translations['id']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'propertyNumber',
    accessorKey: 'propertyNumber',
    header: () => <Heading size='lg'>{translations['propertyNumber']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: () => <Heading size='lg'>{translations['address']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'importDate',
    accessorKey: 'importDate',
    header: () => <Heading size='lg'>{translations['importDate']}</Heading>,
    cell: ({ getValue }) => {
      if (getValue<string | null>() === null) {
        return <TableCell>{undefined}</TableCell>;
      }

      return (
        <TableCell>
          {formatDateString(new Date(getValue<string>()), fullDateOptions, '/')}
        </TableCell>
      );
    },
  },
  {
    id: 'button',
    header: () => <Heading size='lg'>{translations['action']}</Heading>,
    cell: ({ row }) => (
      <TableCell>
        <Link to={row.original.propertyNumber ?? ''}>
          <Button
            size='lg'
            fontSize='2xl'
            paddingY='2rem'
            color='white'
            bgColor='yellow.550'
            _hover={{
              bg: 'yellow.600',
            }}
          >
            {translations['editMasterData']}
          </Button>
        </Link>
      </TableCell>
    ),
  },
];

export const NewPropertyPage: FC = () => {
  const API_URL = useContext(ApiUrlContext);

  const { isLoading, isError, error, data } = useQuery<NewProperty[], Error>({
    queryKey: ['new_properties'],
    queryFn: async () =>
      fetch(`${API_URL}/properties/new`).then(async (res) => {
        if (res.status === 500) {
          const errormessage = await res.text();

          throw new Error(errormessage);
        }

        if (res.status === 200) {
          return res.json();
        }
      }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isError) {
    return (
      <Text
        marginY='2rem'
        fontSize='4xl'
        textAlign='center'
      >
        {error.message}
      </Text>
    );
  }

  return (
    <div className={styles.newPropertyPage}>
      <Heading
        size='2xl'
        className={styles.title}
      >
        Neuanlagen
      </Heading>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table
            data={data}
            columns={newPropertyColumns}
          />

          {data.length === 0 && (
            <Text
              marginY='2rem'
              fontSize='4xl'
              textAlign='center'
            >
              No data
            </Text>
          )}
        </>
      )}

      <Outlet />
    </div>
  );
};
