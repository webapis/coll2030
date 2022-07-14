
import { useSelector, useDispatch } from 'react-redux'
import SearchInput from './comp/SearchInput'
import Breadcrumb from './comp/Breadcrumb';
import AccordionOne from './google/AccordionOne';
import AccordionMarka from './google/AccordionMarka';
import AccordionSubcategory from './google/AccordionSubcateogry';
import AccordionKeywords from './google/AccordionKeywords';
import AccordionProduct from './google/AccordionProduct'
import { Container } from '@mui/material';
export default function () {
    const {

        accordionOneValue,
        selectedMarka,
        selectedSubcategory,
        selectedKeyword


    } = useSelector(state => state.accordion)

    return (
        <div>
            <div id="navbar" style={{ paddingBottom: 5 }}>
                <Breadcrumb />
                <SearchInput />
                <Container>
                    <AccordionOne />
                    {accordionOneValue === 'markalar' && <AccordionMarka />}
                    {selectedMarka !== '' && <AccordionSubcategory />}
                    {selectedSubcategory !== '' && <AccordionKeywords />}
                
                </Container>

            </div>
            <Container >

            {selectedKeyword !== '' && <AccordionProduct />}
            </Container>
          
            <div>

            </div>
        </div>
    )
}