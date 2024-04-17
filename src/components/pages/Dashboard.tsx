import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';

export function Dashboard() {
  return (
    <>
      <Helmet title='Dashboard Page' />
      <Typography variant='h1'>Dashboard Page</Typography>
    </>
  );
}
