import { type FC, type JSX, Fragment, useState, useMemo, useEffect, useContext } from 'react';

import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { Link, useParams, useNavigate } from 'react-router-dom';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  FormLabel,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef, Row } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { fullDateOptions, yearMonthOptions, addressFieldsMaxLength } from '@/constants';
import { translations } from '@/constants/translations';
import { formatDateString } from '@/utils';

import { Heading } from '@/uikit/Heading';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import styles from './ConsumptionUnitDetails.module.pcss';

import type {
  ConsumptionUnitWithTenant,
  Device,
  DeviceConsumption,
  SaveTenantDeliveryAddressProps,
} from '@/interfaces/endpoints';

const deviceConsumptionsColumns: Array<ColumnDef<DeviceConsumption>> = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Heading size='lg'>{translations['id']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'devicePositionUUID',
    accessorKey: 'devicePositionUUID',
    header: () => <Heading size='lg'>{translations['devicePositionUUID']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: () => <Heading size='lg'>{translations['date']}</Heading>,
    cell: ({ getValue }) => {
      if (getValue<string | null>() === null) {
        return <TableCell>{undefined}</TableCell>;
      }

      return (
        <TableCell>
          {formatDateString(new Date(getValue<string>()), yearMonthOptions, '/')}
        </TableCell>
      );
    },
  },
  {
    id: 'heatingDegreeDays',
    accessorKey: 'heatingDegreeDays',
    header: () => <Heading size='lg'>{translations['heatingDegreeDays']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'hgtPercentage',
    accessorKey: 'hgtPercentage',
    header: () => <Heading size='lg'>{translations['hgtPercentage']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'hgtAdjusted',
    accessorKey: 'hgtAdjusted',
    header: () => <Heading size='lg'>{translations['hgtAdjusted']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'lastValue',
    accessorKey: 'lastValue',
    header: () => <Heading size='lg'>{translations['lastValue']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'createDate',
    accessorKey: 'createDate',
    header: () => <Heading size='lg'>{translations['createDate']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'monthlyConsumption',
    accessorKey: 'monthlyConsumption',
    header: () => <Heading size='lg'>{translations['monthlyConsumption']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'actionIndex',
    accessorKey: 'actionIndex',
    header: () => <Heading size='lg'>Action index</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
];

interface ConsumptionRouteError {
  errors?: {
    consumptionUnitId?: string[];
  };
}

export const ConsumptionUnitDetailsPage: FC = () => {
  const API_URL = useContext(ApiUrlContext);

  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [devicePositionUUID, setDevicePositionUUID] = useState<string>('');
  const [subTableData, setSubTableData] = useState<Record<string, DeviceConsumption[]>>();

  const [cityInput, setCityInput] = useState<SaveTenantDeliveryAddressProps['city']>('');
  const [streetInput, setStreetInput] = useState<SaveTenantDeliveryAddressProps['street']>('');
  const [houseNumberInput, setHouseNumberInput] =
    useState<SaveTenantDeliveryAddressProps['houseNumber']>('');
  const [staircaseInput, setStaircaseInput] =
    useState<SaveTenantDeliveryAddressProps['staircase']>('');
  const [floorInput, setFloorInput] = useState<SaveTenantDeliveryAddressProps['floor']>('');
  const [doorInput, setDoorInput] = useState<SaveTenantDeliveryAddressProps['door']>('');
  const [postCodeInput, setPostCodeInput] =
    useState<SaveTenantDeliveryAddressProps['postCode']>('');

  const {
    error: consumptionsDataError,
    isError: isConsumptionsDataError,
    data: consumptionsData,
  } = useQuery<ConsumptionUnitWithTenant, Error>({
    queryKey: ['consumption_unit', params.consumptionUnitId],
    queryFn: async () =>
      fetch(`${API_URL}/consumptionunits/${params.consumptionUnitId}`, {
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

        if (res.status === 400) {
          const error = (await res.json()) as ConsumptionRouteError;
          const errorMessage = error.errors?.consumptionUnitId?.[0];
          const endpointErrorMessage = `Error calling consumptionunits/{consumptionUnitId} endpoint. ${errorMessage}`;

          throw new Error(endpointErrorMessage);
        }

        if (res.status === 200) {
          return res.json();
        }
      }),
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const {
    isLoading: isDeviceLoading,
    isError: isDeviceError,
    error: deviceError,
    data: deviceData,
  } = useQuery<Device[], Error>({
    queryKey: ['consumption_unit_details', params.consumptionUnitId],
    queryFn: async () =>
      fetch(`${API_URL}/consumptionunits/${params.consumptionUnitId}/submeters`, {
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

        if (res.status === 400) {
          const error = (await res.json()) as ConsumptionRouteError;
          const errorMessage = error.errors?.consumptionUnitId?.[0];
          const endpointErrorMessage = `Error calling consumptionunits/{consumptionUnitId}/submeters endpoint. ${errorMessage}`;

          throw new Error(endpointErrorMessage);
        }

        if (res.status === 200) {
          return res.json();
        }
      }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: consumptionsDeviceData, refetch: refetchConsumptionsDeviceData } = useQuery<
    DeviceConsumption[],
    Error
  >({
    queryKey: ['consumption_unit_devices', devicePositionUUID],
    queryFn: async () =>
      fetch(`${API_URL}/consumptionunits/devices/${devicePositionUUID}/consumptions/`, {
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
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const saveTenantDeliveryAddress = useMutation({
    mutationFn: async ({
      consumptionUnitId,
      tenantId,
      city,
      door,
      floor,
      houseNumber,
      postCode,
      staircase,
      street,
    }: SaveTenantDeliveryAddressProps) => {
      return fetch(
        `${API_URL}/consumptionunits/${consumptionUnitId}/tenants/${tenantId}/deliveryaddress`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            consumptionUnitId,
            tenantId,
            city,
            door,
            floor,
            houseNumber,
            postCode,
            staircase,
            street,
          }),
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['enrich_new_property', params.propertyId] });
    },
  });

  const deviceColumns = useMemo<Array<ColumnDef<Device>>>(
    () => [
      {
        id: 'expand',
        accessorKey: 'expand',
        header: '',
        cell: ({ row }) => (
          <TableCell>
            <IconButton
              fontSize='5xl'
              variant='ghost'
              aria-label='expand'
              rotate={row.getIsExpanded() ? 90 : 0}
              transform='auto'
              icon={<ChevronRightIcon />}
              onClick={() => {
                setDevicePositionUUID(row.original.devicePositionUUID);
                row.toggleExpanded();
              }}
            />
          </TableCell>
        ),
      },
      {
        id: 'id',
        accessorKey: 'id',
        header: () => <Heading size='lg'>{translations['id']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'deviceNumber',
        accessorKey: 'deviceNumber',
        header: () => <Heading size='lg'>{translations['deviceNumber']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'articleNumber',
        accessorKey: 'articleNumber',
        header: () => <Heading size='lg'>{translations['articleNumber']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'deviceSerialNumber',
        accessorKey: 'deviceSerialNumber',
        header: () => <Heading size='lg'>{translations['deviceSerialNumber']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'devicePositionUUID',
        accessorKey: 'devicePositionUUID',
        header: () => <Heading size='lg'>{translations['devicePositionUUID']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'consumptionUnitId',
        accessorKey: 'consumptionUnitId',
        header: () => <Heading size='lg'>{translations['consumptionUnitNumber']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
      },
      {
        id: 'active',
        accessorKey: 'active',
        header: () => <Heading size='lg'>{translations['active']}</Heading>,
        cell: ({ getValue }) => (
          <TableCell>
            <Checkbox
              readOnly={true}
              size='lg'
              defaultChecked={getValue<boolean>()}
            />
          </TableCell>
        ),
      },
      {
        id: 'migrationStatus',
        accessorKey: 'migrationStatus',
        header: () => <Heading size='lg'>{translations['migrationStatus']}</Heading>,
        cell: ({ getValue }) => <TableCell>{getValue<number>()}</TableCell>,
      },
    ],
    [],
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await refetchConsumptionsDeviceData();
    };

    if (devicePositionUUID.length !== 0) {
      void fetchData();
    }
  }, [devicePositionUUID, refetchConsumptionsDeviceData]);

  useEffect(() => {
    if (devicePositionUUID.length !== 0 && consumptionsDeviceData !== undefined) {
      setSubTableData((prevData) => {
        return {
          ...prevData,
          [devicePositionUUID]: consumptionsDeviceData,
        };
      });
    }
  }, [devicePositionUUID, consumptionsDeviceData]);

  useEffect(() => {
    if (consumptionsData?.tenant?.deliveryAddress?.city !== undefined) {
      setCityInput(consumptionsData.tenant.deliveryAddress.city);
    }

    if (consumptionsData?.tenant?.deliveryAddress?.street !== undefined) {
      setStreetInput(consumptionsData.tenant.deliveryAddress.street);
    }

    if (consumptionsData?.tenant?.deliveryAddress?.houseNumber !== undefined) {
      setHouseNumberInput(consumptionsData.tenant.deliveryAddress.houseNumber);
    }

    if (consumptionsData?.tenant?.deliveryAddress?.staircase !== undefined) {
      setStaircaseInput(consumptionsData.tenant.deliveryAddress.staircase);
    }

    if (consumptionsData?.tenant?.deliveryAddress?.floor !== undefined) {
      setFloorInput(consumptionsData.tenant.deliveryAddress.floor);
    }

    if (consumptionsData?.tenant?.deliveryAddress?.door !== undefined) {
      setDoorInput(consumptionsData.tenant.deliveryAddress.door);
    }

    if (consumptionsData?.tenant?.deliveryAddress?.postCode !== undefined) {
      setPostCodeInput(consumptionsData.tenant.deliveryAddress.postCode);
    }
  }, [consumptionsData]);

  if (isDeviceError || isConsumptionsDataError) {
    return (
      <div>
        <Text
          marginY='2rem'
          fontSize='4xl'
          textAlign='center'
        >
          {deviceError?.message}
        </Text>

        <Text
          marginY='2rem'
          fontSize='4xl'
          textAlign='center'
        >
          {consumptionsDataError?.message}
        </Text>
      </div>
    );
  }

  const renderSubComponent = ({ row }: { row: Row<Device> }): JSX.Element => {
    const subData = subTableData?.[row.original.devicePositionUUID];

    return (
      <Fragment key={row.original.id}>
        {subData !== undefined && subData.length !== 0 && (
          <Table
            className='mt-4 w-full'
            data={subData}
            columns={deviceConsumptionsColumns}
          />
        )}

        {(subData === undefined || subData.length === 0) && (
          <Text
            marginY='2rem'
            fontSize='4xl'
            textAlign='center'
          >
            No data
          </Text>
        )}
      </Fragment>
    );
  };

  const tenantName = consumptionsData?.tenant?.tenantName;

  const leerstandChecked = tenantName === 'Leerstand' || tenantName === 'Empty';

  return (
    <div className={styles.consumptionUnitDetails}>
      <Heading
        size='2xl'
        className={styles.title}
      >
        {`${translations['consumptionUnitId']} ${params.consumptionUnitId}`}
      </Heading>

      <div className='flex flex-wrap justify-center'>
        <div className='mx-4 my-8 flex flex-1'>
          <Card
            size='lg'
            colorScheme='gray'
            w='100%'
          >
            <CardHeader bgColor='gray.100'>
              <Heading
                size='xl'
                className='py-0'
              >
                {translations['consumptionUnitDetails']}
              </Heading>
            </CardHeader>

            <CardBody
              display='flex'
              flexDirection='column'
              paddingX='4rem'
            >
              <div className='my-2 flex items-center justify-between'>
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['propertyNumber']}:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                >
                  {consumptionsData?.propertyNumber ?? '-'}
                </Text>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['consumptionUnitNumber']}:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                >
                  {consumptionsData?.consumptionUnitNumber ?? '-'}
                </Text>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['street']}:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                >
                  {consumptionsData?.street ?? '-'}
                </Text>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['houseNumber']}:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                >
                  {consumptionsData?.houseNumber ?? '-'}
                </Text>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className='mx-4 my-8 flex flex-1'>
          <Card
            size='lg'
            colorScheme='gray'
            w='100%'
          >
            <CardHeader bgColor='gray.100'>
              <Heading
                size='xl'
                className='py-0'
              >
                {translations['tenantInformation']}
              </Heading>
            </CardHeader>

            <CardBody
              display='flex'
              flexDirection='column'
            >
              <div className='my-2 flex items-center justify-between'>
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['specialist']}:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                  fontStyle='italic'
                >
                  {consumptionsData?.tenant?.tenantName ?? '-'}
                </Text>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['moveInDate']}:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                  fontStyle='italic'
                >
                  {consumptionsData?.tenant?.moveInDate === undefined
                    ? '-'
                    : formatDateString(
                        new Date(consumptionsData.tenant.moveInDate),
                        fullDateOptions,
                        '/',
                      )}
                </Text>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <Text
                  display='flex'
                  flex='1'
                  textAlign='end'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['emptyConsumptionUnit']}:
                </Text>

                <div className='flex-1'>
                  <Checkbox
                    readOnly={true}
                    size='lg'
                    isChecked={leerstandChecked}
                  />
                </div>
              </div>

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
                      {translations['deliveryAddress']}
                    </Text>
                  </AccordionButton>

                  <AccordionPanel
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                  >
                    <div className='my-2 flex'>
                      <FormLabel
                        htmlFor='street'
                        display='flex'
                        flex='1'
                        justifyContent='flex-end'
                        textAlign='end'
                        fontSize='3xl'
                        mr='8'
                      >
                        {translations['street']}
                      </FormLabel>

                      <div className='flex-1'>
                        <Input
                          id='street'
                          fontSize='3xl'
                          width='30rem'
                          height='4rem'
                          value={streetInput}
                          onChange={(e) => {
                            setStreetInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className='my-2 flex items-center justify-between'>
                      <FormLabel
                        htmlFor='houseNumber'
                        display='flex'
                        flex='1'
                        justifyContent='flex-end'
                        textAlign='end'
                        fontSize='3xl'
                        mr='8'
                      >
                        {translations['houseNumber']}
                      </FormLabel>

                      <div className='flex-1'>
                        <Input
                          id='houseNumber'
                          fontSize='3xl'
                          width='30rem'
                          height='4rem'
                          maxLength={addressFieldsMaxLength.houseNumber}
                          value={houseNumberInput}
                          onChange={(e) => {
                            setHouseNumberInput(e.target.value);

                            return true;
                          }}
                        />
                      </div>
                    </div>

                    <div className='my-2 flex items-center justify-between'>
                      <FormLabel
                        htmlFor='staircase'
                        display='flex'
                        flex='1'
                        justifyContent='flex-end'
                        textAlign='end'
                        fontSize='3xl'
                        mr='8'
                      >
                        {translations['staircase']}
                      </FormLabel>

                      <div className='flex-1'>
                        <Input
                          id='staircase'
                          fontSize='3xl'
                          width='30rem'
                          height='4rem'
                          maxLength={addressFieldsMaxLength.staircase}
                          value={staircaseInput}
                          onChange={(e) => {
                            setStaircaseInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className='my-2 flex items-center justify-between'>
                      <FormLabel
                        htmlFor='floor'
                        display='flex'
                        flex='1'
                        justifyContent='flex-end'
                        textAlign='end'
                        fontSize='3xl'
                        mr='8'
                      >
                        {translations['floor']}
                      </FormLabel>

                      <div className='flex-1'>
                        <Input
                          id='floor'
                          fontSize='3xl'
                          width='30rem'
                          height='4rem'
                          maxLength={addressFieldsMaxLength.floor}
                          value={floorInput}
                          onChange={(e) => {
                            setFloorInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className='my-2 flex items-center justify-between'>
                      <FormLabel
                        htmlFor='door'
                        display='flex'
                        flex='1'
                        justifyContent='flex-end'
                        textAlign='end'
                        fontSize='3xl'
                        mr='8'
                      >
                        {translations['door']}
                      </FormLabel>

                      <div className='flex-1'>
                        <Input
                          id='door'
                          fontSize='3xl'
                          width='30rem'
                          height='4rem'
                          maxLength={addressFieldsMaxLength.door}
                          value={doorInput}
                          onChange={(e) => {
                            setDoorInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className='my-2 flex items-center justify-between'>
                      <FormLabel
                        htmlFor='postCode'
                        display='flex'
                        flex='1'
                        justifyContent='flex-end'
                        textAlign='end'
                        fontSize='3xl'
                        mr='8'
                      >
                        {translations['postCode']}
                      </FormLabel>

                      <div className='flex-1'>
                        <Input
                          id='postCode'
                          fontSize='3xl'
                          width='30rem'
                          height='4rem'
                          value={postCodeInput}
                          maxLength={addressFieldsMaxLength.postCode}
                          onChange={(e) => {
                            setPostCodeInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className='my-2 flex items-center justify-between'>
                      <FormLabel
                        htmlFor='city'
                        display='flex'
                        flex='1'
                        justifyContent='flex-end'
                        textAlign='end'
                        fontSize='3xl'
                        mr='8'
                      >
                        {translations['shortCity']}
                      </FormLabel>

                      <div className='flex-1'>
                        <Input
                          id='city'
                          fontSize='3xl'
                          width='30rem'
                          height='4rem'
                          maxLength={addressFieldsMaxLength.city}
                          value={cityInput}
                          onChange={(e) => {
                            setCityInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </div>
      </div>

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
              {translations['devicesInConsumptionUnit']}
            </Text>
          </AccordionButton>

          <AccordionPanel>
            {isDeviceLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {deviceData.length !== 0 && (
                  <Table
                    className='w-full'
                    data={deviceData}
                    columns={deviceColumns}
                    getRowCanExpand={() => true}
                    renderSubComponent={renderSubComponent}
                  />
                )}

                {deviceData.length === 0 && (
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <div className='my-8 flex w-full justify-between'>
        <Link to={`/new-property/${params.propertyId}`}>
          <Button
            aria-label='Return back'
            size='lg'
            fontSize='2xl'
            paddingY='2rem'
            leftIcon={<ArrowBackIcon />}
            color='white'
            bgColor='blue.500'
            _hover={{
              bg: 'blue.600',
            }}
          >
            {translations['back']}
          </Button>
        </Link>

        <Button
          aria-label='Confirm'
          size='lg'
          fontSize='2xl'
          paddingY='2rem'
          color='white'
          colorScheme='green'
          onClick={() => {
            if (
              params.propertyId !== undefined &&
              params.consumptionUnitId !== undefined &&
              consumptionsData?.tenant?.id !== undefined
            ) {
              saveTenantDeliveryAddress.mutate({
                consumptionUnitId: params.consumptionUnitId,
                tenantId: consumptionsData.tenant.id,
                city: cityInput,
                door: doorInput,
                floor: floorInput,
                houseNumber: houseNumberInput,
                postCode: postCodeInput,
                staircase: staircaseInput,
                street: streetInput,
              });

              navigate(`/new-property/${params.propertyId}`);
            }
          }}
        >
          {translations['confirm']}
        </Button>
      </div>
    </div>
  );
};
