import { type FC, useMemo, useState, useEffect, useContext } from 'react';

import { Text, Progress } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { fullDateOptions } from '@/constants';
import { translations } from '@/constants/translations';
import { formatDateString } from '@/utils';

import { Heading } from '@/uikit/Heading';
import { Label } from '@/uikit/Label';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import styles from './StatisticsExistingProperties.module.pcss';

import type { PaginationResponse } from '@/interfaces';
import type { StatisticsProperty } from '@/interfaces/endpoints';

const existingPropertiesColumns: Array<ColumnDef<StatisticsProperty>> = [
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
    id: 'activeDevicesCount',
    accessorKey: 'activeDevicesCount',
    header: () => <Heading size='lg'>{translations['numberOfInstalledDevices']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<number>()}</TableCell>,
  },
  {
    id: 'receivedConsumptionsPercentage',
    accessorKey: 'receivedConsumptionsPercentage',
    header: () => <Heading size='lg'>{translations['consumptionUnitDataStatus']}</Heading>,
    cell: ({ getValue }) => (
      <TableCell>
        <Label
          text={translations['consumptionData']!}
          percentage={getValue<number>()}
        />
      </TableCell>
    ),
  },
  {
    id: 'lastConsumptionReceivedDate',
    accessorKey: 'lastConsumptionReceivedDate',
    header: () => <Heading size='lg'>{translations['lastConsumptionReceivedDate']}</Heading>,
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
];

export const StatisticsExistingPropertiesPage: FC = () => {
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
    PaginationResponse<StatisticsProperty>,
    Error
  >({
    queryKey: ['statistics_existing_properties', `pageNum.${pageIndex + 1}`],
    queryFn: async () =>
      fetch(`${API_URL}/properties/statistics/existing?pageNum=${pageIndex + 1}`, {
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

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await refetch();
    };

    void fetchData();
  }, [pageIndex, refetch]);

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
    <div className={styles.statisticsExistingPropertiesPage}>
      <Heading
        size='2xl'
        className={styles.title}
      >
        Statusübersicht der Verbrauchsdaten für Bestandsanlagen
      </Heading>

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
          columns={existingPropertiesColumns}
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
    </div>
  );
};
