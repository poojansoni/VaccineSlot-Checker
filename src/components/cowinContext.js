import React, { useState } from "react";
import * as ActionTypes from "./ActionTypes";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import cowinPINApi from "../api/cowinPINApi";
const cowinContext = React.createContext();

export const CowinProvider = ({ children }) => {
	const [CowinState, setCowinState] = useState([]);

	//console.log("COWIN STATE:", CowinState);

	const getCentersPincodeDate = async (pin, date, doseNum, age) => {
		// age = 18/45
		//doseNum = 1/2
		try {
			const response = await cowinPINApi.get(
				`/findByPin?pincode=${pin}&date=${date}`,
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
				console.log("INSIDE 1 if");
				response.data.sessions.forEach((obj) => {
					if (obj.min_age_limit == age) {
						console.log("INSIDE 2 AGE if");
						if (
							obj.available_capacity_dose1 != 0 ||
							obj.available_capacity_dose2 != 0
						) {
							console.log("INSIDE 3 if DOSES BOTH 0");
							if (doseNum == 1 && obj.available_capacity_dose1 != 0) {
								console.log("INSIDE 4 if DOSE TYPE 1");
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
								console.log("INSIDE 4 if DOSE 2");
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
			setCowinState(centeres);
			console.log(centeres);
		} catch (error) {
			console.log("ERROR IN GETTING CENTRES BY PINCODE:", error);
		}
	};
	return (
		<cowinContext.Provider
			value={{
				data: CowinState,
				getCentersPincodeDate,
			}}
		>
			{children}
		</cowinContext.Provider>
	);
};

export default cowinContext;
