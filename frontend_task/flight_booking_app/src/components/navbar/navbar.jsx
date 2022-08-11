import React from "react";
import "../navbar/navbar.css"
import { Box } from "@mui/material"
import { Link } from "react-router-dom"

export const Navbar = () => {

    return (
        <>
        <Box className="navbar">
            <Box sx={{fontFamily:"cursive", fontSize:'30px'}}>BookNow.com</Box>
            <Box sx={{display:'flex', width:"250px", justifyContent:"space-around", fontSize:'18px'}}>
                <Link to='/' className="link">Home</Link>
                <Link to='/login' className="link">Login</Link>
                <Link to='/signup' className="link">SignUp</Link>
            </Box>
        </Box>
        </>
    )
}