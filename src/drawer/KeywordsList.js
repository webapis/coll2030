
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NavList from './NavList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { AppContext } from '../App';
import TreeView from '@mui/lab/TreeView';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button'
export default function KeywordsList() {
    return <AppContext.Consumer>{
        (({ navKeywords, selectedKeywords, fetchingKeywords, setSelectedNavIndex }) => {


            return <div style={{ position: 'relative' }}>
                <div style={{ display: fetchingKeywords ? 'block' : 'none', width: '100%', height: '100vh', backgroundColor: '#fafafa', position: 'absolute', top: 0, bottom: 0, zIndex: 10, opacity: 0.7, color: 'white' }}>  <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="inherit" />
                </Box></div>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 2 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                
                    
                >{
                        <TreeView defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />} expanded={navKeywords.map(m => m.groupName)}>
                            {
                                navKeywords && navKeywords.map((m, i) => {

                                    const { groupName, keywords } = m

                                    debugger
                                    return  <NavList   key={i} groupName={groupName} keywords={keywords} />
                                        

                                       
                                    
                                })
                            }
                        </TreeView>


                    }</List></div>
        })
    }</AppContext.Consumer>





}






/*

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NavList from './NavList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { AppContext } from '../App';
export default function KeywordsList() {
    return <AppContext.Consumer>{
        (({ navKeywords, selectedKeywords,fetchingKeywords ,setSelectedNavIndex}) => {
        
      
            return <div style={{ position: 'relative' }}>
                <div style={{ display: fetchingKeywords ? 'block' : 'none', width: '100%', height: '100vh', backgroundColor: '#fafafa', position: 'absolute', top: 0, bottom: 0, zIndex: 10, opacity: 0.7, color: 'white' }}>  <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="inherit" />
                </Box></div>
                        <List
                    sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 2 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <Stack direction="row" spacing={1}>
                                {selectedKeywords.map((m, i) => {
                                    const { index, keyword } = m
                                 
                                    return <Chip key={i} label={m.keyword} onDelete={() => setSelectedNavIndex({ index, keyword })} />
                                })}
                            </Stack>
                        </ListSubheader>
                    }
                >{
                        navKeywords && navKeywords.map((m, i) => {
                        
                            const { groupName, keywords } = m
                            return <NavList key={i} groupName={groupName} keywords={keywords} />
                        })

                    }</List></div>
        })
    }</AppContext.Consumer>





}


*/