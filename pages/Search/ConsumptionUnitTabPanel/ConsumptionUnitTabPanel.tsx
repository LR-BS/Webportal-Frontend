import { type FC, type Dispatch, type SetStateAction } from 'react';

import { TabPanel, Input, FormLabel } from '@chakra-ui/react';

import { translations } from '@/constants/translations';

import type { ConsumptionUnitTabPanelFields } from '@/pages/Search/interfaces';

interface ConsumptionUnitTabPanelProps {
  inputsState: ConsumptionUnitTabPanelFields | undefined;
  handleTabPanelInputs: Dispatch<SetStateAction<ConsumptionUnitTabPanelFields | undefined>>;
}

export const ConsumptionUnitTabPanel: FC<ConsumptionUnitTabPanelProps> = ({
  inputsState,
  handleTabPanelInputs,
}) => (
  <TabPanel
    display='flex'
    flexWrap='wrap'
  >
    <div className='mx-8'>
      <FormLabel
        htmlFor='residentialUnit'
        fontSize='2xl'
        mb='2'
      >
        {translations['residentialUnit']}
      </FormLabel>

      <Input
        id='residentialUnit'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        value={inputsState?.residentialUnit ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              residentialUnit: e.target.value,
            };
          });
        }}
      />
    </div>

    <div className='mx-8'>
      <FormLabel
        htmlFor='userName'
        fontSize='2xl'
        mb='2'
      >
        {translations['userName']}
      </FormLabel>

      <Input
        id='userName'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        value={inputsState?.userName ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              userName: e.target.value,
            };
          });
        }}
      />
    </div>

    <div className='mx-8'>
      <FormLabel
        htmlFor='consumptionPropertyNumber'
        fontSize='2xl'
        mb='2'
      >
        {translations['propertyNumber']}
      </FormLabel>

      <Input
        id='consumptionPropertyNumber'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        value={inputsState?.propertyNumber ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              propertyNumber: e.target.value,
            };
          });
        }}
      />
    </div>
  </TabPanel>
);
