import React from "react";
import { Text, View, ScrollView } from "react-native";
import cowinContext from "../components/cowinContext";

const NotificationScreen = () => {
	let AllCentres = "";
	let errMsg =
		"Sorry, but there were no available centres currently for your requirements";
	const GetCenterText = (obj) => {
		let res =
			"NAME: " +
			obj.NAME +
			"\n" +
			"MINIMUM AGE: " +
			obj.MIN_AGE +
			"\n" +
			"DOSE-1: " +
			obj.AVAILAIBLE_DOSE1 +
			"\n" +
			"DOSE-2: " +
			obj.AVAILAIBLE_DOSE2 +
			"\n" +
			"VACCINE-TYPE: " +
			obj.VACCINE_TYPE +
			"\n" +
			"ADDRESS: " +
			obj.ADDRESS +
			"\n_____________________________________________";

		return res;
	};

	const setAllCentres = (req, extra) => {
		AllCentres = req + extra;
	};

	const { data } = React.useContext(cowinContext);
	return (
		<ScrollView>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					paddingLeft: 35,
					paddingRight: 35,
					paddingBottom: 35,
				}}
			>
				{data.length == 0
					? setAllCentres(AllCentres, errMsg)
					: data.forEach((obj) => {
							setAllCentres(AllCentres + "\n\n", GetCenterText(obj));
					  })}
				<Text style={AllCentres == errMsg ? { paddingTop: 35 } : {}}>
					{AllCentres}
				</Text>
			</View>
		</ScrollView>
	);
};

export default NotificationScreen;
