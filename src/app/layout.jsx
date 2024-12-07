'use client';

import { MantineProvider } from '@mantine/core';
import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json';
import '@mantine/core/styles.css';

Amplify.configure( config );

export default function RootLayout( { children } ) {
  return (
    <html lang="en">
      <head>
        <title>Dustin Todos</title>
      </head>
      <body>
        <MantineProvider >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
