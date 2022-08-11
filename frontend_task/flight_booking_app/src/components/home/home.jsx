import { Box, Button, Modal } from "@mui/material";
import React from "react";
import "../home/home.css";
import { useNavigate } from "react-router";


export const Home = () => {

    const navigate = useNavigate()
    
    const [arrCities, setArrCities] = React.useState([])

    const [depCity, setDepCity] = React.useState("")
    const [arrCity, setArrCity] = React.useState("")

    const [depDate, setDepDate] = React.useState('')
    const [arrDandT, setArrDandT] = React.useState("")
    
    const [priceBool, setPriceBool] = React.useState(Boolean)
    const [price, setPrice] = React.useState(Number)

    const [couApplied, setCouApplied] = React.useState(false)
    const [couButton , setCouBut] = React.useState("")
    const [couMsg, setCouMsg] = React.useState("")

    const [loggedIn , setLoggedIn] = React.useState(false)


    React.useEffect(() => {
        switch (couApplied) {
            case false:
                setCouBut("Apply Coupon")
                break;  
            default:
                break;
        }
    },[couApplied])

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

    React.useEffect(() => {
        var token = localStorage.getItem("Id")
        if(token){
            setLoggedIn(true)
        }
    },[loggedIn])

    const handleRemovecoupon = () => {
        let max_price = 20000
        let datePer = depDate.split("-").join("").slice(5,7)
        setCouApplied(false)
        setCouMsg("")
        setPrice(Math.round(max_price*datePer/100))
    }

    function sendMail() {

        // var link = "mailto:paragtharnai24@gmail.com"
        //          + "&subject=" + encodeURIComponent("Flight Tickets")
        //          + "&body=" + encodeURIComponent("Tickets Info")
        
        alert("Booking Confirmed")
    }

    const NotLogged = () => {
        navigate("/login")
    }
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);


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
                <Box sx={{display:"flex",alignItems:'center', fontSize:"16px"}}>Flight Fare: <p style={{fontSize:"21px", marginLeft:"5px",fontFamily:"monospace", color:"rgb(45, 45, 45)"}}> {price}/- </p> </Box>

                <Box sx={{display:"flex"}}>

                <Button variant="outlined" size="small" color="inherit" sx={{marginRight:"10px"}} onClick={couApplied? handleRemovecoupon :handleOpen}>{couButton}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

            <h3>Coupons Available</h3>

          <Box className="dest" sx={{marginBottom:"10px"}}>
            <p>Flat 10% off</p>
            <Button variant="outlined" size="small"  color="inherit" onClick={() => [setPrice(price*9/10), setOpen(false),setCouApplied(true), setCouMsg("Flat 10% off"), setCouBut("Remove Coupon") ]}>Apply Coupon</Button>
          </Box>


          <Box className="dest" sx={{marginBottom:"10px"}}>
            <p>Flat 20% off</p>
            <Button variant="outlined" size="small" color="inherit" onClick={() => [setPrice(price*4/5), setOpen(false),setCouApplied(true), setCouMsg("Flat 20% off"), setCouBut("Remove Coupon") ]}>Apply Coupon</Button>
          </Box>

          <Box className="dest" sx={{marginBottom:"10px"}}>
            <p>Free Meal for 1 time</p>
            <Button variant="outlined" size="small" color="inherit" onClick={() => [ setOpen(false),setCouApplied(true), setCouMsg("Free meal"), setCouBut("Remove Coupon") ]}>Apply Coupon</Button>
          </Box>

        </Box>
      </Modal>
                <Button variant="contained" color="inherit" onClick={loggedIn?sendMail:NotLogged}>Book Ticket</Button>
                </Box>
            </Box>
            :null}

            {couApplied?
            <Box sx={{width:"40vw", backgroundColor:"rgb(0,0,0,0.2)", height:'24px', borderRadius:"5px"}}>{couMsg}</Box>:
            null
            }

            </Box>

        </Box>
        </>
    )
}