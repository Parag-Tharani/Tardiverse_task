import { Box, Button } from "@mui/material";
import React from "react";
import "../home/home.css";

export const Home = () => {
    
    const [arrCities, setArrCities] = React.useState([])

    const [depCity, setDepCity] = React.useState("")
    const [arrCity, setArrCity] = React.useState("")

    const [depDate, setDepDate] = React.useState('')
    const [arrDandT, setArrDandT] = React.useState("")
    
    const [priceBool, setPriceBool] = React.useState(Boolean)
    const [price, setPrice] = React.useState(Number)

    React.useEffect(() => {
        
        let max_price = 20000

        let datePer = depDate.split("-").join("").slice(5,7)

        setPriceBool(true)
        setPrice(Math.round(max_price*datePer/100))
        
    },[depDate])
    
    React.useEffect(() => {
    switch (depCity) {

        case "Bangluru":
            setArrCities(["Delhi", "Mumbai", "Kolkata"])

            switch (arrCity) {
                case "Delhi":
                    setArrDandT(depDate+"T05:30")
                    break;
                case "Mumbai":
                    setArrDandT(depDate+"T04:30")
                    break;
                case "Kolkata":
                    setArrDandT(depDate+"T06:00")
                    break;
                default:
                    break;
            }
            break;

            case "Mumbai":
                setArrCities(["Delhi", "Bangluru", "Kolkata"])
    
                switch (arrCity) {
                    case "Delhi":
                        setArrDandT(depDate+"T05:30")
                        break;
                    case "Bangluru":
                        setArrDandT(depDate+"T02:00")
                        break;
                    case "Kolkata":
                        setArrDandT(depDate+"T08:30")
                        break;
                    default:
                        break;
                }
                break;

                case "Kolkata":
                    setArrCities(["Delhi", "Mumbai", "Bangluru"])
        
                    switch (arrCity) {
                        case "Delhi":
                            setArrDandT(depDate+"T02:00")
                            break;
                        case "Mumbai":
                            setArrDandT(depDate+"T04:30")
                            break;
                        case "Bangluru":
                            setArrDandT(depDate+"T05:30")
                            break;
                        default:
                            break;
                    }
                    break;

                    case "Delhi":
                    setArrCities(["Kolkata", "Mumbai", "Bangluru"])
        
                    switch (arrCity) {
                        case "Kolkata":
                            setArrDandT(depDate+"T08:30")
                            break;
                        case "Mumbai":
                            setArrDandT(depDate+"T10:30")
                            break;
                        case "Bangluru":
                            setArrDandT(depDate+"T01:00")
                            break;
                        default:
                            break;
                    }
                    break;
                case "":
                    setArrCities([])
                    setArrDandT("") 
                    setPriceBool(false)
                    break;
    
        default:
            break;
    }
    },[depCity, arrCity, depDate])


    return (
        <>
        <Box className="home">

            <Box className="dest">
                <Box>
                    <h3>Where from</h3>
                    <select onChange={(e) => setDepCity(e.target.value)} className="optionsCss">
                        <option className="optCss"></option>
                        <option className="optCss">Delhi</option>
                        <option className="optCss">Kolkata</option>
                        <option className="optCss">Bangluru</option>
                        <option className="optCss">Mumbai</option>
                    </select>
                </Box>

                <Box>
                    <h3>Where to</h3>
                    <select onChange={(e) => setArrCity(e.target.value)} className="optionsCss">
                        <option className="optCss"></option>
                        {arrCities.map((items,index) => {
                            return (
                            <option key={index} value={items} className="optCss">{items}</option>
                            )
                        })}
                    </select>
                </Box>

            </Box>
            <p style={{marginTop:"40px"}}>Departure Date</p>
            <input type={"date"} className="optionsCss" onChange={(e) => setDepDate(e.target.value)}></input>
            <Box>

            <Box>
                <p style={{marginTop:"30px"}}>Arrival Date and Time</p>
                <input type={"datetime-local"} className="optionsCss" value={arrDandT} disabled></input>
            </Box>    


            {priceBool?
            <Box sx={{marginTop:"60px", alignItems:"center"}} className="dest">
                <Box sx={{fontSize:"16px"}}> <b>Flight Fare is {price} </b></Box>

                <Box sx={{display:"flex"}}>
                <Button variant="outlined" size="small" color="inherit" sx={{marginRight:"10px"}}> Apply Promo </Button>
                <Button variant="contained" color="inherit" >Book Tickets</Button>
                </Box>
            </Box>
            :null}

            </Box>

        </Box>
        </>
    )
}