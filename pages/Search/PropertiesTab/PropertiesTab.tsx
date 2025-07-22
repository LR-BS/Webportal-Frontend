import { type FC, useState, useEffect, useMemo, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Button, Text, Progress } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { fullDateOptions } from '@/constants';
import { translations } from '@/constants/translations';
import { formatDateString } from '@/utils';

import { Heading } from '@/uikit/Heading';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import type { PaginationResponse } from '@/interfaces';
import type { Property } from '@/interfaces/endpoints';
import type { PropertiesTabPanelFields } from '@/pages/Search/interfaces';

interface PropertiesTabProps {
  searchFields: PropertiesTabPanelFields | undefined;
}

const propertiesColumns: Array<ColumnDef<Property>> = [
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
    id: 'postCode',
    accessorKey: 'postCode',
    header: () => <Heading size='lg'>{translations['postCode']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'city',
    accessorKey: 'city',
    header: () => <Heading size='lg'>{translations['shortCity']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'street',
    accessorKey: 'street',
    header: () => <Heading size='lg'>{translations['street']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'houseNumber',
    accessorKey: 'houseNumber',
    header: () => <Heading size='lg'>{translations['houseNumber']}</Heading>,
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
    cell: ({ getValue }) => <TableCell>{getValue<number>()}</TableCell>,
  },
  {
    id: 'button',
    header: () => <Heading size='lg'>{translations['action']}</Heading>,
    cell: ({ row }) => (
      <TableCell>
        <Link
          to={`/new-property/${row.original.propertyNumber ?? ''}`}
          state={{
            isNavigateFromSearch: true,
          }}
        >
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

export const PropertiesTab: FC<PropertiesTabProps> = ({ searchFields }) => {
  const API_URL = useContext(ApiUrlContext);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { isLoading, isError, error, data, refetch } = useQuery<
    PaginationResponse<Property>,
    Error
  >({
    queryKey: ['properties_existing', `pageNum.${pageIndex + 1}`],
    queryFn: async () =>
      fetch(`${API_URL}/properties/existing?pageNum=${pageIndex + 1}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...searchFields }),
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

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await refetch();
    };

    void fetchData();
  }, [pageIndex, searchFields, refetch]);

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
    <>
      {Boolean(isLoading) && (
        <Progress
          size='xs'
          isIndeterminate={true}
        />
      )}

      {data?.data !== undefined && (
        <Table
          className='w-full'
          data={data.data}
          columns={propertiesColumns}
          pageCount={Math.ceil(data.totalCount / pageSize)}
          pagination={pagination}
          paginationDisabled={isLoading}
          onPaginationChange={setPagination}
        />
      )}

      {data?.data?.length === 0 && (
        <Text
          marginY='2rem'
          fontSize='4xl'
          textAlign='center'
        >
          No data
        </Text>
      )}
    </>
  );
};
