import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useProject } from "../../ProjectProvider";
import { useForm } from "react-hook-form";

const ProjectModal = ({
  incomingFormData,
  isNewModalShown,
  setIsNewModalShown,
  incomingVersion,
}) => {

  const [formData, setFormData] = useState(
    incomingFormData || {
      id: "",
      name: "",
      date: "2032-41-5", // FIX ME
      organization: "",
      description: "",
      createdBy: "",
      student: "",
      rounds: "",
      generatorList: [], // Array to store selected generator IDs
      status: true,
    }
  ); //

  const { register, handleSubmit } = useForm();

  const generatorList = [
    { id: "a", name: "Hydroelectric Generator" },
    { id: "b", name: "Wind Turbine Generator" },
    { id: "c", name: "Solar Photovoltaic Generator" },
    { id: "d", name: "Universal" },
  ];

  const toggleGenerator = (generatorId) => {
    setFormData((prev) => {
      const isSelected = prev.generatorList.includes(generatorId);
      const updatedGenerators = isSelected
        ? prev.generatorList.filter((id) => id !== generatorId) // Remove if already selected
        : [...prev.generatorList, generatorId]; // Add if not selected
      return { ...prev, generatorList: updatedGenerators };
    });
  };

  const { createProject, updateProject } = useProject(); // add edit

  const handleCreate = () => {
    if (formData.id !== "") {
      // Edit existing project
      updateProject(formData);
    } else {
      // Create a new project
      createProject(formData);
    }

    // Close the modal after saving
    setIsNewModalShown(false);

    // Optionally: Add a success message or toast here
  };

  return (
    <div>
      {" "}
      <Modal
        size="lg"
        show={isNewModalShown}
        onHide={() => setIsNewModalShown(false)}
      >
        <Form onSubmit={handleSubmit(handleCreate)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {incomingVersion === "create" ? "Create" : "Edit"} project
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Project Name */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Project Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  {...register("name")}
                  required
                  type="text"
                  placeholder="Name of the project"
                  value={formData.name}
                  minLength={3}
                  maxLength={50}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            {/* organization */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Organization
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  {...register("organization")}
                  required
                  type="text"
                  placeholder="Name of the organization"
                  value={formData.organization}
                  minLength={3}
                  maxLength={50}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            {/* description */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  {...register("description")}
                  required
                  type="text"
                  placeholder="Description of the project"
                  value={formData.description}
                  minLength={3}
                  maxLength={100}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            {/* Rounds */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Rounds
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  {...register("rounds")}
                  //  required
                  type="number"
                  placeholder="Number of power production rounds"
                  value={formData.rounds}
                  min={1}
                  max={10}
                  onChange={(e) =>
                    setFormData({ ...formData, rounds: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            {/* Generators with Checkboxes */}
            <Form.Group className="mb-3">
              <Form.Label>Generators</Form.Label>
              {generatorList.map((generator) => (
                <Form.Check
                  // {...register("rounds")}
                  // required
                  key={generator.id}
                  type="checkbox"
                  label={generator.name}
                  checked={formData.generatorList.includes(generator.id)} // Check if the generator is selected
                  onChange={() => toggleGenerator(generator.id)} // Toggle selection
                />
              ))}
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="success">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectModal;