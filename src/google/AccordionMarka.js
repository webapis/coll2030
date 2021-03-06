import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';
import MarkaList from './MarkaList';
export default function AccordionMarka() {
    const { accordionMarkaValue, accordionMarkaIsExpanded,selectedMarka } = useSelector(state => state.accordion)
    const dispatch = useDispatch()
    



    function toggleAccordion() {
        
        dispatch(actions.toggleAccordionMarka())
    }

    return (
        <Accordion expanded={accordionMarkaIsExpanded} onChange={toggleAccordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              
            >
                <div  component="div"><Typography variant="overline">MARKA: </Typography>{selectedMarka!==''? <span style={{fontWeight:800,fontSize:12}}> - {selectedMarka.toUpperCase()} </span>:''}</div>
            </AccordionSummary>
            <AccordionDetails   >
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight:'90vh', overflow:'auto' }}>

                    <MarkaList/>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}