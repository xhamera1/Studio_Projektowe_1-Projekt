import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import {
  AccountCircle,
  Bloodtype,
  Brightness4,
  Brightness7,
  Grain,
  History,
  Home,
  MonitorHeart
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../contexts/ThemeContextProvider';

const drawerWidth = 240;

const menuItems = [
  {
    text: 'Home',
    icon: <Home color={'secondary'} />,
    path: '/'
  },
  {
    text: 'Account',
    icon: <AccountCircle color={'primary'} />,
    path: '/account'
  },
  {
    text: 'History',
    icon: <History />,
    path: '/prediction-history'
  }
];

const predictionItems = [
  {
    text: 'Diabetes',
    icon: <Bloodtype color={'error'} />,
    path: '/questionnaire/diabetes'
  },
  {
    text: 'Heart Attack',
    icon: <MonitorHeart color={'error'} />,
    path: '/questionnaire/heart-attack'
  },
  {
    text: 'Stroke',
    icon: <Grain color={'error'} />,
    path: '/questionnaire/stroke'
  }
];

export const SideMenu = () => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <List>
          {menuItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <Typography
            variant="overline"
            sx={{ paddingLeft: 2, color: 'text.secondary' }}
          >
            Predictions
          </Typography>
          {predictionItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleTheme} aria-label="Toggle theme">
              <ListItemIcon>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </ListItemIcon>
              <ListItemText
                primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
