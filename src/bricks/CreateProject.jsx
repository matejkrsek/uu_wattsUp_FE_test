  import React, { useState } from "react";
  import { Button, Modal, Form, Row, Col } from "react-bootstrap";
  import { useProject } from "../ProjectProvider";

  const CreateProject = () => {
    const [isModalShown, setIsModalShown] = useState(false);

    const [formData, setFormData] = useState({
      id: "",
      name: "",
      date: "2032-41-5", // FIX ME
      school: "",
      description: "",
      createdBy: "",
      student: "",
      round: "",
      generators: [], // Array to store selected generator IDs
      status: true,
    });

    const generators = [
      { id: "a", name: "Hydroelectric Generator" },
      { id: "b", name: "Wind Turbine Generator" },
      { id: "c", name: "Solar Photovoltaic Generator" },
      { id: "d", name: "Universal" },
    ];

    const toggleGenerator = (generatorId) => {
      setFormData((prev) => {
        const isSelected = prev.generators.includes(generatorId);
        const updatedGenerators = isSelected
          ? prev.generators.filter((id) => id !== generatorId) // Remove if already selected
          : [...prev.generators, generatorId]; // Add if not selected
        return { ...prev, generators: updatedGenerators };
      });
    };


    const { createProject } = useProject();

    const testCreate = () => {
    console.log(formData);
      createProject(formData);
      setIsModalShown(false);
    }

  
    return (
      <div>
        <Button variant="success" onClick={() => setIsModalShown(true)}>
          Create new project
        </Button>

        <Modal size="lg" show={isModalShown} onHide={() => setIsModalShown(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create new project</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              {/* Project Name */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Project Name</Form.Label>
                <Col sm="10">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name of the project"
                    value={formData.name}
                    minLength={3}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Col>
              </Form.Group>

              {/* School */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">School</Form.Label>
                <Col sm="10">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name of the school"
                    value={formData.school}
                    minLength={3}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  />
                </Col>
              </Form.Group>

              {/* Rounds */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Rounds</Form.Label>
                <Col sm="10">
                  <Form.Control
                    required
                    type="number"
                    placeholder="Number of power production rounds"
                    value={formData.round}
                    min={1}
                    max={10}
                    onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                  />
                </Col>
              </Form.Group>

              {/* Generators with Checkboxes */}
              <Form.Group className="mb-3">
                <Form.Label>Generators</Form.Label>
                {generators.map((generator) => (
                  <Form.Check
                    key={generator.id}
                    type="checkbox"
                    label={generator.name}
                    checked={formData.generators.includes(generator.id)} // Check if the generator is selected
                    onChange={() => toggleGenerator(generator.id)} // Toggle selection
                  />
                ))}
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success" onClick={testCreate}>
              Save
            </Button>
            <Button variant="outline-secondary" onClick={() => setIsModalShown(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  export default CreateProject;
