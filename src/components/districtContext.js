import React, { useState } from "react";
import districtAPI from "../api/metaDataAPI/districtAPI";
import stateAPI from "../api/metaDataAPI/stateAPI";

const DistrictContext = React.createContext();

export const DistrictProvider = ({ children }) => {
	const [Districts, setDistricts] = useState([{}]);
	const [States, setStates] = useState([{}]);

	//console.log("DISTRICTS:  ", Districts, "\nSTATES:  ", States);
	const getStates = async () => {
		try {
			const response = await stateAPI.get("/states/");
			//console.log(response.data.states.length);
			if (response.data.states != null && response.data.states.length > 0) {
				setStates(response.data.states);
			}
		} catch (error) {
			console.log("ERROR IN GETTING STATES METADATA:", error);
		}
	};

	const getDistricts = async (stateID) => {
		try {
			const response = await districtAPI.get(`/${stateID}`);
			console.log(response);
		} catch (error) {
			console.log("ERROR IN GETTING DISTRICT METADATA:", error);
		}
	};

	return (
		<DistrictContext.Provider
			value={{
				districts: Districts,
				states: States,
				getStates,
				getDistricts,
			}}
		>
			{children}
		</DistrictContext.Provider>
	);
};

export default DistrictContext;
