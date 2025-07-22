import { type FC, useState } from 'react';

import { Avatar } from '@chakra-ui/react';

import { navRoutes } from '@/constants/routes';

import { BaseIcon } from '@/components/BaseIcon';
import { HeaderLogo } from '@/components/Header/Logo';

import { Nav } from '@/uikit/Nav';

import LoginImg from '@/assets/svg/login.svg';
import LogoutImg from '@/assets/svg/logout.svg';
import SettingsImg from '@/assets/svg/settings.svg';

import styles from './Header.module.pcss';

export const Header: FC = () => {
  const [authStatus, setAuthStatus] = useState(true);
  const [userName, setUserName] = useState('UserName');

  return (
    <header className={styles.header}>
      <HeaderLogo href='/' />
      <div className='ml-4'>
        <p className='items-center justify-center text-center text-3xl'>2.4.0</p>
      </div>

      <Nav
        className='sm:hidden'
        navList={navRoutes}
      />
      <p className='flex w-52 items-center justify-center text-2xl'>{userName}</p>
      <div className='flex w-16 items-center justify-center'>
        {Boolean(authStatus) && <Avatar />}
      </div>
      <BaseIcon className={styles.settingsImg}>
        <SettingsImg />
      </BaseIcon>
      <div className={styles.authImg}>
        {Boolean(authStatus) && (
          <BaseIcon
            onClick={() => {
              setUserName('');
              setAuthStatus(!authStatus);
            }}
          >
            <LogoutImg />
          </BaseIcon>
        )}

        {!authStatus && (
          <BaseIcon
            onClick={() => {
              setUserName('UserName');
              setAuthStatus(!authStatus);
            }}
          >
            <LoginImg />
          </BaseIcon>
        )}
      </div>
    </header>
  );
};
