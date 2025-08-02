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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Cadastro de Unidades Condominiais
            </h1>
            <p className="text-lg text-muted-foreground">
              Arraste ou selecione um arquivo (PDF ou CSV) contendo as unidades do condomínio para revisão.
            </p>
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>

          {/* Demo Button */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Para demonstração, você pode usar dados de exemplo:
            </p>
            <Button 
              variant="outline" 
              onClick={() => handleFileSelect(new File([], 'demo.csv'))}
              disabled={isLoading}
            >
              Usar Dados de Exemplo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;