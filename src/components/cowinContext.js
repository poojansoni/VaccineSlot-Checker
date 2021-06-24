import React, { useState } from "react";
import cowinPINApi from "../api/cowinPINApi";
import districtAPI from "../api/metaDataAPI/districtAPI";
import stateAPI from "../api/metaDataAPI/stateAPI";
import getBYDistrictAPI from "../api/getBYDistrictAPI";
const cowinContext = React.createContext();

export const CowinProvider = ({ children }) => {
	const [Districts, setDistricts] = useState([{}]);
	const [States, setStates] = useState([{}]);
	const [CowinState, setCowinState] = useState([]);

	//console.log("COWIN STATE :", CowinState[0]);

	const setCenters = (sessions, doseNum, age) => {
		const centeres = new Array();
		//console.log("INSIDE SET CENTERS : SESSIon : ", sessions);
		sessions.forEach((obj) => {
			if (obj.min_age_limit == age) {
				//console.log("1st PASSED");

				if (doseNum == 1) {
					//console.log("FIRST CONDITION");
					if (obj.available_capacity_dose1 != 0) {
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
				} else if (doseNum == 2) {
					//console.log("SECOND CONDITION");
					if (obj.available_capacity_dose2 != 0) {
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
		//console.log(centeres);
		setCowinState(centeres);
	};

	const getPinResponse = async (pin, date, doseNum, age) => {
		try {
			const response = await cowinPINApi.get(
				`/findByPin?pincode=${pin}&date=${date}`,
			);

			// console.log("RESPONSE:", response.data);

			if (response.data.sessions != null && response.data.sessions.length > 0) {
				setCenters(response.data.sessions, doseNum, age);
			}
		} catch (error) {
			console.log("ERROR IN GETTING CENTRES BY PINCODE:", error);
		}
	};

	const getDistrictResponse = async (districtID, date, doseNum, age) => {
		try {
			const response = await getBYDistrictAPI.get(
				`?district_id=${districtID}&date=${date}`,
			);

			if (response.data.sessions != null && response.data.sessions.length > 0) {
				setCenters(response.data.sessions, doseNum, age);
			}
		} catch (error) {
			console.log("ERROR IN GETTING CENTRES BY DISTRICT:", error);
		}
	};

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
	return (
		<cowinContext.Provider
			value={{
				districts: Districts,
				states: States,
				getStates,
				getDistricts,
				getPinResponse,
				getDistrictResponse,
				data: CowinState,
			}}
		>
			{children}
		</cowinContext.Provider>
	);
};

export default cowinContext;
