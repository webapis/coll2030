import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { useSelector } from 'react-redux';

import SubcategoryList from './SubcategoryList'
export default function TemporaryDrawer() {

  const drawerOpen = useSelector(state => state.accordion.drawerOpen)



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