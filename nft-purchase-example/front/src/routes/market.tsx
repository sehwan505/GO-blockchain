import React, { FC, useEffect, useState } from "react";
import {mintTokenContract, saleTokenContract, saleTokenAddress} from "../contracts/index"
import Header from "../components/header"
import Card from "../components/card"
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from '@material-ui/core/Button';

interface CardListProps {
  account: string;
}

type iTokenData = {
    TokenId: string;
    TokenType: string;
    TokenPrice: string; // ?는 해당 속성이 존재하지 않을 수도 있다는 것을 명시
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle'
  }
});

const Market: React.FC<CardListProps> = ({ account }) => {
  const [cardArray, setCardArray] = useState<iTokenData[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const classes = useStyles();

	
  const getOnSaleToken = async () => {
	  try{
		    setIsLoading(true);
			if (!account) {
				return;
			}
			const tempArray:iTokenData[] = [];
				
			const balanceLength = await saleTokenContract.methods
				.getOnSaleTokenArrayLength()
				.call()
			console.log(balanceLength);
			if (balanceLength == 0) {
				return ;
			}
		    for (let i = 0; i < parseInt(balanceLength, 10); i++){
				const tokenId = await saleTokenContract.methods
				.onSaleTokenArray(i)
				.call()
				
				const tokenType = await mintTokenContract.methods
				.tokenTypes(tokenId)
				.call()
				
				const tokenPrice = await saleTokenContract.methods
				.tokenPrices(tokenId)
				.call()
				
				console.log("tokenId");
				tempArray.push({TokenId: tokenId, TokenType: tokenType, TokenPrice: tokenPrice})
			}
		  	console.log(tempArray);
			setCardArray(tempArray);
		    setIsLoading(false);
		}catch (error){
			console.log(error)
		}
  }
  
  const onClickBuy = (tokenId: string, tokenPrice: string) => {
	  if (!account) {
		return;
	  }
	  const response = saleTokenContract.methods
	  .purchaseToken(tokenId)
	  .send({from: account[0], gasLimit:3000000, value: tokenPrice})
	  if (response.status){
		  getOnSaleToken();
	  }
  }
  
  useEffect(() => {
	  if (!account) {
		  return;
	  }
	  console.log("getMyCard");
	  getOnSaleToken();
  }, []);

  return (
	<>
    <div>
	  {isLoading ? 
		<div className={classes.root}>
		    <CircularProgress />
        </div>  
		:
		  <>
		  	  <Header />
			  <Grid container spacing={3}>
			  {cardArray && cardArray.map((card, index) => (
				<Grid item xs={3}>
					<Card key={card.TokenId} account={account} cardId={card.TokenId} cardType={card.TokenType} cardPrice={card.TokenPrice} />
				    <Button variant="contained" color="primary" onClick={() => {onClickBuy(card.TokenId, card.TokenPrice);}}>구매</Button>
				</Grid>
			  ))}
			  </Grid>
		  </>
	  }
   </div>
   </>
  );
};

export default Market;

