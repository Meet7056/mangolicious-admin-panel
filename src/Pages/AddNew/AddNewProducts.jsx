/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { addProducts, updateProducts } from '../../allApis';

import { useNavigate } from "react-router-dom";
import errorToast from '../../Components/globalFunctions/errorToast';
import successToast from '../../Components/globalFunctions/successToast';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';

const statesWithCities = {
    Gujarat: ['Ahmedabad', 'Surat', 'Rajkot', 'Vadodara', 'Bhavnagar'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur'],
};


function AddNewProducts({ titlee }) {

    const [loading, setLoading] = useState(false);
    const { id } = useParams();

        const location = useLocation();
        const { adminData } = location.state || {};

    const dynamicInpVal = adminData ? adminData : {
        type: '',
        quantity: '',
        price: '',
        city: '',
        state: '',
    };

    const inputs = [
        {
            id: 1,
            label: 'Type',
            type: 'text',
            name: 'type',
            placeholder: 'Type: "Kesar"',
        },
        {
            id: 2,
            label: 'Quantity',
            type: 'number',
            name: 'quantity',
            placeholder: 'Enter quantity',
        },
        {
            id: 3,
            label: 'Price',
            type: 'number',
            name: 'price',
            placeholder: 'Enter price',
        },
    ];

    const [userInp, setUserInp] = useState(dynamicInpVal);
    const [file, setFile] = useState('');
    const image = false;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);
            let response;
            if (id) {   
                response = await updateProducts(userInp); // Replace this with your product-specific API
            }else{
                response = await addProducts(userInp); // Replace this with your product-specific API
            }
            setLoading(false);

            if (response.message === "Mango added successfully!" || response.message == "Mango updated successfully!") {
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


                            <div>
                                <p style={{ color: "gray", fontSize: 12, marginBottom: 5 }}>{"State"}</p>
                                <div className="input_group">
                                    <select
                                        id="state"
                                        name="state"
                                        value={userInp.state}
                                        onChange={(e) => {
                                            setUserInp({ ...userInp, state: e.target.value, city: '' });
                                        }}
                                    >
                                        <option value="">Select state</option>
                                        {Object.keys(statesWithCities).map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <div>
                                <p style={{ color: "gray", fontSize: 12, marginBottom: 5 }}>{"City"}</p>
                                <div className="input_group">
                                    <select
                                        id="city"
                                        name="city"
                                        value={userInp.city}
                                        onChange={(e) => setUserInp({ ...userInp, city: e.target.value })}
                                        disabled={!userInp.state}
                                    >
                                        <option value="">Select city</option>
                                        {userInp.state &&
                                            statesWithCities[userInp.state].map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

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

export default AddNewProducts;
