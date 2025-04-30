/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteFlashsale, getAllUsers } from '../../allApis';
import DataTable from '../../Components/DataTable/DataTable';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import man1 from '../../Images/man1.jpg';
import man2 from '../../Images/man2.jpg';
import man3 from '../../Images/man3.jpg';
import man4 from '../../Images/man4.jpg';
import woman1 from '../../Images/woman1.jpg';
import woman2 from '../../Images/woman2.jpg';
import './userlists.scss';

const userData = [
    {
        id: '630343eb94c2812e4cd7e45d',
        username: 'Devid434',
        email: 'devidbom232@gmail.com',
        image: man1,
        status: 'active',
        age: '24',
    },
    {
        id: '6303234eb94c2812e4cd7e45e',
        username: 'Johnn434',
        email: 'john03434@gmail.com',
        image: man2,
        status: 'passive',
        age: '29',
    },
    {
        id: 'e40343eb94c2812e4cd7e4233',
        username: 'Dilvib1233',
        email: 'dilvibhasanjohn1233@gmail.com',
        image: man3,
        status: 'active',
        age: '20',
    },
    {
        id: '930343eb94c2812e4cd7e45g',
        username: 'DoeJelia88',
        email: 'doejelia88@gmail.com',
        image: woman1,
        status: 'active',
        age: '23',
    },
    {
        id: '60443eb94c2812e4cd7e45ii',
        username: 'Lucas0984',
        email: 'lucashossel@gmail.com',
        image: man4,
        status: 'passive',
        age: '30',
    },
    {
        id: 'e23343eb94c2812e4cd7e45kk',
        username: 'Annie765',
        email: 'anniejhon@gmail.com',
        image: woman2,
        status: 'active',
        age: '23',
    },
    {
        id: '63asd34eb94c2812e4cd7e45e',
        username: 'Johnn434',
        email: 'john03434@gmail.com',
        image: man2,
        status: 'passive',
        age: '29',
    },
    {
        id: 'e40gfdeb94c2812e4cd7e4233',
        username: 'Dilvib1233',
        email: 'dilvibhasanjohn1233@gmail.com',
        image: man3,
        status: 'active',
        age: '20',
    },
    {
        id: '60443lkjc2812e4cd7e45ii',
        username: 'Lucas0984',
        email: 'lucashossel@gmail.com',
        image: man4,
        status: 'passive',
        age: '30',
    },
    {
        id: '930343eb9465512e4cd7e45g',
        username: 'DoeJelia88',
        email: 'doejelia88@gmail.com',
        image: woman1,
        status: 'active',
        age: '23',
    },
    {
        id: '60443eb94c8ui2e4cd7e45ii',
        username: 'Lucas0984',
        email: 'lucashossel@gmail.com',
        image: man4,
        status: 'passive',
        age: '30',
    },
    {
        id: '6303234eb9987812ed7e45e',
        username: 'Johnn434',
        email: 'john03434@gmail.com',
        image: man2,
        status: 'passive',
        age: '29',
    },
];

function UsersList({ type }) {

    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDlt = (id) => {
        setData(data.filter((item) => item.id !== id));

        try {
            deleteFlashsale({
                "sale_id": id
            });

        } catch (error) {
            console.log({ error });
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            minWidth: 100,
            flex: 0.5
        },
        {
            field: 'fullname',
            headerName: 'Full name',
            minWidth: 180,
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 180,
            flex: 1
        },
        {
            field: 'mobile_no',
            headerName: 'Start',
            minWidth: 180,
            flex: 1
        },
        {
            field: 'password',
            minWidth: 180,
            flex: 1
        },
    ];

    const getData = async () => {
        try {
            setLoading(true)
            const response = await getAllUsers();
            if (response) {
                setData(response)
            } else {
                setData([])
            }
            setLoading(false)

        } catch (error) {
            console.log({ error })
            setLoading(false)

        }
    }

    useEffect(() => {
        getData();
    }, [])

    const filteredData = searchText
        ? data.filter((row) =>
            Object.values(row).some(
                (value) =>
                    value &&
                    value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        )
        : data;


    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar setSearchText={setSearchText} />

                {/* mui data table */}
                <div className="data_table">
                    <div className="btnn" style={{ display: 'flex', justifyContent: "end" }}>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to="/sale/addnew"
                        >
                            {/* <button type="button">Add New Sale</button> */}
                        </Link>
                    </div>

                    <DataTable data={filteredData} columns={columns} loading={loading} />
                </div>
            </div>
        </div>
    );
}

export default UsersList;
