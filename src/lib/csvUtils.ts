import { UnitData } from '@/components/UnitsTable';

export const generateCSV = (data: UnitData[]): string => {
  // Headers do CSV
  const headers = ['Unidade', 'Bloco', 'Nome', 'CPF/CNPJ', 'Celular', 'Telefone', 'E-mail'];
  
  // Criar linhas do CSV
  const csvRows = [
    headers.join(','), // Cabeçalho
    ...data.map(unit => [
      unit.Unidade || '',
      unit.Bloco || '',
      unit.Nome || '',
      unit['CPF/CNPJ'] || '',
      unit.Celular || '',
      unit.Telefone || '',
      unit['E-mail'] || ''
    ].map(field => `"${field}"`).join(',')) // Escapar campos com aspas
  ];
  
  return csvRows.join('\n');
};

export const downloadCSV = (data: UnitData[], filename: string = 'unidades_condominiais.csv') => {
  const csvContent = generateCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};