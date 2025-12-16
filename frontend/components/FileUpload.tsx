import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'pdf' && ext !== 'docx') {
         setError('Invalid file. Only PDF and DOCX allowed.');
         return false;
      }
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`File too large. Max ${MAX_SIZE_MB}MB.`);
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  }, [disabled, onFileSelect]);

  const removeFile = () => { setSelectedFile(null); onFileSelect(null); setError(null); };

  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
             <FileText className="text-blue-600" />
             <span className="font-semibold truncate">{selectedFile.name}</span>
          </div>
          {!disabled && <button onClick={removeFile}><X size={20} /></button>}
        </div>
      ) : (
        <label 
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {error ? <p className="text-red-500">{error}</p> : <p>Click to upload or drag PDF/DOCX</p>}
          </div>
          <input type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => {
              if (e.target.files?.[0] && validateFile(e.target.files[0])) {
                  setSelectedFile(e.target.files[0]);
                  onFileSelect(e.target.files[0]);
              }
          }} disabled={disabled} />
        </label>
      )}
    </div>
  );
};
export default FileUpload;
