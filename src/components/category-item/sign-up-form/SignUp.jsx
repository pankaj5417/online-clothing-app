import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../../utils/firebase/firebase"

const defaultFormValues={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}
export const SignUpForm=()=>{
    const [formValue,setFormValue]=useState(defaultFormValues)
    const { displayName,email,password,confirmPassword}=formValue
        
    const handleChange=(event)=>{
        const {name,value}=event.target
        setFormValue({...formValue, [name]:value})

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            alert("password did not match")
        }
        
        try{
            const {user}=await createAuthUserWithEmailAndPassword(email,password)

              await createUserDocumentFromAuth(user,{displayName})

        }catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert("Cannot creat user, email already in use")
            }
            console.log("user creation encountered an error",error)
        }


        console.log(formValue)
    }
    return (
        <>
        <div>
            <h1>Sign Up with your email and password</h1>

            <form onSubmit={handleSubmit}>
            <label htmlFor="">UserName</label>
            <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

            <label htmlFor="">Email</label>
            <input type="email" required onChange={handleChange} name="email" value={email} />

            <label htmlFor="">Password</label>
            <input type="password" required onChange={handleChange} name="password" value={password} />

            <label htmlFor="">Confirm-Password</label>
            <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
             <button type="submit">Submit</button>



            </form>
        </div>
        </>
    )

}