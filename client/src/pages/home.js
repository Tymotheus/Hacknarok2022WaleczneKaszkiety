import React, { useState } from "react";
import { IssueStatus, NavBar, Table } from "../components";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NavBar />

      <Container className="ms-5">
          <Table
            onRowClick={(item) => navigate(`/issue/${item.id}`)}
            data={[
              { jeden: "one", dwa: "two", id: 15, val: 'Done' },
              { jeden: "one", dwa: "two", id: 20, val: 'Pending' },
            ]}
            columns={[
              { path: "jeden", label: "Jeden" },
              { path: "dwa", label: "Dwa", renderCell: (item) => <IssueStatus selectedValue={item.val} /> },
              { path: "id", label: "Trzy" },
              { path: "id", label: "Cztery" },
              { path: "id", label: "Cztery" },
              { path: "id", label: "Cztery" },
            ]}
          />
      </Container>
    </div>
  );
};

export default Home;
