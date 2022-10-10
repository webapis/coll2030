
import * as React from 'react';

import CollectedDataContainer from './collected-reports/CollectedDataContainer';
import KeywordsEditorContainer from './keywords-editor/KeywordsEditorContainer';
import KeywordsList from './keywords-editor/KeywordsList';
import AccessedDataContainer from './access-reports/AccessedDataContainer';
import { useSelector } from 'react-redux';
export default function App() {

const {selectedSlice}=useSelector(state=>state.main)

   return <div sx={{ marginTop: 10, display: 'flex' }}>
      <div>
             {selectedSlice ==='keywords' && <KeywordsList/>}
             {selectedSlice==='collected-data' && <CollectedDataContainer/>}
             {selectedSlice==='accessed-data' && <AccessedDataContainer/>}
      </div>

   </div>

}

//'Total', 'By Brand', 'By Category'