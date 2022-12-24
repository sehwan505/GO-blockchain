import React, { FC, useEffect, useState } from "react";
import {Flex, Text, Button, Box} from "@chakra-ui/react";
import {mintTokenContract} from "../contracts/index"

interface MainProps {
	account: string;
}

const Main: FC<MainProps> = ({account}) => {
	const [newCard, setNewCard] = useState<string>("");
	
	const onClickMount = async () => {
		try{
			if (!account) {
				return;
			}
			console.log("A");
			const response = await mintTokenContract.methods.mintToken().send({from: account});
			
		}catch (error){
			console.log(error)
		}
	}
	
	
	return (
		<button onClick={onClickMount}>
 			mint
 		</button>
	)
	
};

export default Main;



// 		<Flex 
// 			w="full"
// 			h="100vh"
// 			justifyContent="center"
// 			alignItems="center"
// 			direction="column"
// 			>
// 			<Box>
// 				{newCard ? (
// 					<div>Card</div>
// 				) : (
// 					<Text>Let's mint card</Text>
// 				)}
// 			</Box>
// 			<Box>
// 				<Button mt={4} size="sm" onClick={onClickMount}>
// 					mint
// 				</Button>
// 			</Box>
			
// 		</Flex>