
import { useSelector, useDispatch } from 'react-redux'
import SearchInput from './comp/SearchInput'
import Breadcrumb from './google/Breadcrumb';
import AccordionOne from './google/AccordionOne';
import AccordionMarka from './google/AccordionMarka';
import AccordionSubcategory from './google/AccordionSubcateogry';
import AccordionKeywords from './google/AccordionKeywords';
import AccordionProduct from './google/AccordionProduct'
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import MainTab from './google/MainTab'
export default function () {
    const {

        accordionOneValue,
        selectedMarka,
        selectedSubcategory,
        selectedKeyword, fetching, keywords, fetchingKeywords, selectedMainTab


    } = useSelector(state => state.accordion)

    function showNavigation() {
        document.getElementById('navbar').scrollIntoView();
    }
    if (fetching) {

    }
    return (
        <div >

            <div id="navbar">
                
                <Breadcrumb />
           
                <MainTab />
                <Container  sx={{paddingLeft:0, paddingRight:0}}>


                    {selectedMainTab === 1 && <AccordionMarka />}
                    {(selectedMarka !== '' || selectedMainTab === 2) && <AccordionSubcategory />}
                    {selectedSubcategory !== '' && (<AccordionKeywords />)}
                </Container>
            </div>
            <div style={{ paddingBottom: 50}}>
                <div id="static-nav" style={{ zIndex: 0 }}>

                    <Container  sx={{paddingLeft:0, paddingRight:0}}>
                        <Breadcrumb />
               
                        <MainTab />

                        {selectedMainTab === 1 && <AccordionMarka />}

                        {(selectedMarka !== '' || selectedMainTab === 2) && <AccordionSubcategory />}

                        {selectedSubcategory !== '' && (<AccordionKeywords />)}

                    </Container>
                </div>
           <Container sx={{paddingLeft:0, paddingRight:0}}>

       
                    {selectedKeyword !== '' && (fetchingKeywords && keywords === null ? (

                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : <AccordionProduct />)}
                  </Container>

            </div>
         

            <div>

            </div>
        </div>
    )
}