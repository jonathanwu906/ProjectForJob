import { useState } from "react";
import axios from "axios";

function ImageUploadPage() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State variable to store the image URL

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile)); // Generate a temporary URL for the selected image
  };

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      const response = await axios.post(
        "http://18.180.45.13:3000/api/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = response.data; // Assuming the response contains an "imageUrl" field
      setImageUrl(imageUrl); // Store the image URL in the state variable
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
        ></input>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          placeholder="Caption"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default ImageUploadPage;
