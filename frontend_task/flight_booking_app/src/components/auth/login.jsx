import { useNavigate } from "react-router-dom"
import { Box, Button, TextField} from "@mui/material"
import jwt_decode from "jwt-decode";
import React from "react";
import ("../auth/auth.css")

export const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [error , setError] = React.useState(false)
    const navigate = useNavigate()


    const HandleLogin = () => {

        const payload = {
            input: email,
            password: password
        }

        fetch(`https://nykaa-web-app-backend.herokuapp.com/auth/login`,{
            method:"POST",
            body: JSON.stringify(payload),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((res) => {
            const decoded = jwt_decode(res.encryptionToken);
            localStorage.setItem("Id" , decoded.id)
            setError(false)
            navigate("/")
        })
        .catch((err) => setError(true))
    }

     return (
        <div id="login">

            <Box component="form" sx={{border:1,width:"20vw", height:"50vh", margin:"auto", borderColor:"rgba(45, 38, 40, 0.744)", borderRadius:5,marginTop:5,padding:5}}>
                <h2>Login Details</h2>

                {error?
                <Box sx={{color:"red", fontSize:"13px", marginBottom:"10px"}}>Pleaae Provide Valid Credentials</Box>
                :null}

                <TextField label="Email" variant="filled" color="primary" value={ email } onChange={(e) => setEmail(e.target.value)}></TextField><br/>
                <TextField label="Password" variant="filled" type={"password"} value={ password } onChange={(e) => setPassword(e.target.value)} color="primary"></TextField><br/>
                <Button variant="contained" color="primary" sx={{marginTop:3}} onClick={HandleLogin} >Log In</Button>
            </Box>

        </div>
     )
}