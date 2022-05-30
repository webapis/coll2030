

import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useDispatch} from 'react-redux'
import {actions} from '../../store/breadcrumbSlice'
import catNav from './category-nav.json'
const { tree: navs, total } = catNav[0]['nav']
export default function ProductMenu(props) {

    const { handleTabChange } = props
    const dispatch =useDispatch()
  
    function handleSubCategoryClick(subcategory,subCatTotal) {
    dispatch(actions.selectSubcategory({subcategory,subCatTotal}))        
      handleTabChange({}, 2) 
    }

    function handleCategoryClick(category) {
        dispatch(actions.selectCategory(category))
    }
  
    return (<div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, }}
      >
        {Object.entries(navs).map((n, i) => {
          const category = n[0]
          const categoryTotal = n[1]['total']
          const { subcategories } = n[1]
          return (
            <TreeItem onClick={() => handleCategoryClick(category)} key={i} nodeId={category + i} label={<div><span style={{ textTransform: 'uppercase'  }}>{category.replace('-', ' ')}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({categoryTotal})</span></div>}>
              <div style={{ maxHeight: '80vh', overflowX: 'hidden', overflowY: 'visible' }}>
                {Object.entries(subcategories).map((s, c) => {
                  const subcategory = s[0]
                  const subCatTotal = s[1]
                  return <TreeItem sx={{padding:0.1}} key={c} id={subcategory} onClick={() => handleSubCategoryClick(subcategory,subCatTotal)} nodeId={`${subcategory.replace('-', ' ')}-${c}`} label={<span><span style={{ textTransform: 'capitalize' }}>{subcategory}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({subCatTotal})</span></span>} />
  
                })}
              </div>
            </TreeItem>
          )
        })}
      </TreeView>
    </div>)
  }