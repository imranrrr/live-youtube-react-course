import {useState} from 'react';

export default function SignUp(){
    
    const [user, setUser] = useState({first_name: "", second_name: "",
    email:"", dob: "", gender: "", phone: "", country: "", password: "",
    confirmation_password: "" })

    function handleUserData(e){
        setUser({...user, [e.target.name]: e.target.value})
        console.log(user)
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <label>First Name: </label>
            <input type="text" name="first_name" value={user.first_name}
            onChange={ handleUserData} />
            <label>Second Name: </label>
            
            
            
            
            
            
            
            
            
            
            
            {/* <input type="text" name="second_name" value={user.second_name}
            onChange={ handleUserData} />
            <label>Email: </label>
            <input type="email" name="email" value={user.email}
            onChange={ handleUserData} />
            <label>Date of Birth: </label>
            <input type="date" name="dob" value={user.dob}
            onChange={ handleUserData} />
            <label>Gender: </label>
            <input type="radio" name="gender" value="male"
            onChange={ handleUserData} />
            <label>Female</label>
            <input type="radio" name="gender" value="female"
            onChange={ handleUserData} />
            <label>Other</label>
            <input type="radio" name="gender" value="other"
            onChange={ handleUserData} />
            <label>Country: </label>
            <select name="country" value={user.country}
            onChange={ handleUserData} >
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
            </select>
            <label>Password: </label>
            <input type="password" name="password" value={user.password}
            onChange={ handleUserData} />
            <label>Confirm Password: </label>
            <input type="password" name="confirmation_password" value={user.confirmation_password}
            onChange={ handleUserData} /> */}
            <button type="submit">Sign Up</button>
        </div>
    )
}