import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container sx={{ py: 2 }}>
      <Outlet />
    </Container>
  );
};

export default Layout;
