import React, { FC, useEffect, useState } from "react";
import {mintTokenContract} from "../contracts/index"
import Header from "../components/header"
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
	const [newCard, setNewCard] = useState<string>("");
  	const classes = useStyles();

	
	const onClickMount = async () => {
		try{
			if (!account) {
				return;
			}
			const response = await mintTokenContract.methods.mintToken().send({from: account[0], gas:3000000});
			console.log(response);
		}catch (error){
			console.log(error)
		}
	}
	
	
	return (
		<>
			<Header />
			<div className={classes.root}>
			  <img src={"logo192.png"} width="300" height="300" alt="Image" className={classes.image} />
			  <Button variant="contained" color="primary" onClick={onClickMount}>
				Mint
			  </Button>
			</div>
		</>
	)
	
};

export default Main;
