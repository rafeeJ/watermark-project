import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [file, setFile] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  // Handles input change event and updates state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(import.meta.env.VITE_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const downloadUrl = await response.text()
      setDownloadUrl(downloadUrl);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <div style={{ backgroundColor: 'gray', padding: 5, borderRadius: 10 }}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button onClick={handleSubmit}>Upload to Firebase</button>
      </div>
      {
        downloadUrl &&
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img src={downloadUrl} alt="firebase-image" />
          <a href={downloadUrl}>{downloadUrl}</a>
        </div>
      }
    </div>
  );
}

export default App
