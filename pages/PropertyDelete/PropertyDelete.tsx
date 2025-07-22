import { type FC, useMemo, useContext } from 'react';

import { Button, Text } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { fullDateOptions } from '@/constants';
import { translations } from '@/constants/translations';
import { formatDateString } from '@/utils';

import { Heading } from '@/uikit/Heading';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import styles from './PropertyDelete.module.pcss';

import type { PropertyDelete } from '@/interfaces/endpoints';

export const PropertyDeletePage: FC = () => {
  const queryClient = useQueryClient();
  const API_URL = useContext(ApiUrlContext);

  const { isLoading, isError, error, data } = useQuery<PropertyDelete[], Error>({
    queryKey: ['properties_delete'],
    queryFn: async () =>
      fetch(`${API_URL}/properties/deleterequests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }).then(async (res) => {
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

  const applyAllChanges = useMutation({
    mutationFn: async (propertyUUID: string) => {
      return fetch(`${API_URL}/properties/deleterequests?propertyUUID=${propertyUUID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['properties_delete'] }),
  });

  const propertyDeleteColumns = useMemo<Array<ColumnDef<PropertyDelete>>>(
    () => [
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
        id: 'partnerCode',
        accessorKey: 'partnerCode',
        header: () => <Heading size='lg'>{translations['partnerCode']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'startDate',
        accessorKey: 'startDate',
        header: () => <Heading size='lg'>{translations['startDate']}</Heading>,
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
        id: 'migrationStatus',
        accessorKey: 'migrationStatus',
        header: () => <Heading size='lg'>{translations['migrationStatus']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'button',
        header: () => <Heading size='lg'>{translations['applyAllChanges']}</Heading>,
        cell: ({ row }) => (
          <TableCell>
            <Button
              size='lg'
              fontSize='2xl'
              paddingY='2rem'
              paddingX='5rem'
              color='white'
              bgColor='blue.700'
              _hover={{
                bg: 'blue.800',
              }}
              onClick={() => {
                applyAllChanges.mutate(row.original.id);
              }}
            >
              {translations['applyAllChanges']}
            </Button>
          </TableCell>
        ),
      },
    ],
    [applyAllChanges],
  );

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
    <div className={styles.propertyDeletePage}>
      <Heading
        size='2xl'
        className={styles.title}
      >
        {translations['existingProperties']}
      </Heading>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table
            data={data}
            columns={propertyDeleteColumns}
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
    </div>
  );
};
