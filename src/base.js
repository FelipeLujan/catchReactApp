import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAn_8ZPrSgr3FlECoSae_0JnZMlVKH-Q-c",
  authDomain: "fishstore-react.firebaseapp.com",
  databaseURL: "https://fishstore-react.firebaseio.com",
  projectId: "fishstore-react",
  storageBucket: "fishstore-react.appspot.com",
  messagingSenderId: "687449369388"
});

const base = Rebase.createClass(firebaseApp.database());
/*rebase's function is to mirror states to firebase*/

export { firebase };
/*this is a named export*/
export { firebaseApp };

export default base;
