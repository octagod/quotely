import { Container, Typography } from "@mui/material";
import Flexbox from "../components/Flexbox";
import Spacebox from "../components/styles/Spacebox";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <Container sx={{ height: '100vh' }}>
                <Flexbox alignItems="Center" justifyContent="center" style={{ height: '100%', width: '100%' }}>
                    <div>
                        <Typography style={{fontSize: '40px', color: 'white'}} className="not-found-text" textAlign="center">
                            Page not found
                        </Typography>
                        <Spacebox padding="5px"/>
                        <Typography style={{color: 'white'}}  textAlign="center">
                            Back to <Link style={{color: 'var(--primary)'}} to="/">home</Link>
                        </Typography>
                    </div>
                </Flexbox>
            </Container>
        </div>
    );
}

export default NotFound;