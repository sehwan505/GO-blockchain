import React, { FC, useEffect, useState } from "react";
import Main from "./routes/main"
import MyPage from "./routes/mypage"
import Market from "./routes/market"
import { BrowserRouter, Routes,  Route } from "react-router-dom";

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
		<>
		<BrowserRouter>
		  <Routes>
			  <Route path="/" element={<Main account={account}/>} />
			  <Route path="/mypage" element={<MyPage account={account}/>} />
			  <Route path="/market" element={<Market account={account}/>} />
		  </Routes>
		</BrowserRouter>
		</>
	)
};

export default App;
