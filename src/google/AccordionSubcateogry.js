import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MarkaSubcategoryList from './MarkaSubcategoryList'
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';
import { height } from '@mui/system';

export default function AccordionSubcategory() {
  const { accordionSubcategoryIsExpanded, selectedSubcategory } = useSelector(state => state.accordion)
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
        <Typography>ÜRÜN KATEGORİSİ {selectedSubcategory !== '' ? ' - ' + selectedSubcategory : ''}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <MarkaSubcategoryList />
        </div>

      </AccordionDetails>
    </Accordion>



  );
}