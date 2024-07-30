import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';





const HomeCard = ({ review }) => {
  const { id, name, date, comment, description,image } = review;

  return (
    <Card sx={{ maxWidth: 345, height: '100%', border: "solid 1px black", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }} key={id} className='Home-Card-Body'>
      <CardContent sx={{ minHeight: '100%' }} className='Home-Card-Body-Content'>
        <Box>
          <img src={image} alt="" />
        </Box>
        <Typography variant="h5" gutterBottom component="div">
          {comment}
        </Typography>
        <Typography variant="body2" >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCard;