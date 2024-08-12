// "use client";
// import axios from "axios";
// import { useState } from "react";

// export default function FileUpload() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleUpload = async (event) => {
//     event.preventDefault(); // Prevent form from submitting traditionally

//     if (!file) {
//       alert("Please select a file first.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(
//         "http://localhost:3000/reports/uploads",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("File uploaded successfully:", response.data);
//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Error uploading file.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleUpload}>
//         <input type="file" name="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// }

"use client";
import axios from "axios";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("File selected:", e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    console.log("Preparing to upload file:", file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/reports/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload response:", response.data);

      alert("uploaded the csv and updated the databse");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}
