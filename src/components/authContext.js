import React, { useReducer } from "react";
import * as ActionTypes from "./ActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext();

const authReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.SIGN_IN:
		case ActionTypes.SIGN_UP:
			return {
				...state,
				userId: action.payload.userId,
				token: action.payload.token,
				//errorMessage: "",
				isAuthenticating: false,
			};
		case ActionTypes.SIGN_OUT:
			return {
				...state,
				userId: "",
				token: null,
			};

		case ActionTypes.IS_AUTHENTICATING:
			return {
				...state,
				isAuthenticating: true,
			};

		case ActionTypes.TRIED_LOCAL_SIGNIN:
			return {
				...state,
				triedLocalSignIn: true,
			};

		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		userId: "",
		token: null,
		//errorMessage: "",
		isAuthenticating: false,
		triedLocalSignIn: false,
	});

	console.log("OUR STATE:", authState);

	const tryLocalSignIn = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				dispatch({ type: ActionTypes.TRIED_LOCAL_SIGNIN });
				return;
			}

			dispatch({
				type: ActionTypes.SIGN_IN,
				payload: { token, userId: "RISHABH KING" },
			});
		} catch (error) {
			console.log("COULD NOT READ ASYNCSTORAGE:", error);
		}
		dispatch({ type: ActionTypes.TRIED_LOCAL_SIGNIN });
	};

	const signUp = async (email, password) => {
		console.log("INSIDE SIGN UP email & PAss :", email, password);
		dispatch({ type: ActionTypes.IS_AUTHENTICATING });
		try {
			// const response = await trackApi.post("/signup", { email, password });response.data.token
			const token = "HELLO_FROM_THE_OTHER_SIDE";
			await AsyncStorage.setItem("token", token);
			dispatch({
				type: ActionTypes.SIGN_UP,
				payload: { token: token, userId: email },
			});
		} catch (error) {
			console.log("ERROR IN SIGNUP:", error);

			throw new Error("Something went wrong");
		}
	};

	const signIn = async (email, password) => {
		console.log("INSIDE SIGN IN email & PAss :", email, password);

		dispatch({ type: ActionTypes.IS_AUTHENTICATING });
		try {
			//const response = await trackApi.post("/signup", { email, password });response.data.token
			const token = "HELLO_FROM_THE_OTHER_SIDE";
			await AsyncStorage.setItem("token", token);
			dispatch({
				type: ActionTypes.SIGN_IN,
				payload: { token: token, userId: email },
			});
		} catch (error) {
			console.log("ERROR IN SIGNIN:", error);

			throw new Error("Something went wrong");
		}
	};

	const signOut = async () => {
		console.log("INSIDE SIGN OUT ");
		dispatch({ type: ActionTypes.SIGN_OUT });
		try {
			await AsyncStorage.removeItem("token");
			//const response = await trackApi.post("/signup", { email, password });response.data.token
		} catch (error) {
			console.log("ERROR IN SIGNOUT:", error);

			throw new Error("Something went wrong");
		}
	};

	return (
		<AuthContext.Provider
			value={{ data: authState, tryLocalSignIn, signUp, signIn, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;