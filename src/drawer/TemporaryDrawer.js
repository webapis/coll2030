import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/accordionSlice'
import SubcategoryList from './SubcategoryList'
export default function TemporaryDrawer() {

  const drawerOpen = useSelector(state => state.accordion.drawerOpen)
  const dispatch = useDispatch()


  const list = () => (
    <Box
      role="presentation"
    >

      <SubcategoryList />

    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>

          <Drawer

            open={drawerOpen}

            onClose={() => {
              
              
            }}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}