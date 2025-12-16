import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain'];

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      // Fallback check for extensions if MIME type is missing/generic
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'docx', 'pptx', 'txt'].includes(ext || '')) {
         setError('Invalid file type. Only PDF, DOCX, PPTX, and TXT are allowed.');
         return false;
      }
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`File is too large. Max size is ${MAX_SIZE_MB}MB.`);
      return false;
    }
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  }, [disabled, onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
       const file = e.target.files[0];
       if (validateFile(file)) {
          setSelectedFile(file);
          onFileSelect(file);
       }
    }
  };

  const removeFile = (e: React.MouseEvent) => { 
      e.stopPropagation(); // Prevent triggering the file input click
      setSelectedFile(null); 
      onFileSelect(null); 
      setError(null); 
  };

  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center animate-fade-in">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="text-blue-600" size={24} />
             </div>
             <div className="flex flex-col min-w-0">
                <span className="font-semibold text-slate-700 truncate">{selectedFile.name}</span>
                <span className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
             </div>
          </div>
          {!disabled && (
            <button 
                onClick={removeFile}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Remove file"
            >
                <X size={20} />
            </button>
          )}
        </div>
      ) : (
        <label 
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 relative group overflow-hidden
            ${dragActive 
                ? 'border-blue-500 bg-blue-50/50 scale-[1.01]' 
                : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center text-center p-6 z-10">
            <div className={`p-4 rounded-full bg-blue-50 text-blue-600 mb-4 transition-transform duration-300 ${!disabled && 'group-hover:scale-110'}`}>
                <Upload size={32} strokeWidth={1.5} />
            </div>
            
            {error ? (
                <div className="flex flex-col items-center text-red-500 animate-pulse">
                    <AlertCircle size={24} className="mb-2" />
                    <p className="font-medium">{error}</p>
                    <p className="text-xs mt-1 text-slate-500">Try again with a different file.</p>
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">
                        Click to upload or drag & drop
                    </h3>
                    <p className="text-slate-500 text-sm max-w-xs">
                        PDF, DOCX, PPTX, or TXT (Max {MAX_SIZE_MB}MB)
                    </p>
                </>
            )}
          </div>
          
          <input 
            type="file" 
            className="hidden" 
            accept=".pdf,.docx,.pptx,.txt" 
            onChange={handleChange}
            disabled={disabled} 
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;
