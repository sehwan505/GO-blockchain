import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
  },
});

interface CardProps {
	cardType: string;
}

const MyCard: React.FC<CardProps> = ({ cardType }) => {
  const classes = useStyles();
	
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${cardType}.jpg`}
        title="Image"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          카드 이름
        </Typography>
        <Typography variant="body2" component="p">
          설명
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyCard;
