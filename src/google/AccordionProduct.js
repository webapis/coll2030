import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductList from './ProductList'
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function SimpleAccordion() {
  const { accordionProductIsExpanded,totalKeyword } = useSelector(state => state.accordion)
  const dispatch = useDispatch()




  function toggleAccordion() {
    dispatch(actions.toggleAccordionOne())
  }

  return (

    <Accordion expanded={accordionProductIsExpanded} onChange={toggleAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Bulunan urunler {totalKeyword}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', flexDirection: 'column'}}>

<ProductList/>
        </div>

      </AccordionDetails>
    </Accordion>



  );
}