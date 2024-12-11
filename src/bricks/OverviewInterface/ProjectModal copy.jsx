import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useProject } from "../../ProjectProvider";
import { useData } from "../../DataProvider";
import { useForm } from "react-hook-form";

const ProjectModal = ({
  incomingFormData,
  isModalShown,
  setIsModalShown,
  version,
  onUpdate,
  setIsCreatedToastShown,
  setIsUpdatedToastShown,
}) => {
  const { generators, users } = useData();
  const [formData, setFormData] = useState(
    incomingFormData || {
      id: "",
      name: "",
      date: "", // eventDate,
      creationDate: "",
      organization: "",
      description: "",
      createdBy: "",
      instructor: "",
      roundCount: "",
      roundDuration: 10,
      studentCount: null,
      generators: [], // Array to store selected generator IDs
      status: "true",
    }
  );

  const { register, handleSubmit } = useForm();

  const toggleGenerator = (generatorId) => {
    setFormData((prev) => {
      const isSelected = prev.generators.includes(generatorId);
      const updatedGenerators = isSelected
        ? prev.generators.filter((id) => id !== generatorId) // Remove if already selected
        : [...prev.generators, generatorId]; // Add if not selected
      return { ...prev, generators: updatedGenerators };
    });
  };

  const { createProject, updateProject } = useProject(); // add edit

  const handleCreate = () => {
    if (formData.id !== "") {
      updateProject(formData);
      onUpdate(formData);
      setIsUpdatedToastShown(true);
    } else {
      createProject(formData);
      setIsCreatedToastShown(true); // Update toast visibility state
    }

    setIsModalShown(false); // Close modal after saving
  };

  console.log("formdata", formData.generators);
  console.log("incomingformdata", formData.incomingFormData.generators);

  return (
    <div>
      {" "}
      <Modal
        size="lg"
        show={isModalShown}
        onHide={() => setIsModalShown(false)}
      >
        <Form onSubmit={handleSubmit(handleCreate)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {version === "create" ? "Create" : "Edit"} project
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
                  {...register("roundCount")}
                  //  required
                  type="number"
                  placeholder="Number of power production rounds"
                  value={formData.roundCount}
                  min={1}
                  max={10}
                  onChange={(e) =>
                    setFormData({ ...formData, roundCount: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            {/* Rounds Duration */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Duration of Rounds
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  {...register("roundDuration")}
                  //  required
                  type="number"
                  placeholder="Duration of one round (minutes)"
                  value={formData.roundDuration}
                  min={1}
                  max={20}
                  onChange={(e) =>
                    setFormData({ ...formData, roundDuration: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            {/* instructor */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Instructor
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  {...register("instructor")}
                  required
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                >
                  <option value="">Select Instructor</option>
                  {users.filter(user => user.role === 'instructor' || user.role === 'admin').map(user => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Generators with Checkboxes */}
            <Form.Group className="mb-3">
              <Form.Label>Generators</Form.Label>
              {generators.map((generator) => (
                <Form.Check
                  // {...register("rounds")}
                  // required
                  key={generator.id}
                  type="checkbox"
                  label={generator.name}
                  checked={formData.generators.includes(generator.id)} // Check if the generator is selected
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
