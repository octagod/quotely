import { IconButton, Typography } from "@mui/material";
import Flexbox from "../components/Flexbox";
import Spacebox from "../components/styles/Spacebox";
import CustomButton from "../components/styles/Custombutton";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { Close, Menu } from '@mui/icons-material';
import { useState } from "react";

const Home = () => {


    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className="home-page" style={{ overflowX: 'hidden' }}>
            <div>
                {openMenu && <div style={{ position: 'fixed', width: "100%", height: "100vh", left: 0, top: 0, background: 'var(--primary)', zIndex: 100 }}>
                    <Spacebox padding="20px" />
                    <Flexbox justifyContent="flex-end">
                        <IconButton onClick={() => setOpenMenu(false)}>
                            <Close sx={{ color: 'white', fontSize: '40px' }} />
                        </IconButton>
                    </Flexbox>
                    <Spacebox padding="10px" />
                    <Typography sx={{ fontSize: '40px', textAlign: 'center' }}>
                        <Link to="/login" className="bold" style={{ color: 'white' }}>Login</Link>
                    </Typography>
                    <Spacebox padding="10px" />
                    <Typography sx={{ fontSize: '40px', textAlign: 'center' }}>
                        <Link to="/signup" className="bold" style={{ color: 'white' }}>Sign Up</Link>
                    </Typography>
                </div>}
                <div className="fullwidth" style={{ minHeight: '100vh', position: "relative" }}>
                    <div className="creator-header" style={{ zIndex: 2, position: 'relative' }}>
                        <Spacebox padding={isMobile ? "10px" : "10px 40px"}>
                            <Flexbox justifyContent="space-between" alignItems="center">
                                <Typography className="logo-text" component="h4" variant="h4">
                                    Quotely
                                </Typography>
                                <Flexbox alignItems="center" className="hide-on-med-and-down">
                                    <CustomButton backgroundColor="transparent" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => navigate('/login')}>
                                        Login
                                    </CustomButton>
                                    <Spacebox padding="5px" />
                                    <CustomButton backgroundColor="var(--primary)" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => navigate('/signup')}>
                                        Sign Up
                                    </CustomButton>
                                </Flexbox>
                                {isMobile && (
                                    <IconButton onClick={() => setOpenMenu(true)}>
                                        <Menu style={{ color: 'white' }} />
                                    </IconButton>
                                )}
                            </Flexbox>
                        </Spacebox>
                        <Spacebox padding="2px" />
                    </div>
                    <Spacebox padding="50px" />
                    <Flexbox alignItems="flex-start" justifyContent="center" style={{ position: "relative", zIndex: '2', margin: '0px auto' }}>
                        <div style={{ padding: isMobile ? "10px" : "0px" }}>
                            <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                Instantly create <b className="primary-text"> beautiful social media</b><br />posts images for fun.
                            </Typography>
                            <Spacebox padding="10px" />
                            <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>
                                Create beautiful quotes instantly, fully customisable and 100% free.
                            </Typography>
                            <Spacebox padding="20px" />
                            <div className="small margin-auto">
                                <CustomButton style={{ background: "var(--gradient)" }} borderRadius="1000px" padding="20px 40px" color="white" handleClick={() => navigate('/creator')} className="fullwidth pulse">
                                    <Flexbox alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5">
                                            <b>Get Creative</b>
                                        </Typography>
                                        <Spacebox padding="10px" />
                                        <img src="/assets/arrow-right.png" style={{ width: '40px' }} className="invert" alt="arrow" />
                                    </Flexbox>
                                </CustomButton>
                            </div>
                        </div>
                    </Flexbox>
                    <Spacebox padding="10px" />
                    <Typography sx={{fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center'}}>
                        This app was built by <a style={{color: "var(--primary)", fontWeight: '700'}} href="https://x.com/owen_nicklauss">Nicklaus</a> with ❤️
                    </Typography>
                    <div className="anim">
                        <img src="/assets/banner_quotely.png" alt="" />
                        <img src="/assets/banner_quotely.png" alt="" />
                        <img src="/assets/banner_quotely.png" alt="" />
                        <img src="/assets/banner_quotely.png" alt="" />
                        <img src="/assets/banner_quotely.png" alt="" />
                        <img src="/assets/banner_quotely.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;