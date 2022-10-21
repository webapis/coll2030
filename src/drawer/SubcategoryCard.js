
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Link from '@mui/material/Link';

export default function SubcategoryCard({indexes,selectSubcategory}){
const group =indexes[0]['groupName']

    return (
        <Card sx={{margin:1}}>
          <CardContent>
            <Typography sx={{ fontSize:16 }} color="text.secondary" gutterBottom>
             {group}
            </Typography>

  

          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {indexes.map((value) => {
   
        return (
          <ListItem
            key={value.index}
       
          
          >
            <Link style={{ display:'flex',width:'100%', justifyContent:'space-between'}} underline="hover" onClick={()=>selectSubcategory({functionName:value.functionName,index:value.index})}>

             
           <span>{value.title}</span> <span style={{color:'#9ea7aa',fontSize:14}}>0</span>
           
          
            </Link>
          </ListItem>
        );
      })}
    </List>
    </CardContent>

        </Card>
      );
}