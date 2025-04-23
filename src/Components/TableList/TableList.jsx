import React, { useEffect, useState } from 'react';
import './tableList.scss';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { getOrderHistory, updateOrderStaus } from '../../allApis';

function TableList() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrderHistory();
            if (result.orders) {
                setdata(result.orders);
            }
        };

        fetchData();
    }, []);

    const handleApprove = async (orderId, status) => {

        const updatedData = data.map((item) =>
            item.id === orderId ? { ...item, status: status } : item
        );
        setdata(updatedData);

        try {
            const response = await updateOrderStaus({
                "order_id": orderId,
                "status": status
            })
        } catch (error) {
            console.error({ error })
        }
    };



    return (
        <TableContainer component={Paper} className="table_list">
            <Table sx={{ minWidth: 650 }} aria-label="order table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_cell">Order ID</TableCell>
                        <TableCell className="table_cell">Customer Name</TableCell>
                        <TableCell className="table_cell">Phone Number</TableCell>
                        <TableCell className="table_cell">Address</TableCell>
                        <TableCell className="table_cell">Total Amount</TableCell>
                        <TableCell className="table_cell">Ordered At</TableCell>
                        <TableCell className="table_cell">Status</TableCell>
                        <TableCell className="table_cell">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="table_cell">{row.id}</TableCell>
                            <TableCell className="table_cell">{row.customer_name}</TableCell>
                            <TableCell className="table_cell">{row.phone_number}</TableCell>
                            <TableCell className="table_cell">{row.address}</TableCell>
                            <TableCell className="table_cell">₹{row.total_amount}</TableCell>
                            <TableCell className="table_cell">{new Date(row.ordered_at).toLocaleString()}</TableCell>
                            <TableCell className="table_cell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                            <TableCell className="table_cell">
                                {row.status === 'pending' && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="success"
                                        onClick={() => handleApprove(row.id, "approved")}
                                    >
                                        Approve
                                    </Button>
                                )}
                                {row.status === 'approved' && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleApprove(row.id, "recieved")}
                                    >
                                        Recieved
                                    </Button>
                                )}
                                {row.status === 'recieved' && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        disabled={true}
                                    >
                                        Recieved
                                    </Button>
                                )}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableList;
