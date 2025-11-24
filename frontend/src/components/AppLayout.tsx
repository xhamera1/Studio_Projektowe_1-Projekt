import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/sidebar/SideMenu';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          minHeight: '100vh'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
