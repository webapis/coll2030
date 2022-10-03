
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
export default function SubcategoryCard({indexes,selectSubcategory}){
const group =indexes[0]['group']
    return (
        <Card sx={{}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             {group}
            </Typography>

  

          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {indexes.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
    
        return (
          <ListItem
            key={value.index}
       
            disablePadding
          >
            <ListItemButton onClick={()=>selectSubcategory({functionName:value.functionName,index:value.index})}>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={value.subcategory} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </CardContent>

        </Card>
      );
}