import React from "react";
import { useParams } from "react-router";

const Issue = () => {
    const params = useParams();
    const id = params.id;
    
  return <div>{id}</div>;
};

export default Issue;
