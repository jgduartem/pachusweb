import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDoPoJqjHBe5EH0BupzdMzCNcNpQ5ff2vY",
    authDomain: "pachusweb.firebaseapp.com",
    projectId: "pachusweb",
    storageBucket: "pachusweb.appspot.com",
    messagingSenderId: "290125067189",
    appId: "1:290125067189:web:22e03ba917813f818edffc"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const tshirtsRef = db.ref('inventory/tshirts');
export const cupsRef = db.ref('inventory/cups');
export const hatsRef = db.ref('inventory/hats');
export const othersRef = db.ref('inventory/others');
export const imageRef = storage.ref();
