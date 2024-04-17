import React from 'react';
import NoOneFoundImage from '../../assets/none.svg';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 0;
`;

const Image = styled.img`
  filter: grayscale(1);
  margin-bottom: 2rem;
`;

export function NoOneFound({
  message = 'No one found!',
}: {
  message?: string;
}) {
  return (
    <Component>
      <Image src={NoOneFoundImage} />
      <Typography variant='h2'>{message}</Typography>
    </Component>
  );
}
