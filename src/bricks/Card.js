import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";


function Tile({ project }) {
    const navigate = useNavigate();

    /*   const handleCardClick = () => {
        navigate(`/project/${detail.id}`, {state: {detail, ownerName, members}});
      }; */

    return (
        <Card>
            <Card.Body>
                <strong > {project.name} </strong> <br /> <br />
                <div style={{ textAlign: "left" }}>
                    <u>{("Created by:")}:</u> {" "} {project.createdBy}
                    <br />
                    <u>{("Event date:")}:</u> {" "} {project.date}
                </div>
                <br />
            </Card.Body>
        </Card>
    );
};

export default Tile;