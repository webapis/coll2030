import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AggregationContext } from '../AggregationRoute'
export default function ReportSelector() {


  return (
    <AggregationContext.Consumer>{({report,setReport}) => {

      return <FormControl sx={{ m: 1, minWidth: 200, marginTop: 0 }} size="small">
        <InputLabel id="demo-select-small">Reports</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={report}
          label="Reports"
          onChange={setReport}
        >

          <MenuItem value='by-brand-collected'>Brand Collected</MenuItem>
          <MenuItem value='by-brand-updated'>Brand Updated</MenuItem>
          <MenuItem value='by-brand-deleted'>Brand Deleted</MenuItem>
          <MenuItem value='by-brand-newdata'>Brand NewData</MenuItem>
          <MenuItem value='total-collected'>Collected</MenuItem>
          <MenuItem value='total-deleted'>Deleted</MenuItem>
          <MenuItem value='total-newdata'>New Data</MenuItem>
          <MenuItem value='total-updated'>Updated</MenuItem>
          <MenuItem value='total-collected-by-subcategory-bar'>Collected Subcategories bar</MenuItem>
          <MenuItem value='collected-subcategory-pie'>Collected Subcategories pie</MenuItem>
          <MenuItem value='by-subcategory-deleted'>Deleted Subcategories</MenuItem>
          <MenuItem value='by-subcategory-updated'>Updated Subcategories</MenuItem>
        </Select>
      </FormControl>
    }}</AggregationContext.Consumer>

  );
}
