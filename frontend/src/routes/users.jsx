/* eslint-disable no-unused-vars */
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
} from '@mui/material';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const users = useLoaderData();
  // log data: console.log('data from server:', data);

  useEffect(() => {
    console.log(pagination);
    setSearchParams({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    });
  }, [pagination]);

  const table = useReactTable({
    data: users.data,
    columns,
    state: { pagination },
    pageCount: users.totalCount / users.count,
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Box component={Stack} direction={'row'} spacing={2} sx={{ p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              show items per page
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              label="show items per page"
            >
              {[5, 10, 20, 25, 30, 40, 50].map((el, index) => (
                <MenuItem key={index} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            placeholder="go to page"
          />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
        <Stack sx={{ p: 2 }} direction={'row'} justifyContent={'space-between'}>
          <Button
            variant="contained"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            previous page
          </Button>
          <Typography>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </Typography>
          <Button
            variant="contained"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            next page
          </Button>
        </Stack>
      </TableContainer>
    </div>
  );
};

export default Users;
