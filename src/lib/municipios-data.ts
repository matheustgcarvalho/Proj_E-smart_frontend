// Dados mockados para o módulo de Municípios

export interface UnidadeGestora {
  id: string;
  codigo: string;
  nome: string;
  dataCriacao: string;
  cpfResponsavel?: string;
  nomeResponsavel?: string;
  dataInicio?: string;
  orgaoId?: string; // Para agrupar por órgão
}

export interface Orgao {
  id: string;
  codigo: string;
  nome: string;
  dataCriacao: string;
}

export interface Municipio {
  id: string;
  nome: string;
  uf: string;
  cnpj: string;
  codigoIbge: string;
  codigoTce: string;
  loginTce?: string;
  senhaTce?: string;
  statusIntegracao: 'ativo' | 'inativo' | 'pendente' | 'erro';
  dataCadastro: string;
  orgaos: Orgao[];
  unidadesGestoras: UnidadeGestora[];
}

export const MUNICIPIOS_MOCK: Municipio[] = [
  {
    id: '1',
    nome: 'Fortaleza',
    uf: 'CE',
    cnpj: '07.954.516/0001-39',
    codigoIbge: '2304400',
    codigoTce: '0001',
    loginTce: 'pmf_tech',
    statusIntegracao: 'ativo',
    dataCadastro: '2024-01-15',
    orgaos: [
      { id: 'org1_30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024' },
      { id: 'org1_31', codigo: '31', nome: 'Gabinete do Vice-Prefeito', dataCriacao: '01/01/2024' },
      { id: 'org1_32', codigo: '32', nome: 'Procuradoria Geral do Municipio', dataCriacao: '01/01/2024' },
      { id: 'org1_33', codigo: '33', nome: 'Controladoria Geral do Municipio', dataCriacao: '01/01/2024' },
      { id: 'org1_34', codigo: '34', nome: 'Sec. Mun. de Planejamento e Gestao', dataCriacao: '01/01/2024' },
      { id: 'org1_35', codigo: '35', nome: 'Secretaria Municipal de Educacao', dataCriacao: '01/01/2024' },
      { id: 'org1_36', codigo: '36', nome: 'Secretaria Municipal de Saude', dataCriacao: '01/01/2024' },
      { id: 'org1_37', codigo: '37', nome: 'Secretaria Municipal de Assistencia Social', dataCriacao: '01/01/2024' },
      { id: 'org1_38', codigo: '38', nome: 'Sec. Mun. de Desenvolvimento Economico', dataCriacao: '01/01/2024' },
      { id: 'org1_39', codigo: '39', nome: 'Sec. Municipal de Infraestrutura', dataCriacao: '01/01/2024' },
      { id: 'org1_40', codigo: '40', nome: 'Secretaria Municipal de Meio Ambiente', dataCriacao: '01/01/2024' },
      { id: 'org1_41', codigo: '41', nome: 'Sec. Municipal de Esporte e Juventude', dataCriacao: '01/01/2024' },
      { id: 'org1_42', codigo: '42', nome: 'Sec. Municipal de Cultura', dataCriacao: '01/01/2024' },
      { id: 'org1_99', codigo: '99', nome: 'Camara Municipal de Fortaleza', dataCriacao: '01/01/2024' }
    ],
    unidadesGestoras: [
      // Gabinete do Prefeito
      { id: 'ug1_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '123******45', nomeResponsavel: 'JOSE SARTO NOGUEIRA MOREIRA', dataInicio: '01/01/2024', orgaoId: 'org1_30' },
      
      // Gabinete do Vice-Prefeito
      { id: 'ug1_31_1', codigo: '1601', nome: 'Gabinete do Vice-Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '234******56', nomeResponsavel: 'ELCIO BATISTA DOS SANTOS', dataInicio: '01/01/2024', orgaoId: 'org1_31' },
      
      // Procuradoria Geral
      { id: 'ug1_32_1', codigo: '1701', nome: 'Procuradoria Geral do Municipio-PGM', dataCriacao: '01/01/2024', cpfResponsavel: '345******67', nomeResponsavel: 'FERNANDO ANTONIO SILVA MOTA', dataInicio: '15/02/2024', orgaoId: 'org1_32' },
      { id: 'ug1_32_2', codigo: '1701', nome: 'Procuradoria Geral do Municipio-PGM', dataCriacao: '01/01/2024', cpfResponsavel: '456******78', nomeResponsavel: 'LUCIA MARIA COSTA OLIVEIRA', dataInicio: '01/01/2024', orgaoId: 'org1_32' },
      { id: 'ug1_32_3', codigo: '1702', nome: 'Procuradoria Administrativa', dataCriacao: '01/01/2024', cpfResponsavel: '567******89', nomeResponsavel: 'ROBERTO CARLOS MENDES LIMA', dataInicio: '01/03/2024', orgaoId: 'org1_32' },
      
      // Controladoria Geral
      { id: 'ug1_33_1', codigo: '1801', nome: 'Controladoria Geral do Municipio-CGM', dataCriacao: '01/01/2024', cpfResponsavel: '678******90', nomeResponsavel: 'PATRICIA ALVES RODRIGUES', dataInicio: '01/01/2024', orgaoId: 'org1_33' },
      { id: 'ug1_33_2', codigo: '1802', nome: 'Ouvidoria Geral do Municipio', dataCriacao: '01/01/2024', cpfResponsavel: '789******01', nomeResponsavel: 'CARLOS EDUARDO SANTOS SILVA', dataInicio: '01/01/2024', orgaoId: 'org1_33' },
      
      // Secretaria de Planejamento
      { id: 'ug1_34_1', codigo: '0201', nome: 'Sec. Munc. de Planej. e Gestao-SEPOG', dataCriacao: '01/01/2024', cpfResponsavel: '890******12', nomeResponsavel: 'MARCOS ANTONIO BEZERRA CRUZ', dataInicio: '01/01/2024', orgaoId: 'org1_34' },
      { id: 'ug1_34_2', codigo: '0202', nome: 'Coordenadoria de Gestao Orcamentaria', dataCriacao: '01/01/2024', cpfResponsavel: '901******23', nomeResponsavel: 'ANA PAULA FERREIRA LIMA', dataInicio: '15/01/2024', orgaoId: 'org1_34' },
      { id: 'ug1_34_3', codigo: '9999', nome: 'Reserva de Contingencia', dataCriacao: '01/01/2024', cpfResponsavel: '890******12', nomeResponsavel: 'MARCOS ANTONIO BEZERRA CRUZ', dataInicio: '01/01/2024', orgaoId: 'org1_34' },
      
      // Secretaria de Educacao
      { id: 'ug1_35_1', codigo: '1201', nome: 'Secretaria Municipal de Educacao - SME', dataCriacao: '01/01/2024', cpfResponsavel: '012******34', nomeResponsavel: 'MARIA JOSE SILVA SOUZA', dataInicio: '01/01/2024', orgaoId: 'org1_35' },
      { id: 'ug1_35_2', codigo: '1201', nome: 'Secretaria Municipal de Educacao - SME', dataCriacao: '01/01/2024', cpfResponsavel: '123******45', nomeResponsavel: 'JOAO BATISTA OLIVEIRA SANTOS', dataInicio: '01/02/2024', orgaoId: 'org1_35' },
      { id: 'ug1_35_3', codigo: '1202', nome: 'Fundo Municipal de Educacao', dataCriacao: '01/01/2024', cpfResponsavel: '234******56', nomeResponsavel: 'FERNANDA CRISTINA ALMEIDA COSTA', dataInicio: '01/01/2024', orgaoId: 'org1_35' },
      { id: 'ug1_35_4', codigo: '1203', nome: 'Fundo de Desenv. da Educ. Basica-FUNDEB', dataCriacao: '01/01/2024', cpfResponsavel: '345******67', nomeResponsavel: 'RICARDO MENDES PEREIRA', dataInicio: '01/01/2024', orgaoId: 'org1_35' },
      { id: 'ug1_35_5', codigo: '1204', nome: 'Instituto de Desenvolvimento da Educacao', dataCriacao: '01/01/2024', cpfResponsavel: '456******78', nomeResponsavel: 'SANDRA MARIA RODRIGUES LIMA', dataInicio: '15/03/2024', orgaoId: 'org1_35' },
      
      // Secretaria de Saude
      { id: 'ug1_36_1', codigo: '0801', nome: 'Secretaria Municipal de Saude - SMS', dataCriacao: '01/01/2024', cpfResponsavel: '567******89', nomeResponsavel: 'ANA ESTELA LEITE FERNANDES', dataInicio: '01/01/2024', orgaoId: 'org1_36' },
      { id: 'ug1_36_2', codigo: '0801', nome: 'Secretaria Municipal de Saude - SMS', dataCriacao: '01/01/2024', cpfResponsavel: '678******90', nomeResponsavel: 'PEDRO HENRIQUE SOUSA COSTA', dataInicio: '01/02/2024', orgaoId: 'org1_36' },
      { id: 'ug1_36_3', codigo: '0802', nome: 'Fundo Municipal de Saude', dataCriacao: '01/01/2024', cpfResponsavel: '789******01', nomeResponsavel: 'JULIANA MARTINS OLIVEIRA', dataInicio: '01/01/2024', orgaoId: 'org1_36' },
      { id: 'ug1_36_4', codigo: '0803', nome: 'Hospital Municipal', dataCriacao: '01/01/2024', cpfResponsavel: '890******12', nomeResponsavel: 'PAULO ROBERTO ALVES SANTOS', dataInicio: '15/01/2024', orgaoId: 'org1_36' },
      
      // Secretaria de Assistencia Social
      { id: 'ug1_37_1', codigo: '1101', nome: 'Sec. Munic. de Assistencia Social-SEMAS', dataCriacao: '01/01/2024', cpfResponsavel: '901******23', nomeResponsavel: 'CLAUDIA REGINA SOUZA LIMA', dataInicio: '01/01/2024', orgaoId: 'org1_37' },
      { id: 'ug1_37_2', codigo: '1102', nome: 'Fundo Municipal de Assistencia Social', dataCriacao: '01/01/2024', cpfResponsavel: '012******34', nomeResponsavel: 'MARIA APARECIDA COSTA SILVA', dataInicio: '01/01/2024', orgaoId: 'org1_37' },
      { id: 'ug1_37_3', codigo: '1103', nome: 'Fundo Mun. dos Dir. da Crianca e do Adol', dataCriacao: '01/01/2024', cpfResponsavel: '123******45', nomeResponsavel: 'RENATA FERREIRA MENDES', dataInicio: '01/01/2024', orgaoId: 'org1_37' },
      
      // Sec. Desenvolvimento Economico
      { id: 'ug1_38_1', codigo: '0901', nome: 'Sec. Mun. de Desenv. Economico-SEDECON', dataCriacao: '01/01/2024', cpfResponsavel: '234******56', nomeResponsavel: 'ANTONIO CARLOS BEZERRA NETO', dataInicio: '01/01/2024', orgaoId: 'org1_38' },
      { id: 'ug1_38_2', codigo: '0902', nome: 'Agencia de Desenvolvimento', dataCriacao: '01/01/2024', cpfResponsavel: '345******67', nomeResponsavel: 'LUCIA MARIA OLIVEIRA SANTOS', dataInicio: '15/02/2024', orgaoId: 'org1_38' },
      
      // Infraestrutura
      { id: 'ug1_39_1', codigo: '0401', nome: 'Sec. Mun. de Infraestrutura-SEINF', dataCriacao: '01/01/2024', cpfResponsavel: '456******78', nomeResponsavel: 'ROBERTO ANDERSON SILVA COSTA', dataInicio: '01/01/2024', orgaoId: 'org1_39' },
      { id: 'ug1_39_2', codigo: '0402', nome: 'Coordenadoria de Obras Publicas', dataCriacao: '01/01/2024', cpfResponsavel: '567******89', nomeResponsavel: 'FRANCISCO JOSE PEREIRA LIMA', dataInicio: '01/01/2024', orgaoId: 'org1_39' },
      
      // Meio Ambiente
      { id: 'ug1_40_1', codigo: '0601', nome: 'Secretaria Municipal de Meio Ambiente', dataCriacao: '01/01/2024', cpfResponsavel: '678******90', nomeResponsavel: 'JULIA FERNANDA SANTOS ROCHA', dataInicio: '01/01/2024', orgaoId: 'org1_40' },
      { id: 'ug1_40_2', codigo: '0602', nome: 'Fundo Municipal do Meio Ambiente', dataCriacao: '01/01/2024', cpfResponsavel: '789******01', nomeResponsavel: 'ANDRE LUIS COSTA OLIVEIRA', dataInicio: '01/01/2024', orgaoId: 'org1_40' },
      
      // Esporte
      { id: 'ug1_41_1', codigo: '1001', nome: 'Sec. Mun. de Esporte e Juventude', dataCriacao: '01/01/2024', cpfResponsavel: '890******12', nomeResponsavel: 'DIEGO HENRIQUE ALVES SANTOS', dataInicio: '01/01/2024', orgaoId: 'org1_41' },
      
      // Cultura
      { id: 'ug1_42_1', codigo: '1301', nome: 'Secretaria Municipal de Cultura', dataCriacao: '01/01/2024', cpfResponsavel: '901******23', nomeResponsavel: 'BEATRIZ HELENA RODRIGUES SOUSA', dataInicio: '01/01/2024', orgaoId: 'org1_42' },
      { id: 'ug1_42_2', codigo: '1302', nome: 'Fundacao Cultural de Fortaleza', dataCriacao: '01/01/2024', cpfResponsavel: '012******34', nomeResponsavel: 'CARLOS AUGUSTO FERREIRA LIMA', dataInicio: '15/01/2024', orgaoId: 'org1_42' },
      
      // Camara Municipal
      { id: 'ug1_99_1', codigo: '0000', nome: 'Camara Municipal', dataCriacao: '01/01/2024', cpfResponsavel: '123******45', nomeResponsavel: 'GARDEL ROLIM LIMA BEZERRA', dataInicio: '01/01/2024', orgaoId: 'org1_99' }
    ]
  },
  {
    id: '2',
    nome: 'Sobral',
    uf: 'CE',
    cnpj: '07.599.149/0001-14',
    codigoIbge: '2312908',
    codigoTce: '0002',
    loginTce: 'pms_tech',
    statusIntegracao: 'ativo',
    dataCadastro: '2024-02-10',
    orgaos: [
      { id: 'org2_30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024' },
      { id: 'org2_31', codigo: '31', nome: 'Gabinete do Vice-Prefeito', dataCriacao: '01/01/2024' },
      { id: 'org2_32', codigo: '32', nome: 'Procuradoria Geral do Municipio', dataCriacao: '01/01/2024' },
      { id: 'org2_33', codigo: '33', nome: 'Controladoria Geral do Municipio', dataCriacao: '01/01/2024' },
      { id: 'org2_34', codigo: '34', nome: 'Sec. Mun. de Administracao e Financas', dataCriacao: '01/01/2024' },
      { id: 'org2_35', codigo: '35', nome: 'Secretaria Municipal de Educacao', dataCriacao: '01/01/2024' },
      { id: 'org2_36', codigo: '36', nome: 'Secretaria Municipal de Saude', dataCriacao: '01/01/2024' },
      { id: 'org2_37', codigo: '37', nome: 'Secretaria Municipal de Assistencia Social', dataCriacao: '01/01/2024' },
      { id: 'org2_38', codigo: '38', nome: 'Sec. Mun. de Urbanismo e Meio Ambiente', dataCriacao: '01/01/2024' },
      { id: 'org2_99', codigo: '99', nome: 'Camara Municipal de Sobral', dataCriacao: '01/01/2024' }
    ],
    unidadesGestoras: [
      // Gabinete do Prefeito
      { id: 'ug2_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '211******34', nomeResponsavel: 'OSCAR RODRIGUES JUNIOR', dataInicio: '01/01/2024', orgaoId: 'org2_30' },
      
      // Gabinete do Vice-Prefeito
      { id: 'ug2_31_1', codigo: '1601', nome: 'Gabinete do Vice-Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '322******45', nomeResponsavel: 'MARIA TERESA COUTINHO SILVA', dataInicio: '01/01/2024', orgaoId: 'org2_31' },
      
      // Procuradoria Geral
      { id: 'ug2_32_1', codigo: '1701', nome: 'Procuradoria Geral do Municipio-PGM', dataCriacao: '01/01/2024', cpfResponsavel: '433******56', nomeResponsavel: 'JOAO PAULO MENDES COSTA', dataInicio: '01/01/2024', orgaoId: 'org2_32' },
      
      // Controladoria Geral
      { id: 'ug2_33_1', codigo: '1801', nome: 'Controladoria Geral do Municipio-CGM', dataCriacao: '01/01/2024', cpfResponsavel: '544******67', nomeResponsavel: 'ADRIANA LIMA RODRIGUES', dataInicio: '01/01/2024', orgaoId: 'org2_33' },
      { id: 'ug2_33_2', codigo: '1802', nome: 'Ouvidoria Geral do Municipio', dataCriacao: '01/01/2024', cpfResponsavel: '655******78', nomeResponsavel: 'RAFAEL SANTOS OLIVEIRA', dataInicio: '15/02/2024', orgaoId: 'org2_33' },
      
      // Secretaria de Administracao
      { id: 'ug2_34_1', codigo: '0201', nome: 'Sec. Munc. de Admin. e Financas', dataCriacao: '01/01/2024', cpfResponsavel: '766******89', nomeResponsavel: 'CLAUDIA FERREIRA ALMEIDA', dataInicio: '01/01/2024', orgaoId: 'org2_34' },
      { id: 'ug2_34_2', codigo: '9999', nome: 'Reserva de Contingencia', dataCriacao: '01/01/2024', cpfResponsavel: '766******89', nomeResponsavel: 'CLAUDIA FERREIRA ALMEIDA', dataInicio: '01/01/2024', orgaoId: 'org2_34' },
      
      // Secretaria de Educacao
      { id: 'ug2_35_1', codigo: '1201', nome: 'Secretaria Municipal de Educacao - SME', dataCriacao: '01/01/2024', cpfResponsavel: '877******90', nomeResponsavel: 'HERBERT LIMA VASCONCELOS', dataInicio: '01/01/2024', orgaoId: 'org2_35' },
      { id: 'ug2_35_2', codigo: '1202', nome: 'Fundo Municipal de Educacao', dataCriacao: '01/01/2024', cpfResponsavel: '988******01', nomeResponsavel: 'LUCIA MARIA BARBOSA SANTOS', dataInicio: '01/01/2024', orgaoId: 'org2_35' },
      { id: 'ug2_35_3', codigo: '1203', nome: 'Fundo de Desenv. da Educ. Basica-FUNDEB', dataCriacao: '01/01/2024', cpfResponsavel: '099******12', nomeResponsavel: 'FERNANDO JOSE COSTA LIMA', dataInicio: '01/01/2024', orgaoId: 'org2_35' },
      
      // Secretaria de Saude
      { id: 'ug2_36_1', codigo: '0801', nome: 'Secretaria Municipal de Saude - SMS', dataCriacao: '01/01/2024', cpfResponsavel: '100******23', nomeResponsavel: 'GERARDO CRISTINO DA SILVA', dataInicio: '01/01/2024', orgaoId: 'org2_36' },
      { id: 'ug2_36_2', codigo: '0802', nome: 'Fundo Municipal de Saude', dataCriacao: '01/01/2024', cpfResponsavel: '211******34', nomeResponsavel: 'PATRICIA OLIVEIRA MENDES', dataInicio: '01/01/2024', orgaoId: 'org2_36' },
      { id: 'ug2_36_3', codigo: '0803', nome: 'Hospital Regional Norte', dataCriacao: '01/01/2024', cpfResponsavel: '322******45', nomeResponsavel: 'RICARDO ANDRADE SOUSA', dataInicio: '15/03/2024', orgaoId: 'org2_36' },
      
      // Secretaria de Assistencia Social
      { id: 'ug2_37_1', codigo: '1101', nome: 'Sec. Munic. de Assistencia Social-SEMAS', dataCriacao: '01/01/2024', cpfResponsavel: '433******56', nomeResponsavel: 'VANESSA CRISTINA ROCHA SILVA', dataInicio: '01/01/2024', orgaoId: 'org2_37' },
      { id: 'ug2_37_2', codigo: '1102', nome: 'Fundo Municipal de Assistencia Social', dataCriacao: '01/01/2024', cpfResponsavel: '544******67', nomeResponsavel: 'JOSE ROBERTO ALVES COSTA', dataInicio: '01/01/2024', orgaoId: 'org2_37' },
      
      // Urbanismo e Meio Ambiente
      { id: 'ug2_38_1', codigo: '0601', nome: 'Sec. Mun. de Urbanismo e Meio Ambiente', dataCriacao: '01/01/2024', cpfResponsavel: '655******78', nomeResponsavel: 'AMANDA BEATRIZ LIMA SANTOS', dataInicio: '01/01/2024', orgaoId: 'org2_38' },
      { id: 'ug2_38_2', codigo: '0602', nome: 'Fundo Municipal do Meio Ambiente', dataCriacao: '01/01/2024', cpfResponsavel: '766******89', nomeResponsavel: 'MARCOS VINICIUS PEREIRA COSTA', dataInicio: '01/01/2024', orgaoId: 'org2_38' },
      
      // Camara Municipal
      { id: 'ug2_99_1', codigo: '0000', nome: 'Camara Municipal', dataCriacao: '01/01/2024', cpfResponsavel: '877******90', nomeResponsavel: 'FRANCISCO JOSE ALVES PINHEIRO', dataInicio: '01/01/2024', orgaoId: 'org2_99' }
    ]
  },
  {
    id: '3',
    nome: 'Juazeiro do Norte',
    uf: 'CE',
    cnpj: '07.716.628/0001-03',
    codigoIbge: '2307304',
    codigoTce: '0003',
    statusIntegracao: 'pendente',
    dataCadastro: '2024-03-05',
    orgaos: [],
    unidadesGestoras: []
  },
  {
    id: '4',
    nome: 'Caucaia',
    uf: 'CE',
    cnpj: '07.716.262/0001-17',
    codigoIbge: '2303709',
    codigoTce: '0004',
    statusIntegracao: 'erro',
    dataCadastro: '2024-02-28',
    orgaos: [],
    unidadesGestoras: []
  },
  {
    id: '5',
    nome: 'Maracanaú',
    uf: 'CE',
    cnpj: '07.599.321/0001-87',
    codigoIbge: '2307650',
    codigoTce: '0005',
    loginTce: 'pmm_tech',
    statusIntegracao: 'ativo',
    dataCadastro: '2024-01-22',
    orgaos: [
      { id: 'org5_30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024' },
      { id: 'org5_32', codigo: '32', nome: 'Procuradoria Geral do Municipio', dataCriacao: '01/01/2024' },
      { id: 'org5_33', codigo: '33', nome: 'Controladoria Geral do Municipio', dataCriacao: '01/01/2024' },
      { id: 'org5_34', codigo: '34', nome: 'Sec. Mun. de Administracao e Financas', dataCriacao: '01/01/2024' },
      { id: 'org5_35', codigo: '35', nome: 'Secretaria Municipal de Educacao', dataCriacao: '01/01/2024' },
      { id: 'org5_36', codigo: '36', nome: 'Secretaria Municipal de Saude', dataCriacao: '01/01/2024' },
      { id: 'org5_37', codigo: '37', nome: 'Secretaria Municipal de Assistencia Social', dataCriacao: '01/01/2024' },
      { id: 'org5_39', codigo: '39', nome: 'Sec. Municipal de Infraestrutura', dataCriacao: '01/01/2024' },
      { id: 'org5_99', codigo: '99', nome: 'Camara Municipal de Maracanaú', dataCriacao: '01/01/2024' }
    ],
    unidadesGestoras: [
      // Gabinete do Prefeito
      { id: 'ug5_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '411******22', nomeResponsavel: 'ROBERTO PESSOA RODRIGUES', dataInicio: '01/01/2024', orgaoId: 'org5_30' },
      
      // Procuradoria Geral
      { id: 'ug5_32_1', codigo: '1701', nome: 'Procuradoria Geral do Municipio-PGM', dataCriacao: '01/01/2024', cpfResponsavel: '522******33', nomeResponsavel: 'SILVIA REGINA COSTA LIMA', dataInicio: '01/01/2024', orgaoId: 'org5_32' },
      
      // Controladoria Geral
      { id: 'ug5_33_1', codigo: '1801', nome: 'Controladoria Geral do Municipio-CGM', dataCriacao: '01/01/2024', cpfResponsavel: '633******44', nomeResponsavel: 'MARCELO HENRIQUE SANTOS ROCHA', dataInicio: '01/01/2024', orgaoId: 'org5_33' },
      
      // Secretaria de Administracao
      { id: 'ug5_34_1', codigo: '0201', nome: 'Sec. Munc. de Admin. e Financas', dataCriacao: '01/01/2024', cpfResponsavel: '744******55', nomeResponsavel: 'CRISTIANE ALVES PEREIRA', dataInicio: '01/01/2024', orgaoId: 'org5_34' },
      { id: 'ug5_34_2', codigo: '9999', nome: 'Reserva de Contingencia', dataCriacao: '01/01/2024', cpfResponsavel: '744******55', nomeResponsavel: 'CRISTIANE ALVES PEREIRA', dataInicio: '01/01/2024', orgaoId: 'org5_34' },
      
      // Secretaria de Educacao
      { id: 'ug5_35_1', codigo: '1201', nome: 'Secretaria Municipal de Educacao - SME', dataCriacao: '01/01/2024', cpfResponsavel: '855******66', nomeResponsavel: 'ANDREA LUCIA FERREIRA COSTA', dataInicio: '01/01/2024', orgaoId: 'org5_35' },
      { id: 'ug5_35_2', codigo: '1202', nome: 'Fundo Municipal de Educacao', dataCriacao: '01/01/2024', cpfResponsavel: '966******77', nomeResponsavel: 'THIAGO RODRIGUES MENDES', dataInicio: '01/01/2024', orgaoId: 'org5_35' },
      { id: 'ug5_35_3', codigo: '1203', nome: 'Fundo de Desenv. da Educ. Basica-FUNDEB', dataCriacao: '01/01/2024', cpfResponsavel: '077******88', nomeResponsavel: 'SIMONE CRISTINA OLIVEIRA SILVA', dataInicio: '01/01/2024', orgaoId: 'org5_35' },
      
      // Secretaria de Saude
      { id: 'ug5_36_1', codigo: '0801', nome: 'Secretaria Municipal de Saude - SMS', dataCriacao: '01/01/2024', cpfResponsavel: '188******99', nomeResponsavel: 'DANILO CESAR LIMA SANTOS', dataInicio: '01/01/2024', orgaoId: 'org5_36' },
      { id: 'ug5_36_2', codigo: '0802', nome: 'Fundo Municipal de Saude', dataCriacao: '01/01/2024', cpfResponsavel: '299******00', nomeResponsavel: 'FERNANDA BEATRIZ ALVES COSTA', dataInicio: '01/01/2024', orgaoId: 'org5_36' },
      
      // Secretaria de Assistencia Social
      { id: 'ug5_37_1', codigo: '1101', nome: 'Sec. Munic. de Assistencia Social-SEMAS', dataCriacao: '01/01/2024', cpfResponsavel: '300******11', nomeResponsavel: 'LUCIA MARIA RODRIGUES PEREIRA', dataInicio: '01/01/2024', orgaoId: 'org5_37' },
      { id: 'ug5_37_2', codigo: '1102', nome: 'Fundo Municipal de Assistencia Social', dataCriacao: '01/01/2024', cpfResponsavel: '411******22', nomeResponsavel: 'PATRICIA HELENA SOUSA LIMA', dataInicio: '01/01/2024', orgaoId: 'org5_37' },
      
      // Infraestrutura
      { id: 'ug5_39_1', codigo: '0401', nome: 'Sec. Mun. de Infraestrutura-SEINF', dataCriacao: '01/01/2024', cpfResponsavel: '522******33', nomeResponsavel: 'EDUARDO SANTOS OLIVEIRA', dataInicio: '01/01/2024', orgaoId: 'org5_39' },
      
      // Camara Municipal
      { id: 'ug5_99_1', codigo: '0000', nome: 'Camara Municipal', dataCriacao: '01/01/2024', cpfResponsavel: '633******44', nomeResponsavel: 'JOAO CARLOS ALVES MENDES', dataInicio: '01/01/2024', orgaoId: 'org5_99' }
    ]
  },
  {
    id: '6',
    nome: 'Canindé',
    uf: 'CE',
    cnpj: '07.681.502/0001-26',
    codigoIbge: '2302800',
    codigoTce: '0006',
    loginTce: 'pmc_tech',
    statusIntegracao: 'ativo',
    dataCadastro: '2024-01-10',
    orgaos: [
      { id: 'org30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2025' },
      { id: 'org31', codigo: '31', nome: 'Gabinete do Vice-Prefeito', dataCriacao: '01/01/2025' },
      { id: 'org32', codigo: '32', nome: 'Procuradoria Geral do Municipio', dataCriacao: '01/01/2025' },
      { id: 'org33', codigo: '33', nome: 'Controladoria Geral do Municipio', dataCriacao: '01/01/2025' },
      { id: 'org34', codigo: '34', nome: 'Sec. Mun.de Planejamento, Administracao e Financas', dataCriacao: '01/01/2025' },
      { id: 'org35', codigo: '35', nome: 'Secretaria Municipal de Educacao', dataCriacao: '01/01/2025' },
      { id: 'org36', codigo: '36', nome: 'Secretaria Municipal de Saude - SMS', dataCriacao: '01/01/2025' },
      { id: 'org37', codigo: '37', nome: 'Secretaria Municipal de Assistencia Social', dataCriacao: '01/01/2025' },
      { id: 'org38', codigo: '38', nome: 'Sec. Mun. Desenvolvimento Economico e Turismo', dataCriacao: '01/01/2025' },
      { id: 'org39', codigo: '39', nome: 'Sec. Municipal de Agricultura e Recursos Hidricos', dataCriacao: '01/01/2025' },
      { id: 'org40', codigo: '40', nome: 'Sec. Mun. de Des. Urb., Infraest. e Serv. Publicos', dataCriacao: '01/01/2025' },
      { id: 'org41', codigo: '41', nome: 'Secretaria Municipal de Meio Ambiente', dataCriacao: '01/01/2025' },
      { id: 'org42', codigo: '42', nome: 'Sec. Municipal de Seguranca Publica e Transito', dataCriacao: '01/01/2025' },
      { id: 'org43', codigo: '43', nome: 'Instituto Municipal de Previdencia de Caninde', dataCriacao: '01/01/2025' },
      { id: 'org44', codigo: '44', nome: 'Servico Autonomo de Agua e Esgoto - SAAE', dataCriacao: '01/01/2025' },
      { id: 'org45', codigo: '45', nome: 'Fundacao Municipal de Cultura e Esporte', dataCriacao: '01/01/2025' },
      { id: 'org99', codigo: '99', nome: 'Camara Municipal de Caninde', dataCriacao: '01/01/2025' }
    ],
    unidadesGestoras: [
      // Gabinete do Prefeito
      { id: 'ug_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2025', cpfResponsavel: '056******02', nomeResponsavel: 'ALAN GLEYSON BEZERRA LOPES', dataInicio: '01/01/2025', orgaoId: 'org30' },
      
      // Gabinete do Vice-Prefeito
      { id: 'ug_31_1', codigo: '1601', nome: 'Gabinete do Vice-Prefeito', dataCriacao: '01/01/2025', cpfResponsavel: '024******29', nomeResponsavel: 'ANTONIO ILOMAR VASCONCELOS CRUZ', dataInicio: '01/01/2025', orgaoId: 'org31' },
      
      // Procuradoria Geral do Municipio
      { id: 'ug_32_1', codigo: '1701', nome: 'Procuradoria Geral do Municipio-PGM', dataCriacao: '01/01/2025', cpfResponsavel: '650******49', nomeResponsavel: 'JANDY ARAUJO MOREIRA', dataInicio: '01/02/2025', orgaoId: 'org32' },
      { id: 'ug_32_2', codigo: '1701', nome: 'Procuradoria Geral do Municipio-PGM', dataCriacao: '01/01/2025', cpfResponsavel: '924******53', nomeResponsavel: 'LIDENIRA CAVALCANTE MENDOCA VIEIRA', dataInicio: '01/01/2025', orgaoId: 'org32' },
      
      // Controladoria Geral do Municipio
      { id: 'ug_33_1', codigo: '1801', nome: 'Controladoria Geral do Municipio-CONTROL', dataCriacao: '01/01/2025', cpfResponsavel: '952******15', nomeResponsavel: 'MARCOS SALMO LIMA BARRETO', dataInicio: '01/01/2025', orgaoId: 'org33' },
      { id: 'ug_33_2', codigo: '1802', nome: 'Ouvidoria Geral do Municipio', dataCriacao: '01/01/2025', cpfResponsavel: '952******15', nomeResponsavel: 'MARCOS SALMO LIMA BARRETO', dataInicio: '01/01/2025', orgaoId: 'org33' },
      
      // Secretaria de Planejamento
      { id: 'ug_34_1', codigo: '0201', nome: 'Sec. Munc. de Planj., Admin. e Financas', dataCriacao: '01/01/2025', cpfResponsavel: '066******96', nomeResponsavel: 'CARLOS ANTONIO ALENCAR CRUZ', dataInicio: '01/04/2025', orgaoId: 'org34' },
      { id: 'ug_34_2', codigo: '0201', nome: 'Sec. Munc. de Planj., Admin. e Financas', dataCriacao: '01/01/2025', cpfResponsavel: '015******79', nomeResponsavel: 'MARIA ELEIZIANE BATISTA DE LIMA', dataInicio: '01/01/2025', orgaoId: 'org34' },
      { id: 'ug_34_3', codigo: '9999', nome: 'Reserva de Contingencia', dataCriacao: '01/01/2025', cpfResponsavel: '066******96', nomeResponsavel: 'CARLOS ANTONIO ALENCAR CRUZ', dataInicio: '01/04/2025', orgaoId: 'org34' },
      { id: 'ug_34_4', codigo: '9999', nome: 'Reserva de Contingencia', dataCriacao: '01/01/2025', cpfResponsavel: '015******79', nomeResponsavel: 'MARIA ELEIZIANE BATISTA DE LIMA', dataInicio: '01/01/2025', orgaoId: 'org34' },
      
      // Secretaria Municipal de Educacao
      { id: 'ug_35_1', codigo: '1201', nome: 'Secretaria Municipal de Educacao - SME', dataCriacao: '01/01/2025', cpfResponsavel: '041******83', nomeResponsavel: 'GESSICA ERYONNARA LIMA MUNIZ', dataInicio: '05/08/2025', orgaoId: 'org35' },
      { id: 'ug_35_2', codigo: '1201', nome: 'Secretaria Municipal de Educacao - SME', dataCriacao: '01/01/2025', cpfResponsavel: '015******98', nomeResponsavel: 'ANTONIO CID FREITAS BARROS', dataInicio: '18/03/2025', orgaoId: 'org35' },
      { id: 'ug_35_3', codigo: '1201', nome: 'Secretaria Municipal de Educacao - SME', dataCriacao: '01/01/2025', cpfResponsavel: '776******72', nomeResponsavel: 'MARIA TAYLANA QUEIROZ MARTINS', dataInicio: '01/01/2025', orgaoId: 'org35' },
      { id: 'ug_35_4', codigo: '1202', nome: 'Fundo Municipal de Educacao', dataCriacao: '01/01/2025', cpfResponsavel: '041******83', nomeResponsavel: 'GESSICA ERYONNARA LIMA MUNIZ', dataInicio: '05/08/2025', orgaoId: 'org35' },
      { id: 'ug_35_5', codigo: '1202', nome: 'Fundo Municipal de Educacao', dataCriacao: '01/01/2025', cpfResponsavel: '015******98', nomeResponsavel: 'ANTONIO CID FREITAS BARROS', dataInicio: '18/03/2025', orgaoId: 'org35' },
      { id: 'ug_35_6', codigo: '1202', nome: 'Fundo Municipal de Educacao', dataCriacao: '01/01/2025', cpfResponsavel: '776******72', nomeResponsavel: 'MARIA TAYLANA QUEIROZ MARTINS', dataInicio: '01/01/2025', orgaoId: 'org35' },
      { id: 'ug_35_7', codigo: '1203', nome: 'Fundo de Desenv. da Educ. Basica-FUNDEB', dataCriacao: '01/01/2025', cpfResponsavel: '041******83', nomeResponsavel: 'GESSICA ERYONNARA LIMA MUNIZ', dataInicio: '05/08/2025', orgaoId: 'org35' },
      { id: 'ug_35_8', codigo: '1203', nome: 'Fundo de Desenv. da Educ. Basica-FUNDEB', dataCriacao: '01/01/2025', cpfResponsavel: '015******98', nomeResponsavel: 'ANTONIO CID FREITAS BARROS', dataInicio: '18/03/2025', orgaoId: 'org35' },
      { id: 'ug_35_9', codigo: '1203', nome: 'Fundo de Desenv. da Educ. Basica-FUNDEB', dataCriacao: '01/01/2025', cpfResponsavel: '776******72', nomeResponsavel: 'MARIA TAYLANA QUEIROZ MARTINS', dataInicio: '01/01/2025', orgaoId: 'org35' },
      
      // Secretaria Municipal de Saude
      { id: 'ug_36_1', codigo: '0801', nome: 'Secretaria Municipal de Saude - SMS', dataCriacao: '01/01/2025', cpfResponsavel: '055******40', nomeResponsavel: 'ALINE MAYARA ALVES ALMEIDA', dataInicio: '01/10/2025', orgaoId: 'org36' },
      { id: 'ug_36_2', codigo: '0801', nome: 'Secretaria Municipal de Saude - SMS', dataCriacao: '01/01/2025', cpfResponsavel: '058******31', nomeResponsavel: 'ARTUR PAIVA DOS SANTOS SANCHEZ', dataInicio: '01/01/2025', orgaoId: 'org36' },
      { id: 'ug_36_3', codigo: '0802', nome: 'Fundo Municipal de Saude', dataCriacao: '01/01/2025', cpfResponsavel: '055******40', nomeResponsavel: 'ALINE MAYARA ALVES ALMEIDA', dataInicio: '01/10/2025', orgaoId: 'org36' },
      { id: 'ug_36_4', codigo: '0802', nome: 'Fundo Municipal de Saude', dataCriacao: '01/01/2025', cpfResponsavel: '058******31', nomeResponsavel: 'ARTUR PAIVA DOS SANTOS SANCHEZ', dataInicio: '01/01/2025', orgaoId: 'org36' },
      
      // Secretaria Municipal de Assistencia Social
      { id: 'ug_37_1', codigo: '1101', nome: 'Sec. Munic. de Assistencia Social-SEMAS', dataCriacao: '01/01/2025', cpfResponsavel: '036******55', nomeResponsavel: 'TEREZA CRISTINA DE SOUSA SILVA DESTRO', dataInicio: '01/01/2025', orgaoId: 'org37' },
      { id: 'ug_37_2', codigo: '1102', nome: 'Fundo Municipal de Assistencia Social', dataCriacao: '01/01/2025', cpfResponsavel: '036******55', nomeResponsavel: 'TEREZA CRISTINA DE SOUSA SILVA DESTRO', dataInicio: '01/01/2025', orgaoId: 'org37' },
      { id: 'ug_37_3', codigo: '1103', nome: 'Fundo Mun. dos Dir. da Crianca e do Adol', dataCriacao: '01/01/2025', cpfResponsavel: '036******55', nomeResponsavel: 'TEREZA CRISTINA DE SOUSA SILVA DESTRO', dataInicio: '01/01/2025', orgaoId: 'org37' },
      
      // Sec. Mun. Desenvolvimento Economico e Turismo
      { id: 'ug_38_1', codigo: '0901', nome: 'Sec. Mun. de Desenv. Economico e Turismo', dataCriacao: '01/01/2025', cpfResponsavel: '840******68', nomeResponsavel: 'ANTONIO SERGIO BARBOSA DA SILVA', dataInicio: '01/01/2025', orgaoId: 'org38' },
      
      // Sec. Municipal de Agricultura e Recursos Hidricos
      { id: 'ug_39_1', codigo: '0501', nome: 'Sec. Mun. de Agricultura e Rec. Hidricos', dataCriacao: '01/01/2025', cpfResponsavel: '029******47', nomeResponsavel: 'FRANCISCO EUDES RODRIGUES CRUZ', dataInicio: '01/01/2025', orgaoId: 'org39' },
      
      // Sec. Mun. de Des. Urb., Infraest. e Serv. Publicos
      { id: 'ug_40_1', codigo: '0401', nome: 'Sec. Mun. de Desen. Urb, Infr.e Serv.Pub', dataCriacao: '01/01/2025', cpfResponsavel: '005******04', nomeResponsavel: 'RAFAEL HERCULANO ROSSATO', dataInicio: '01/01/2025', orgaoId: 'org40' },
      
      // Secretaria Municipal de Meio Ambiente
      { id: 'ug_41_1', codigo: '0601', nome: 'Secretaria Municipal de Meio Ambiente', dataCriacao: '01/01/2025', cpfResponsavel: '601******10', nomeResponsavel: 'ANTONIA TATIANA SOUSA SILVA UCHOA', dataInicio: '18/03/2025', orgaoId: 'org41' },
      { id: 'ug_41_2', codigo: '0601', nome: 'Secretaria Municipal de Meio Ambiente', dataCriacao: '01/01/2025', cpfResponsavel: '003******09', nomeResponsavel: 'ANTONIO GLEISON LOPES FEITOSA', dataInicio: '06/03/2025', orgaoId: 'org41' },
      { id: 'ug_41_3', codigo: '0601', nome: 'Secretaria Municipal de Meio Ambiente', dataCriacao: '01/01/2025', cpfResponsavel: '601******10', nomeResponsavel: 'ANTONIA TATIANA SOUSA SILVA UCHOA', dataInicio: '01/01/2025', orgaoId: 'org41' },
      { id: 'ug_41_4', codigo: '0602', nome: 'Fundo Municipal do Meio Ambiente', dataCriacao: '01/01/2025', cpfResponsavel: '601******10', nomeResponsavel: 'ANTONIA TATIANA SOUSA SILVA UCHOA', dataInicio: '18/03/2025', orgaoId: 'org41' },
      { id: 'ug_41_5', codigo: '0602', nome: 'Fundo Municipal do Meio Ambiente', dataCriacao: '01/01/2025', cpfResponsavel: '003******09', nomeResponsavel: 'ANTONIO GLEISON LOPES FEITOSA', dataInicio: '06/03/2025', orgaoId: 'org41' },
      { id: 'ug_41_6', codigo: '0602', nome: 'Fundo Municipal do Meio Ambiente', dataCriacao: '01/01/2025', cpfResponsavel: '601******10', nomeResponsavel: 'ANTONIA TATIANA SOUSA SILVA UCHOA', dataInicio: '01/01/2025', orgaoId: 'org41' },
      
      // Sec. Municipal de Seguranca Publica e Transito
      { id: 'ug_42_1', codigo: '0701', nome: 'Sec. Mun. de Seg.Publica e Transito-SMSP', dataCriacao: '01/01/2025', cpfResponsavel: '026******10', nomeResponsavel: 'FRANCISCO ERILSON ALVES DA SILVA', dataInicio: '19/09/2025', orgaoId: 'org42' },
      { id: 'ug_42_2', codigo: '0701', nome: 'Sec. Mun. de Seg.Publica e Transito-SMSP', dataCriacao: '01/01/2025', cpfResponsavel: '643******20', nomeResponsavel: 'FRANCISCA ERIVANIA FREITAS MARTINS', dataInicio: '01/01/2025', orgaoId: 'org42' },
      { id: 'ug_42_3', codigo: '0702', nome: 'Fundo Munic. de Seg.e Defesa Social-FMDS', dataCriacao: '01/01/2025', cpfResponsavel: '026******10', nomeResponsavel: 'FRANCISCO ERILSON ALVES DA SILVA', dataInicio: '19/09/2025', orgaoId: 'org42' },
      { id: 'ug_42_4', codigo: '0702', nome: 'Fundo Munic. de Seg.e Defesa Social-FMDS', dataCriacao: '01/01/2025', cpfResponsavel: '643******20', nomeResponsavel: 'FRANCISCA ERIVANIA FREITAS MARTINS', dataInicio: '01/01/2025', orgaoId: 'org42' },
      
      // Instituto Municipal de Previdencia
      { id: 'ug_43_1', codigo: '1401', nome: 'Inst. Mun. de Previd. do Mun. de Caninde', dataCriacao: '01/01/2025', cpfResponsavel: '038******89', nomeResponsavel: 'NATHALYA SILVA ALMEIDA', dataInicio: '01/01/2025', orgaoId: 'org43' },
      
      // Servico Autonomo de Agua e Esgoto
      { id: 'ug_44_1', codigo: '1501', nome: 'Servico Autonomo de Agua e Esgoto - SAAE', dataCriacao: '01/01/2025', cpfResponsavel: '047******63', nomeResponsavel: 'MAYKON FELIPE BRITO DA SILVA', dataInicio: '01/01/2025', orgaoId: 'org44' },
      
      // Fundacao Municipal de Cultura e Esporte
      { id: 'ug_45_1', codigo: '1301', nome: 'Fund. Munic. de Esp. Cult. e Patromonio', dataCriacao: '01/01/2025', cpfResponsavel: '064******33', nomeResponsavel: 'CARMEM NAIANE RODRIGUES ABREU', dataInicio: '01/01/2025', orgaoId: 'org45' },
      
      // Camara Municipal
      { id: 'ug_99_1', codigo: '0000', nome: 'Camara Municipal', dataCriacao: '01/01/2025', cpfResponsavel: '762******68', nomeResponsavel: 'KARLINDA CIDIO MENDES COELHO', dataInicio: '01/01/2025', orgaoId: 'org99' }
    ]
  }
];

export const STATUS_INTEGRACAO_CONFIG = {
  ativo: {
    label: 'Ativo',
    color: 'bg-green-100 text-green-800 border-green-300'
  },
  inativo: {
    label: 'Inativo',
    color: 'bg-gray-100 text-gray-800 border-gray-300'
  },
  pendente: {
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  erro: {
    label: 'Erro',
    color: 'bg-red-100 text-red-800 border-red-300'
  }
};

export const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];