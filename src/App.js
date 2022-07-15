
import { useSelector, useDispatch } from 'react-redux'
import SearchInput from './comp/SearchInput'
import Breadcrumb from './comp/Breadcrumb';
import AccordionOne from './google/AccordionOne';
import AccordionMarka from './google/AccordionMarka';
import AccordionSubcategory from './google/AccordionSubcateogry';
import AccordionKeywords from './google/AccordionKeywords';
import AccordionProduct from './google/AccordionProduct'
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import { Container } from '@mui/material';
export default function () {
    const {

        accordionOneValue,
        selectedMarka,
        selectedSubcategory,
        selectedKeyword


    } = useSelector(state => state.accordion)

    function showNavigation(){
        document.getElementById('navbar').scrollIntoView();
    }
    return (
        <div >
            <div id="navbar" style={{ paddingBottom: 50 }}>
                <Breadcrumb />
                <SearchInput />
                <Fab variant="extended" onClick={showNavigation}  sx={{position:'fixed'}} id="floadingnav">
                    <HomeIcon />
                    
                </Fab>
                <Container>
                    <AccordionOne />
                    {accordionOneValue === 'markalar' && <AccordionMarka />}
                    {selectedMarka !== '' && <AccordionSubcategory sx={{ height: 500, overflow: 'auto' }} />}
                    {selectedSubcategory !== '' && <AccordionKeywords />}
                    {selectedKeyword !== '' && <AccordionProduct />}
                </Container>

            </div>
            <Container >


            </Container>

            <div>

            </div>
        </div>
    )
}