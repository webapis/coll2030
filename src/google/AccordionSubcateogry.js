import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MarkaSubcategoryList from './MarkaSubcategoryList'
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';

import SubcategoryList from './SubcategoryList'


export default function AccordionSubcategory() {
  const { accordionSubcategoryIsExpanded, selectedSubcategory, accordionOneValue, selectedMainTab } = useSelector(state => state.accordion)
  const dispatch = useDispatch()




  function toggleAccordion() {

    dispatch(actions.toggleAccordionSubcategory())
  }

  return (

    <Accordion expanded={accordionSubcategoryIsExpanded} onChange={toggleAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div component="div"><Typography variant="overline"  >ÜRÜN KATEGORİSİ:</Typography>  {selectedSubcategory !== '' ? <span style={{fontWeight:800,fontSize:12}}> - {selectedSubcategory.toUpperCase()} </span> : ''}</div>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', flexDirection: 'column',  maxHeight: '90vh', overflow: 'auto' }}>
          {selectedMainTab === 1 && <MarkaSubcategoryList />}
          {selectedMainTab === 2 && <SubcategoryList />}

        </div>

      </AccordionDetails>
    </Accordion>



  );
}