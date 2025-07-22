import { type FC, useState, useEffect, useMemo, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Button, Text, Progress } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { translations } from '@/constants/translations';

import { Heading } from '@/uikit/Heading';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import type { PaginationResponse } from '@/interfaces';
import type { ConsumptionUnit } from '@/interfaces/endpoints';
import type { ConsumptionUnitTabPanelFields } from '@/pages/Search/interfaces';

interface ConsumptionUnitTabProps {
  searchFields: ConsumptionUnitTabPanelFields | undefined;
}

const consumptionUnitsColumns: Array<ColumnDef<ConsumptionUnit>> = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Heading size='lg'>{translations['consumptionUnitId']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <Heading size='lg'>{translations['userName']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'consumptionUnitNumber',
    accessorKey: 'consumptionUnitNumber',
    header: () => <Heading size='lg'>{translations['consumptionUnitNumber']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'area',
    accessorKey: 'area',
    header: () => <Heading size='lg'>{translations['area']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<number>()}</TableCell>,
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
    id: 'propertyNumber',
    accessorKey: 'propertyNumber',
    header: () => <Heading size='lg'>{translations['propertyNumber']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'block',
    accessorKey: 'block',
    header: () => <Heading size='lg'>{translations['block']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'staircase',
    accessorKey: 'staircase',
    header: () => <Heading size='lg'>{translations['staircase']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'floor',
    accessorKey: 'floor',
    header: () => <Heading size='lg'>{translations['floor']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'door',
    accessorKey: 'door',
    header: () => <Heading size='lg'>{translations['door']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
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
        <Link to={`/new-property/${row.original.propertyNumber}/${row.original.id}`}>
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

export const ConsumptionUnitTab: FC<ConsumptionUnitTabProps> = ({ searchFields }) => {
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
    PaginationResponse<ConsumptionUnit>,
    Error
  >({
    queryKey: ['consuption_units', `pageNum.${pageIndex + 1}`],
    queryFn: async () =>
      fetch(`${API_URL}/consumptionunits?pageNum=${pageIndex + 1}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          migrationStatuses: [31, 200, 300, 401, 402, 403, 411, 421, 900, 950],
          ...searchFields,
        }),
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
          columns={consumptionUnitsColumns}
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
