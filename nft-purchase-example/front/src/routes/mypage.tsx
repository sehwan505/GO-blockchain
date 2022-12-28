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

const MyPage: React.FC<CardListProps> = ({ account }) => {
  const [cardArray, setCardArray] = useState<iTokenData[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const classes = useStyles();

	
  const getMyCards = async () => {
	  try{
		    setIsLoading(true);
			if (!account) {
				return;
			}
			const tempArray:iTokenData[] = [];
				
			const balanceLength = await mintTokenContract.methods
				.balanceOf(account[0])
				.call()
			if (balanceLength == 0) {
				return ;
			}
			const ret = await mintTokenContract.methods
			.getTokens(account[0])
			.call()
			
			console.log(ret);
			
			ret.map((v:iTokenData) => {
				tempArray.push({TokenId: v.TokenId, TokenType: v.TokenType, TokenPrice: v.TokenPrice});
			})
		  	console.log(tempArray);
			setCardArray(tempArray);
		    setIsLoading(false);
		}catch (error){
			console.log(error)
		}
  }
  
  const getSaleStatus = async() => {
	  if (!account) {
		  return ;
	  }
	  const isApprovedForAll = await mintTokenContract.methods
			.isApprovedForAll(account[0], saleTokenAddress)
			.call()
	  setSaleStatus(isApprovedForAll);
  }
  
  const setApprovalForAll = async() => {
	  if (!account) {
		  return ;
	  }
	  const response = await mintTokenContract.methods
			.setApprovalForAll(saleTokenAddress, !saleStatus)
			.send({from: account[0]})
	  if (response) {
		setSaleStatus(!saleStatus);  
	  }
	  
  }
  useEffect(() => {
	  if (!account) {
		  return;
	  }
	  console.log("getMyCard");
	  getMyCards();
	  getSaleStatus();
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
	   		  {!saleStatus ?
				  <Button onClick={setApprovalForAll}>판매자 설정</Button>
			   	:
				  <Button onClick={setApprovalForAll}>판매자 취소</Button>
			  }
			  <Grid container spacing={3}>

			  {cardArray && cardArray.map((card, index) => (
				<Grid item xs={3}>
					<Card key={card.TokenId} account={account} cardId={card.TokenId} cardType={card.TokenType} cardPrice={card.TokenPrice} />
				</Grid>
			  ))}
			  </Grid>
		  </>
	  }
   </div>
   </>
  );
};

export default MyPage;

