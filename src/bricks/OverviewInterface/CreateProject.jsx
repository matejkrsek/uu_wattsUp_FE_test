import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import ProjectModal from "./ProjectModal";

const CreateProject = () => {
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "", // eventDate
    organization: "",
    description: "",
    createdBy: "",
    student: "",
    roundCount: "",
    roundDuration: "",
    studentCount: null,
    generatorList: [], // Array to store selected generator IDs
  });

  return (
    <div className="w-full md:w-auto">
      <Button
        variant="success"
        className="w-full md:w-auto"
        onClick={() => setIsNewModalShown(true)}
      >
        <Icon path={mdiPlus} size={1} />
      </Button>

      <ProjectModal
        isNewModalShown={isNewModalShown}
        setIsNewModalShown={setIsNewModalShown}
        incomingFormData={formData}
        incomingVersion="create"
      />
    </div>
  );
};

export default CreateProject;