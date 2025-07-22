import { type FC, useContext } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Text,
  AccordionPanel,
  Button,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { translations } from '@/constants/translations';

import { Heading } from '@/uikit/Heading';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import styles from './MigrationError.module.pcss';

import type { ConsumptionUnit, Device, Property, Tenant } from '@/interfaces/endpoints';

const mapMigrationStatus = (statusNumber: number): string => {
  switch (statusNumber) {
    case 10:
      return 'Not Set';

    case 20:
      return 'Done Enrichment';

    case 30:
      return 'Prepared for WP';

    case 31:
      return 'Edited';

    case 200:
      return 'Sent to WP';

    case 300:
      return 'Assigned to Partner';

    case 401:
      return 'Failed to Send to WP';

    case 402:
      return 'Failed to Assign to Partner';

    case 403:
      return 'Failed to Find Partner';

    case 411:
      return 'Failed to Update in WP';

    case 421:
      return 'Failed to Delete from WP';

    case 430:
      return 'DeviceCategory not found';

    case 900:
      return 'Requested to be Deleted';

    case 950:
      return 'Confirmed to be Deleted';

    default:
      // test
      return statusNumber.toString();
  }
};

const consumptionUnitColumns: Array<ColumnDef<ConsumptionUnit>> = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Heading size='lg'>ID</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <Heading size='lg'>Name</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'propertyNumber',
    accessorKey: 'Property.propertyNumber',
    header: () => <Heading size='lg'>Liegenschaftsnummer</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'migrationStatus',
    accessorKey: 'migrationStatus',
    header: () => <Heading size='lg'>Migrationsstatus</Heading>,
    cell: ({ getValue }) => <TableCell>{mapMigrationStatus(getValue<number>())}</TableCell>,
  },
];

const deviceColumns: Array<ColumnDef<Device>> = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Heading size='lg'>Geräte ID</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'consumptionUnitId',
    accessorKey: 'consumptionUnitId',
    header: () => <Heading size='lg'>Consumption Unit ID</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'propertyNumber',
    accessorKey: 'propertyNumber',
    header: () => <Heading size='lg'>Liegenschaftsnummer</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'serialNumber',
    accessorKey: 'serialNumber',
    header: () => <Heading size='lg'>Seriennummer</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'migrationStatus',
    accessorKey: 'migrationStatus',
    header: () => <Heading size='lg'>Migrationsstatus</Heading>,
    cell: ({ getValue }) => <TableCell>{mapMigrationStatus(getValue<number>())}</TableCell>,
  },
];

const tenantColumns: Array<ColumnDef<Tenant>> = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Heading size='lg'>Mieter ID</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'consumptionUnitId',
    accessorKey: 'consumptionUnitId',
    header: () => <Heading size='lg'>Consumption Unit ID</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <Heading size='lg'>Name</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'propertyNumber',
    accessorKey: 'propertyNumber',
    header: () => <Heading size='lg'>Liegenschaftsnummer</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'migrationStatus',
    accessorKey: 'migrationStatus',
    header: () => <Heading size='lg'>Migrationsstatus</Heading>,
    cell: ({ getValue }) => <TableCell>{mapMigrationStatus(getValue<number>())}</TableCell>,
  },
];

const propertyColumns: Array<ColumnDef<Property>> = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Heading size='lg'>Liegenschafts ID</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'propertyNumber',
    accessorKey: 'propertyNumber',
    header: () => <Heading size='lg'>Liegenschaftsnummer</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'externalCode',
    accessorKey: 'externalCode',
    header: () => <Heading size='lg'>Externer Code</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'postCode',
    accessorKey: 'postCode',
    header: () => <Heading size='lg'>Postleitzahl</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'city',
    accessorKey: 'city',
    header: () => <Heading size='lg'>Stadt</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'street',
    accessorKey: 'street',
    header: () => <Heading size='lg'>Straße</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'houseNumber',
    accessorKey: 'houseNumber',
    header: () => <Heading size='lg'>Hausnummer</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'partnerCode',
    accessorKey: 'partnerCode',
    header: () => <Heading size='lg'>Partnercode</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'migrationStatus',
    accessorKey: 'migrationStatus',
    header: () => <Heading size='lg'>Migrationsstatus</Heading>,
    cell: ({ getValue }) => <TableCell>{mapMigrationStatus(getValue<number>())}</TableCell>,
  },
];

export const MigrationErrorPage: FC = () => {
  const API_URL = useContext(ApiUrlContext);
  const {
    isLoading: isLoadingProperty,
    isError: isErrorProperty,
    error: errorProperty,
    data: propertiesData,
  } = useQuery<Property[], Error>({
    queryKey: ['properties-errors'],
    queryFn: async () =>
      fetch(`${API_URL}/errors/properties`).then(async (res) => {
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
  const {
    isLoading: isLoadingCU,
    isError: isErrorCU,
    error: errorCU,
    data: cuData,
  } = useQuery<ConsumptionUnit[], Error>({
    queryKey: ['cu-errors'],
    queryFn: async () =>
      fetch(`${API_URL}/errors/consumption-units`).then(async (res) => {
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
  const {
    isLoading: isLoadingDevice,
    isError: isErrorDevice,
    error: errorDevice,
    data: devicesData,
  } = useQuery<Device[], Error>({
    queryKey: ['devices-errors'],
    queryFn: async () =>
      fetch(`${API_URL}/errors/devices`).then(async (res) => {
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

  const {
    isLoading: isLoadingTenant,
    isError: isErrorTenant,
    error: errorTenant,
    data: tenantsData,
  } = useQuery<Tenant[], Error>({
    queryKey: ['tenants-errors'],
    queryFn: async () =>
      fetch(`${API_URL}/errors/tenants`).then(async (res) => {
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

  const removeMigrationStatusProperty = async (): Promise<void> => {
    await fetch(`${API_URL}/errors/properties`, {
      method: 'POST',
    });
  };

  const removeMigrationStatusConsumptionUnit = async (): Promise<void> => {
    await fetch(`${API_URL}/errors/consumption-units`, {
      method: 'POST',
    });
  };

  const removeMigrationStatusDevice = async (): Promise<void> => {
    await fetch(`${API_URL}/errors/devices`, {
      method: 'POST',
    });
  };

  const removeMigrationStatusTenant = async (): Promise<void> => {
    await fetch(`${API_URL}/errors/tenants`, {
      method: 'POST',
    });
  };

  if (isLoadingProperty || isLoadingDevice || isLoadingTenant || isLoadingCU) {
    return <div>Loading...</div>;
  }

  if (isErrorProperty) {
    return <div>Error: {errorProperty.message}</div>;
  }

  if (isErrorCU) {
    return <div>Error: {errorCU.message}</div>;
  }

  if (isErrorDevice) {
    return <div>Error: {errorDevice.message}</div>;
  }

  if (isErrorTenant) {
    return <div>Error: {errorTenant.message}</div>;
  }

  return (
    <div className={styles.migrationErrorPage}>
      <Heading
        size='2xl'
        className={styles.title}
      >
        {translations['migrationError']}
      </Heading>

      <Accordion allowMultiple={true}>
        <AccordionItem>
          <AccordionButton paddingY='2rem'>
            <AccordionIcon
              fontSize='5xl'
              color='green.500'
            />

            <Text
              fontSize='3xl'
              fontWeight='bold'
              color='green.500'
            >
              Liegenschaften
            </Text>
            <Button
              marginLeft='auto'
              colorScheme='teal'
              onClick={async () => {
                await removeMigrationStatusProperty();
              }}
            >
              Status Zurücksetzen
            </Button>
          </AccordionButton>
          <AccordionPanel>
            {propertiesData.length !== 0 && (
              <Table
                className='w-full'
                data={propertiesData}
                columns={propertyColumns}
              />
            )}

            {propertiesData.length === 0 && (
              <Text
                marginY='2rem'
                fontSize='4xl'
                textAlign='center'
              >
                No data
              </Text>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingY='2rem'>
            <AccordionIcon
              fontSize='5xl'
              color='green.500'
            />

            <Text
              fontSize='3xl'
              fontWeight='bold'
              color='green.500'
            >
              Consumption Units
            </Text>
            <Button
              marginLeft='auto'
              colorScheme='teal'
              onClick={async () => {
                await removeMigrationStatusConsumptionUnit();
              }}
            >
              Status Zurücksetzen
            </Button>
          </AccordionButton>
          <AccordionPanel>
            {cuData.length !== 0 && (
              <Table
                className='w-full'
                data={cuData}
                columns={consumptionUnitColumns}
              />
            )}

            {cuData.length === 0 && (
              <Text
                marginY='2rem'
                fontSize='4xl'
                textAlign='center'
              >
                No data
              </Text>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingY='2rem'>
            <AccordionIcon
              fontSize='5xl'
              color='green.500'
            />

            <Text
              fontSize='3xl'
              fontWeight='bold'
              color='green.500'
            >
              Mieter
            </Text>
            <Button
              marginLeft='auto'
              colorScheme='teal'
              onClick={async () => {
                await removeMigrationStatusTenant();
              }}
            >
              Status Zurücksetzen
            </Button>
          </AccordionButton>
          <AccordionPanel>
            {tenantsData.length !== 0 && (
              <Table
                className='w-full'
                data={tenantsData}
                columns={tenantColumns}
              />
            )}

            {tenantsData.length === 0 && (
              <Text
                marginY='2rem'
                fontSize='4xl'
                textAlign='center'
              >
                No data
              </Text>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingY='2rem'>
            <AccordionIcon
              fontSize='5xl'
              color='green.500'
            />

            <Text
              fontSize='3xl'
              fontWeight='bold'
              color='green.500'
            >
              Geräte
            </Text>
            <Button
              marginLeft='auto'
              colorScheme='teal'
              onClick={async () => {
                await removeMigrationStatusDevice();
              }}
            >
              Status Zurücksetzen
            </Button>
          </AccordionButton>
          <AccordionPanel>
            {devicesData.length !== 0 && (
              <Table
                className='w-full'
                data={devicesData}
                columns={deviceColumns}
              />
            )}

            {devicesData.length === 0 && (
              <Text
                marginY='2rem'
                fontSize='4xl'
                textAlign='center'
              >
                No data
              </Text>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
