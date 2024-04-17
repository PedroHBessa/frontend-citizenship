import { DataTable, HeadCell } from '../molecules/DataTable/DataTable';
import React, { useEffect } from 'react';
import { useDataTableItemContext } from '../contexts/DataTableItemContext';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import { NoOneFound } from '../atoms/NoOneFound';
import {
  ButtonGroup,
  ButtonProps,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { CustomButton } from '../atoms/CustomButton';
import { CustomTextField } from '../atoms/CustomTextField';
import SearchIcon from '@mui/icons-material/Search';
import { useDataViewStore } from '../stores/useDataViewStore';
import styled, { css } from 'styled-components';
import { customColor } from '../../theme/variants';
import { Data } from '../../types/data';
import { DataCards } from '../molecules/DataCards';
import { useFamilies } from '../hooks/useFamilies';
import { useNavigate } from 'react-router-dom';

const ActionDemo = ({ onNavigate }: { onNavigate: (id: number) => void }) => {
  const { item } = useDataTableItemContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNavigate(item._id);
  };

  return (
    <IconButton color='secondary' onClick={handleClick}>
      <DoubleArrowIcon />
    </IconButton>
  );
};

type DataViewProps = {
  headCells: HeadCell[];
  rows: Data[];
  loading?: boolean;
  initialized?: boolean;
  contextName: string;
};

interface TypeButtonProps extends ButtonProps {
  checked?: boolean;
}

const TypeButton = styled(CustomButton)<TypeButtonProps>`
  ${(props) =>
    props.checked &&
    css`
      && {
        background: ${customColor[600]};
        color: ${customColor[50]};
        pointer-events: none;
      }
    `}
`;

export function DataView({
  headCells,
  rows,
  loading,
  initialized,
  contextName,
}: DataViewProps) {
  const type = useDataViewStore((state) => state.type);
  const setType = useDataViewStore((state) => state.setType);
  const search = useDataViewStore((state) => state.search);
  const setSearch = useDataViewStore((state) => state.setSearch);
  const filtered = useDataViewStore((state) => state.filtered);
  const setData = useDataViewStore((state) => state.setData);
  const selected = useDataViewStore((state) => state.selected);
  const setSelected = useDataViewStore((state) => state.setSelected);
  const { deleteData } = useFamilies();
  const navigate = useNavigate();

  const handleSelected = (selected: number[]) => {
    setSelected(selected);
  };

  const handleDelete = () => {
    deleteData(selected);
  };

  const handleNavigate = (id: number) => {
    navigate(`/${contextName}/${id}`);
  };

  useEffect(() => {
    if (rows.length) {
      setData(rows);
    }
  }, [setData, rows]);

  if (!rows.length && initialized) {
    return <NoOneFound />;
  }

  return (
    <>
      <Grid container my={4}>
        <Grid item mr='auto'>
          <CustomTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
            size='small'
            sx={{ marginRight: '1rem' }}
            value={search}
          />
        </Grid>
        <Grid item>
          {/*<ButtonGroup>*/}
          {/*  /!*<CustomButton>*!/*/}
          {/*  /!*  <CheckBox />*!/*/}
          {/*  /!*</CustomButton>*!/*/}
          {/*  <CustomButton>*/}
          {/*    <DeleteIcon />*/}
          {/*  </CustomButton>*/}
          {/*</ButtonGroup>*/}
          <ButtonGroup>
            <TypeButton
              checked={type === 'table'}
              onClick={() => setType('table')}
            >
              <TableViewIcon />
            </TypeButton>
            <TypeButton
              checked={type === 'cards'}
              onClick={() => setType('cards')}
            >
              <CreditCardIcon />
            </TypeButton>
            <CustomButton onClick={handleDelete}>
              <DeleteIcon />
            </CustomButton>
          </ButtonGroup>
        </Grid>
      </Grid>
      {type === 'table' && (
        <DataTable
          actions={
            <>
              <ActionDemo onNavigate={handleNavigate} />
            </>
          }
          headCells={headCells}
          loading={loading}
          onNavigate={handleNavigate}
          onSelected={handleSelected}
          rows={filtered}
        />
      )}
      {type === 'cards' && (
        <DataCards
          data={filtered}
          loading={loading}
          onNavigate={handleNavigate}
          onSelected={handleSelected}
        />
      )}
    </>
  );
}
