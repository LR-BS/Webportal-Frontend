import { type FC, type Dispatch, type SetStateAction } from 'react';

import { TabPanel, Input, FormLabel } from '@chakra-ui/react';

import { addressFieldsMaxLength } from '@/constants';
import { translations } from '@/constants/translations';

import type { PropertiesTabPanelFields } from '@/pages/Search/interfaces';

interface ExistingPropertiesTabPanelProps {
  inputsState: PropertiesTabPanelFields | undefined;
  handleTabPanelInputs: Dispatch<SetStateAction<PropertiesTabPanelFields | undefined>>;
}

export const PropertiesTabPanel: FC<ExistingPropertiesTabPanelProps> = ({
  inputsState,
  handleTabPanelInputs,
}) => (
  <TabPanel
    display='flex'
    flexWrap='wrap'
  >
    <div className='mx-8'>
      <FormLabel
        htmlFor='propertyNumber'
        fontSize='2xl'
        mb='2'
      >
        {translations['propertyNumber']}
      </FormLabel>

      <Input
        id='propertyNumber'
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

    <div className='mx-8'>
      <FormLabel
        htmlFor='city'
        fontSize='2xl'
        mb='2'
      >
        {translations['shortCity']}
      </FormLabel>

      <Input
        id='city'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        maxLength={addressFieldsMaxLength.city}
        value={inputsState?.city ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              city: e.target.value,
            };
          });
        }}
      />
    </div>

    <div className='mx-8'>
      <FormLabel
        htmlFor='postCode'
        fontSize='2xl'
        mb='2'
      >
        {translations['postCode']}
      </FormLabel>

      <Input
        id='postCode'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        maxLength={addressFieldsMaxLength.postCode}
        value={inputsState?.postCode ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              postCode: e.target.value,
            };
          });
        }}
      />
    </div>

    <div className='mx-8'>
      <FormLabel
        htmlFor='street'
        fontSize='2xl'
        mb='2'
      >
        {translations['street']}
      </FormLabel>

      <Input
        id='street'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        value={inputsState?.street ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              street: e.target.value,
            };
          });
        }}
      />
    </div>

    <div className='mx-8'>
      <FormLabel
        htmlFor='houseNumber'
        fontSize='2xl'
        mb='2'
      >
        {translations['houseNumber']}
      </FormLabel>

      <Input
        id='houseNumber'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        maxLength={addressFieldsMaxLength.houseNumber}
        value={inputsState?.houseNumber ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              houseNumber: e.target.value,
            };
          });
        }}
      />
    </div>

    <div className='mx-8'>
      <FormLabel
        htmlFor='partnerCode'
        fontSize='2xl'
        mb='2'
      >
        {translations['partnerCode']}
      </FormLabel>

      <Input
        id='partnerCode'
        width='20rem'
        height='3rem'
        fontSize='2xl'
        value={inputsState?.partnerCode ?? ''}
        onChange={(e) => {
          handleTabPanelInputs((prevState) => {
            return {
              ...prevState,
              partnerCode: e.target.value,
            };
          });
        }}
      />
    </div>
  </TabPanel>
);
