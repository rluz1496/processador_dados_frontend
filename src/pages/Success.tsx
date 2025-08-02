import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Upload } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="condoconta-card p-8">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary mb-4">
              ✅ Cadastro Concluído com Sucesso!
            </h1>
            <p className="text-muted-foreground">
              Todas as unidades foram cadastradas no sistema. Você pode iniciar um novo upload ou fechar esta tela.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              onClick={() => navigate('/')}
              className="condoconta-button-secondary w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Novo Upload
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.close()}
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Sistema de Cadastro de Unidades CondoConta
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;