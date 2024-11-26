import React, { useState } from "react";
import { useFilters } from "../FiltersProvider";
import { Button, Modal } from "react-bootstrap";

const CreateProjectButton = () => {
 
const [isModalShown, setIsModalShown] = useState(false);

  return (
    <div>
<Button variant="success" onClick={()=> (setIsModalShown(true))}> Create new project</Button>

<Modal show={isModalShown} onHide={()=> (setIsModalShown(false))}>
  

    <Modal.Header closeButton>
      <Modal.Title>Create new project</Modal.Title>
    </Modal.Header>

    <Modal.Body>
   
  </Modal.Body>
  
  <Modal.Footer>
     <Button 
       
        onClick={()=> (setIsModalShown(false))}
     >
         Create
     </Button>
     <Button 
        variant="outline-secondary"
        onClick={()=> (setIsModalShown(false))}    
    >
         Close  
    </Button>
  </Modal.Footer>  
  
  
  
</Modal>
    </div>
   
  );
};




export default CreateProjectButton;
