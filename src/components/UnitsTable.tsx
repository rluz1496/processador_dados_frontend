import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Save, X, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export interface UnitData {
  id: string;
  Unidade: string;
  Bloco: string;
  Nome: string;
  'CPF/CNPJ': string;
  Celular: string;
  Telefone: string;
  'E-mail': string;
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

  const getRowStatus = (unit: UnitData) => {
    const hasRequired = unit.Unidade && unit.Nome && unit['CPF/CNPJ'];
    const hasContact = unit.Celular && unit['E-mail'];
    
    if (!hasRequired) return 'critical';
    if (!hasContact) return 'incomplete';
    return 'complete';
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
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  CPF/CNPJ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Celular
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                  E-mail
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
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <Input
                          value={rowData.Nome}
                          onChange={(e) => handleInputChange('Nome', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Nome}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData['CPF/CNPJ']}
                          onChange={(e) => handleInputChange('CPF/CNPJ', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit['CPF/CNPJ']}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Celular}
                          onChange={(e) => handleInputChange('Celular', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Celular}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <Input
                          value={rowData.Telefone}
                          onChange={(e) => handleInputChange('Telefone', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit.Telefone}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <Input
                          value={rowData['E-mail']}
                          onChange={(e) => handleInputChange('E-mail', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm text-foreground">{unit['E-mail']}</span>
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