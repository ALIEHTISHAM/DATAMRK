import React, { useState, useRef } from 'react';
import './ServicesPage.css';

function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
  };

  const handleDeleteFile = (file: File) => {
    setUploadedFiles(uploadedFiles.filter((f) => f !== file));
  };

  const handleUploadFile = () => {
    if (selectedFile) {
      setUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setUploading(false);
        setUploadedFiles([...uploadedFiles, selectedFile]);
        setSelectedFile(null); // Optionally clear the file after upload
        alert('File uploaded successfully!');
      }, 2000);
    }
  };

  const handleBrowseButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="services-page">
      <h1 className="heading">Upload Content</h1>
      <button onClick={() => setModalOpen(true)} className="open-modal-button">
        Upload File
      </button>

      {modalOpen && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="drag-drop-area">
              <h2>Drag and Drop files to upload</h2>
              <p>or</p>
              <button className="browse-button" onClick={handleBrowseButtonClick}>
                Browse
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="file-input"
                accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.gif,.bmp,.mp4,.mov,.avi,.mkv"
              />
              <p>Supported files: DOC, DOCX, PDF, JPG, JPEG, PNG, GIF, BMP, MP4, MOV, AVI, MKV</p>
              {selectedFile && (
                <div className="selected-file-info">
                  <p>Selected File: {selectedFile.name}</p>
                </div>
              )}
              <div className="modal-buttons">
                {selectedFile && (
                  <button
                    onClick={handleUploadFile}
                    className="upload-file-button"
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Upload File'}
                  </button>
                )}
                <button onClick={handleCloseModal} className="close-modal-button">
                  Close
                </button>
              </div>
            </div>
            <div className="uploaded-files">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="uploaded-file">
                  <span className="uploaded-file-name">{file.name}</span>
                  <span
                    className="uploaded-file-delete"
                    onClick={() => handleDeleteFile(file)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesPage;
