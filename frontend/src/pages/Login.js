import { TextField, Typography } from "@mui/material";
import CustomGrid from "../components/styles/Grid";
import Spacebox from "../components/styles/Spacebox";
import { useState } from "react";
import CustomButton from "../components/styles/Custombutton";
import { Jelly } from "@uiball/loaders"
import Flexbox from "../components/Flexbox";
import Toast from "../components/Toast";
import { Link, useNavigate } from "react-router-dom";
import cookies from "../utilities/Cookies";

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [msg, setToastMsg] = useState('');


    const handleRegister = () => {
        if(email.includes("@") && password.length > 7) {
            setLoading(true)
            fetch('/api/login', {
                credentials: 'include',
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify({email: email.toLowerCase(), password})
            }).then(res => res.json())
            .then(res => {
                if(res.success) {
                    cookies.setCookies("user", JSON.stringify(res.user), 1)
                    setToastMsg("successfully")
                    setOpen(true)
                    setSeverity('success')
                    setLoading(false)
                    setTimeout(() => {
                        navigate('/creator')
                    }, 3000);
                }else {
                    console.log(res.error)
                    setToastMsg(res.msg)
                    setOpen(true)
                    setSeverity('error')
                    setLoading(false)
                }
            }).catch(err => {
                console.log(err)
                setToastMsg('An error occured')
                setOpen(true)
                setSeverity('error')
                setLoading(false)
            })
        }else{
            setToastMsg('Missing input')
            setOpen(true)
            setSeverity('error')
        }
    }

    return (
        <div className="signup-page full fullwidth" style={{ background: 'url(/assets/final-quotely.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'darken', backgroundColor: '#0000007a' }}>
            <Toast open={open} setOpen={setOpen} severity={severity} timer={4000}>{msg}</Toast>
            <CustomGrid gap={40} grid={2} className="no-grid-small">
                <div></div>
                <Spacebox padding="20px" style={{ height: "calc(100vh - 50px)", display: "flex", alignItems: 'center'}}>
                    <div className="glass" style={{ width: "100%", borderRadius: '20px' }}>
                        <Spacebox padding="20px">
                            <Spacebox padding="20px" />
                            <Typography className="logo-text" component="h3" variant="h3" sx={{ textAlign: 'center' }}>
                                Quotely
                            </Typography>
                            <Spacebox padding="20px" />
                            <Typography component="h4" variant="h4" className="bold" sx={{ textAlign: 'center', fontWeight: 700 }}>
                                Welcome Back !
                            </Typography>
                            <Spacebox padding="5px" />
                            <Typography sx={{ textAlign: 'center' }}>
                                Enter your details to access your account
                            </Typography>
                            <Spacebox padding="10px" />
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="Email"
                                color="primary"
                                type="email"
                                style={{ borderRadius: 20 }}
                            />
                            <Spacebox padding="10px" />
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="Password"
                                color="primary"
                                type="password"
                                style={{ borderRadius: 20 }}
                            />
                            <Spacebox padding="2px" />
                            <Flexbox justifyContent="space-between" alignItems="center">
                                <Link to="/signup" style={{color: "white"}}>
                                    <small>Don't have an account ? Sign Up</small>
                                </Link>
                                <Link to="/forgot-password" style={{color: "white"}}>
                                    <small>Forgot Password</small>
                                </Link>
                            </Flexbox>
                            <Spacebox padding="10px" />
                            <CustomButton
                                backgroundColor="var(--primary)"
                                color="white"
                                borderRadius="10px"
                                handleClick={handleRegister}
                                padding="20px"
                                className="fullwidth"
                                style={{ boxShadow: "10px 10px 30px #0000007a" }}
                            >
                                {loading && (
                                    <Flexbox justifyContent="center">
                                        <Jelly size={20} color="white" />
                                    </Flexbox>
                                )}
                                {!loading && (
                                    <span>Login</span>
                                )}
                            </CustomButton>
                        </Spacebox>
                    </div>
                </Spacebox>
            </CustomGrid>
        </div>
    );
}

export default Login;