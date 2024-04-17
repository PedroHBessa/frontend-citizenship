import {
  Box,
  Checkbox,
  LinearProgress,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import React, { ReactElement, useEffect } from 'react';
import {
  ROWS_PER_PAGE,
  useDataTableStore,
} from '../../stores/useDataTableStore';
import { DataTableBody } from './DataTableBody';
import { Data } from '../../../types/data';

export interface HeadCell {
  id: string;
  disablePadding: boolean;
  label: string;
  component?: ReactElement;
  numeric?: string;
}

export interface TableProps {
  numSelected?: number;
  rowCount?: number;
  rows: Data[];
  headCells: HeadCell[];
  loading?: boolean;
  actions?: React.ReactNode;
  onSelected?: (selected: number[]) => void;
  onNavigate?: (id: number) => void;
}

export function DataTable(props: TableProps) {
  const selected = useDataTableStore((state) => state.selected);
  const page = useDataTableStore((state) => state.page);
  const rowsPerPage = useDataTableStore((state) => state.rowsPerPage);
  const order = useDataTableStore((state) => state.order);
  const orderBy = useDataTableStore((state) => state.orderBy);
  const useActions = useDataTableStore((state) => state.actions);
  const { setState } = useActions;
  const { onSelected } = props;

  const {
    numSelected = selected.length,
    rows,
    headCells,
    loading,
    actions,
  } = props;

  const rowCount = rows.length;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';

    setState('order', isAsc ? 'desc' : 'asc');
    setState('orderBy', property);
  };

  const handleCreateSort =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id) as number[];

      setState('selected', newSelected);

      return;
    }
    setState('selected', []);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState('rowsPerPage', parseInt(event.target.value, 10));
    setState('page', 0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setState('page', newPage);
  };

  const handleDoubleClick = (id: number) => {
    if (props.onNavigate) {
      props.onNavigate(id);
    }
  };

  useEffect(() => {
    if (onSelected) {
      onSelected(selected);
    }
  }, [selected, onSelected]);

  return (
    <>
      {loading && (
        <LinearProgress
          color='secondary'
          sx={{ height: '1px', marginBottom: '-1px' }}
        />
      )}
      <Table aria-labelledby='tableTitle'>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'>
              <Checkbox
                checked={numSelected === rowCount}
                color='primary'
                indeterminate={numSelected > 0 && numSelected < rowCount}
                inputProps={{
                  'aria-label': 'select all',
                }}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                align={headCell.numeric ? 'right' : 'left'}
                key={headCell.id as string}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={handleCreateSort(headCell.id as string)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
            {actions && <TableCell />}
          </TableRow>
        </TableHead>
        <DataTableBody
          actions={actions}
          headCells={headCells}
          onDoubleClick={(row) => handleDoubleClick(row._id)}
          rows={rows}
        />
      </Table>
      <TablePagination
        component='div'
        count={rows.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[
          ROWS_PER_PAGE,
          ROWS_PER_PAGE * 2,
          ROWS_PER_PAGE * 5,
        ]}
      />
    </>
  );
}
