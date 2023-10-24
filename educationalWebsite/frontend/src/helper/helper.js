import axios from 'axios'
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN



export async function getUsername(){
    const token = localStorage.getItem("TOKEN");
    if(!token) return Promise.reject("Cannot find Token")
    const decode = jwt_decode(token)
    return decode
}

export const authenticate = async(username)=>{
    try {
        return await axios.post('/api/authenticate', {username})
    } catch (error) {
        return {error:"User name doesn;t exist...!"}
    }
}
export const getUser= async({username})=>{
    try {
        const {data} = await axios.get(`/api/user/${username}`)
        return {data}
    } catch (error) {
        return {error:"Password does not match"}
    }
}

export const registerUser = async(credentails) =>{
    try {
       const {data :{msg},status} = await axios.post(`/api/register`,credentails)
       let {username,email} = credentails;
       /** SEND EMAIL **/
       if(status === 201){
        await axios.post('/api/registerMail',{username,userEmail:email,text:msg})
       }
       return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({error})   
    }
}

/** Login function */
export const verifyPassword = async({username,password}) =>{
    try {
        if(username){
          const {data} =  await axios.post('/api/login',{username,password})
          return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({msg:"Password does not match"})
    }
}

export const updateUser = async(respones) =>{
    try {
        const token = await localStorage.getItem('TOKEN')
        const data =await axios.put('/api/updateuser',respones,{headers: {"Authorization": `Bearer ${token}`}})
        return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error:"Could n't Update Profile"})
    }
}

export const generateOTP = async(username) =>{
    try {
       const {data: {code},status} = await axios.get('/api/generateOTP',{params: {username}})

       if(status === 201){
        let {data:{email}} = await getUser({username});
        let text = `Your Password is ${code}`;
        await axios.post('/api/registerMail',{username,userEmail:email,text,subject:"Password Recovery OTP"})
       }
       return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error})
    }
}
export const verifyOTP = async({username,code}) =>{
    try {
        const {data,status} = await axios.get('/api/verifyOTP',{params:{username,code}})
        return {data,status}
    } catch (error) {
        return Promise.reject(error)
    }
}

export const resetPassword = async({username,password}) =>{
    try {
        const {data,status} = await axios.put('/api/resetPassword',{username,password});
        return Promise.resolve({data,status})
    } catch (error) {
        return Promise.reject({error})
    }
}