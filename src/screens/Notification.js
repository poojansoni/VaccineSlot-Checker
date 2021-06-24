import React from "react";
import { Text, View, ScrollView, StyleSheet, FlatList } from "react-native";
import cowinContext from "../components/cowinContext";

const shortAddress = (addr) => {
	if (addr.length > 33) {
		const parts = addr.substring(0, 32) + "";
	}
};

const CardComponent = (props) => {
	const { center } = props;
	const {
		NAME,
		MIN_AGE,
		AVAILAIBLE_DOSE1,
		AVAILAIBLE_DOSE2,
		VACCINE_TYPE,
		ADDRESS,
	} = center;

	return (
		<View style={styles.centerContainer}>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>NAME: </Text>
				<Text style={styles.value}>{NAME}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>MINIMUM AGE: </Text>
				<Text style={styles.value}>{MIN_AGE}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>DOSE-1: </Text>
				<Text style={styles.value}>{AVAILAIBLE_DOSE1}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>DOSE-2: </Text>
				<Text style={styles.value}>{AVAILAIBLE_DOSE2}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>VACCINE: </Text>
				<Text style={styles.value}>{VACCINE_TYPE}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.label}>ADDRESS: </Text>
				<Text numberOfLines={3} style={[styles.value, { width: 250 }]}>
					{ADDRESS}
				</Text>
			</View>
		</View>
	);
};

const EmptyComponent = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={styles.emptyText}>No Results!</Text>
		</View>
	);
};

const NotificationScreen = () => {
	const { data } = React.useContext(cowinContext);
	console.log("UPDATE SCREEN RENDERED, data:", data.length);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={data}
				keyExtractor={(item) => `${item.NAME}${item.ADDRESS}`}
				renderItem={({ item }) => <CardComponent center={item} />}
				ListEmptyComponent={<EmptyComponent />}
				contentContainerStyle={{
					flexGrow: 1,
					//borderWidth: 2,
					//borderColor: "yellow",
					paddingBottom: 20,
				}}
			/>
		</View>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	centerContainer: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: "#ede7e4",
		marginTop: 20,
		width: "85%",
		alignSelf: "center",
	},
	label: {
		color: "#444",
		fontWeight: "bold",
	},
	value: {
		color: "#444",
	},
	emptyText: {
		color: "grey",
	},
});
