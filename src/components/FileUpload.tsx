import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading = false }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      setError('Arquivo não suportado. Use apenas arquivos CSV ou PDF.');
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isLoading
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`upload-zone ${isDragActive ? 'dragover' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          ) : (
            <Upload className="h-12 w-12 text-muted-foreground" />
          )}
          
          <div className="text-center">
            <p className="text-lg font-medium text-foreground mb-2">
              {isDragActive ? 'Solte o arquivo aqui' : 'Arraste o arquivo aqui'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              ou clique para selecionar
            </p>
            <Button variant="outline" disabled={isLoading}>
              <FileText className="h-4 w-4 mr-2" />
              Selecionar Arquivo
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Arquivos suportados: CSV ou PDF<br />
          Colunas necessárias: Unidade, Bloco, Nome, CPF/CNPJ, Celular, Telefone, E-mail
        </p>
      </div>
    </div>
  );
};

export default FileUpload;