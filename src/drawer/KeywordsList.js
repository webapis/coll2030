
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


export default function KeywordsList() {
    return <div id="side-nav" >
                <Box sx={{ marginTop: { xs: 0, md: 15},width:'100%'}}>
                    <CategoryNav />
                </Box></div>
   
}



function CategoryNav() {
    return <AppContext.Consumer>{({ groupNameAccordion, selectSubcategory, selectedNavIndex,setGroupName }) => {


        return categories.map(m => {
            const gName = m[0]
            const cats = m[1]
            return <CategoryAccordion style={{display:'flex',justifyContent:'stretch' }} setGroupName={setGroupName} selectedGroupName={groupNameAccordion} groupName={gName} selectSubcategory={selectSubcategory} selectedNavIndex={selectedNavIndex} categories={cats} />
        })
    }}</AppContext.Consumer>
}





function RadioGroupContainer({ groupName, selectSubcategory, selectedNavIndex, categories }) {

    return <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name={groupName}
            >
                {
                    categories.sort((a, b) => b.count - a.count).map((m, i) => {
                        const matchFound = (selectedNavIndex.split('-').find(f => f === m.index.replace('-', '') ))
                        if(matchFound){
                            console.log(selectedNavIndex,m.index)
                        }
                        return <FormControlLabel id={m.index} key={i} value={m.keywords} control={<Radio checked={matchFound} size="small" onChange={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType, subcatTitle: m.title })} />} label={<div ><span>{m.title}</span><span style={{ color: '#9ea7aa', fontSize: 14 }}> {m.count}</span></div>} />
                    })
                }
            </RadioGroup>
  
    </FormControl>
}



function CategoryAccordion({setGroupName, groupName, selectSubcategory, selectedNavIndex, categories, selectedGroupName }) {
    return (
    
            <Accordion sx={{width:{xs:'30vh',sm:'15vh',md:'20vh'}}} expanded={groupName===selectedGroupName}   onChange={()=>setGroupName(groupName)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={groupName}
                 
                >
                    <Typography>{groupName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {groupName===selectedGroupName&&<RadioGroupContainer selectedGroupName={selectedGroupName} groupName={groupName} selectSubcategory={selectSubcategory} selectedNavIndex={selectedNavIndex} categories={categories} />}

                </AccordionDetails>
            </Accordion>

     
    );
}