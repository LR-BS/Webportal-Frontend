import { type FC, useMemo, useState, useEffect, useContext } from 'react';

import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

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
  CardFooter,
  Checkbox,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Popover,
  Select,
  Text,
  FormLabel,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';

import { ApiUrlContext } from '@/ApiUrlProvider';
import { addressFieldsMaxLength, fullDateOptions } from '@/constants';
import { translations } from '@/constants/translations';
import { formatDateString } from '@/utils';

import { Heading } from '@/uikit/Heading';
import { Table } from '@/uikit/Table';
import { TableCell } from '@/uikit/Table/TableCell';

import styles from './EnrichNewProperty.module.pcss';

import type {
  EnrichNewProperty,
  ConsumptionUnit,
  Device,
  Partner,
  SavePropertyMutationProps,
} from '@/interfaces/endpoints';

interface GpsCoordinates {
  lat: string;
  lon: string;
}

interface DateSelectorProps {
  label: string;
  monthValue: string;
  yearValue: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const DateSelector: FC<DateSelectorProps> = ({
  label,
  monthValue,
  yearValue,
  onMonthChange,
  onYearChange,
}) => (
  <div className='my-2 flex items-center justify-between'>
    <FormLabel
      display='flex'
      flex='1'
      justifyContent='flex-end'
      textAlign='end'
      fontSize='3xl'
      mr='8'
    >
      {label}:
    </FormLabel>
    <div className='flex flex-1'>
      <Select
        fontSize='3xl'
        width='12rem'
        height='4rem'
        value={monthValue}
        mr='4'
        onChange={(e) => {
          onMonthChange(e.target.value);
        }}
      >
        {Array.from({ length: 12 }, (_, i) => {
          let month = i + 1;
          const shownMonth: `0${number}` | number = month < 10 ? `0${month}` : month;

          return (
            <option
              key={shownMonth}
              value={shownMonth}
            >
              {month < 10 ? `0${month}` : month}
            </option>
          );
        })}
      </Select>
      <Select
        fontSize='3xl'
        width='12rem'
        height='4rem'
        value={yearValue}
        onChange={(e) => {
          onYearChange(e.target.value);
        }}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const year = new Date().getFullYear() - i;

          return (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          );
        })}
      </Select>
    </div>
  </div>
);

const mainMeterColumns: Array<ColumnDef<Device>> = [
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
];

const partnerColumns: Array<ColumnDef<Partner>> = [
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <Heading size='lg'>{translations['name']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'street',
    accessorKey: 'street',
    header: () => <Heading size='lg'>{translations['street']}</Heading>,
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
    id: 'partnerCode',
    accessorKey: 'partnerCode',
    header: () => <Heading size='lg'>{translations['partnerCode']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
  {
    id: 'migrationStatus',
    accessorKey: 'migrationStatus',
    header: () => <Heading size='lg'>{translations['migrationStatus']}</Heading>,
    cell: ({ getValue }) => <TableCell>{getValue<string>()}</TableCell>,
  },
];

interface LocationState {
  isNavigateFromSearch: boolean;
}

export const EnrichNewPropertyPage: FC = () => {
  const params = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const API_URL = useContext(ApiUrlContext);

  const locationState = location.state as LocationState | undefined;

  const [startMonth, setStartMonth] = useState('01');
  const [startYear, setStartYear] = useState(`${new Date().getFullYear()}`);
  const [endMonth, setEndMonth] = useState('01');
  const [endYear, setEndYear] = useState(`${new Date().getFullYear()}`);
  const [cityInput, setCityInput] = useState<SavePropertyMutationProps['city']>('');
  const [postCodeInput, setPostCodeInput] = useState<SavePropertyMutationProps['postCode']>('');
  const [streetInput, setStreetInput] = useState<SavePropertyMutationProps['street']>('');
  const [houseNumberInput, setHouseNumberInput] =
    useState<SavePropertyMutationProps['houseNumber']>('');
  const [contractNumberInput, setContractNumberInput] =
    useState<SavePropertyMutationProps['contractNumber']>('');
  const [startDateInput, setStartDateInput] = useState<SavePropertyMutationProps['startDate']>('');
  const [endDateInput, setEndDateInput] = useState<SavePropertyMutationProps['endDate']>(null);
  const [dueDateDayInput, setDueDateDayInput] = useState<SavePropertyMutationProps['dueDateDay']>();
  const [dueDateMonthInput, setDueDateMonthInput] =
    useState<SavePropertyMutationProps['dueDateMonth']>();

  const { isLoading, isError, error, data } = useQuery<EnrichNewProperty, Error>({
    queryKey: ['enrich_new_property', params.propertyId],
    queryFn: async () =>
      fetch(`${API_URL}/properties/${params.propertyId}`).then(async (res) => {
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

  const { data: gpsData, refetch: refetchGpsCoordinates } = useQuery<GpsCoordinates[], Error>({
    queryKey: [
      'gps_coordinates',
      `${postCodeInput}-${cityInput}-${streetInput}-${houseNumberInput}`,
    ],
    queryFn: async () =>
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${postCodeInput} ${cityInput} ${streetInput} ${houseNumberInput}&format=json&polygon=1&addressdetails=1`,
      ).then(async (res) => {
        if (res.status === 500) {
          throw new Error('500');
        }

        if (res.status === 200) {
          return res.json();
        }
      }),
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: false,
  });

  const fetchConsumptionForLastMonth = useMutation({
    mutationFn: async (propertyId: string) => {
      const currentDate = new Date();
      const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const year = lastMonthDate.getFullYear();
      const month = lastMonthDate.getMonth() + 1;
      const formattedMonth = month < 10 ? `0${month}` : month;
      const dateParam = `${year}-${formattedMonth}`;

      return fetch(
        `${API_URL}/consumptioncalculator/month?date=${dateParam}&propertyId=${propertyId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
  });

  const fetchConsumptionForDuration = useMutation({
    mutationFn: async (propertyId: string) => {
      const startDate = `${startYear}-${startMonth}`;
      const endDate = `${endYear}-${endMonth}`;

      return fetch(
        `${API_URL}/consumptioncalculator/duration?begindate=${startDate}&enddate=${endDate}&propertyId=${propertyId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
  });

  const saveProperty = useMutation({
    mutationFn: async ({
      propertyId,
      city,
      postCode,
      street,
      houseNumber,
      contractNumber,
      startDate,
      endDate,
      dueDateDay,
      dueDateMonth,
      gpsLatitude: gpsDataLatitude,
      gpsLongitude: gpsDataLongitude,
    }: SavePropertyMutationProps) => {
      return fetch(`${API_URL}/properties`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          city,
          postCode,
          street,
          houseNumber,
          contractNumber,
          startDate,
          endDate,
          dueDateDay,
          dueDateMonth,
          gpsLatitude: gpsDataLatitude,
          gpsLongitude: gpsDataLongitude,
        }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['new_properties'] });
      await queryClient.invalidateQueries({
        queryKey: ['enrich_new_property', params.propertyId],
      });
    },
  });

  const consumptionColumns = useMemo<Array<ColumnDef<ConsumptionUnit>>>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: () => <Heading size='lg'>{translations['id']}</Heading>,
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
        id: 'postCode',
        header: () => <Heading size='lg'>{translations['postCode']}</Heading>,
        cell: () => <TableCell>{data?.postCode}</TableCell>,
      },
      {
        id: 'city',
        header: () => <Heading size='lg'>{translations['shortCity']}</Heading>,
        cell: () => <TableCell>{data?.city}</TableCell>,
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
        header: () => <Heading size='lg'>{translations['propertyNumber']}</Heading>,
        cell: () => <TableCell>{data?.propertyNumber}</TableCell>,
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
        header: '',
        cell: ({ row }) => (
          <TableCell>
            <Link to={row.original.id}>
              <Button
                size='lg'
                fontSize='2xl'
                paddingY='2rem'
                variant='outline'
                colorScheme='orange'
              >
                {translations['edit']}
              </Button>
            </Link>
          </TableCell>
        ),
      },
    ],
    [data?.city, data?.postCode, data?.propertyNumber],
  );

  useEffect(() => {
    if (data?.city !== undefined) {
      setCityInput(data.city);
    }

    if (data?.postCode !== undefined) {
      setPostCodeInput(data.postCode);
    }

    if (data?.street !== undefined) {
      setStreetInput(data.street);
    }

    if (data?.houseNumber !== undefined) {
      setHouseNumberInput(data.houseNumber);
    }

    if (data?.contractNumber !== undefined) {
      setContractNumberInput(data.contractNumber);
    }

    if (data?.startDate !== undefined && data.startDate !== null) {
      setStartDateInput(formatDateString(new Date(data.startDate), fullDateOptions, '-'));
    }

    if (data?.dueDateDay !== undefined) {
      setDueDateDayInput(data.dueDateDay);
    }

    if (data?.dueDateMonth !== undefined) {
      setDueDateMonthInput(data.dueDateMonth);
    }
  }, [data]);

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

  const getGpsCoordinates = async (): Promise<void> => {
    await refetchGpsCoordinates();
  };

  const { isLoading: isLoadingConsumption } = fetchConsumptionForLastMonth;
  const gpsLatitude = gpsData?.[0]?.lat ?? data?.gpsLatitude;
  const gpsLongitude = gpsData?.[0]?.lon ?? data?.gpsLongitude;

  const isGpsLatitudeValid = gpsLatitude !== undefined && gpsLatitude !== null;
  const isGpsLongitudeValid = gpsLongitude !== undefined && gpsLatitude !== null;

  const isStartDateValid =
    startDateInput !== null && startDateInput !== undefined && startDateInput.length > 0;

  const isGpsDataValid = isGpsLatitudeValid && isGpsLongitudeValid;

  const isContractNumberValid =
    contractNumberInput !== undefined && contractNumberInput.length !== 0;

  const isFormValidated =
    data?.id !== undefined &&
    dueDateDayInput !== 0 &&
    dueDateMonthInput !== 0 &&
    isStartDateValid &&
    isGpsDataValid &&
    isContractNumberValid;

  return (
    <div className={styles.enrichNewPropertyPage}>
      <Heading
        size='2xl'
        className={styles.title}
      >
        {translations['propertyDetails']} {data?.id}
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
                {`${translations['propertyNumber']} ${params.propertyId}`}
              </Heading>
            </CardHeader>

            <CardBody
              display='flex'
              flexDirection='column'
              paddingX='4rem'
            >
              <div className='my-2 flex items-center justify-center'>
                <FormLabel
                  htmlFor='city'
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  textAlign='end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['shortCity']}:
                </FormLabel>

                <div className='flex-1'>
                  <Input
                    id='city'
                    fontSize='3xl'
                    width='30rem'
                    height='4rem'
                    isDisabled={locationState?.isNavigateFromSearch ?? false}
                    maxLength={addressFieldsMaxLength.city}
                    value={cityInput}
                    onChange={(e) => {
                      setCityInput(e.target.value);
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
                  {translations['postCode']}:
                </FormLabel>

                <div className='flex-1'>
                  <Input
                    id='postCode'
                    fontSize='3xl'
                    width='30rem'
                    height='4rem'
                    isDisabled={locationState?.isNavigateFromSearch ?? false}
                    maxLength={addressFieldsMaxLength.postCode}
                    value={postCodeInput}
                    onChange={(e) => {
                      setPostCodeInput(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <FormLabel
                  htmlFor='street'
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  textAlign='end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['street']}:
                </FormLabel>

                <div className='flex-1'>
                  <Input
                    id='street'
                    fontSize='3xl'
                    width='30rem'
                    height='4rem'
                    isDisabled={locationState?.isNavigateFromSearch ?? false}
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
                  {translations['shortHouseNumber']}
                </FormLabel>

                <div className='flex-1'>
                  <Input
                    id='houseNumber'
                    fontSize='3xl'
                    width='30rem'
                    height='4rem'
                    isDisabled={locationState?.isNavigateFromSearch ?? false}
                    maxLength={addressFieldsMaxLength.houseNumber}
                    value={houseNumberInput}
                    onChange={(e) => {
                      setHouseNumberInput(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <FormLabel
                  htmlFor='startDate'
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  textAlign='end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['startDate']}:
                </FormLabel>

                <div className='flex-1'>
                  <Input
                    id='startDate'
                    fontSize='3xl'
                    width='30rem'
                    height='4rem'
                    type='date'
                    isDisabled={locationState?.isNavigateFromSearch ?? false}
                    value={startDateInput ?? undefined}
                    aria-invalid={!isStartDateValid}
                    isInvalid={!isStartDateValid}
                    onChange={(e) => {
                      setStartDateInput(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <FormLabel
                  htmlFor='endDate'
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  textAlign='end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['endDate']}:
                </FormLabel>

                <div className='flex-1'>
                  <Input
                    id='endDate'
                    fontSize='3xl'
                    width='30rem'
                    height='4rem'
                    type='date'
                    value={endDateInput ?? undefined}
                    onChange={(e) => {
                      setEndDateInput(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <FormLabel
                  htmlFor='dueDateMonth'
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  textAlign='end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['dueDateMonth']}:
                </FormLabel>

                <div className='flex-1'>
                  <NumberInput
                    id='dueDateMonth'
                    width='30rem'
                    height='4rem'
                    min={1}
                    max={12}
                    // isDisabled={locationState?.isNavigateFromSearch ?? false}
                    value={dueDateMonthInput ?? 1}
                    onChange={(value) => {
                      setDueDateMonthInput(Number(value));
                    }}
                  >
                    <NumberInputField
                      fontSize='3xl'
                      height='100%'
                    />

                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
              </div>

              <div className='my-2 flex items-center justify-between'>
                <FormLabel
                  htmlFor='dueDateDay'
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  textAlign='end'
                  fontSize='3xl'
                  mr='8'
                >
                  {translations['dueDateDay']}:
                </FormLabel>

                <div className='flex-1'>
                  <NumberInput
                    id='dueDateDay'
                    width='30rem'
                    height='4rem'
                    min={1}
                    max={31}
                    // isDisabled={locationState?.isNavigateFromSearch ?? false}
                    value={dueDateDayInput ?? 1}
                    onChange={(value) => {
                      setDueDateDayInput(Number(value));
                    }}
                  >
                    <NumberInputField
                      fontSize='3xl'
                      height='100%'
                    />

                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
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
                Partner
              </Heading>
            </CardHeader>

            <CardBody
              display='flex'
              flexDirection='column'
            >
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <Table
                    data={[data.partner]}
                    columns={partnerColumns}
                  />

                  {Object.keys(data.partner).length === 0 && (
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
                Webportal
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
                  Vertragsversion:
                </Text>

                <div className='flex-1'>
                  <Select
                    fontSize='3xl'
                    width='25rem'
                    height='4rem'
                    value={contractNumberInput ?? '-1'}
                    aria-invalid={!isContractNumberValid}
                    isInvalid={!isContractNumberValid}
                    isDisabled={locationState?.isNavigateFromSearch ?? false}
                    onChange={(e) => {
                      setContractNumberInput(e.target.value);
                    }}
                  >
                    <option
                      hidden={true}
                      value='-1'
                    >
                      {translations['selectValue']}
                    </option>
                    <option value='0'>VDM Plus</option>
                    <option value='1'>VDM Plus Objekt</option>
                    <option value='2'>VDM Objekt</option>
                    <option value='3'>Monatliche Verbrauchsoption</option>
                    <option value='4'>Verbrauchsinfo KM-Bestand</option>
                    <option value='5'>Demo Anlage</option>
                  </Select>
                </div>
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
                  Übertragung ans Webportal:
                </Text>

                <div className='flex-1'>
                  <Checkbox
                    readOnly={true}
                    size='lg'
                    defaultChecked={data?.migrationStatus === 200 || data?.migrationStatus === 300}
                  />
                </div>
              </div>

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
                >
                  {data?.istaSpecialistId}
                </Text>
              </div>

              <div
                className='my-2 flex items-center justify-between outline-2'
                aria-invalid={!isGpsLatitudeValid}
              >
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                  aria-invalid={!isGpsLongitudeValid}
                  color={isGpsLongitudeValid ? 'black' : 'red'}
                >
                  Latitude:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                  aria-invalid={!isGpsLatitudeValid}
                  color={isGpsLatitudeValid ? 'black' : 'red'}
                >
                  {gpsLatitude ?? '-'}
                </Text>
              </div>

              <div
                className='my-2 flex items-center justify-between'
                aria-invalid={!isGpsLatitudeValid}
              >
                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-end'
                  fontSize='3xl'
                  mr='8'
                  aria-invalid={!isGpsLongitudeValid}
                  color={isGpsLongitudeValid ? 'black' : 'red'}
                >
                  Longitude:
                </Text>

                <Text
                  display='flex'
                  flex='1'
                  justifyContent='flex-start'
                  fontSize='3xl'
                  aria-invalid={!isGpsLongitudeValid}
                  color={isGpsLongitudeValid ? 'black' : 'red'}
                >
                  {gpsLongitude ?? '-'}
                </Text>
              </div>
            </CardBody>

            <CardFooter justifyContent='flex-end'>
              <Popover
                placement='top'
                defaultIsOpen={true}
                isLazy={true}
                isOpen={!isGpsDataValid}
              >
                <PopoverTrigger>
                  <Button
                    size='lg'
                    variant='outline'
                    fontSize='3xl'
                    colorScheme='blue'
                    paddingY='2rem'
                    isDisabled={locationState?.isNavigateFromSearch ?? false}
                    onClick={getGpsCoordinates}
                  >
                    {translations['gpsMatching']}
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverArrow />

                  <PopoverHeader>
                    <Text
                      fontSize='2xl'
                      fontWeight='bold'
                      color='blue.600'
                    >
                      Get GPS coordinates
                    </Text>
                  </PopoverHeader>

                  <PopoverBody>
                    <Text fontSize='xl'>
                      You will able to save property only after getting GPS coordinates.
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className='my-8 flex w-full justify-between'>
        <Button
          aria-label='Save'
          size='lg'
          fontSize='2xl'
          paddingY='2rem'
          color='white'
          colorScheme='blue'
          isDisabled={!isFormValidated}
          onClick={() => {
            if (isFormValidated) {
              saveProperty.mutate({
                propertyId: data.id,
                city: cityInput,
                postCode: postCodeInput,
                street: streetInput,
                houseNumber: houseNumberInput,
                contractNumber: contractNumberInput,
                startDate: startDateInput,
                endDate: endDateInput,
                dueDateMonth: dueDateMonthInput ?? 1,
                dueDateDay: dueDateDayInput ?? 1,
                gpsLatitude: Number(gpsData?.[0]?.lat ?? gpsLatitude),
                gpsLongitude: Number(gpsData?.[0]?.lon ?? gpsLongitude),
              });
            }
          }}
        >
          {translations['save']}
        </Button>

        <DateSelector
          label='Start Date'
          monthValue={startMonth}
          yearValue={startYear}
          onMonthChange={setStartMonth}
          onYearChange={setStartYear}
        />
        <DateSelector
          label='End Date'
          monthValue={endMonth}
          yearValue={endYear}
          onMonthChange={setEndMonth}
          onYearChange={setEndYear}
        />
        <Button
          aria-label='Save'
          size='lg'
          fontSize='2xl'
          paddingY='2rem'
          color='white'
          colorScheme='blue'
          isDisabled={isLoadingConsumption}
          onClick={() => {
            if (data?.id !== undefined) {
              fetchConsumptionForDuration.mutate(data.id);
            }
          }}
        >
          Verbrauch Berechnen
        </Button>

        <Button
          aria-label='Confirm'
          size='lg'
          fontSize='2xl'
          paddingY='2rem'
          color='white'
          colorScheme='green'
          isDisabled={!isFormValidated}
          onClick={() => {
            if (isFormValidated) {
              saveProperty.mutate({
                propertyId: data.id,
                city: cityInput,
                postCode: postCodeInput,
                street: streetInput,
                houseNumber: houseNumberInput,
                contractNumber: contractNumberInput,
                startDate: startDateInput,
                endDate: endDateInput,
                dueDateMonth: dueDateMonthInput ?? 1,
                dueDateDay: dueDateDayInput ?? 1,
                gpsLatitude: Number(gpsData?.[0]?.lat ?? gpsLatitude),
                gpsLongitude: Number(gpsData?.[0]?.lon ?? gpsLongitude),
              });

              if (locationState?.isNavigateFromSearch === true) {
                navigate('/search');
              } else {
                navigate('/new-property');
              }
            }
          }}
        >
          {translations['confirmNewProperty']}
        </Button>
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
              Hauptzahler
            </Text>
          </AccordionButton>

          <AccordionPanel>
            {data?.mainMeters !== undefined && data.mainMeters.length !== 0 && (
              <Table
                className='w-full'
                data={data.mainMeters}
                columns={mainMeterColumns}
              />
            )}

            {data?.mainMeters?.length === 0 && (
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
              Nutzer
            </Text>
          </AccordionButton>

          <AccordionPanel>
            {data?.consumptionUnits !== undefined && data.consumptionUnits.length !== 0 && (
              <Table
                className='w-full'
                data={data.consumptionUnits}
                columns={consumptionColumns}
              />
            )}

            {data?.consumptionUnits?.length === 0 && (
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
