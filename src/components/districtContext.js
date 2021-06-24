import React, { useState } from "react";
import districtAPI from "../api/metaDataAPI/districtAPI";
import stateAPI from "../api/metaDataAPI/stateAPI";
import getBYDistrictAPI from "../api/getBYDistrictAPI";

const DistrictContext = React.createContext();

export const DistrictProvider = ({ children }) => {
	const [Districts, setDistricts] = useState([{}]);
	const [States, setStates] = useState([{}]);
	const [DistrctCenteres, setDistrictCenteres] = useState([{}]);

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
			const response = await districtAPI.get(`/districts/${stateID}`);
			//console.log(response);
			if (
				response.data.districts != null &&
				response.data.districts.length > 0
			) {
				setDistricts(response.data.districts);
			}
		} catch (error) {
			console.log("ERROR IN GETTING DISTRICT METADATA:", error);
		}
	};

	const getCentersDistrict = async (districtID, date, doseNum, age) => {
		try {
			const response = await getBYDistrictAPI.get(
				`?district_id=${districtID}&date=${date}`,
			);
			console.log(
				"TOTAL CENTRES : ",
				response.data.sessions.length,
				"DOSE NUM: ",
				doseNum,
				"AGE :",
				age,
			);
			const centeres = new Array();
			if (response.data.sessions != null && response.data.sessions.length > 0) {
				//console.log("INSIDE 1 if");
				response.data.sessions.forEach((obj) => {
					if (obj.min_age_limit == age) {
						//console.log("INSIDE 2 AGE if");
						if (
							obj.available_capacity_dose1 != 0 ||
							obj.available_capacity_dose2 != 0
						) {
							//console.log("INSIDE 3 if DOSES BOTH 0");
							if (doseNum == 1 && obj.available_capacity_dose1 != 0) {
								//console.log("INSIDE 4 if DOSE TYPE 1");
								const center = {
									NAME: obj.name,
									MIN_AGE: obj.min_age_limit,
									AVAILAIBLE_DOSE1: obj.available_capacity_dose1,
									AVAILAIBLE_DOSE2: obj.available_capacity_dose2,
									VACCINE_TYPE: obj.vaccine,
									ADDRESS: obj.address,
								};
								centeres.push(center);
							} else if (doseNum == 2 && obj.available_capacity_dose2 != 0) {
								//console.log("INSIDE 4 if DOSE 2");
								const center = {
									NAME: obj.name,
									MIN_AGE: obj.min_age_limit,
									AVAILAIBLE_DOSE1: obj.available_capacity_dose1,
									AVAILAIBLE_DOSE2: obj.available_capacity_dose2,
									VACCINE_TYPE: obj.vaccine,
									ADDRESS: obj.address,
								};
								centeres.push(center);
							}
						}
					}
				});
			}
			setDistrictCenteres(centeres);
			console.log(centeres);
		} catch (error) {
			console.log("ERROR IN GETTING CENTRES BY DISTRICT:", error);
		}
	};

	return (
		<DistrictContext.Provider
			value={{
				districts: Districts,
				states: States,
				getStates,
				getDistricts,
				getCentersDistrict,
			}}
		>
			{children}
		</DistrictContext.Provider>
	);
};

export default DistrictContext;
