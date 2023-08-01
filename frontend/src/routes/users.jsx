/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Stack,
} from '@mui/material';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('name', {
    header: 'Full Name',
  }),
  columnHelper.accessor('email', {
    header: 'E-mail Address',
  }),
  columnHelper.accessor('age', {
    header: 'Age',
  }),
];

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [columnFilters, setColumnFilters] = useState([]);
  const data = useLoaderData();
  // log data: console.log('data from server:', data);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (columnFilters.length > 0) {
      setSearchParams({
        search: columnFilters.map((el) => `${el.id}:${el.value}`).join(','),
      });
    } else {
      setSearchParams((params) => {
        const newParams = { ...params };
        delete newParams.search;
        return newParams;
      });
    }
  }, [columnFilters]);

  console.log('column filtering: ', columnFilters);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    <Stack spacing={1}>
                      <span>
                        {' '}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                      {/* <TextField
                        value={header.column.getFilterValue()}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        size="small"
                        placeholder={`Search By ${flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}....`}
                      /> */}
                      <DebouncedInput
                        value={header.column.getFilterValue()}
                        onChange={(value) =>
                          header.column.setFilterValue(value)
                        }
                        size="small"
                        placeholder={`Search By ${flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}....`}
                      />
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
