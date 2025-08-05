import React, { useState, useEffect } from 'react';

interface ProcessingAnimationProps {
  isVisible: boolean;
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ isVisible }) => {
  const [dots, setDots] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDots('');
      setTimeElapsed(0);
      return;
    }

    // Animação dos pontos
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Contador de tempo
    const timeInterval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(timeInterval);
    };
  }, [isVisible]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="condoconta-card max-w-md w-full mx-4">
        <div className="p-8 text-center">
          {/* Logo ou ícone de IA */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl mx-auto flex items-center justify-center">
              <div className="relative">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {/* Pulso animado */}
                <div className="absolute inset-0 bg-primary/30 rounded-2xl animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Título com animação */}
          <h3 className="text-xl font-semibold text-foreground mb-2">
            IA Processando Documento{dots}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Nossa inteligência artificial está analisando o arquivo PDF e extraindo as informações das unidades condominiais.
          </p>

          {/* Barra de progresso animada */}
          <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse" 
                 style={{ 
                   width: '100%',
                   animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
                 }}>
            </div>
          </div>

          {/* Tempo decorrido */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            <span>Tempo decorrido: {formatTime(timeElapsed)}</span>
          </div>

          {/* Status steps */}
          <div className="space-y-2 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">Arquivo recebido</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground">Processando com IA...</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-muted rounded-full"></div>
              <span className="text-sm text-muted-foreground">Validando dados</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-muted rounded-full"></div>
              <span className="text-sm text-muted-foreground">Gerando relatório</span>
            </div>
          </div>

          <div className="mt-6 p-3 bg-warning/10 rounded-lg">
            <p className="text-xs text-warning-foreground">
              <strong>Aguarde:</strong> Este processo pode levar alguns minutos dependendo do tamanho e complexidade do documento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;