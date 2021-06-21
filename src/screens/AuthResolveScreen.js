import React, { useEffect, useContext } from "react";
import AuthContext from "../components/authContext";

const AuthResolveScreen = (props) => {
	const { tryLocalSignIn } = useContext(AuthContext);

	useEffect(() => {
		tryLocalSignIn();
	}, []);

	return null;
};

export default AuthResolveScreen;
