import React, { useEffect, useState } from 'react';
import { getAdminDashboard } from '../../allApis';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Home.scss';

function Home() {
    const [data, setdata] = useState({})
    const [loading, setloading] = useState(false);
    const [frequency, setFrequency] = useState("daily");

    console.log({data})

    const getData = async () => {
        try {

            setloading(true);
            const response = await getAdminDashboard(frequency);
            setloading(false);

            setdata(response.dashboard)

        } catch (error) {
            setloading(false);
            console.error("API error:", error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        getData();
    }, [frequency])

    //
    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar frequency={frequency} setFrequency={setFrequency} />

                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="user" value={data?.total_users || "-"} />
                    <ItemLists type="orders" value={data?.orders_count || "-"} />
                    <ItemLists type="mango" value={data?.top_mango || "-"} />
                    <ItemLists type="revenue" value={data?.revenue || "-"} />
                </div>
                {/* 
                <div className="chart_sec">
                    <ProgressBar />
                    <Chart height={450} title="Revenue" />
                </div> */}

                {/* <div className="table">
                    <div className="title">Latest Transactions</div>
                    <TableList />
                </div> */}
            </div>
        </div>
    );
}

export default Home;
