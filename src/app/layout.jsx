'use client';

import config from '../amplifyconfiguration.json';
import { MantineProvider } from '@mantine/core';
import { Amplify } from 'aws-amplify';
import '@mantine/core/styles.css';

Amplify.configure( config );

const RootLayout = ( { children } ) => (
  <html lang="en">
    <head>
      <title>Dustin Todos</title>
    </head>
    <body>
      <MantineProvider>
        {children}
      </MantineProvider>
    </body>
  </html>
);

export default RootLayout;
