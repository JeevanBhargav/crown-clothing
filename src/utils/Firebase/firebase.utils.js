import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
} from 'firebase/auth';

import{
    getFirestore,
    doc, //3 doc methods to get and set docs.
    getDoc,
    setDoc
} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyA-wYg8WVWX1FVXnGO2Ar0EZH2ht7pOmPY",
    authDomain: "crwn-clothing-db-dc797.firebaseapp.com",
    projectId: "crwn-clothing-db-dc797",
    storageBucket: "crwn-clothing-db-dc797.appspot.com",
    messagingSenderId: "526741889405",
    appId: "1:526741889405:web:292ead269c9fd2a4432c14",
    measurementId: "G-XKW7CZNBWB"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid );

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    
    if(!userSnapshot.exists()){     // if userdata does not exists
        const{displayName, email} = userAuth;
        const createdAt = new Date();
        
        try{
            await setDoc(userDocRef,{     // create / set the document with the data from userAuth in my collection
                displayName,
                email,
                createdAt
            });
        } catch (error) {
          console.log('error creating the user',error.message) ; 
        }
        
    }
    
    // if user data exists
    return userDocRef;

};

