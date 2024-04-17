import React from 'react';
import styled from 'styled-components';
import { grayScale } from '../../theme/variants';
import { Box, BoxProps, Link, Typography } from '@mui/material';
import { fontFamily } from '../../theme/typography';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

const Component = styled(Box)`
  border-bottom: 1px solid ${grayScale[25]};
  font-family: ${fontFamily};
`;

const Navigation = styled.nav`
  display: flex;
  list-style: none;
  margin-bottom: 0.5rem;
  color: ${grayScale[50]};
  & > li {
    margin-right: 0.5rem;
    text-transform: capitalize;
    &:after {
      content: '/';
      margin-left: 0.5rem;
    }
  }
  & > li:last-child {
    &:after {
      content: '';
    }
  }
`;

export function Breadcrumb(props: BoxProps) {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);

  return (
    <Component {...props}>
      <Navigation aria-label='breadcrumb'>
        {pathNames.length > 0 ? (
          <li>
            <Link
              color={grayScale[75]}
              component={ReactRouterLink}
              to='/'
              variant='body1'
            >
              Dashboard
            </Link>
          </li>
        ) : (
          <li>
            <Typography variant='body1'>Dashboard</Typography>
          </li>
        )}
        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathNames.length - 1;

          return (
            <li key={name}>
              {isLast ? (
                <Typography variant='body1'>{name}</Typography>
              ) : (
                <Link component={ReactRouterLink} to={routeTo} variant='body1'>
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </Navigation>
    </Component>
  );
}
