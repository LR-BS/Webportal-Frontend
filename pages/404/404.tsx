import type { FC } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@chakra-ui/react';

import { Heading } from '@/uikit/Heading';

import styles from './404.module.pcss';

export const PageNotFound: FC = () => (
  <div className={styles.pageNotFound}>
    <Heading
      size='3xl'
      className='my-4'
    >
      Page not found, please try again
    </Heading>

    <Link to='/'>
      <Button
        size='lg'
        fontSize='2xl'
      >
        Return to Home
      </Button>
    </Link>
  </div>
);
