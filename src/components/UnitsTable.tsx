import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Save, X, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export interface UnitData {
  id: string;
  Unidade: string;
  Bloco: string;
  Tipo: string;
  Perfil: string;
  Proprietario_Nome: string;
  Proprietario_CPF_CNPJ: string;
  Proprietario_Celular: string;
  Proprietario_Telefone_fixo: string;
  Proprietario_Email: string;
  Responsavel_Nome: string;
  Responsavel_CPF_CNPJ: string;
  Responsavel_Celular: string;
  Responsavel_Telefone_fixo: string;
  Responsavel_Email: string;
}

interface UnitsTableProps {
  data: UnitData[];
  onDataChange: (data: UnitData[]) => void;
}

const UnitsTable: React.FC<UnitsTableProps> = ({ data, onDataChange }) => {
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<UnitData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const isEmpty = (value: any) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim().toLowerCase() === 'n/a') ||
      value === ''
    );
  };

  const getRowStatus = (unit: UnitData) => {
    const hasRequired = unit.Unidade && unit.Proprietario_Nome && unit.Proprietario_CPF_CNPJ;
    
    const hasEmail = !isEmpty(unit.Proprietario_Email);
    const hasCelular = !isEmpty(unit.Proprietario_Celular);
    const hasTelefone = !isEmpty(unit.Proprietario_Telefone_fixo);
    const hasAnyContact = hasEmail || hasCelular || hasTelefone;
    
    if (!hasRequired) return 'critical';
    if (!hasAnyContact) return 'incomplete'; // Amarelo: sem nenhum contato
    return 'complete'; // Verde: tem pelo menos um contato
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'incomplete':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getRowClassName = (status: string) => {
    switch (status) {
      case 'complete':
        return 'row-complete';
      case 'incomplete':
        return 'row-incomplete';
      case 'critical':
        return 'row-critical';
      default:
        return '';
    }
  };

  const startEdit = (unit: UnitData) => {
    setEditingRow(unit.id);
    setEditData({ ...unit });
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditData(null);
  };

  const saveEdit = () => {
    if (editData) {
      const newData = data.map(unit => 
        unit.id === editData.id ? editData : unit
      );
      onDataChange(newData);
      setEditingRow(null);
      setEditData(null);
    }
  };

  const handleInputChange = (field: keyof UnitData, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="condoconta-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Unidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Bloco
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Perfil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Proprietário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  CPF/CNPJ Prop.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Celular Prop.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Tel. Fixo Prop.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  E-mail Prop.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  CPF/CNPJ Resp.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Celular Resp.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Tel. Fixo Resp.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  E-mail Resp.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {currentData.map((unit) => {
                const status = getRowStatus(unit);
                const isEditing = editingRow === unit.id;
                const rowData = isEditing ? editData! : unit;
                
                return (
                  <tr key={unit.id} className={`${getRowClassName(status)} hover:bg-muted/50`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusIcon(status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Unidade}
                          onChange={(e) => handleInputChange('Unidade', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Unidade}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Bloco}
                          onChange={(e) => handleInputChange('Bloco', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Bloco}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Tipo}
                          onChange={(e) => handleInputChange('Tipo', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Tipo}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Perfil}
                          onChange={(e) => handleInputChange('Perfil', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Perfil}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <Input
                          value={rowData.Proprietario_Nome}
                          onChange={(e) => handleInputChange('Proprietario_Nome', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Proprietario_Nome}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Proprietario_CPF_CNPJ}
                          onChange={(e) => handleInputChange('Proprietario_CPF_CNPJ', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Proprietario_CPF_CNPJ}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Proprietario_Celular}
                          onChange={(e) => handleInputChange('Proprietario_Celular', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Proprietario_Celular}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Proprietario_Telefone_fixo}
                          onChange={(e) => handleInputChange('Proprietario_Telefone_fixo', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Proprietario_Telefone_fixo}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <Input
                          value={rowData.Proprietario_Email}
                          onChange={(e) => handleInputChange('Proprietario_Email', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Proprietario_Email}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <Input
                          value={rowData.Responsavel_Nome}
                          onChange={(e) => handleInputChange('Responsavel_Nome', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Responsavel_Nome}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Responsavel_CPF_CNPJ}
                          onChange={(e) => handleInputChange('Responsavel_CPF_CNPJ', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Responsavel_CPF_CNPJ}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Responsavel_Celular}
                          onChange={(e) => handleInputChange('Responsavel_Celular', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Responsavel_Celular}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Responsavel_Telefone_fixo}
                          onChange={(e) => handleInputChange('Responsavel_Telefone_fixo', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Responsavel_Telefone_fixo}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <Input
                          value={rowData.Responsavel_Email}
                          onChange={(e) => handleInputChange('Responsavel_Email', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Responsavel_Email}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {isEditing ? (
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={saveEdit}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => startEdit(unit)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} unidades
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="px-3 py-1 text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsTable;
