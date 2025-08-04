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
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300
          ${isDragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-border hover:border-primary/50'
          }
          ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:bg-muted/20'}
          p-12 text-center group
        `}
      >
        <input {...getInputProps()} />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              {/* Custom Loading Animation */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-r-primary/60 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <div className="text-center max-w-sm">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  IA Processando Documento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Extraindo informações das unidades condominiais...
                </p>
                <div className="mt-3 flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Upload Icon */}
              <div className="relative">
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                  ${isDragActive 
                    ? 'bg-primary text-primary-foreground scale-110' 
                    : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                  }
                `}>
                  <Upload className="h-10 w-10" />
                </div>
                {isDragActive && (
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-primary animate-ping"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {isDragActive ? 'Solte o arquivo aqui' : 'Envie seu documento'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Arraste e solte um arquivo PDF ou CSV, ou clique para selecionar
                </p>
                
                <Button 
                  variant="outline" 
                  disabled={isLoading}
                  className="group-hover:border-primary group-hover:text-primary transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Selecionar Arquivo
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-destructive">Erro no arquivo</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      )}

      {/* Requirements */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
        <h4 className="text-sm font-medium text-foreground mb-2">Requisitos do arquivo:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• <strong>Formatos:</strong> PDF ou CSV</li>
          <li>• <strong>Campos obrigatórios:</strong> Unidade, Nome, CPF/CNPJ</li>
          <li>• <strong>Campos opcionais:</strong> Bloco, Celular, Telefone, E-mail</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;