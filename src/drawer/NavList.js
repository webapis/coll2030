import * as React from 'react';

import Chip from '@mui/material/Chip';

import { AppContext } from '../App';
export default function NestedList({ groupName, keywords }) {


    
    return (
        <div style={{
       
        }} label={<span style={{ textTransform: 'capitalize' }}>{groupName.substring(2)}</span>}
        >
            <div style={{ padding: 10 }}>
                {keywords && keywords.map((m, a) => {
                
                    const c =m[0]
                    const i=m[1]
                    const k =m[2]
                    return <AppContext.Consumer key={a}>{({ setSelectedNavIndex, selectedNavIndex }) => {
                        return <RenderRow handleClick={setSelectedNavIndex} selectedNavIndex={selectedNavIndex} key={a +'-'} keyword={k} index={i} count={c} />
                    }}</AppContext.Consumer>
                })}
            </div>
        </div>
    );
}



function RenderRow(props) {
    const { handleClick, selectedNavIndex } = props
    const { keyword, index, count } = props;

try {

    const matchfound = selectedNavIndex.split('-').find(f => f === index.replace('-', '')) ? true : false
 
    return (
        <Chip  style={{margin:1}} color={matchfound ? 'success':'default'}   label={<div><span>{keyword}</span><span style={{backgroundColor:'#bdbdbd',padding:2,fontSize:10, borderRadius:20, marginLeft:10,color:'#fafafa'}}>{count}</span></div>} onDelete={matchfound ?() => (handleClick({ index, keyword })):null } onClick={() => handleClick({ index, keyword}) }/>
  

    );
} catch (error) {
    
}

  
}


