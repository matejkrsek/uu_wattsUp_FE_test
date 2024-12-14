import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useData } from "../../DataProvider";
import { useProject } from "../../ProjectProvider";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

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
  const emptyForm = {
    id: "",
    name: "",
    date: new Date().toISOString().substring(0, 10), // FIX ME
    organization: "",
    description: "",
    createdBy: "",
    student: "",
    rounds: "",
    roundDuration: "",
    instructor: { id: "", name: "" }, // id a name insructora
    studentCount: "",
    generatorList: [], // Array to store selected generator IDs
    status: true,
  }; //

  const [formData, setFormData] = useState(incomingFormData || emptyForm); //
  const { register, handleSubmit } = useForm();
  const { createProject, updateProject } = useProject(); // add edit

  const toggleGenerator = (generatorId) => {
    setFormData((prev) => {
      const isSelected = prev.generatorList.includes(generatorId);
      const updatedGenerators = isSelected
        ? prev.generatorList.filter((id) => id !== generatorId) // Remove if already selected
        : [...prev.generatorList, generatorId]; // Add if not selected
      return { ...prev, generatorList: updatedGenerators };
    });
  };

  const handleSubmitForm = () => {
    if (formData.id !== "") {
      //Update
      updateProject(formData); // požadavek na server
      onUpdate(formData); // vrací hodnoty na overview
      setIsUpdatedToastShown(true);
    } else {
      //Create
      createProject(formData);
      setIsCreatedToastShown(true);
    }

    setIsModalShown(false); // Close modal
  };

  // resetuje formulář na prázné hodnoty při create...
  useEffect(() => {
    if (!formData.id) setFormData(emptyForm);
  }, [isModalShown]);

  return (
    <div>
      {" "}
      <Modal
        size="lg"
        show={isModalShown}
        onHide={() => setIsModalShown(false)}
      >
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
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

            {/* eventDate */}

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Date
              </Form.Label>
              <Col sm="10">
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
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
                  required
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

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Duration of Rounds
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  {...register("roundDuration")}
                  required
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

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Number of students
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  {...register("studentCount")}
                  //  required
                  type="number"
                  placeholder="Number of students in the class"
                  value={formData.studentCount}
                  min={1}
                  max={20}
                  onChange={(e) =>
                    setFormData({ ...formData, studentCount: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Instructor
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  {...register("instructor")}
                  required
                  value={formData.instructor.id} // Use only the id as the value
                  onChange={(e) => {
                    const selectedInstructor = users.find(
                      (user) => user.id === e.target.value
                    );
                    setFormData({
                      ...formData,
                      instructor: selectedInstructor,
                    });
                  }}
                >
                  <option value="">Select Instructor</option>
                  {users
                    .filter(
                      (user) =>
                        user.role === "instructor" || user.role === "admin"
                    )
                    .map((user) => (
                      <option key={user.id} value={user.id}>
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
