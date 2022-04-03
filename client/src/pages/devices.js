import React, { useEffect, useState } from "react";
import { IssueStatus, NavBar, Table } from "../components";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDevice, getAllDevicesByLocation } from "../reducers/authSlice";
import { Button } from "react-bootstrap";

const Devices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { locationDevices } = useSelector(state => state.auth)
    React.useEffect(() => { dispatch(getAllDevicesByLocation(1)) }, []);
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <NavBar />

            <Container className="ms-5">
                <Table
                    onRowClick={(item) => navigate(`/issue/${item.id}`)}
                    data={
                        locationDevices
                    }
                    columns={[
                        { path: "name", label: "Name" },
                        { path: "comment", label: "Comment" },
                        { label: "Change Status", renderCell: (item) => <IssueStatus selectedValue={item} /> },
                        { label: "Delete", renderCell: (item) => <Button className="btn btn-danger" onClick={() => dispatch(deleteDevice(item.id))}>Delete</Button> }
                    ]}
                />
            </Container>
        </div>
    );
};

export default Devices;
