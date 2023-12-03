import { Avatar, Typography } from "@mui/material";
import Flexbox from "../components/Flexbox";
import Spacebox from "../components/styles/Spacebox";
import CustomButton from "../components/styles/Custombutton";
import CreatorSidebar from "../components/CreatorSidebar";
import { useState } from "react";
import html2canvas from 'html2canvas';

const Creator = () => {
    // dynamic variables

    // profile area : Nullable = true
    // social media icons if profile area is true
    // profile picture if profile area is true
    // username if profile area is true
    // @username if profile area is true
    // verified badge if profile area is true
    // content
    // date and time
    // dark or light theme
    // background type - gradient, Solid Color, image
    // canva size - wide(16:9), square(1:1)

    const [profileArea, setProfileArea] = useState(true)
    const [fullname, setFullname] = useState('John Doe')
    const [profile, setProfile] = useState(null)
    const [username, setUsername] = useState('johndoe_')
    const [socialMedia, setSocialMedia] = useState('twitter')
    const [verified, setVerified] = useState(false)
    const [quote, setQuote] = useState('This is the body text @mena #quotelyrocks #makeAlive')
    const [dateTime, setDateTime] = useState('12/2/2023 • 8:17am')
    const [dark, setDark] = useState(true)
    const [backgroundType, setBackgroundType] = useState('solid')
    const [background, setBackground] = useState('blue')
    const [backgroundPosition, setBackgroundPosition] = useState(null)
    const [backgroundSize, setBackgroundSize] = useState(null)
    const [canvaSize, setCanvaSize] = useState('16:9')


    const process = (word) => {
        word = word.replaceAll(",", "-comma-");
        let words = word.split(" ");
        words = words.map(word => word.includes('@') || word.includes('#') || word.includes('https://') || word.includes('http://') ? '<span style="color: #8ED1FC">' + word + "</span>" : word)
        let words_ = words.toString()
        words_ = words_.replaceAll(",", " ")
        words_ = words_.replaceAll("-comma-", ",")
        return words_
    }

    function downloadPost(div) {
        const branded = document.querySelector('.branded')
        branded.classList.remove('hide')
        html2canvas(div).then(canvas => {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, `quotely_${Date.now()}`);
        });
        branded.classList.add('hide');
    }


    function downloadURI(uri, name) {
        var link = document.createElement("a");

        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        //after creating link you should delete dynamic link
        link.remove()
    }

    return (
        <div className="creator-page">
            <div className="creator-header" style={{ borderBottom: '1px solid #ffffff3a' }}>
                <Spacebox padding="10px 40px">
                    <Flexbox justifyContent="space-between" alignItems="center">
                        <Typography className="logo-text" component="h4" variant="h4">
                            Quotely
                        </Typography>
                        <CustomButton backgroundColor="var(--primary)" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => {
                            downloadPost(document.querySelector('div.editor'))
                        }}>
                            Export ↓
                        </CustomButton>
                    </Flexbox>
                </Spacebox>
                <Spacebox padding="2px" />
            </div>
            <Flexbox>
                <CreatorSidebar data={{
                    profileArea: [profileArea, setProfileArea],
                    fullname: [fullname, setFullname],
                    profile: [profile, setProfile],
                    username: [username, setUsername],
                    socialMedia: [socialMedia, setSocialMedia],
                    verified: [verified, setVerified],
                    quote: [quote, setQuote],
                    dateTime: [dateTime, setDateTime],
                    dark: [dark, setDark],
                    backgroundType: [backgroundType, setBackgroundType],
                    background: [background, setBackground],
                    backgroundPosition: [backgroundPosition, setBackgroundPosition],
                    backgroundSize: [backgroundSize, setBackgroundSize],
                    canvaSize: [canvaSize, setCanvaSize]
                }} />
                <Spacebox padding="20px" />
                <div className="editor-holder" style={{ width: 600, height: canvaSize === '16:9' ? '337.5px' : '600px', margin: 'auto' }}>
                    <div className="editor" style={{ background: background, aspectRatio: canvaSize, width: "100%", height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundPosition: backgroundPosition ?? "center", backgroundSize: backgroundSize ?? "cover" }}>
                        <div className="quote-holder" style={{ background: dark ? '#171923' : '#fff', width: '80%', minHeight: 200, borderRadius: '20px', boxShadow: '0px 10px 20px #0000003a', color: dark ? 'white' : 'black', padding: '20px', position: "relative" }}>
                            {profileArea && <Flexbox justifyContent="space-between" alignItems="center">
                                <Flexbox alignItems="center">
                                    {(!profile) && <Avatar />}
                                    {profile && <Avatar src={URL.createObjectURL(profile)} />}
                                    <Spacebox padding="5px" />
                                    <div>
                                        <Flexbox alignItems="center">
                                            <p style={{ margin: '0px' }}>
                                                <b>{fullname}</b>
                                            </p>
                                            <Spacebox padding="2px" />
                                            {verified && <img src="/svgs/verified.png" alt="verified" style={{width: '12px'}} />}
                                        </Flexbox>
                                        <small style={{ opacity: 0.5 }}>
                                            @{username}
                                        </small>
                                    </div>
                                </Flexbox>
                                <div>
                                    {socialMedia === 'facebook' && <img src={dark ? "/svgs/facebook_w.svg" : "/svgs/facebook.svg"} alt="facebook" />}
                                    {socialMedia === 'twitter' && <img src={dark ? "/svgs/twitter_w.png" : "/svgs/twitter.png"} alt="twitter" style={{ width: 18 }} />}
                                    {socialMedia === 'instagram' && <img src={dark ? "/svgs/instagram_w.svg" : "/svgs/instagram.svg"} alt="instagram" />}
                                </div>
                            </Flexbox>}
                            <Spacebox padding="10px" />
                            <div style={{ minHeight: 100 }}>
                                <Typography dangerouslySetInnerHTML={{ __html: process(quote) }}></Typography>
                            </div>
                            <Spacebox padding="10px" />
                            <Typography style={{ opacity: 0.3 }}>
                                {dateTime}
                            </Typography>
                            <small className="branded hide" style={{ position: 'absolute', right: 10, bottom: -30, display: 'block', color: 'white' }}>
                                Built with <b>Quotely</b>
                            </small>
                        </div>
                    </div>
                </div>
            </Flexbox>
        </div>
    );
}

export default Creator;