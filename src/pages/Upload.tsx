import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UnitData } from '@/components/UnitsTable';

const Upload: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for demonstration
  const generateMockData = (): UnitData[] => {
    return [
      {
        id: '1',
        Unidade: '101',
        Bloco: 'A',
        Nome: 'João Silva Santos',
        'CPF/CNPJ': '123.456.789-00',
        Celular: '(11) 99999-1111',
        Telefone: '(11) 3333-1111',
        'E-mail': 'joao.silva@email.com'
      },
      {
        id: '2',
        Unidade: '102',
        Bloco: 'A',
        Nome: 'Maria Oliveira',
        'CPF/CNPJ': '987.654.321-00',
        Celular: '',
        Telefone: '(11) 3333-2222',
        'E-mail': 'maria.oliveira@email.com'
      },
      {
        id: '3',
        Unidade: '103',
        Bloco: 'A',
        Nome: 'Pedro Costa',
        'CPF/CNPJ': '',
        Celular: '(11) 99999-3333',
        Telefone: '',
        'E-mail': ''
      },
      {
        id: '4',
        Unidade: '201',
        Bloco: 'B',
        Nome: 'Ana Rodrigues Lima',
        'CPF/CNPJ': '555.666.777-88',
        Celular: '(11) 99999-4444',
        Telefone: '(11) 3333-4444',
        'E-mail': 'ana.rodrigues@email.com'
      },
      {
        id: '5',
        Unidade: '202',
        Bloco: 'B',
        Nome: 'Carlos Mendes',
        'CPF/CNPJ': '111.222.333-44',
        Celular: '(11) 99999-5555',
        Telefone: '',
        'E-mail': ''
      }
    ];
  };

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('arquivo', file);
      
      toast({
        title: "Processando arquivo...",
        description: "A IA está analisando o documento. Isso pode levar alguns minutos.",
      });
      
      // Call Supabase Edge Function to process PDF
      const response = await fetch('/api/processar-unidades', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Erro ao processar arquivo');
      }
      
      const data = await response.json();
      
      toast({
        title: "Arquivo processado com sucesso",
        description: `${data.unidades.length} unidades encontradas`,
      });
      
      // Navigate to review page with data
      navigate('/revisar', { state: { unitsData: data.unidades } });
      
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      
      // Fallback to mock data for demo
      const mockData = generateMockData();
      
      toast({
        title: "Usando dados de demonstração",
        description: "Erro na conexão com o backend. Mostrando dados de exemplo.",
        variant: "destructive",
      });
      
      navigate('/revisar', { state: { unitsData: mockData } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Upload de Documentos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Envie documentos PDF ou CSV contendo informações das unidades condominiais. 
            Nossa IA processará automaticamente os dados para validação.
          </p>
        </div>

        {/* Upload Card */}
        <div className="condoconta-card max-w-2xl mx-auto mb-8">
          <div className="p-8">
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>
        </div>

        {/* Demo Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-4">
            <div className="w-8 h-px bg-border"></div>
            <span>Para demonstração</span>
            <div className="w-8 h-px bg-border"></div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => handleFileSelect(new File([], 'demo.csv'))}
            disabled={isLoading}
            className="px-6"
          >
            Usar Dados de Exemplo
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Processamento IA</h3>
            <p className="text-sm text-muted-foreground">
              Extração inteligente de dados usando modelos avançados de IA
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Validação Automática</h3>
            <p className="text-sm text-muted-foreground">
              Verificação de campos obrigatórios e consistência dos dados
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Export CSV</h3>
            <p className="text-sm text-muted-foreground">
              Geração de arquivo CSV validado para importação final
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;