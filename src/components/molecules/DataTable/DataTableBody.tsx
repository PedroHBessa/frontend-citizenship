import { DataTableItemContextProvider } from '../../contexts/DataTableItemContext';
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDataTableStore } from '../../stores/useDataTableStore';
import { Data } from '../../../types/data';
import { HeadCell } from './DataTable';

type Order = 'asc' | 'desc';

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function getComparator<Key extends keyof never>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean | React.ReactNode },
  b: { [key in Key]: number | string | boolean | React.ReactNode }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

export interface TableBodyProps {
  rows: Data[];
  headCells: HeadCell[];
  actions?: React.ReactNode;
  onDoubleClick?: (row: Data) => void;
}

const DataTableBody = React.memo(
  (props: TableBodyProps) => {
    const selected = useDataTableStore((state) => state.selected);
    const page = useDataTableStore((state) => state.page);
    const rowsPerPage = useDataTableStore((state) => state.rowsPerPage);
    const order = useDataTableStore((state) => state.order);
    const orderBy = useDataTableStore((state) => state.orderBy);
    const isSelected = (id: number) => selected.indexOf(id) !== -1;
    const useActions = useDataTableStore((state) => state.actions);
    const { setState } = useActions;
    const { rows, headCells, actions, onDoubleClick } = props;

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: number[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setState('selected', newSelected);
    };

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo<Data[]>(
      () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        ),
      [order, orderBy, page, rowsPerPage, rows]
    );

    if (!rows.length) {
      return <></>;
    }

    return (
      <TableBody>
        {visibleRows.map((row, index) => {
          const isItemSelected = isSelected(row._id as number);
          const labelId = `table-checkbox-${index}`;

          return (
            <DataTableItemContextProvider
              item={row}
              key={`data-table-row-${row.id as string}-${index}`}
            >
              <TableRow
                aria-checked={isItemSelected}
                hover
                onClick={(event) => handleClick(event, row._id as number)}
                onDoubleClick={() => onDoubleClick?.(row)}
                role='checkbox'
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
                tabIndex={-1}
              >
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={isItemSelected}
                    color='primary'
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    component='th'
                    id={row.id as string}
                    key={`data-table-row-${headCell.id}-${row._id as string} `}
                    padding='none'
                    scope='row'
                  >
                    {headCell.component
                      ? headCell.component
                      : row[headCell.id as string]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell padding='none' sx={{ width: '1%' }}>
                    {actions}
                  </TableCell>
                )}
              </TableRow>
            </DataTableItemContextProvider>
          );
        })}
        {emptyRows > 0 && (
          <TableRow>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  },
  (prevProps, nextProps) => {
    const isEqual = prevProps.rows === nextProps.rows;

    return isEqual;
  }
);

DataTableBody.displayName = 'DataTableBody';

export { DataTableBody };
