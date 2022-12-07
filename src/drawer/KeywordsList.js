
import { AppContext } from '../App';
import FormControl from '@mui/material/FormControl';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';



import subcatObj from '../category-nav-counter.json'

const categories = Object.entries(subcatObj)

debugger
export default function KeywordsList() {
    return <AppContext.Consumer>{
        (() => {


            return <div id="side-nav">

                <Box sx={{ marginTop: { xs: 0, md: 10}}}>

                    <CategoryNav />


                </Box></div>
        })
    }</AppContext.Consumer>

}








function CategoryNav() {
    return <AppContext.Consumer>{({ groupName, selectSubcategory, selectedNavIndex }) => {


        return categories.map(m => {
            const gName = m[0]
            const cats = m[1]
            return <CategoryAccordion selectedGroupName={groupName} groupName={gName} selectSubcategory={selectSubcategory} selectedNavIndex={selectedNavIndex} categories={cats} />
        })
    }}</AppContext.Consumer>
}





function RadioGroupContainer({ groupName, selectSubcategory, selectedNavIndex, categories }) {
    return <FormControl>
        <div style={{ maxHeight: '100vh', overflow: 'auto' }}>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name={groupName}
            >
                {
                    categories.sort((a, b) => b.count - a.count).map((m, i) => {
                        const matchFound = selectedNavIndex.split('-').find(f => f === m.index.replace('-', ''))
                        return <FormControlLabel id={m.index} key={i} value={m.keywords} control={<Radio checked={matchFound} size="small" onChange={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType, subcatTitle: m.title })} />} label={<div ><span>{m.title}</span><span style={{ color: '#9ea7aa', fontSize: 14 }}> {m.count}</span></div>} />
                    })
                }
            </RadioGroup>
        </div>
    </FormControl>
}



function CategoryAccordion({ groupName, selectSubcategory, selectedNavIndex, categories, selectedGroupName }) {
    return (
    
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={groupName}
                >
                    <Typography>{groupName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroupContainer groupName={groupName} selectSubcategory={selectSubcategory} selectedNavIndex={selectedNavIndex} categories={categories} />

                </AccordionDetails>
            </Accordion>

     
    );
}