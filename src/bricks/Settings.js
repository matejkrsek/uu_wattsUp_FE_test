import React from "react";
import { Button, Table, Row, Col, Form } from "react-bootstrap";
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';

const Settings = ({ generators, users, gateways }) => {

    // Funkcia pre vymazanie záznamu
    const handleDelete = (id, type) => {
        // treba dokončiť implementáciu vymazavania
        console.log(`Deleting ${type} with ID: ${id}`);
    };

    const renderTable = (data, type) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                <Table striped bordered hover style={{ maxWidth: '500px', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>{type === 'user' ? 'Role' : 'Description'}</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{type === 'user' ? item.role : item.description}</td>
                                <td>
                                    <Icon
                                        path={mdiTrashCanOutline}
                                        size={1}
                                        onClick={() => handleDelete(item.id, type)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };

    return (
        <div>
            <h1>Settings</h1>  <br />

            <strong style={{ marginBottom: "10px", display: "block" }}> Users: </strong>
            {renderTable(users, "user")}

            <strong style={{ marginBottom: "10px", display: "block" }}> Generators: </strong>
            {renderTable(generators, "generator")}

            <strong style={{ marginBottom: "10px", display: "block" }}> Gateways: </strong>
            {renderTable(gateways, "gateway")}
        </div>
    );
}

export default Settings;