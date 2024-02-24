
export const checkValidData = (email, password) =>{

    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/.test(password);

    if(!isEmailValid) return "Email Address is not valid!";
    if(!isPasswordValid) return "Password is not valid!";

    return null;
}