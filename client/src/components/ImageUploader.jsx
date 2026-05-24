import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelected, disabled = false }) => {
  const { translations: t } = useLanguage();
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setFileName(file.name);
      onImageSelected(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    disabled,
    multiple: false,
  });

  return (
    <div className="image-uploader">
      {preview ? (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
          <p className="file-name">{fileName}</p>
          <button
            className="btn-reset"
            onClick={() => {
              setPreview(null);
              setFileName('');
            }}
          >
            ✕ {t.common.cancel}
          </button>
        </div>
      ) : (
        <div {...getRootProps()} className={`upload-area ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <FiUploadCloud className="upload-icon" />
          <p className="upload-text">{t.detection.uploadImage}</p>
          <p className="upload-hint">{t.detection.dragDrop}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
