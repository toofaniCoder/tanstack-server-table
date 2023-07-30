/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import _ from 'lodash';

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

const Users = () => {
  const data = useLoaderData();
  // log data: console.log('data from server:', data);

  const [sorting, setSorting] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (sorting.length !== 0) {
      const [sortField, sortyBy] = Object.values(sorting[0]);
      setSearchParams({ sort: `${sortField}:${sortyBy ? 'desc' : 'asc'}` });
    } else {
      setSearchParams(_.omit(Object.fromEntries(searchParams), 'sort'));
    }
  }, [sorting]);

  const table = useReactTable({
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    manualSorting: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log('logging sorting state:', sorting[0]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: (theme) => theme.palette.grey[100],
                      },
                    }}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
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
