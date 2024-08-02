import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()

  const signup = async({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
    if(!success){
        return;
    }

    setLoading(true);

    try {
        const res = await fetch("/api/v1/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({fullName, username, password, confirmPassword, gender})
        });

        const data = await res.json();
        
        if(data.error){
            throw new Error(data.error);
        }

        
        localStorage.setItem("chat-user",JSON.stringify(data))
        setAuthUser(data);

    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false)
        toast.success("Welcome To Chat App...")
    }
  }
  return{loading,signup};
}
export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    console.log(fullName);
    console.log(username);
    console.log(password);
    console.log(confirmPassword);
    console.log(gender);

    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("OOPS!! Please fill all the details...")
        return false;
    }

    if(password !== confirmPassword){
        toast.error("OOPS!! Password doesn't match...")
        return false;
    }

    if(password.length < 6){
        toast.error("Hey!! Password must be at least six characters...")
        return false;
    }

    return true;
}