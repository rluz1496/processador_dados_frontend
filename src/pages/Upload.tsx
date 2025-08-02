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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data
      const mockData = generateMockData();
      
      toast({
        title: "Arquivo processado com sucesso",
        description: `${mockData.length} unidades encontradas`,
      });
      
      // Navigate to review page with data
      navigate('/revisar', { state: { unitsData: mockData } });
      
    } catch (error) {
      toast({
        title: "Erro ao processar arquivo",
        description: "Verifique se o arquivo está no formato correto",
        variant: "destructive",
      });
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