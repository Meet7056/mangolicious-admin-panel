/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { addAdmin, getSingleAdmin, updateAdmin } from '../../allApis';
import successToast from '../../Components/globalFunctions/successToast';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';


import { useNavigate } from "react-router-dom";
import errorToast from '../../Components/globalFunctions/errorToast';

import { useParams } from "react-router-dom";

function AddNew({ titlee }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { adminData } = location.state || {};

    const getData = async () => {
        try {
            setLoading(true)
            const response = await getSingleAdmin({ admin_id: id });
            console.log({ response })
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error("API error:", error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        // getData();
    }, [])

    const dynamicInpVal = {
        username: '',
        password: '',
        email: '',
        superadmin: 0,
    };

    const inputs = [
        {
            id: 1,
            label: 'Username',
            type: 'text',
            name: 'username',
            placeholder: 'Enter username',
        },
        {
            id: 2,
            label: 'Password',
            type: 'password',
            name: 'password',
            placeholder: 'Enter password',
        },
        {
            id: 3,
            label: 'Email',
            type: 'email',
            name: 'email',
            placeholder: 'Enter email',
        },
    ];

    const [userInp, setUserInp] = useState(!adminData ? dynamicInpVal : adminData);
    const [file, setFile] = useState('');
    const image = false;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            
            let response;
            if (id) {
                response = await updateAdmin({ ...userInp, admin_id: id });
            }
            else {
                response = await addAdmin(userInp);
            }
            setLoading(false)
            if (response.message == "Admin Created Successfully!" || response.message == "Admin Updated Successfully") {
                successToast(response.message);
                navigate(-1)
            } else {
                errorToast(response.message)
            }



        } catch (error) {
            setLoading(false)
            console.error("API error:", error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <form onSubmit={handleSubmit} className="new_page_content">
                        <div className="form">

                            {inputs.map((detail) => (
                                <div>
                                    <p style={{ color: "gray", fontSize: 12, marginBottom: 5 }}>{detail.label}</p>
                                    <Input
                                        key={detail.id}
                                        {...detail}
                                        value={userInp[detail.name]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}

                        </div>
                        <button type="submit" disabled={loading} className={"submit_btn " + (loading && "disabled_btn")}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNew;
