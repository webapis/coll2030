
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import Divider from '@mui/material/Divider';

import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../store/collectedDataSlice'



export default function CollectedDataBySubcatDrawer({data}) {
    const markas = Object.entries(data)
    const dispatch = useDispatch()


    return <Drawer variant="permanent"   anchor="right" open={true} onClose={() => {  }}
        sx={{
           
            flexShrink: 0,
            '& .MuiDrawer-paper': {
               
                boxSizing: 'border-box',
            },
        }}
    >
        <Toolbar />
        <Divider />
        <TreeView aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {markas.map((obj, index) => {
                const marka = obj[0]
                const subcategories =obj[1]

                
                return <TreeItem key={marka} nodeId={marka} label={marka} onClick={() => {
                    dispatch(actions.setSelectedMarka({marka,subcategories}))
                }}/>
   
            }

            )}
        </TreeView>
        <Divider />

    </Drawer>
}


/*

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import Divider from '@mui/material/Divider';

import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../store/mainSlice'
import data from '../total-subcategory.json'

const markas = Object.entries(data)
export default function CollectedDataBySubcatDrawer() {
    const dispatch = useDispatch()
    const drawerOpen = useSelector(state => state.main.drawerCollectedBySubcatOpen)

    return <Drawer anchor="right" open={drawerOpen} onClose={() => { dispatch(actions.toggleCollectedBySubcatDrawer()) }}
        sx={{
            width: 200,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 200,
                boxSizing: 'border-box',
            },
        }}
    >
        <Toolbar />
        <Divider />
        <TreeView aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {markas.map((obj, index) => {
                const marka = obj[0]
                const subcategories = Object.entries(obj[1])

                
                return <TreeItem key={marka} nodeId={marka} label={marka} onClick={() => {
                    dispatch(actions.setSelectedMarka(marka))
                }}>
                    {subcategories.map(m => {
                        const subcategory = m[0]
                        const { data } = m[1]
                        
                        return <TreeItem key={subcategory} nodeId={subcategory} label={subcategory} onClick={() => {
                            dispatch(actions.setSelectedSubcategory({ subcategory, data }))
                        }} />
                    })}
                </TreeItem >
            }

            )}
        </TreeView>
        <Divider />

    </Drawer>
}
*/