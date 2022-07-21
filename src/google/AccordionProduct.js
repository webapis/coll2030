import * as React from 'react';
import  { useRef, useEffect,useCallback } from "react"
//import Accordion from '@mui/material/Accordion';
//import AccordionSummary from '@mui/material/AccordionSummary';
//import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductList from './ProductList'
import { actions } from '../store/accordionSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function SimpleAccordion() {
  const { totalKeyword ,fetchingKeywords} = useSelector(state => state.accordion)
  const dispatch = useDispatch()

  const ref = useRef()

  // The scroll listener
  const handleScroll = useCallback(() => {
    console.log("scrolling")

    var prevScrollpos = window.pageYOffset;

  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
   // document.getElementById("navbar").style.top = "0";
  

  } else {
  //document.getElementById("navbar").style.top = "-260px";
   //document.getElementById("navbar").style.height="120vh"
  }
  prevScrollpos = currentScrollPos;


  }, [])

  useEffect(() => {
    const div = ref.current
    div.addEventListener("scroll", handleScroll)
  }, [handleScroll])
  // function toggleAccordion() {
  //   dispatch(actions.toggleAccordionOne())
  // }

  return (

    <div  >
   
        <Typography>Bulunan urunler {totalKeyword}</Typography>
  
        <div id="prdt" style={{ display: 'flex', flexDirection: 'column'}} className="scrollableContainer" ref={ref}>
       {fetchingKeywords===false ?<ProductList/>:'Loading'}
        </div>

    </div>



  );
}