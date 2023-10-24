import toast from "react-hot-toast"
import { authenticate } from "./helper"

function usernameVerify(error={},values){
    if(!values.username){
        error.username = toast.error('Username Required')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }
     return error
}
// validate password
// const specialCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&^]{8,15}$/;

function passwordVerify(error={},values){
    if(!values.password){
        error.password = toast.error("Password Required...!")
    }
    else if(values.password === " "){
        error.password = toast.error("Invalid Password")
    }
    else if(values.password.length < 4){
        error.password = toast.error("Password must 4 character long")
    }
    // else if(!specialCharacters.test(values.password)){
    //     error.password = toast.error("Password must have special characters")
    // }
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailVerify = (error = {}, values) => {         
    if (!values.email) {
        error.email = toast.error("Enter Email");
    } else if (!emailRegex.test(values.email)) {
        error.email = toast.error("Invalid Email");
    }

    return error; // Return the modified error object after validation
};

///////////////////////////////////validate rest password
export async function resetPasswordValidation(values){
    const error = passwordVerify({},values);
    console.log(values.confirm_password)
    if(values.password !== values.confirm_password){
        error.ReseTpassword = toast.error("Password not match..");
    }
    return error
}


////////////////////////////////////////////////
// valide login page username
export async function usernameValidate(values){
    const error = usernameVerify({},values);
    if(values.username){
        const {status} = await authenticate(values.username)

        if(status !== 200){
            error.exist = toast.error("user does not exist") 
        }
    }
    return error;
}
export const PasswordValidate = (values) => {
    const error = passwordVerify({},values)
    return error
}

//valide register form
export const regiterValidate = async(values) => {
    const error = usernameVerify({},values)
    passwordVerify({},values)
    emailVerify({},values)
    return error

}


////validate profile page

export const profileValidate = async(values) => {
    const error = emailVerify({},values)
    return error
}