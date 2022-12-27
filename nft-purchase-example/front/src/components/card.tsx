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
	cardId: string;
	cardType: string;
	cardPrice: string;
}

const MyCard: React.FC<CardProps> = ({ cardId, cardType, cardPrice }) => {
  const classes = useStyles();
  const nameList = ["혜인", "해린", "민지", "하니", "다니엘"]
	
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${cardType}.jpg`}
        title="Image"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {nameList[parseInt(cardType) % 5]}
        </Typography>
        <Typography variant="body2" component="p">
          설명
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyCard;
