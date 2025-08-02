import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-primary">Revisar Unidades</h1>
          </div>
          
          <p className="text-muted-foreground mb-4">
            Revise as unidades abaixo. Você pode editar qualquer campo clicando no ícone de edição.
          </p>

          {/* Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="condoconta-card p-4 flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-600">{statusCounts.complete}</p>
                <p className="text-sm text-muted-foreground">Completas</p>
              </div>
            </div>
            
            <div className="condoconta-card p-4 flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.incomplete}</p>
                <p className="text-sm text-muted-foreground">Incompletas</p>
              </div>
            </div>
            
            <div className="condoconta-card p-4 flex items-center">
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-red-600">{statusCounts.critical}</p>
                <p className="text-sm text-muted-foreground">Críticas</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="condoconta-card p-4 mb-6">
            <h3 className="font-semibold mb-2">Legenda de Status:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
                <span><strong>Completas:</strong> Todos os campos obrigatórios preenchidos</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded mr-2"></div>
                <span><strong>Incompletas:</strong> Faltam celular ou e-mail</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded mr-2"></div>
                <span><strong>Críticas:</strong> Faltam CPF/CNPJ ou unidade</span>
              </div>
            </div>
          </div>
        </div>

        {/* Units Table */}
        <UnitsTable data={unitsData} onDataChange={setUnitsData} />

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            onClick={handleRegisterUnits}
            disabled={isLoading || unitsData.length === 0}
            className="condoconta-button-primary min-w-64"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar Unidades'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;