import React, { useState } from "react";
const FlagContext = React.createContext();

export const FlagProvider = ({ children }) => {
	//flag =0 means pin screen else 1 means disrict
	const [flag, setFlag] = useState(0);

	const setFalgfromHome = (val) => {
		setFlag(val);
	};
	// console.log("SET SCREEN FLAG STATE:", flag);

	return (
		<FlagContext.Provider
			value={{
				flag,
				setFalgfromHome,
			}}
		>
			{children}
		</FlagContext.Provider>
	);
};

export default FlagContext;
