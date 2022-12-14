import React, { FC, useEffect, useState } from "react";
import {mintTokenContract} from "../contracts/index"
import Header from "../components/header"
import Card from "../components/card"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface MainProps {
	account: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    width: '50%',
  },
});


const Main: FC<MainProps> = ({account}) => {
	const [newCard, setNewCard] = useState<string[]>(["0", "0"]);
  	const classes = useStyles();

	
	const onClickMount = async () => {
		try{
			if (!account) {
				return;
			}
			const response = await mintTokenContract.methods.mintToken().send({from: account[0], gas:3000000});
			if (response.status) {
				const balanceLength = await mintTokenContract.methods
					.balanceOf(account[0])
					.call()
				const tokenId = await mintTokenContract.methods
					.tokenOfOwnerByIndex(account[0], balanceLength - 1)
					.call()
				
				const type = await mintTokenContract.methods
					.tokenTypes(tokenId)
					.call()
				setNewCard([tokenId, type]);
			}
			console.log(response);
		}catch (error){
			console.log(error)
		}
	}
	
	
	return (
		<>
			<Header />
			<div className={classes.root}>
			  <Card account={account} cardId={newCard[0]} cardType={newCard[1]} cardPrice="0"/>
			  <Button variant="contained" color="primary" onClick={onClickMount}>
				Mint
			  </Button>
			</div>
		</>
	)
	
};

export default Main;
