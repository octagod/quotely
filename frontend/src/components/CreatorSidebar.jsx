import { TextField, Typography } from "@mui/material";
import Spacebox from "./styles/Spacebox";
import { useState } from "react";
import Flexbox from "./Flexbox";
import { TwitterPicker } from "react-color";

const CreatorSidebar = ({ data }) => {
    const [visibleMenu, setVisibleMenu] = useState('')

    const gradients = [
        ["#30496E", "#C90BB9"],
        ["#9F5C7B", "#0D968C"],
        ["#30F0C0", "#DF4414"],
        ["#0C1115", "#0723EE"],
        ["#D79AFB", "#01AEBF"],
        ["#069C1F", "#5C258C"],
        ["#50E461", "#637B82"],
        ["#DB14E7", "#390C7C"],
        ["#EECA13", "#F4FFA8"],
        ["#E96C6F", "#9E38A7"],
        ["#A449A4", "#5FB57E"],
        ["#BBF859", "#E55384"],
        ["#A4C54F", "#F090E2"],
        ["#87CC18", "#96DBE8"],
        ["#524D27", "#D8E2D3"],
        ["#278F78", "#977A68"],
        ["#E8785D", "#6707EF"],
        ["#D5F923", "#22A770"],
        ["#E7493D", "#0FB4AD"],
        ["#1870CD", "#E971A4"],
        ["#834163", "#759AD7"],
        ["#A0041C", "#B4C7E8"],
        ["#F59114", "#D33A53"],
        ["#F0314D", "#1F2DFE"],
        ["#AD0CBD", "#DC0778"],
        ["#BFF1CC", "#5D9318"],
        ["#DB371B", "#633DEC"],
        ["#4BCAD7", "#54B26E"],
        ["#1FAF97", "#D7DD99"],
        ["#8D283F", "#1B0E60"],
        ["#5FD9E0", "#0B4A79"],
        ["#F0782A", "#DAC1C2"],
        ["#D32860", "#F4F898"],
        ["#4AE432", "#29A240"],
        ["#541493", "#4C3623"],
        ["#BC1A6E", "#601C6E"],
        ["#8D4620", "#AC2D53"],
        ["#5B856C", "#4676FB"],
        ["#4D3B39", "#6B2A5F"],
        ["#E4033F", "#12F688"],
        ["#A3AE7E", "#89F869"],
        ["#BE692D", "#BB4FAF"],
        ["#CF9817", "#6C81FE"],
        ["#4CE898", "#1B3BC3"],
        ["#2C61D4", "#C0A35D"],
        ["#92A3EC", "#73CA91"],
        ["#FBAB7B", "#BB682E"],
        ["#BC2FBF", "#2A6028"],
        ["#5ED66D", "#DFBB5E"],
        ["#9307AA", "#115F86"],
        ["#9E9EBA", "#5CB5DC"],
        ["#10E536", "#7F1881"],
    ];


    const menus = [
        {
            image: '/svgs/type.svg',
            title: 'Content',
            action: () => setVisibleMenu('content'),
        },
        {
            image: '/svgs/twitter.svg',
            title: 'Social Media',
            action: () => setVisibleMenu('social'),
        },
        {
            image: '/svgs/image.svg',
            title: 'Background',
            action: () => setVisibleMenu('background'),
        },
        {
            image: '/svgs/minimize-2.svg',
            title: 'Resize',
            action: () => setVisibleMenu('resize'),
        },
        {
            image: '/svgs/sun.svg',
            title: 'Theme',
            action: () => setVisibleMenu('dark'),
        },
    ]
    let header = 0
    let sidebar = 0

    if (document.querySelector('.creator-sidebar .sidebar'))
        sidebar = document.querySelector('.creator-sidebar .sidebar').offsetWidth;
    if (document.querySelector('.creator-header'))
        header = document.querySelector('.creator-header').offsetHeight;

    const setBgType = (type) => {
        switch(type) {
            case "solid":
                data.backgroundSize[1]("")
                data.backgroundPosition[1]("")
                data.backgroundType[1]("solid")
                break
            case "gradient":
                data.backgroundSize[1]("")
                data.backgroundPosition[1]("")
                data.backgroundType[1]("gradient")
                break
            case "image":
                data.backgroundSize[1]("cover")
                data.backgroundPosition[1]("center")
                data.backgroundType[1]("image")
                break
            default:
                data.backgroundSize[1]("cover")
                data.backgroundPosition[1]("center")
                data.backgroundType[1]("image")
                break
        }
    }

    return (
        <div className="creator-sidebar" style={{ padding: '30px 10px' }}>
            <div style={{ border: '1px solid #ffffff3a', borderRadius: '20px' }} className="sidebar">
                <Spacebox padding="20px">
                    {menus.map((menu, index) => (
                        <div key={index} onClick={menu.action} style={{ minWidth: 40, maxWidth: 40, margin: '40px auto', textAlign: 'center', cursor: 'pointer' }}>
                            <div style={{ textAlign: 'center', padding: '10px', borderRadius: '5px', background: '#0000003a' }}>
                                <img src={menu.image} alt={menu.title} style={{ width: 20, filter: 'invert(1)' }} />
                            </div>
                            <Spacebox padding="5px" />
                            <Typography noWrap style={{ fontSize: '12px' }}>
                                {menu.title}
                            </Typography>
                        </div>
                    ))}
                </Spacebox>
            </div>
            {visibleMenu && <div className="reveal-block" style={{ border: '1px solid #ffffff3a', borderRadius: '20px', zIndex: '20', position: 'fixed', left: (sidebar + 20) + "px", top: (header + 30) + "px", width: '400px', padding: "20px", background: '#171923' }}>
                <div>
                    <Typography textAlign="right" style={{ cursor: 'pointer' }} onClick={() => setVisibleMenu(null)}>
                        X
                    </Typography>
                </div>
                {visibleMenu === 'content' && <div className="content-reveal">
                    <Typography variant="h5">
                        Quote Content
                    </Typography>
                    <Spacebox padding="10px" />
                    <small>Profile Picture</small>
                    <Spacebox padding="2px" />
                    <input
                        type="file"
                        onChange={(e) => data.profile[1](e.target.files[0])}
                    />
                    <Spacebox padding="10px" />
                    <TextField
                        value={data.fullname[0]}
                        onChange={(e) => data.fullname[1](e.target.value)}
                        fullWidth
                        variant="outlined"
                        label="Fullname"
                        color="primary"
                        style={{ borderRadius: 20 }}
                    />
                    <Spacebox padding="10px" />
                    <TextField
                        value={data.username[0]}
                        onChange={(e) => data.username[1](e.target.value)}
                        fullWidth
                        variant="outlined"
                        label="Username"
                        color="primary"
                        style={{ borderRadius: 20 }}
                    />
                    <Spacebox padding="10px" />
                    <TextField
                        value={data.quote[0]}
                        onChange={(e) => data.quote[1](e.target.value)}
                        fullWidth
                        variant="outlined"
                        label="Content"
                        color="primary"
                        minRows={4}
                        multiline={true}
                        maxRows={4}
                        style={{ borderRadius: 20 }}
                    />
                    <Spacebox padding="10px" />
                    <TextField
                        value={data.dateTime[0]}
                        onChange={(e) => data.dateTime[1](e.target.value)}
                        fullWidth
                        variant="outlined"
                        label="Date & Time"
                        color="primary"
                        style={{ borderRadius: 20 }}
                    />
                </div>}
                {visibleMenu === 'social' && <div className="social-reveal">
                    <Typography variant="h5">
                        Social Media
                    </Typography>
                    <Spacebox padding="10px" />
                    <small style={{ paddingLeft: '5px' }}>
                        Show Social Media
                    </small>
                    <Spacebox padding="2px" />
                    <select
                        name="profileArea"
                        id="profile-area"
                        value={data.profileArea[0]}
                        onChange={(e) => data.profileArea[1](e.target.value === 'true' ? true : false)}
                    >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                    <Spacebox padding="10px" />
                    <small style={{ paddingLeft: '5px' }}>
                        Social Media
                    </small>
                    <Spacebox padding="2px" />
                    <select
                        name="social"
                        id="social-media"
                        value={data.socialMedia[0]}
                        onChange={(e) => data.socialMedia[1](e.target.value)}
                    >
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter / X</option>
                    </select>
                    <Spacebox padding="10px" />
                    <small style={{ paddingLeft: '5px' }}>
                        Verified
                    </small>
                    <Spacebox padding="2px" />
                    <select
                        name="verified"
                        id="verified"
                        value={data.verified[0]}
                        onChange={(e) => data.verified[1](e.target.value === 'true' ? true : false)}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>}
                {visibleMenu === 'background' && <div className="content-reveal">
                    <Typography variant="h5">
                        Background
                    </Typography>
                    <Spacebox padding="10px" />
                    <small style={{ paddingLeft: '5px' }}>
                        Background Type
                    </small>
                    <Spacebox padding="2px" />
                    <select
                        name="background-type"
                        id="background-type"
                        value={data.backgroundType[0]}
                        onChange={(e) => setBgType(e.target.value)}
                    >
                        <option value="solid">Solid Color</option>
                        <option value="gradient">Gradient</option>
                        <option value="image">Image</option>
                    </select>
                    <Spacebox padding="10px" />
                    {data.backgroundType[0] === 'solid' && <div>
                        <div className="">
                            <small>Background Color</small>
                            <Spacebox padding="5px" />
                            <Flexbox alignItems="center">
                                <div style={{ width: 50, height: 50, borderRadius: 10, backgroundColor: data.background[0] }}>

                                </div>
                                <Spacebox padding="5px" />
                            </Flexbox>
                        </div>
                        <TwitterPicker
                            colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                            onChange={(e) => {
                                data.background[1](e.hex)
                            }}
                        />
                    </div>}
                    {data.backgroundType[0] === 'gradient' && <div>
                        <div className="">
                            <small>Gradient</small>
                            <Spacebox padding="5px" />
                            <Flexbox alignItems="center">
                                <div style={{ width: '100%', height: 50, borderRadius: 10, background: data.background[0] }}>

                                </div>
                                <Spacebox padding="5px" />
                            </Flexbox>
                            <Spacebox padding="10px" />
                            <div style={{ width: '100%', padding: '10px', borderRadius: '10px', display: 'flex', flexWrap: 'wrap' }}>
                                {gradients.map((gardient, index) => (
                                    <div key={index} style={{ width: 30, margin: 5, height: 30, borderRadius: 5, background: `linear-gradient(to right, ${gardient[0]}, ${gardient[1]})`, cursor: 'pointer' }} onClick={() => data.background[1](`linear-gradient(to right, ${gardient[0]}, ${gardient[1]})`)}></div>
                                ))}
                            </div>
                        </div>

                    </div>}
                    {data.backgroundType[0] === 'image' && <div>
                        <small style={{ paddingLeft: '5px' }}>
                            Background Image
                        </small>
                        <Spacebox padding="2px" />
                        <input
                            type="file"
                            onChange={(e) => data.background[1](`url(${URL.createObjectURL(e.target.files[0])})`)}
                        />
                        <Spacebox padding="10px" />
                        <small style={{ paddingLeft: '5px' }}>
                            Background Position
                        </small>
                        <Spacebox padding="2px" />
                        <select
                            name="background-position"
                            id="background-position"
                            value={data.backgroundPosition[0]}
                            onChange={(e) => data.backgroundPosition[1](e.target.value)}
                        >
                            <option value="center">Center</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                        </select>
                        <Spacebox padding="10px" />
                        <small style={{ paddingLeft: '5px' }}>
                            Background Size
                        </small>
                        <Spacebox padding="2px" />
                        <select
                            name="background-size"
                            id="background-size"
                            value={data.backgroundSize[0]}
                            onChange={(e) => data.backgroundSize[1](e.target.value)}
                        >
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                        </select>
                    </div>}
                </div>}
                {visibleMenu === 'resize' && <div className="resize-reveal">
                    <Typography variant="h5">
                        Resize
                    </Typography>
                    <Spacebox padding="10px" />
                    <select
                        name="resize"
                        id="resize"
                        value={data.canvaSize[0]}
                        onChange={(e) => data.canvaSize[1](e.target.value)}
                    >
                        <option value="16:9">Wide</option>
                        <option value="1:1">Square</option>
                    </select>
                </div>}
                {visibleMenu === 'dark' && <div className="dark-reveal">
                    <Typography variant="h5">
                        Theme
                    </Typography>
                    <Spacebox padding="10px" />
                    <select
                        name="resize"
                        id="resize"
                        value={data.dark[0]}
                        onChange={(e) => data.dark[1](e.target.value === "true" ? true : false)}
                    >
                        <option value={true}>Dark</option>
                        <option value={false}>Light</option>
                    </select>
                </div>}
            </div>}
        </div>
    );
}

export default CreatorSidebar;