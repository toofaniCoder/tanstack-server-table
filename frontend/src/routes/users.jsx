import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

const Users = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Subroto Biswas</TableCell>
              <TableCell>subroto1111@test.com</TableCell>
              <TableCell>24</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subroto Biswas</TableCell>
              <TableCell>subroto1111@test.com</TableCell>
              <TableCell>24</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subroto Biswas</TableCell>
              <TableCell>subroto1111@test.com</TableCell>
              <TableCell>24</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subroto Biswas</TableCell>
              <TableCell>subroto1111@test.com</TableCell>
              <TableCell>24</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
