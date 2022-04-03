import React, { useEffect, useState } from "react";
import { IssueStatus, NavBar, Table } from "../components";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDevice, getAllDevicesByLocation } from "../reducers/authSlice";
import { PieChart } from "react-minimal-pie-chart";
import { Button } from "react-bootstrap";

const defaultLabelStyle = {
  fontSize: "5px",
  fontFamily: "sans-serif",
};

const shiftSize = 7;

const Devices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const { locationDevices } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getAllDevicesByLocation(id));
  }, [id]);
  console.log(locationDevices);

  const createPropositions = locationDevices.filter(
    ({ type }) => type === "To create"
  );
  const fixes = locationDevices.filter(({ type }) => type === "To fix");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NavBar />

      <Container fluid className="ms-5">
        <Row>
          <h1>Do Naprawy</h1>
          <Col md={5}>
            <Table
              //   onRowClick={(item) => navigate(`/issue/${item.id}`)}
              data={fixes}
              columns={[
                { path: "name", label: "Name" },
                { path: "comment", label: "Comment" },
                {
                  label: "Change Status",
                  renderCell: (item) => <IssueStatus selectedValue={item} />,
                },
                {
                  label: "Delete",
                  renderCell: (item) => (
                    <Button
                      className="btn btn-danger"
                      onClick={() => dispatch(deleteDevice(item.id))}
                    >
                      Delete
                    </Button>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
      <hr />
      <Container fluid className="ms-5 mt-5">
        <h1>Inicjatywy</h1>
        <Row>
          <Col md={5}>
            <Table
              //   onRowClick={(item) => navigate(`/issue/${item.id}`)}
              data={createPropositions}
              columns={[
                { path: "name", label: "Name" },
                { path: "comment", label: "Comment" },
                { path: "votes", label: "Głosy" },
                // { label: "Change Status", renderCell: (item) => <IssueStatus selectedValue={item} /> },
                {
                  label: "Delete",
                  renderCell: (item) => (
                    <Button
                      className="btn btn-danger"
                      onClick={() => dispatch(deleteDevice(item.id))}
                    >
                      Delete
                    </Button>
                  ),
                },
              ]}
            />
          </Col>
          <Col md={1}>
            <Container />
          </Col>
          <Col className="d-flex flex-column justify-content-start align-items-start">
            <h2 className="ms-4">Wykres głosów</h2>
            <PieChart
              style={{ width: "300px", height: "300px" }}
              lineWidth={45}
              label={({ dataEntry }) => dataEntry.value}
              labelStyle={{
                ...defaultLabelStyle,
              }}
              data={createPropositions.map((item, idz) => ({title: item.name, value: item.votes, color: colors[idz]}))}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const colors = ["#E38627", "#C13C37", "#6A2135", "#2BA13F"];

export default Devices;
