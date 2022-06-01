import * as React from 'react';
import Box from '@mui/material/Box';
import ProductImageList from './ProductImageList'

import MarkaMenu from './markaMenu';
import { actions } from '../store/breadcrumbSlice'
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
export default function FilterResult(props) {
  const dispatch = useDispatch()
  const selectedTab = useSelector(state => state.breadcrumb.selectedTab)


  function handleChange(event, tabId) {
    dispatch(actions.selectTab(tabId))
  }

  return (
    <Box>
      <TabPanel value={selectedTab} index={0} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Container>
          <Subcategories />
        </Container>

      </TabPanel>
      <TabPanel value={selectedTab} index={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <MarkaMenu sx={{ height: "100%" }} handleTabChange={handleChange} />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <ProductImageList />
      </TabPanel>


    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}

      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </Box>
  );
}


function Subcategories() {
  const dispatch = useDispatch()
  const subcategories = useSelector(state => state.breadcrumb.subcategories)
  const object = subcategories && Object.entries(subcategories)[1] && Object.entries(subcategories)[1][1]
  function handleSubCategoryClick(selectedSubcategory, subCatTotal) {

    dispatch(actions.selectSubcategory({ selectedSubcategory, subCatTotal }))

  }
  return <Grid container
  >

    {
      object && Object.entries(object).sort(function (a, b) {

      }).map((m, i) => {
        return {
          subcategory: m[0],
          subCatTotal: m[1]
        }
      }).sort(function (a, b) {
        var textA = a.subcategory.toUpperCase();
        var textB = b.subcategory.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }).map((o, i, array) => {
        const { subcategory, subCatTotal } = o
        const previousObj = array[i - 1]
        const currentfirstChar = subcategory.charAt(0).toUpperCase()
        debugger;
        const previousChar = previousObj && previousObj['subcategory'].charAt(0).toUpperCase()
        debugger;
        if (i === 0) {
          return [
            <Grid item xs={12} key={i}>
              {currentfirstChar}
            </Grid>,
            <Grid item xs={12} key={i}>
              <Button onClick={() => handleSubCategoryClick(subcategory, subCatTotal)} id={subcategory}>{subcategory}<Chip sx={{ marginLeft: 1 }} size="small" variant="filled" label={subCatTotal} /></Button>
            </Grid>]
        }


        if (currentfirstChar !== previousChar) {
          debugger;
          return [<Grid item xs={12} key={i}>
            {currentfirstChar}
          </Grid>, <Grid item xs={12} key={i}>
            <Button onClick={() => handleSubCategoryClick(subcategory, subCatTotal)} id={subcategory}>{subcategory}<Chip sx={{ marginLeft: 1 }} size="small" variant="filled" label={subCatTotal} /></Button>
          </Grid>]

        }
        if (currentfirstChar !== previousChar) {
          return [

            <Grid item xs={12} key={i}>
              <Button onClick={() => handleSubCategoryClick(subcategory, subCatTotal)} id={subcategory}>{subcategory}<Chip sx={{ marginLeft: 1 }} size="small" variant="filled" label={subCatTotal} /></Button>
            </Grid>,

          ]
        }






      })
    }
  </Grid>

}