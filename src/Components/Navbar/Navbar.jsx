import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';

// import sass file
import './navbar.scss';

// import images
import admin from '../../Images/admin_pic.jpg';
import { sidebarMenu } from '../../globalVars';
import FrequencySelect from '../CustomSelect';

function Navbar({ setSearchText, frequency, setFrequency }) {
    const [toggle, setToggle] = useState(false);
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
        localStorage.removeItem("token")
    }

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <div className="navbar">
            <div className="navbar_main">
                <div className="menu_logo">
                    {toggle ? (
                        <CloseIcon className="menu_icon" onClick={handleToggle} />
                    ) : (
                        <MenuIcon className="menu_icon" onClick={handleToggle} />
                    )}

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h3 className="text_none">Dashboard</h3>
                    </Link>
                </div>
                <div className="search">
                    <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search.." />

                    <SearchIcon className="search_icon" />
                </div>

                <div className="item_lists">

                    {
                        frequency &&
                        <FrequencySelect value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                    }

                    {/* <div className="item">
                        {!darkMode ? (
                            <DarkModeIcon
                                className="item_icon"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        ) : (
                            <LightModeIcon
                                className="item_icon white"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        )}
                    </div> */}

                    <div className="item">
                        <img className="admin_pic" src={admin} alt="admin" />
                    </div>
                </div>
            </div>

            <div className="res_navbar">
                {toggle && (
                    <div className="res_nav_menu">
                        <div className="res_nav_menuu">
                            <div className="links">
                                <ul>
                                    {sidebarMenu.map((section) => (
                                        <div key={section.title}>
                                            <p className="spann">{section.title}</p>
                                            {section.items.map((item) => {
                                                const Icon = item.icon;

                                                if (item.name === 'Log Out') {
                                                    return (
                                                        <li key={item.name} onClick={handleLogout}>
                                                            <Icon className="icon" /> {item.name}
                                                        </li>
                                                    );
                                                }

                                                return item.path ? (
                                                    <Link key={item.name} to={item.path} style={{ textDecoration: 'none' }}>
                                                        <li>
                                                            <Icon className="icon" /> {item.name}
                                                        </li>
                                                    </Link>
                                                ) : (
                                                    <li key={item.name}>
                                                        <Icon className="icon" /> {item.name}
                                                    </li>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
