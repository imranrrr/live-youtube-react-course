import {useState} from 'react';
import InputField from '../../components/form/InputField';


export default function Signup(){
    
    const [user, setUser] = useState({first_name: "", second_name: "",
    email:"", dob: "", gender: "", phone: "", country: "", password: "",
    confirmation_password: "" })
    const [error, setError] = useState("")

    function handleUserData(e){
        if((e.target.name === "confirmation_password" || e.target.password) && user.confirmation_password != user.password){
            setError("Password and Confirm Password do not match")
        }else{
            setError("")
        }
        setUser({...user, [e.target.name]: e.target.value})
        console.log(user)
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>


            <InputField label="First Name" type="text" name="first_name" 
            value={user.first_name} handleChange={handleUserData} /> 

            <InputField label="Second Name" type="text" name="second_name" 
            value={user.second_name} handleChange={handleUserData} />

            <InputField label="Email" type="email" name="email" 
            value={user.email} handleChange={handleUserData} /> 

            <InputField label="Date of Birth" type="date" name="dob" 
            value={user.dob} handleChange={handleUserData} />

            {/* <InputField label="Gender" type="radio" name="gender" 
            value={user.gender} handleChange={handleUserData} /> */}

            {/* <InputField label="Country" type="select" name="country" 
            value={user.country} handleChange={handleUserData} /> */}

            <InputField label="Password" type="password" name="password" 
            value={user.password} handleChange={handleUserData} />

            <InputField label="Confirm Password" type="password" name="confirmation_password" 
            value={user.confirmation_password} handleChange={handleUserData} />
            {error && <p className="error-message">{error}</p>}
            <br/>
            
            <button type="submit">Sign Up</button>
        </div>
    )
}