import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext(); //for authentication, so that we can login
    const Login = async ({username, password}) =>{
        const success = handleInputErrors({ username, password});
        if(!success) return

        setLoading(true)
        try{
            const res = await fetch('/api/auth/login', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({username, password})
            })
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            //localStorage
            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)

              // Clear selected conversation after signup
            localStorage.removeItem("selectedConversation");
            useConversation.getState().setSelectedConversation(null);

        }catch(error){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return [loading, Login]
}

export default useLogin;

function handleInputErrors({ username, password}) {
    if(!username || !password){
        toast.error('Please fill in all the fields')
        return false
    }
    return true
}