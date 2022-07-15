import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function SimpleAccordion() {
  const { accordionOneValue, accordionOneIsExpanded } = useSelector(state => state.accordion)
  const dispatch = useDispatch()


  function handleAccordion(e) {
    e.preventDefault()
    const { id } = e.target

    dispatch(actions.setAccordionOne(id))
  }

  function toggleAccordion() {
    dispatch(actions.toggleAccordionOne())
  }

  return (

    <Accordion expanded={accordionOneIsExpanded} onChange={toggleAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{accordionOneValue.toUpperCase()}{accordionOneValue !== '' ? (accordionOneValue === 'markalar' ? "'A göre arama" : "'E göre arama") : ''}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <Link href="#" underline="hover" sx={{ marginBottom: 2 }} onClick={handleAccordion} id="markalar">
            MARKALAR - Defacto, Boyner, Koton,...
          </Link>
          <Link href="#" underline="hover" onClick={handleAccordion} id="ürünler">
            ÜRÜNLER - Elbise, Gömlek, Mont,...
          </Link>
        </div>

      </AccordionDetails>
    </Accordion>



  );
}