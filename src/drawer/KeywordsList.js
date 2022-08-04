
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NavList from './NavList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
export default function KeywordsList() {
    const {  navKeywords, selectedNavIndex, selectedKeywords,fetchingKeywords } = useSelector(state => state.accordion)
    const dispatch = useDispatch()
  
    useEffect(()=>{
        
        dispatch(actions.setFetchingKeywords(true))

    },[])

  
    useEffect(() => {
       
        if(fetchingKeywords){
            
            if(selectedNavIndex===''){
                fetchNavKeywords(`start`)
            }
            else{
                fetchNavKeywords(selectedNavIndex)
            }
        }
     

    }, [fetchingKeywords])
    function handleRemoveIndex({ index, keyword }) {

        dispatch(actions.setSelectedNavIndex({ index, keyword }))
    }
    function fetchNavKeywords(selectedNavIndex) {
      
         setTimeout(()=>{
            var url = `/api/kadin/nav?navindex=${selectedNavIndex}`
            
            fetch(url).then((response) => response.json()).then(navKeywords => {
                
    
                dispatch(actions.setNavkeywords({ navKeywords }))
    
            })

         },0)
  

    }

  
    return <div style={{position:'relative'}}>
        {fetchingKeywords&& <div style={{width:'100%', height:'100vh', backgroundColor:'#fafafa', position:'absolute', top:0,bottom:0, zIndex:10, opacity:0.7, color:'white'}}>  <Box sx={{ display: 'flex', height:'100%', justifyContent:'center',alignItems:'center' }}>
      <CircularProgress color="inherit"/>
    </Box></div>}
        <List
        sx={{ width: '100%', bgcolor: 'background.paper', marginTop:2 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                <Stack direction="row" spacing={1}>
                    {selectedKeywords.map((m, i) => {
                        const {index,keyword}=m
                    return <Chip  key={i} label={m.keyword} onDelete={() => handleRemoveIndex({ index, keyword })} />})}
                </Stack>
            </ListSubheader>
        }
    >{
            navKeywords && navKeywords.map((m, i) => {
                const {groupName,keywords} = m
            
                return <NavList key={i} groupName={groupName} keywords={keywords} />
            })

        }</List></div>


}




