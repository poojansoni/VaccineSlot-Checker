import firebase from "firebase";

import {
	API_KEY,
	AUTH_DOMAIN,
	DB_URL,
	PROJECT_ID,
	MESSAGINGSENDER_ID,
	APP_ID,
} from "./firebaseVariables";
// Optionally import the services that you want to use
// import "firebase/auth";
// import "firebase/database";
// import "firebase/firestore";
// import "firebase/functions";
// import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DB_URL,
	projectId: PROJECT_ID,
	storageBucket: "",
	messagingSenderId: MESSAGINGSENDER_ID,
	appId: APP_ID,
};

let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
{
	/* <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-analytics.js"></script> */
}
