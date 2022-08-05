import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { AppContext } from '../App';
import SubcategoryList from './SubcategoryList'
export default function TemporaryDrawer() {




  const list = () => (
    <Box
      role="presentation"
    >

      <SubcategoryList />

    </Box>
  );

  return (
    <AppContext.Consumer>
      {({ open, toggleDrawer }) => {
        return <React.Fragment>

          <Drawer

            open={open}

            onClose={toggleDrawer}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      }

      }
    </AppContext.Consumer>
  );
}