import React from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPlus } from '@mdi/js';

const Settings = ({ generators, users, gateways }) => {

    const handleDelete = (id, type) => {
        console.log(`Deleting ${type} with ID: ${id}`);
    };

    const renderTable = (data, type) => {
        return (
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
        );
    };

    const addUser = () => { };
    const addGenerator = () => { };
    const addGateway = () => { };

    return (
        <div>
            <h1>Settings</h1>
            <br />

            {/* Users Section */}
            <Container style={{ maxWidth: '500px' }} className="mb-3">
                <Row className="align-items-center gx-0">
                <Col style={{ textAlign: "left", paddingLeft: "0" }}><strong>Users:</strong></Col>
                <Col className="text-end">
                        <div style={{ display: 'inline-block', padding: '6px', backgroundColor: 'transparent', borderRadius: '4px', cursor: 'pointer' }}
                            onClick={addUser}>
                            <Icon path={mdiPlus} size={1} color="blue" />
                        </div>
                    </Col>
                </Row>
                {renderTable(users, "user")}
            </Container>

            {/* Generators Section */}
            <Container style={{ maxWidth: '500px' }} className="mb-3">
                <Row className="align-items-center gx-0">
                <Col style={{ textAlign: "left", paddingLeft: "0" }}><strong>Generators:</strong></Col> {/* p-0 pre presné zarovnanie */}
                    <Col className="text-end">
                        <div style={{ display: 'inline-block', padding: '6px', backgroundColor: 'transparent', borderRadius: '4px', cursor: 'pointer' }}
                            onClick={addGenerator}>
                            <Icon path={mdiPlus} size={1} color="blue" />
                        </div>
                    </Col>
                </Row>
                {renderTable(generators, "generator")}
            </Container>

            {/* Gateways Section */}
            <Container style={{ maxWidth: '500px' }} className="mb-3">
                <Row className="align-items-center gx-0">
                <Col style={{ textAlign: "left", paddingLeft: "0" }}><strong>Gateways:</strong></Col> {/* Bez paddingu */}
                    <Col className="text-end">
                        <div style={{ display: 'inline-block', padding: '6px', backgroundColor: 'transparent', borderRadius: '4px', cursor: 'pointer' }}
                            onClick={addGateway}>
                            <Icon path={mdiPlus} size={1} color="blue" />
                        </div>
                    </Col>
                </Row>
                {renderTable(gateways, "gateway")}
            </Container>
        </div>
    );
}

export default Settings;
