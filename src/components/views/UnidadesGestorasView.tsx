import React, { useState } from 'react';
import { ArrowLeft, Building2, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Municipio, Orgao } from '../../lib/municipios-data';

interface UnidadesGestorasViewProps {
  municipio: Municipio;
  onBack: () => void;
}

export default function UnidadesGestorasView({ municipio, onBack }: UnidadesGestorasViewProps) {
  // Agrupar unidades gestoras por órgão
  const agruparPorOrgao = () => {
    const grupos: { [orgaoId: string]: any[] } = {};
    
    municipio.unidadesGestoras.forEach(unidade => {
      const orgaoId = unidade.orgaoId || 'sem_orgao';
      if (!grupos[orgaoId]) {
        grupos[orgaoId] = [];
      }
      grupos[orgaoId].push(unidade);
    });
    
    return grupos;
  };

  const gruposUnidades = agruparPorOrgao();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shrink-0">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2e2e2e]\">Unidades Gestoras</h1>
          <p className="text-sm text-[#626262] mt-1">
            Visualização completa das unidades gestoras e orçamentárias
          </p>
        </div>
      </div>

      {/* Indicador de Município Selecionado */}
      <Card className="border-l-4 border-l-purple-600 bg-gradient-to-r from-purple-50 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Município Selecionado</p>
              <p className="text-base font-bold text-purple-600">
                {municipio.nome} - {municipio.uf}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                CNPJ: {municipio.cnpj} | Código IBGE: {municipio.codigoIbge} | Código TCE: {municipio.codigoTce}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="text-right">
                <p className="text-xs text-gray-500">Total de Órgãos</p>
                <p className="text-xl font-bold text-purple-600">{municipio.orgaos.length}</p>
              </div>
              <div className="h-10 w-px bg-gray-300"></div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total de Unidades</p>
                <p className="text-xl font-bold text-purple-600">{municipio.unidadesGestoras.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Unidades Gestoras */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-gray-700">
                    Unidade Gestora / Unidade Orçamentária
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-gray-700">
                    Criação / Inclusão
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-gray-700">
                    CPF - Nome
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-gray-700">
                    Início
                  </th>
                </tr>
              </thead>
              <tbody>
                {municipio.orgaos.map((orgao) => {
                  const unidadesDoOrgao = gruposUnidades[orgao.id] || [];
                  
                  return (
                    <React.Fragment key={orgao.id}>
                      {/* Linha do Órgão Principal */}
                      <tr className="border-b border-gray-200 bg-purple-50/30">
                        <td className="py-3 px-6 font-bold text-purple-900">
                          {orgao.codigo} - {orgao.nome}
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-600 font-medium">
                          {orgao.dataCriacao}
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-600"></td>
                        <td className="py-3 px-6 text-sm text-gray-600"></td>
                      </tr>
                      
                      {/* Linhas das Unidades do Órgão */}
                      {unidadesDoOrgao.map((unidade) => (
                        <tr 
                          key={unidade.id} 
                          className="border-b border-gray-100 hover:bg-purple-50/20 transition-colors"
                        >
                          <td className="py-3 px-6 pl-12 text-gray-700">
                            {unidade.codigo} - {unidade.nome}
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-600">
                            {unidade.dataCriacao}
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-700">
                            {unidade.cpfResponsavel && unidade.nomeResponsavel 
                              ? `${unidade.cpfResponsavel} - ${unidade.nomeResponsavel}`
                              : '-'}
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-600">
                            {unidade.dataInicio || '-'}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}