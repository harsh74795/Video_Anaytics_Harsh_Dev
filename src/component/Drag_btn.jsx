
// import React from 'react';
// import Button from '@mui/material/Button'; // Import Button component from MUI

// const Drag_btn = ({ onDrop }) => {
//   const handleDragStart = (e) => {
//     e.dataTransfer.setData('text/plain', 'upload');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = e.dataTransfer.files;
//     // Handle file upload here
//     console.log('Uploaded files:', files);
//     console.log('Selected file:', files[0]);

//     if (onDrop) {
//         onDrop(files[0], e); // Pass the first file and the event object
//       }

//   };

//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     // Handle file upload here
//     console.log('Uploaded files:', files);
//     console.log('Selected file:', files[0]);


//         onDrop(files[0], e); // Pass the first file and the event object


//   };

//   return (
//     <div
//       draggable
//       onDragStart={handleDragStart}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <Button
//         variant="outlined"
//         sx={{ width: '100%' }}
//         component="label"
//       >
//         Upload Footage
//         <input
//           type="file"
//           accept="video/*"
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//       </Button>
//     </div>
//   );
// };

// export default Drag_btn;


import { useRef } from 'react';
import "./Drag_btn_styles.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';
import Button from '@mui/material/Button'; // Import Button component from MUI

const Drag_btn = ({ onDrop }) => {

  const inputRef = useRef(null);
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', 'upload');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle file upload here
    console.log('Uploaded files:', files);
    console.log('Selected file:', files[0]);

    if (onDrop) {
      onDrop(files[0], e); // Pass the first file and the event object
    }

  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    // Handle file upload here
    console.log('Uploaded files:', files);
    console.log('Selected file:', files[0]);


    onDrop(files[0], e); // Pass the first file and the event object


  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="drop_down_custom"

    >
      <img src="./drag.jpg" className="drag_drop_image" />

      <div>or</div>
      <div className="drag_button" onClick={() => inputRef.current.click()}>
        <div className="drag_text">Upload</div>
        <CloudUploadIcon />
        <input
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={handleFileChange} className="drag_input"
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Drag_btn;

