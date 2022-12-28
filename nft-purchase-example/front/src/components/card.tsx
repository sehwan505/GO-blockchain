import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {mintTokenContract, saleTokenContract, saleTokenAddress} from "../contracts/index"
import {web3} from "../contracts/index"
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
	account: string;
	cardId: string;
	cardType: string;
	cardPrice: string;
}

const MyCard: React.FC<CardProps> = ({ account, cardId, cardType, cardPrice }) => {
  const classes = useStyles();
  const [inputPrice, setInputPrice] = useState<string>("");
  const [TokenPrice, setTokenPrice] = useState<string>(cardPrice);
  const nameList = ["혜인", "해린", "민지", "하니", "다니엘"];
	
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  	const newValue = e.target.value;
	setInputPrice(newValue);
  }
  
  const sellToken = async () => {
	  try{
		if (!account) {
		  return ;
	    }
		const priceAsWei = web3.utils.toWei(inputPrice, "ether");
	    const response = await saleTokenContract.methods
		  	.setForSaleToken(cardId, priceAsWei)
			.send({from: account[0]})
		if (response.status){
			setTokenPrice(priceAsWei);
		}
	  }catch(e){
		  console.log(e);
	  }
	  
  }
	
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
		{ TokenPrice == "0" ?
		<>
		<TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChange}/>
		<Button onClick={sellToken}>팔기</Button>
		</>
		:
		<>
        <Typography variant="body2" component="p">
          {web3.utils.fromWei(TokenPrice)} MATIC
        </Typography>
		</>
		}
      </CardContent>
    </Card>
  );
};

export default MyCard;
