import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeywordsList from './KeywordsList';
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function AccordionKeywords() {
    const { accordionKeywordsIsExpanded, selectedMarka, selectedSubcategory, selectedKeyword, fetchingKeywords, keywords } = useSelector(state => state.accordion)
    const dispatch = useDispatch()


    useEffect(() => {

        if (selectedSubcategory.length > 0) {
            debugger
            dispatch(actions.setFetchingKeywords(true))
            setTimeout(() => {

                if (selectedMarka.length > 0) {
                    fetch(`/keywords/marka/${selectedMarka}.json`).then((response) => { return response.json() }).then((data) => {
                        const keywords = data[selectedSubcategory]

                        dispatch(actions.setKeywords(keywords))
                    })
                }
                else if (selectedMarka === '' && selectedSubcategory.length > 0) {
                    fetch(`/keywords/category/${selectedSubcategory}.json`).then((response) => { return response.json() }).then((data) => {
                        dispatch(actions.setKeywords(data))
                    })

                }


            }, 500)

        }


    }, [selectedSubcategory])

    function toggleAccordion() {
        document.getElementById("navbar").style.top = "0";
        dispatch(actions.toggleAccordionKeywords())
    }

    if (fetchingKeywords && keywords === null) {
        debugger

        return (

            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )

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
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflow: 'auto' }}>

                    <KeywordsList />
                </div>




            </AccordionDetails>
        </Accordion>



    );
}