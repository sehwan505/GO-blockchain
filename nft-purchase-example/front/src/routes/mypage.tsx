import React, { FC, useEffect, useState } from "react";
import {mintTokenContract} from "../contracts/index"
import Header from "../components/header"
import Card from "../components/card"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface CardListProps {
  account: string;
}

const MyPage: React.FC<CardListProps> = ({ account }) => {
  const [cardArray, setCardArray] = useState<string[]>();
	
  const getMyCards = async () => {
	  try{
			if (!account) {
				return;
			}
			const tempArray = [];
			if (response.status) {
				
				const balanceLength = await mintTokenContract.methods
					.balanceOf(account[0])
					.call()
				
				for (let i = 0; i < parseInt(balanceLength, 10); i++) {
					const tokenId = await mintTokenContract.methods
					.tokenOfOwnerByIndex(account[0], i)
					.call()
					
					const type = await mintTokenContract.methods
					.tokenTypes(tokenId)
					.call()
					
					tempArray.push(type);
				}
				
				setCardArray(tempArray)
			}
			console.log(response);
		}catch (error){
			console.log(error)
		}
  }
  
  useEffect(() => {
	  if (!account) {
		  return;
	  }
	  getMyCards();
  }, [account]);

  return (
	<>
    <div>
	  <Header />
      {cardArray && cardArray.map((card, index) => (
        <Card key={index} cardType={card} />
      ))}
    </div>
	</>
  );
};

export default MyPage;

