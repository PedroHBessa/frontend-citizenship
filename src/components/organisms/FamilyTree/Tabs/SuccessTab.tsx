import { Typography } from '@mui/material';
import styled from 'styled-components';
import Image from '../../../../assets/success-message.png';

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 4rem 0;
  & img {
    width: 100%;
    max-width: 1063px;
  }
`;

export function SuccessTab() {
  return (
    <Component>
      <img alt='Success' src={Image} />
      <Typography variant='h4'>
        The member has been added successfully!!
      </Typography>
    </Component>
  );
}
