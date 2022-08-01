// Import the functions you need from the SDKs you need

import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import {

  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";
import {getFirestore, doc, getDoc,setDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAGxlyJBHjM72LKkreV9rB7gLXiZ8m4edg",
  authDomain: "online-store-7cd29.firebaseapp.com",
  projectId: "online-store-7cd29",
  storageBucket: "online-store-7cd29.appspot.com",
  messagingSenderId: "600981783970",
  appId: "1:600981783970:web:2be6a7195d534d0b895efb",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider()
googleprovider.setCustomParameters({
    prompt:" select_account"
})

export const auth= getAuth();
export const signInWithGooglePopup= ()=>signInWithPopup(auth, googleprovider)

export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,googleprovider)
export const db=getFirestore()

export const createUserDocumentFromAuth= async (userAuth, additionalInformation) =>{
    if(!userAuth)return
    console.log(userAuth)
   const userDocRef =  doc(db, "users", userAuth.uid ) 

   console.log(userDocRef)
   const userSnapshot= await getDoc(userDocRef)
   console.log(userSnapshot)
   console.log(userSnapshot.exists())

   if(!userSnapshot.exists()){
       const {displayName,email}=userAuth
       const createdAt= new Date()

       try{
           await setDoc(userDocRef, {
               displayName,
               email,
               createdAt,
               ...additionalInformation
           })
       }catch(e){
           console.log('error creating the user',e)
       }
   }
   return userDocRef
}

export const createAuthUserWithEmailAndPassword=async (email,password)=>{
    if(!email || ! password) return
    return createUserWithEmailAndPassword(auth, email,password)


}