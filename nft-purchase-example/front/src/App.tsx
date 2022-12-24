import React, { FC, useEffect, useState } from "react";
import Main from "./routes/main"

const App: FC = () => {
	const [account, setAccount] = useState<string>("");
	
	
	
	const getAccount = async () => {
		try {
			if (window.ethereum) {
				const temp = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				setAccount(temp);
			}else{
				console.log("no account");
			}
		}catch(error) {
			console.log(error)
		}
	}
	
	useEffect(() => {
		getAccount();
	}, []);
	
	useEffect(() => {
		getAccount();
	}, [account]);
	
	return (
		// <div>{account}</div> 
		<Main account={account}/>
	)
};

export default App;
