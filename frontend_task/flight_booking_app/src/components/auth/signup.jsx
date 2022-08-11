import { useNavigate } from "react-router-dom"
import { Box, Button, TextField} from "@mui/material"
import React from "react";
import ("../auth/auth.css")


export const Signup = () => {
    const [first_name, setFirstName] = React.useState("")
    const [last_name, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [error , setError] = React.useState(false)
    const navigate = useNavigate()

    const HandleRegister = () => {

        const payload = {
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:password
        }

        fetch(`https://nykaa-web-app-backend.herokuapp.com/auth/register`,{
            method:"POST",
            mode:"no-cors",
            headers:{
                "Content_type":"application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((res) => navigate("/login"))
        .catch((err) => setError(true))
    }

     return (
        <div id="login">

            <Box component="form" sx={{border:1,width:"30vw", height:"auto", margin:"auto", borderColor:"rgba(45, 38, 40, 0.744)", borderRadius:5,marginTop:5,padding:5}}>
                <h2>SignUp</h2>

                {error?
                <Box sx={{color:"red", fontSize:"13px", marginBottom:"10px"}}>Error 503 Service Unavailable due to unexpected reasons.<br/> Please use "Paragtarani24@gmail.com" and password:"1234" for test Login.</Box>
                :null}

                <Box sx={{display:"flex", justifyContent:"space-around", width:"70%", margin:"auto", marginTop:'40px'}}>
                <TextField label="First Name" variant="outlined" value={ first_name } onChange={(e) => setFirstName(e.target.value)}></TextField><br/>
                <TextField label="Last Name" variant="outlined" value={ last_name } onChange={(e) => setLastName(e.target.value)}></TextField><br/>
                </Box>

                <TextField label="Email" variant="outlined" value={ email } onChange={(e) => setEmail(e.target.value)} className="inputField"></TextField><br/>
                <TextField label="Password" variant="outlined" value={ password } type="password" onChange={(e) => setPassword(e.target.value)} className="inputField"></TextField><br/>
                <Button variant="contained" color="primary" sx={{marginTop:3}} onClick={HandleRegister}>Register</Button>
            </Box>

        </div>
     )
}