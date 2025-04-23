/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { addFlashsale, updateFlashsale } from '../../allApis';
import successToast from '../../Components/globalFunctions/successToast';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';

import { useNavigate } from "react-router-dom";
import errorToast from '../../Components/globalFunctions/errorToast';

import { useLocation, useParams } from "react-router-dom";

const formateDate = (date) => {
    return new Date(date).toISOString();
}

function AddFlashsale({ titlee }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { adminData } = location.state || {};

    const dynamicInpVal = adminData ? {
        offer_title: adminData.offer_title,
        offer_desc: adminData.offer_desc,
        start_date: new Date(adminData.start_date).toISOString().slice(0, 16), // For datetime-local input
        end_date: new Date(adminData.end_date).toISOString().slice(0, 16), // For datetime-local input
    } :
    {
        offer_title: '',
        offer_desc: '',
        start_date: new Date().toISOString().slice(0, 16), // For datetime-local input
        end_date: new Date().toISOString().slice(0, 16), // For datetime-local input
    };

    const inputs = [
        {
            id: 1,
            label: 'Offer Title',
            type: 'text',
            name: 'offer_title',
            placeholder: 'Enter offer title',
        },
        {
            id: 2,
            label: 'Offer Description',
            type: 'text',
            name: 'offer_desc',
            placeholder: 'Enter offer description',
        },
        {
            id: 3,
            label: 'Start Date',
            type: 'datetime-local',
            name: 'start_date',
            placeholder: 'Start date and time'
        },
        {
            id: 4,
            label: 'End Date',
            type: 'datetime-local',
            name: 'end_date',
            placeholder: 'End date and time'
        },
    ];

    const [userInp, setUserInp] = useState(dynamicInpVal);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = Object.values(userInp).every(value => value !== '');

        if (!isFormValid) {
            errorToast("Please fill all required fields");
            return;
        }


        try {

            setLoading(true);
            let response;
            if (id) {
                response = await updateFlashsale({ ...userInp, sale_id: id, start_date: formateDate(userInp.start_date), end_date: formateDate(userInp.end_date) });
            }
            else {
                response = await addFlashsale({ ...userInp, start_date: formateDate(userInp.start_date), end_date: formateDate(userInp.end_date) });
            }

            setLoading(false);

            if (response.message === "Flash sale added successfully!" || response.message == "Flash sale updated successfully!") {
                successToast(response.message);
                navigate(-1);
            } else {
                errorToast(response.message);
            }

        } catch (error) {
            setLoading(false);
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
                        <button
                            type="submit"
                            disabled={loading}
                            className={`submit_btn ${loading ? 'disabled_btn' : ''}`}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddFlashsale;
