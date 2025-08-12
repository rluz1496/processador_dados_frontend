import { UnitData } from '@/components/UnitsTable';

export const generateCSV = (data: UnitData[]): string => {
  // Headers do CSV
  const headers = [
    'Unidade', 
    'Bloco', 
    'Tipo', 
    'Perfil', 
    'Proprietario_Nome', 
    'Proprietario_CPF_CNPJ', 
    'Proprietario_Celular', 
    'Proprietario_Telefone_fixo', 
    'Proprietario_Email',
    'Responsavel_Nome',
    'Responsavel_CPF_CNPJ',
    'Responsavel_Celular',
    'Responsavel_Telefone_fixo',
    'Responsavel_Email'
  ];
  
  // Criar linhas do CSV
  const csvRows = [
    headers.join(','), // Cabeçalho
    ...data.map(unit => [
      unit.Unidade || '',
      unit.Bloco || '',
      unit.Tipo || '',
      unit.Perfil || '',
      unit.Proprietario_Nome || '',
      unit.Proprietario_CPF_CNPJ || '',
      unit.Proprietario_Celular || '',
      unit.Proprietario_Telefone_fixo || '',
      unit.Proprietario_Email || '',
      unit.Responsavel_Nome || '',
      unit.Responsavel_CPF_CNPJ || '',
      unit.Responsavel_Celular || '',
      unit.Responsavel_Telefone_fixo || '',
      unit.Responsavel_Email || ''
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
