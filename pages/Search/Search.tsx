import { type FC, useState } from 'react';

import { Button, Tabs, TabList, TabPanels, Tab } from '@chakra-ui/react';

import { translations } from '@/constants/translations';

import { Heading } from '@/uikit/Heading';

import { ConsumptionUnitTab } from './ConsumptionUnitTab';
import { ConsumptionUnitTabPanel } from './ConsumptionUnitTabPanel';
import { PropertiesTab } from './PropertiesTab';
import { PropertiesTabPanel } from './PropertiesTabPanel';

import type { PropertiesTabPanelFields, ConsumptionUnitTabPanelFields } from './interfaces';

export const SearchPage: FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [propertiesInputs, setPropertiesInputs] = useState<PropertiesTabPanelFields | undefined>();
  const [propertiesSearchInputs, setPropertiesSearchInputs] = useState<
    PropertiesTabPanelFields | undefined
  >();

  const [consumptionUnitInputs, setConsumptionUnitInputs] = useState<
    ConsumptionUnitTabPanelFields | undefined
  >();
  const [consumptionUnitSearchInputs, setConsumptionUnitSearchInputs] = useState<
    ConsumptionUnitTabPanelFields | undefined
  >();

  return (
    <div className='my-8 flex h-full w-full flex-col justify-center px-16'>
      <Heading
        size='2xl'
        className='text-start text-lime-600'
      >
        {translations['search']}
      </Heading>

      <div className='flex'>
        <Tabs
          size='lg'
          width='100%'
          variant='enclosed-colored'
          colorScheme='green'
          onChange={(index) => {
            setTabIndex(index);
          }}
        >
          <TabList>
            <Tab fontSize='2xl'>{translations['property']}</Tab>
            <Tab fontSize='2xl'>{translations['consumptionUnit']}</Tab>
          </TabList>

          <TabPanels>
            <PropertiesTabPanel
              inputsState={propertiesInputs}
              handleTabPanelInputs={setPropertiesInputs}
            />

            <ConsumptionUnitTabPanel
              inputsState={consumptionUnitInputs}
              handleTabPanelInputs={setConsumptionUnitInputs}
            />
          </TabPanels>
        </Tabs>

        <div className='flex flex-col items-center justify-start border-l-1 px-8'>
          <Button
            size='lg'
            fontSize='2xl'
            marginY='1rem'
            color='white'
            paddingX='5rem'
            bgColor='blue.700'
            _hover={{
              bg: 'blue.800',
            }}
            onClick={() => {
              if (tabIndex === 0) {
                setPropertiesSearchInputs(propertiesInputs);
              }

              if (tabIndex === 1) {
                setConsumptionUnitSearchInputs(consumptionUnitInputs);
              }
            }}
          >
            {translations['search']}
          </Button>

          <Button
            size='lg'
            fontSize='2xl'
            marginY='1rem'
            paddingX='2.5rem'
            variant='outline'
            colorScheme='red'
            onClick={() => {
              if (tabIndex === 0) {
                setPropertiesInputs(undefined);
                setPropertiesSearchInputs(undefined);
              }

              if (tabIndex === 1) {
                setConsumptionUnitInputs(undefined);
                setConsumptionUnitSearchInputs(undefined);
              }
            }}
          >
            {translations['resetToDefault']}
          </Button>
        </div>
      </div>

      <Heading
        size='2xl'
        className='text-start text-lime-600'
      >
        {translations['consumptionUnit']}
      </Heading>

      {tabIndex === 0 && <PropertiesTab searchFields={propertiesSearchInputs} />}

      {tabIndex === 1 && <ConsumptionUnitTab searchFields={consumptionUnitSearchInputs} />}
    </div>
  );
};
