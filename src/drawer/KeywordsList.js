

//import NavList from './NavList';
import { AppContext } from '../App';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import { Box } from '@mui/material';

// import ListItemButton from '@mui/material/ListItemButton';

// import ListItemText from '@mui/material/ListItemText';
import subcatObj from '../category-nav-counter.json'
const categories = Object.values(subcatObj).flat()
export default function KeywordsList() {
    return <AppContext.Consumer>{
        (({ navKeywords }) => {


            return <div style={{ position: 'relative' }}>

                <Box sx={{ marginTop:{xs:0,md:10}, position:{xs:'static',md:'fixed'},zIndex:1000000 }}>
                    <div>
                        <CategoryNav />
                    </div>
                    <List>
                        {/* {navKeywords && navKeywords.map((m, i) => {

                            const { groupName } = m
                  
                   
                            return <ListItemButton onClick={() => {
                                
                                const ancortab = document.getElementById('ancc')

                                window.scrollTo(0, document.getElementById(groupName).offsetTop -ancortab.offsetTop)
                            

                            }}


                            >
                                <ListItemText primary={groupName} />
                            </ListItemButton>

                        })


                        } */}
                    </List>
                </Box></div>
        })
    }</AppContext.Consumer>

}








function CategoryNav() {
    return <AppContext.Consumer>{({ groupName, selectSubcategory, selectedNavIndex }) => {

        return <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{groupName}</FormLabel>
            <div style={{ maxHeight: '85vh', overflow: 'auto' }}>
                <RadioGroup

                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name={groupName}

                >
                    {
                        categories.filter(f => {
                            return f.groupName === groupName
                        }).sort((a,b)=>b.count-a.count).map((m, i) => {
                         
                            return <FormControlLabel key={i} value={m.keywords} control={<Radio checked={selectedNavIndex.includes(m.index)} size="small" onChange={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType })} />} label={<div ><span>{m.title}</span><span style={{ color: '#9ea7aa', fontSize: 14 }}> {m.count}</span></div>} />
                        })
                    }


                </RadioGroup>
            </div>
        </FormControl>

    }}</AppContext.Consumer>
}


