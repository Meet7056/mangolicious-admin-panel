/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';
import { sidebarMenu } from '../../globalVars';
import './Sidebar.scss';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
        localStorage.removeItem("token")
    }

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">AdminDashboard</h3>
                </Link>
            </div>

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
    );
}

export default Sidebar;
