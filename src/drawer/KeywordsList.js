

import NavList from './NavList';
import { AppContext } from '../App';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function KeywordsList() {
    return <AppContext.Consumer>{
        (({ navKeywords}) => {
  

            return <div style={{ position: 'relative' }}>
        
                <div style={{height:'70vh',position:'fixed',width:300,paddingTop:100,paddingBottom:20,overflowY:'scroll'}}>
                            {navKeywords && navKeywords.map((m, i) => {

                                    const { groupName, keywords } = m

                                    
                                    return   <FormControl key={i+'-'}  component="fieldset" variant="standard" >   <FormLabel  component="legend">{groupName}</FormLabel> <NavList    groupName={groupName} keywords={keywords} /> </FormControl >
                                        
                                })
                            

                    }</div></div>
        })
    }</AppContext.Consumer>

}






