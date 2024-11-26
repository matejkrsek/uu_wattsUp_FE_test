import React, { useState } from "react";

import { Button } from "react-bootstrap";

const CreateProjectButton = () => {
 
const [isModalShown, setIsModalShown] = useState(false);

  return (
    <div>
<Button variant="success" onClick={()=> (setIsModalShown(true))}> Create new project</Button>

{/* custom Modal */}
    </div>
   
  );
};




export default CreateProjectButton;
