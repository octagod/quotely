import { Avatar, Container, Divider, IconButton, Typography } from "@mui/material";
import Toast from "../components/Toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spacebox from "../components/styles/Spacebox";
import Flexbox from "../components/Flexbox";
import { Add, DateRangeOutlined, DeleteOutline, EditNoteOutlined, EditOutlined, LogoutOutlined } from "@mui/icons-material";
import cookies from "../utilities/Cookies";
import { Jelly } from "@uiball/loaders";
import CustomGrid from "../components/styles/Grid";
import { isMobile } from "react-device-detect";

const Profile = () => {


    const stringify_user = cookies.getCookies("user")
    const [dbUser, setDbUser] = useState(null)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [msg, setToastMsg] = useState('');

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

    const getUser = () => {
        fetch('/api/user', { credentials: "include" })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setDbUser(res.user)
                    cookies.setCookies('user', JSON.stringify({
                        id: res.user.id,
                        fullname: res.user.fullname,
                        email: res.user.email
                    }), 0.5)
                    setLoading(false)
                    setError(null)
                } else {
                    setError(res.msg)
                    console.log(res.error)
                    setToastMsg(res.msg)
                    setOpen(true)
                    setSeverity('error')
                    setLoading(false)
                    if (res.msg === "Invalid token")
                        navigate('/login')
                }
            }).catch(err => {
                setError("An error occured")
                console.log(err)
                setToastMsg('An error occured')
                setOpen(true)
                setSeverity('error')
                setLoading(false)
            })
    }

    const deleteProject = (project) => {
        if (window.confirm("You are about to delete " + project.title)) {
            fetch('/api/delete_project', {
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": "http://localhost:3000" },
                body: JSON.stringify({
                    id: project.id
                })
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        setToastMsg("Project deleted")
                        setOpen(true)
                        setSeverity('success')
                        setLoading(true)
                        getUser() //get user
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
    }

    const editUser = (user) => {
        const newName = window.prompt("Edit full name", user.fullname)
        if (newName !== null) {
            fetch('/api/update_user/' + user.id, {
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": "http://localhost:3000" },
                body: JSON.stringify({
                    fullname: newName
                })
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        setToastMsg("Profile updated successfully")
                        setOpen(true)
                        setSeverity('success')
                        getUser()
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
        if (stringify_user.length > 10) {
            setUser(JSON.parse(stringify_user))
            getUser()
        } else
            navigate('/login')

        // eslint-disable-next-line
    }, [])

    return (
        <div className="profile-page">
            <Toast open={open} setOpen={setOpen} severity={severity} timer={4000}>{msg}</Toast>
            <div className="" style={{ borderBottom: '1px solid #ffffff3a' }}>
                <Spacebox padding="10px 40px">
                    <Flexbox justifyContent="space-between" alignItems="center">
                        <Typography className="logo-text" component="h4" variant="h4">
                            Quotely
                        </Typography>
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
                    </Flexbox>
                </Spacebox>
                <Spacebox padding="2px" />
            </div>
            <Container>
                <Spacebox padding="10px" />
                <Typography sx={{ fontWeight: '800' }} variant="h5">
                    Your Profile
                </Typography>
                <Spacebox padding="20px" />
                {loading && <Flexbox justifyContent="center">
                    <Jelly size={30} color="white" />
                </Flexbox>}
                {error && <Flexbox justifyContent="center">
                    <Typography sx={{ textAlign: 'center' }}>
                        {error}
                    </Typography>
                </Flexbox>}
                {dbUser && (<div>
                    <div style={{ background: '#ffffff1a', borderRadius: 20 }}>
                        <Spacebox padding="20px">
                            <Flexbox alignItems="center">
                                <Avatar sx={{ background: "var(--primary)", width: 70, height: 70 }}>
                                    <span className="bold">
                                        {dbUser.fullname.split(" ")[0][0]}
                                        {dbUser.fullname.split(" ")[1][0]}
                                    </span>
                                </Avatar>
                                <Spacebox padding="10px" />
                                <div>
                                    <Typography variant="h4" style={isMobile ? { fontSize: "25px" } : {}}>
                                        {dbUser.fullname}
                                    </Typography>
                                    <Spacebox padding="5px" />
                                    <Typography variant="body2" sx={{ opacity: .5 }}>
                                        {dbUser.email}
                                    </Typography>
                                </div>
                                <Spacebox padding="10px" />
                                <IconButton onClick={() => editUser(dbUser)}>
                                    <EditNoteOutlined sx={{ color: "White" }} />
                                </IconButton>
                            </Flexbox>
                        </Spacebox>
                    </div>
                    <Spacebox padding="20px">
                        <Divider sx={{ background: '#ffffff3a' }} />
                    </Spacebox>
                    <Flexbox alignItems="center" justifyContent="space-between">
                        <Typography sx={{ fontWeight: '800' }} variant="h5">
                            Projects
                        </Typography>
                        <IconButton onClick={() => navigate('/creator')}>
                            <Add sx={{ color: '#fff', fontSize: 30 }} />
                        </IconButton>
                    </Flexbox>
                    <Spacebox padding="10px" />
                    {dbUser.projects.length < 1 ? (
                        <div>
                            <Typography>
                                You currently have no saved projects
                            </Typography>
                        </div>
                    ) : (
                        <CustomGrid grid={4} gap="20px" className="no-grid-small">
                            {dbUser.projects.map((project, index) => (
                                <div key={index} style={{ background: "#ffffff2a", borderRadius: '10px', margin: isMobile ? '10px auto' : "0px" }}>
                                    <Spacebox padding={isMobile ? "15px" : "20px"}>
                                        <Flexbox justifyContent="space-between" alignItems="center">
                                            <IconButton onClick={() => deleteProject(project)}>
                                                <DeleteOutline sx={{ color: '#F64F64', fontSize: 20 }} />
                                            </IconButton>
                                            <IconButton onClick={() => navigate('/creator?edit=true&id=' + project.id)}>
                                                <EditOutlined sx={{ color: 'white', fontSize: 20 }} />
                                            </IconButton>
                                        </Flexbox>
                                        <Spacebox padding="5px" />
                                        <Typography sx={{ fontSize: isMobile ? "16px" : '20px' }}>
                                            {project.title}
                                        </Typography>
                                        <Spacebox padding="10px" />
                                        <Flexbox alignItems="center" >
                                            <DateRangeOutlined sx={{ fontSize: 18, opacity: isMobile ? .7 : 1 }} />
                                            <Spacebox padding={isMobile ? "5.5px" : "1.5px"} />
                                            <small style={isMobile ? { fontSize: "10px", opacity: .7 } : {}}>{project.timestamp}</small>
                                        </Flexbox>
                                    </Spacebox>
                                </div>
                            ))}
                        </CustomGrid>
                    )}
                    <Spacebox padding="10px" />
                </div>)}
            </Container>
        </div>
    );
}

export default Profile;