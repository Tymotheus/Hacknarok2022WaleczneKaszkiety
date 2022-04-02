import React, { useState } from "react";
import { NavBar, Table } from "../components";
import { Container } from "react-bootstrap";

const Home = () => {
  const [state, setState] = useState(true);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NavBar />

      <Container className="ms-5">
          <Table
            onRowClick={(item) => alert(item.jeden)}
            data={[
              { jeden: "one", dwa: "two" },
              { jeden: "one", dwa: "two" },
            ]}
            columns={[
              { path: "jeden", label: "Jeden" },
              { path: "dwa", label: "Dwa" },
            ]}
          />
      </Container>
    </div>
  );
};

export default Home;
