import React, { useEffect, useState } from "react";
import { IssueStatus, NavBar, Table } from "../components";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDevice, getAllDevicesByLocation } from "../reducers/authSlice";
import { Button } from "react-bootstrap";
import { getAllLocations } from "../reducers/authSlice";

const Locations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(()=>{dispatch(getAllLocations(1))}, []);
    const {locations} = useSelector(state=>state.auth);
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <NavBar />
            <Container className="ms-5">
          <Table
            //onRowClick={(item) => navigate(`/issue/${item.id}`)}
            data={locations}
            columns={[
              { path: "name", label: "Name" },
            ]}
          />
      </Container>
        </div>
    );
};

export default Locations;
