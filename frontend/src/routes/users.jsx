/* eslint-disable no-unused-vars */
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
  Stack,
  TextField,
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
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [globalFilter, setGlobalFilter] = useState('');
  const data = useLoaderData();
  // log data: console.log('data from server:', data);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (globalFilter.length > 0) {
      setSearchParams({ search: globalFilter });
    } else {
      setSearchParams(() => {
        const newParams = Object.fromEntries(searchParams);
        delete newParams.search;
        return newParams;
      });
    }
  }, [globalFilter]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Stack sx={{ p: 2, position: 'sticky' }}>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search all columns..."
          />
        </Stack>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
