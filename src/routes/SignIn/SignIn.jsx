import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
    auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  
} from "../../utils/firebase/firebase";
import { SignUpForm } from "../../components/category-item/sign-up-form/SignUp";

export const SignIn = () => {

    useEffect( async()=>{
        const respone=await getRedirectResult(auth)
        console.log(respone)
    },[])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    //console.log(user)
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  
  return (
    <>
      <div>
        <h1>SignIn page</h1>
        <button onClick={logGoogleUser}>Sign In with Google</button>
        <SignUpForm />
        {/* <button onClick={signInWithGoogleRedirect}>
          Sign In with Google Redirect
        </button> */}
      </div>
    </>
  );
};
