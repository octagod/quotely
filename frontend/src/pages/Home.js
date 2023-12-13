import { Typography } from "@mui/material";
import Flexbox from "../components/Flexbox";
import Spacebox from "../components/styles/Spacebox";
import CustomButton from "../components/styles/Custombutton";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className="home-page" style={{ overflowX: 'hidden' }}>
            <div>
                <div className="fullwidth" style={{ minHeight: '100vh', position: "relative" }}>
                    <div className="creator-header" style={{zIndex: 2, position: 'relative'}}>
                        <Spacebox padding="10px 40px">
                            <Flexbox justifyContent="space-between" alignItems="center">
                                <Typography className="logo-text" component="h4" variant="h4">
                                    Quotely
                                </Typography>
                                <Flexbox alignItems="center">
                                    <CustomButton backgroundColor="transparent" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => navigate('/login')}>
                                        Login
                                    </CustomButton>
                                    <Spacebox padding="5px" />
                                    <CustomButton backgroundColor="var(--primary)" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => navigate('/signup')}>
                                        Sign Up
                                    </CustomButton>
                                </Flexbox>
                            </Flexbox>
                        </Spacebox>
                        <Spacebox padding="2px" />
                    </div>
                    <Spacebox padding="50px" />
                    <Flexbox alignItems="flex-start" justifyContent="center" style={{ position: "relative", zIndex: '2', margin: '0px auto' }}>
                        <div>
                            <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                Instantly create <b className="primary-text"> beautiful social media</b><br />posts images for fun.
                            </Typography>
                            <Spacebox padding="10px" />
                            <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>
                                Easily create beautiful quotes instantly, fully customisable and 100% you all for free.
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