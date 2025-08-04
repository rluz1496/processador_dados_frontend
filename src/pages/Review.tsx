import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { downloadCSV } from '@/lib/csvUtils';
import UnitsTable, { UnitData } from '@/components/UnitsTable';

const Review: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [unitsData, setUnitsData] = useState<UnitData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = location.state?.unitsData;
    if (data) {
      setUnitsData(data);
    } else {
      // Redirect to upload if no data
      navigate('/');
    }
  }, [location.state, navigate]);

  const getStatusCounts = () => {
    const counts = { complete: 0, incomplete: 0, critical: 0 };
    
    unitsData.forEach(unit => {
      const hasRequired = unit.Unidade && unit.Nome && unit['CPF/CNPJ'];
      const hasContact = unit.Celular && unit['E-mail'];
      
      if (!hasRequired) {
        counts.critical++;
      } else if (!hasContact) {
        counts.incomplete++;
      } else {
        counts.complete++;
      }
    });
    
    return counts;
  };

  const handleRegisterUnits = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/cadastrar-unidades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unidades: unitsData }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar unidades');
      }
      
      toast({
        title: "Unidades cadastradas com sucesso",
        description: `${unitsData.length} unidades foram processadas`,
      });
      
      navigate('/concluido');
      
    } catch (error) {
      toast({
        title: "Erro ao cadastrar unidades",
        description: "Tente novamente ou contate o suporte",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    try {
      downloadCSV(unitsData, `unidades_condominiais_${new Date().toISOString().split('T')[0]}.csv`);
      toast({
        title: "CSV gerado com sucesso",
        description: "O arquivo foi baixado para seu computador",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar CSV",
        description: "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const statusCounts = getStatusCounts();
  const hasCriticalIssues = statusCounts.critical > 0;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Validação dos Dados
              </h1>
              <p className="text-muted-foreground">
                Revise as informações extraídas e corrija se necessário
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handleDownloadCSV}
                disabled={unitsData.length === 0}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Baixar CSV</span>
              </Button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{statusCounts.complete}</p>
                <p className="text-sm text-muted-foreground">Unidades Completas</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{statusCounts.incomplete}</p>
                <p className="text-sm text-muted-foreground">Dados Incompletos</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{statusCounts.critical}</p>
                <p className="text-sm text-muted-foreground">Dados Críticos</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Critérios de Validação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Completas:</strong> Todos os campos obrigatórios
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Incompletas:</strong> Faltam contatos (celular/email)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Críticas:</strong> Faltam dados obrigatórios
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
          <UnitsTable data={unitsData} onDataChange={setUnitsData} />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center space-y-4">
          {hasCriticalIssues && (
            <div className="flex items-center space-x-2 text-destructive bg-destructive/10 px-4 py-2 rounded-lg border border-destructive/20">
              <XCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Corrija os dados críticos antes de prosseguir com o cadastro
              </span>
            </div>
          )}
          
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="px-8"
            >
              Voltar ao Upload
            </Button>
            
            <Button 
              onClick={handleRegisterUnits}
              disabled={isLoading || unitsData.length === 0 || hasCriticalIssues}
              className="px-8 bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processando...
                </>
              ) : (
                `Confirmar Cadastro (${unitsData.length} unidades)`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;