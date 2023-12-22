import { Avatar, IconButton, Typography } from "@mui/material";
import Flexbox from "../components/Flexbox";
import Spacebox from "../components/styles/Spacebox";
import CustomButton from "../components/styles/Custombutton";
import CreatorSidebar from "../components/CreatorSidebar";
import { useEffect, useState } from "react";
import html2canvas from 'html2canvas';
import cookies from "../utilities/Cookies";
import { Close, Download, Login, LogoutOutlined, Menu, Save } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { Jelly } from "@uiball/loaders";
import { isMobile } from "react-device-detect";

const Creator = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const edit = urlParams.get('edit')
    const pid = urlParams.get('id')

    // dynamic variables
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
    const [background, setBackground] = useState('brown')
    const [backgroundPosition, setBackgroundPosition] = useState("")
    const [backgroundSize, setBackgroundSize] = useState("")
    const [opacity, setOpacity] = useState(10)
    const [canvaSize, setCanvaSize] = useState('16:9')

    const stringify_user = cookies.getCookies("user")
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const [exportLoading, setExportLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [msg, setToastMsg] = useState('');

    const [openMenu, setOpenMenu] = useState(false)



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
        setExportLoading(true)
        const branded = document.querySelector('.branded')
        branded.classList.remove('hide')
        html2canvas(div).then(canvas => {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, `quotely_${Date.now()}`);
            setToastMsg("Post downloaded successfully")
            setOpen(true)
            setSeverity('success')
            setExportLoading(true)
        });
        branded.classList.add('hide');
        setOpenMenu(false)
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

    const logout = () => {
        fetch('/api/logout', { credentials: 'include' })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    cookies.deleteCookies('user')
                    navigate('/')
                } else {
                    console.log(res.error)
                    setToastMsg(res.msg)
                    setOpen(true)
                    setSeverity('error')
                }
            }).catch(err => {
                console.log(err)
                setToastMsg('An error occured')
                setOpen(true)
                setSeverity('error')
            })
    }

    function populateData(pid) {
        fetch('/api/get_project', {
            credentials: 'include',
            mode: 'cors',
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": "http://localhost:3000" },
            body: JSON.stringify({ id: pid })
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    const project = res.project
                    const content = JSON.parse(project.content)
                    setProfileArea(content.profileArea)
                    setFullname(content.fullname)
                    // setProfile(null) 
                    setUsername(content.username)
                    setSocialMedia(content.socialMedia)
                    setVerified(content.verified)
                    setQuote(content.quote)
                    setDateTime(content.dateTime)
                    setDark(content.dark)
                    if (content.backgroundType !== 'image') {
                        setBackgroundType(content.backgroundType)
                        setBackground(content.background)
                        setBackgroundPosition(content.backgroundPosition)
                        setBackgroundSize(content.backgroundSize)
                    }
                    setCanvaSize(content.canvaSize)

                    setToastMsg("Project loaded")
                    setOpen(true)
                    setSeverity('success')
                } else {
                    console.log(res.error)
                    setToastMsg(res.msg)
                    setOpen(true)
                    setSeverity('error')
                    if (res.msg === "Invalid token")
                        navigate('/login')
                }
            }).catch(err => {
                console.log(err)
                setToastMsg('An error occured')
                setOpen(true)
                setSeverity('error')
            })
    }

    const saveProject = () => {
        let title = window.prompt("Please enter project title", fullname + '-' + Date.now())
        if (title !== null) {
            const content = {
                profileArea: profileArea,
                fullname: fullname,
                profile: profile,
                username: username,
                socialMedia: socialMedia,
                verified: verified,
                quote: quote,
                dateTime: dateTime,
                dark: dark,
                backgroundType: backgroundType,
                background: background,
                backgroundPosition: backgroundPosition,
                backgroundSize: backgroundSize,
                opacity: opacity,
                canvaSize: canvaSize,
            }
            setLoading(true)
            fetch('/api/add_project', {
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": "http://localhost:3000" },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    user_id: user.id
                })
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        setToastMsg("Project saved successfully")
                        setOpen(true)
                        setSeverity('success')
                        setLoading(false)
                        setTimeout(() => {
                            navigate('/profile')
                        }, 3000);
                    } else {
                        console.log(res.error)
                        setToastMsg(res.msg)
                        setOpen(true)
                        setSeverity('error')
                        setLoading(false)
                        if (res.msg === "Invalid token")
                            navigate('/login')
                    }
                }).catch(err => {
                    console.log(err)
                    setToastMsg('An error occured')
                    setOpen(true)
                    setSeverity('error')
                    setLoading(false)
                })
        } else {
            setToastMsg('Action aborted')
            setOpen(true)
            setSeverity('error')
        }
    }

    const updateProject = () => {
        let title = window.prompt("Please enter project title", fullname + '-' + Date.now())
        if (title !== null) {
            const content = {
                profileArea: profileArea,
                fullname: fullname,
                profile: profile,
                username: username,
                socialMedia: socialMedia,
                verified: verified,
                quote: quote,
                dateTime: dateTime,
                dark: dark,
                backgroundType: backgroundType,
                background: background,
                backgroundPosition: backgroundPosition,
                backgroundSize: backgroundSize,
                opacity: opacity,
                canvaSize: canvaSize,
            }
            setLoading(true)
            fetch('/api/update_project', {
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": "http://localhost:3000" },
                body: JSON.stringify({
                    id: pid,
                    title: title,
                    content: content,
                })
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        setToastMsg("Project updated successfully")
                        setOpen(true)
                        setSeverity('success')
                        setLoading(false)
                        setTimeout(() => {
                            navigate('/profile')
                        }, 3000);
                    } else {
                        console.log(res.error)
                        setToastMsg(res.msg)
                        setOpen(true)
                        setSeverity('error')
                        setLoading(false)
                        if (res.msg === "Invalid token")
                            navigate('/login')
                    }
                }).catch(err => {
                    console.log(err)
                    setToastMsg('An error occured')
                    setOpen(true)
                    setSeverity('error')
                    setLoading(false)
                })
        } else {
            setToastMsg('Action aborted')
            setOpen(true)
            setSeverity('error')
        }
    }

    useEffect(() => {
        if (stringify_user.length > 10)
            setUser(JSON.parse(stringify_user))
        if (edit)
            populateData(pid)
        setDateTime(`${(new Date(Date.now())).toString().substring(0, 15)} • ${(new Date(Date.now())).toString().substring(16, 21)}`)

        // eslint-disable-next-line
    }, [])

    // STYLES
    const creator_body_style = isMobile ? {
        alignItems: "center", minHeight: "calc(100vh - 110px)"
    } : {}

    return (
        <div className="creator-page">
            <Toast open={open} setOpen={setOpen} severity={severity} timer={4000}>{msg}</Toast>
            {openMenu && <div style={{ background: '#171923', height: '100vh', padding: '10px', position: 'fixed', left: '0', top: '0px', zIndex: '200', width: 'calc(100% - 20px)' }}>
                <Flexbox justifyContent="space-between" alignItems="center">
                    <div>
                        {user &&
                            <IconButton onClick={() => navigate('/profile')}>
                                <Avatar sx={{ background: "var(--primary)" }}>
                                    <small className="bold">
                                        {user.fullname.split(" ")[0][0]}
                                        {user.fullname.split(" ")[1][0]}
                                    </small>
                                </Avatar>
                            </IconButton>}
                    </div>
                    <IconButton onClick={() => setOpenMenu(false)}>
                        <Close sx={{ fontSize: '40px', color: 'white' }} />
                    </IconButton>
                </Flexbox>
                <Spacebox padding="20px" />
                {user && (
                    <div>
                        <CustomButton backgroundColor="transparent" className="fullwidth" borderRadius="10px" color="white" padding="10px 0px" handleClick={() => {
                            if (pid)
                                updateProject()
                            else
                                saveProject()
                        }}>
                            {!loading && <Flexbox alignItems="center" justifyContent="center">
                                <Save sx={{ fontSize: 40 }} />
                                <Spacebox padding="5px" />
                                <Typography sx={{ fontSize: 40, color: "white", fontWeight: 700 }}>
                                    {edit ? "Update" : "Save"}
                                </Typography>
                            </Flexbox>}

                            {loading && <Flexbox justifyContent="center">
                                <Jelly size={18} color="white" />
                            </Flexbox>}
                        </CustomButton>
                        <Spacebox padding="10px" />
                    </div>
                )}
                <CustomButton backgroundColor="transparent" className="fullwidth" borderRadius="10px" color="white" padding="10px 0px" handleClick={() => {
                    downloadPost(document.querySelector('div.editor'))
                }}>
                    {!exportLoading && <Flexbox alignItems="center" justifyContent="center">
                        <Download sx={{ fontSize: 40 }} />
                        <Spacebox padding="5px" />
                        <Typography sx={{ fontSize: 40, color: "white", fontWeight: 700 }}>
                            Export
                        </Typography>
                    </Flexbox>}
                    {exportLoading && <Flexbox alignItems="center" justifyContent="center">
                        <Jelly size={30} color="white" />
                    </Flexbox>}
                </CustomButton>
                {!user && <div>
                    <Spacebox padding="10px" />
                    <CustomButton backgroundColor="transparent" className="fullwidth" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => {
                        navigate('/login')
                    }}>
                        <Flexbox alignItems="center" justifyContent="center">
                            <Login sx={{ fontSize: 40 }} />
                            <Spacebox padding="5px" />
                            <Typography sx={{ fontSize: 40, color: "white", fontWeight: 700 }}>
                                Login
                            </Typography>
                        </Flexbox>
                    </CustomButton>
                </div>}
                {user && <div>
                    <Spacebox padding="10px" />
                    <CustomButton backgroundColor="transparent" className="fullwidth" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => logout()}>
                        <Flexbox alignItems="center" justifyContent="center">
                            <LogoutOutlined sx={{ fontSize: 40 }} />
                            <Spacebox padding="5px" />
                            <Typography sx={{ fontSize: 40, color: "white", fontWeight: 700 }}>
                                Logout
                            </Typography>
                        </Flexbox>
                    </CustomButton>
                </div>}
            </div>}
            <div className="creator-header" style={{ borderBottom: '1px solid #ffffff3a' }}>
                <Spacebox padding={isMobile ? "10px" : "10px 40px"}>
                    <Flexbox justifyContent="space-between" alignItems="center">
                        <Typography className="logo-text" component="h4" variant="h4">
                            Quotely
                        </Typography>
                        {!isMobile && <Flexbox alignItems="center">
                            {user && (
                                <Flexbox alignItems="center">
                                    <CustomButton backgroundColor="#0068a8" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => {
                                        if (pid)
                                            updateProject()
                                        else
                                            saveProject()
                                    }}>
                                        {!loading && <Flexbox alignItems="center">
                                            <Save sx={{ fontSize: 18 }} />
                                            <Spacebox padding="3px" />
                                            {edit ? <small>Update</small> : <span>Save</span>}
                                        </Flexbox>}
                                        {loading && <Flexbox justifyContent="center">
                                            <Jelly size={18} color="white" />
                                        </Flexbox>}
                                    </CustomButton>
                                    <Spacebox padding="10px" />
                                </Flexbox>
                            )}
                            <CustomButton backgroundColor="#348b34" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => {
                                downloadPost(document.querySelector('div.editor'))
                            }}>
                                <Flexbox>
                                    <Download sx={{ fontSize: 18 }} />
                                    <Spacebox padding="3px" />
                                    <span>Export</span>
                                </Flexbox>
                            </CustomButton>
                            {!user && <Flexbox alignItems="center">
                                <Spacebox padding="10px" />
                                <CustomButton backgroundColor="var(--primary)" borderRadius="10px" color="white" padding="10px 40px" handleClick={() => {
                                    navigate('/login')
                                }}>
                                    <Flexbox>
                                        <Login sx={{ fontSize: 18 }} />
                                        <Spacebox padding="3px" />
                                        <span>Login</span>
                                    </Flexbox>
                                </CustomButton>
                            </Flexbox>}
                            {user && <Flexbox alignItems="center">
                                <Spacebox padding="10px" />
                                <IconButton onClick={() => navigate('/profile')}>
                                    <Avatar sx={{ background: "var(--primary)" }}>
                                        <small className="bold">
                                            {user.fullname.split(" ")[0][0]}
                                            {user.fullname.split(" ")[1][0]}
                                        </small>
                                    </Avatar>
                                </IconButton>
                                <Spacebox padding="5px" />
                                <IconButton onClick={() => logout()}>
                                    <LogoutOutlined sx={{ color: 'white' }} />
                                </IconButton>
                            </Flexbox>}
                        </Flexbox>}
                        {isMobile && (
                            <IconButton onClick={() => setOpenMenu(true)}>
                                <Menu style={{ color: 'white' }} />
                            </IconButton>
                        )}
                    </Flexbox>
                </Spacebox>
                <Spacebox padding="2px" />
            </div>
            <Flexbox className="creator-body" style={{ ...creator_body_style }}>
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
                    opacity: [opacity, setOpacity],
                    canvaSize: [canvaSize, setCanvaSize]
                }} />
                {!isMobile && <Spacebox padding="20px" />}
                <div className="editor-holder" style={{ width: 600, height: canvaSize === '16:9' ? '337.5px' : '600px', margin: 'auto' }}>
                    <div className="editor" style={{ background: background, aspectRatio: canvaSize, width: "100%", height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundPosition: backgroundPosition ?? "center", backgroundSize: backgroundSize ?? "cover" }}>
                        <div className="quote-holder" style={{ background: dark ? `#171923${opacity === 10 ? '' : opacity + "0"}` : `#ffffff${opacity === 10 ? '' : opacity + "0"}`, width: '80%', minHeight: 200, borderRadius: '20px', boxShadow: opacity < 10 ? "0px 10px 20px transparent" : '0px 10px 20px #0000003a', color: dark ? 'white' : 'black', padding: '20px', position: "relative" }}>
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
                                            {verified && <img src="/svgs/verified.png" alt="verified" style={{ width: '12px' }} />}
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