import * as React from 'react';
import Box from '@mui/material/Box';
import ProductImageList from './ProductImageList'


import { actions } from '../store/breadcrumbSlice'
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
export default function FilterResult(props) {

  const selectedTab = useSelector(state => state.breadcrumb.selectedTab)


 

  return (
    <Box>
      <TabPanel value={selectedTab} index={0} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Container>
          <Subcategories />
        </Container>

      </TabPanel>
      <TabPanel value={selectedTab} index={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        
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
  
  
  const object = subcategories && Object.entries(subcategories) && Object.entries(subcategories)
  
  function handleSubCategoryClick(selectedSubcategory, subCatTotal, regex) {
    
    dispatch(actions.selectSubcategory({ selectedSubcategory, subCatTotal, regex }))

  }
  return <Grid container
  >

    {
      object && object.sort(function (a, b) {

      }).map((m, i) => {
        const subcategory = m[0]
        const subCatTotal = m[1]['count']
        const regex = m[1]['regex']
        
        return {
          subcategory,
          subCatTotal,
          regex
        }
      }).sort(function (a, b) {
        var textA = a.subcategory.toUpperCase();
        var textB = b.subcategory.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }).map((o, i, array) => {
        const { subcategory, subCatTotal, regex } = o
        
        const previousObj = array[i - 1]
        const currentfirstChar = subcategory.charAt(0).toUpperCase()
        
        const previousChar = previousObj && previousObj['subcategory'].charAt(0).toUpperCase()
        
        if (i === 0) {
          return [
            <Grid item xs={12} key={i}>
              {currentfirstChar}
            </Grid>,
            <Grid item xs={12} key={i}>
              <Button onClick={() => handleSubCategoryClick(subcategory, subCatTotal, regex)} id={subcategory}>{subcategory}<Chip sx={{ marginLeft: 1 }} size="small" variant="filled" label={subCatTotal} /></Button>
            </Grid>]
        }


        if (currentfirstChar !== previousChar) {
          
          return [<Grid item xs={12} key={i}>
            {currentfirstChar}
          </Grid>, <Grid item xs={12} key={i}>
            <Button onClick={() => handleSubCategoryClick(subcategory, subCatTotal, regex)} id={subcategory}>{subcategory}<Chip sx={{ marginLeft: 1 }} size="small" variant="filled" label={subCatTotal} /></Button>
          </Grid>]

        }
        if (currentfirstChar === previousChar) {
          return [

            <Grid item xs={12} key={i}>
              <Button onClick={() => handleSubCategoryClick(subcategory, subCatTotal, regex)} id={subcategory}>{subcategory}<Chip sx={{ marginLeft: 1 }} size="small" variant="filled" label={subCatTotal} /></Button>
            </Grid>,

          ]
        }






      })
    }
  </Grid>

}
