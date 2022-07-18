import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeywordsList from './KeywordsList';
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function AccordionKeywords() {
    const { accordionKeywordsIsExpanded, selectedMarka, selectedSubcategory, selectedKeyword, fetching } = useSelector(state => state.accordion)
    const dispatch = useDispatch()


    function toggleAccordion() {
        document.getElementById("navbar").style.top = "0";
        dispatch(actions.toggleAccordionKeywords())
    }

    return (

        <Accordion expanded={accordionKeywordsIsExpanded} onChange={toggleAccordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>ANAHTAR KELEME {selectedKeyword !== '' ? <span style={{ fontWeight: 700 }}> - {selectedKeyword} {selectedSubcategory} </span> : ''}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '70vh', overflow: 'auto' }}>

                    <KeywordsList />
                </div>




            </AccordionDetails>
        </Accordion>



    );
}