import React from 'react';
import { Landmark, Building2, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export default function EntidadesView() {
  // Dados simulados para estruturação
  const entidades = [
    { 
      id: 1, 
      nome: 'Prefeitura Municipal de Exemplo', 
      tipo: 'Município', 
      gestores: 5,
      status: 'Ativo',
      cnpj: '00.000.000/0001-00'
    },
    { 
      id: 2, 
      nome: 'Secretaria de Educação', 
      tipo: 'Unidade Orçamentária', 
      gestores: 2,
      status: 'Ativo',
      cnpj: '00.000.000/0002-00'
    },
    { 
      id: 3, 
      nome: 'Fundação de Saúde', 
      tipo: 'Órgão', 
      gestores: 3,
      status: 'Pendente',
      cnpj: '00.000.000/0003-00'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#2e6a50]/20">
          <Landmark className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2e2e2e]">Entidades</h1>
          <p className="text-sm text-[#626262] mt-1">
            Gestão estruturada de unidades gestoras, órgãos e unidades orçamentárias.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-[#2e6a50]">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Total de Entidades</p>
            <p className="text-2xl font-bold text-[#2e2e2e]">{entidades.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* List of Entities */}
      <div className="grid grid-cols-1 gap-4">
        {entidades.map((entidade) => (
          <Card key={entidade.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center p-6 gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#2e2e2e]">{entidade.nome}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>CNPJ: <span className="font-medium text-gray-800">{entidade.cnpj}</span></span>
                    <Badge variant={entidade.status === 'Ativo' ? 'default' : 'secondary'}>{entidade.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{entidade.tipo}</p>
                  <p className="text-sm font-semibold text-[#2e6a50]">{entidade.gestores} Gestores</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
