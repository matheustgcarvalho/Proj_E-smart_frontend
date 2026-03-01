# Guia Visual - Módulo de Cadastros

## Navegação

### Sidebar - Nova Seção CADASTROS
```
┌─────────────────────────────┐
│ E-Smart                     │
│ Gov. Intelligence           │
├─────────────────────────────┤
│ INÍCIO                      │
│ ▸ Dashboards                │
│                             │
│ MONITORAMENTO               │
│ ▸ Cauc-SNT                  │
│ ▸ E-Parcerias               │
│ ▸ Certidões                 │
│                             │
│ GESTÃO DE RECURSOS          │
│ ▸ Convênios                 │
│                             │
│ CADASTROS ◄──── NOVO        │
│ ▸ Municípios    ◄──── NOVO │
│ ▸ Usuários      ◄──── NOVO │
│                             │
│ SISTEMA                     │
│ ▸ Chamados                  │
└─────────────────────────────┘
```

## Tela de Municípios

### Layout Principal
```
┌─────────────────────────────────────────────────────────────────┐
│ [🏢] Cadastro de Municípios        [+ Novo Município]          │
│      Gerencie os municípios cadastrados...                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─ Filtros ─────────────────────────────────────────────────┐ │
│ │ [🔍 Buscar...] [UF ▼] [Status ▼] [✕ Limpar]              │ │
│ └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─ Municípios Cadastrados (5) ─────────────────────────────┐ │
│ │ Município      │ UF │ CNPJ           │ Status  │ Ações  │ │
│ │────────────────┼────┼────────────────┼─────────┼────────│ │
│ │ Fortaleza      │ CE │ 07.954.516/... │ 🟢 Ativo│ 👁 ✏ 🗑 │ │
│ │ Sobral         │ CE │ 07.599.149/... │ 🟢 Ativo│ 👁 ✏ 🗑 │ │
│ │ Juazeiro...    │ CE │ 07.716.628/... │ 🟡 Pend │ 👁 ✏ 🗑 │ │
│ │ Caucaia        │ CE │ 07.716.262/... │ 🔴 Erro │ 👁 ✏ 🗑 │ │
│ │ Maracanaú      │ CE │ 07.599.321/... │ 🟢 Ativo│ 👁 ✏ 🗑 │ │
│ └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Modal de Cadastro
```
┌─────────────────────────────────────────────────────┐
│ Novo Município                                   [✕]│
│ Preencha os dados do município...                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ DADOS BÁSICOS                                       │
│ ┌─────────────────────────────────────────────────┐│
│ │ Nome do Município *                             ││
│ │ [_____________________________________]         ││
│ │                                                 ││
│ │ UF *              CNPJ *                        ││
│ │ [CE ▼]           [00.000.000/0000-00]          ││
│ │                                                 ││
│ │ Código IBGE *     Código TCE *                 ││
│ │ [2304400]        [0001]                        ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ CREDENCIAIS TCE (Opcional)                          │
│ ┌─────────────────────────────────────────────────┐│
│ │ Login TCE         Senha TCE                     ││
│ │ [________]       [••••••••]                     ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ ESTRUTURA ORGANIZACIONAL - UNIDADES GESTORAS       │
│ ┌─────────────────────────────────────────────────┐│
│ │ Cód │ Unidade          │ Responsável   │ Data   ││
│ │─────┼──────────────────┼───────────────┼────────││
│ │ 0101│ Sec. Educação    │ Maria Santos  │01/2024 ││
│ │ 0102│ Sec. Saúde       │ João Carlos   │01/2024 ││
│ │ 0103│ Sec. Infraestr...│ Ana Paula     │01/2024 ││
│ │ 0104│ Sec. Finanças    │ Roberto Alves │01/2024 ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│                       [Cancelar] [Cadastrar ✓]     │
└─────────────────────────────────────────────────────┘
```

## Tela de Usuários

### Cards de Estatísticas
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total        │ Ativos       │ Perfil       │ Perfil       │
│ 8            │ 7            │ Zaneli       │ Prefeitura   │
│ usuários     │              │ 4            │ 4            │
│ 👥           │ ✓            │ 💼           │ 🏛️           │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Layout Principal
```
┌─────────────────────────────────────────────────────────────────┐
│ [👥] Cadastro de Usuários              [+ Novo Usuário]         │
│      Gerencie os usuários do sistema...                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─ Cards de Estatísticas (acima) ─────────────────────────┐   │
│                                                                 │
│ ┌─ Filtros ─────────────────────────────────────────────────┐ │
│ │ [🔍 Buscar...] [Perfil ▼] [Status ▼] [✕ Limpar]          │ │
│ └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─ Usuários Cadastrados (8) ───────────────────────────────┐ │
│ │ Nome          │ E-mail        │ Cargo     │ Perfil │ Ações││
│ │───────────────┼───────────────┼───────────┼────────┼──────││
│ │ Carlos Silva  │ carlos@...    │ Coord.    │🟣Admin │👁✏🗑 ││
│ │ Mariana Costa │ mariana@...   │ Analista  │🔵Gest. │👁✏🗑 ││
│ │ João Pedro    │ joao@...      │ Desenv.   │🔷Colab.│👁✏🗑 ││
│ │ Ana Paula     │ ana@...       │ Secretária│🟢Gest. │👁✏🗑 ││
│ └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Modal de Cadastro
```
┌─────────────────────────────────────────────────────┐
│ Novo Usuário                                     [✕]│
│ Preencha os dados do usuário...                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ DADOS PESSOAIS                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ Nome Completo *                                 ││
│ │ [_____________________________________]         ││
│ │                                                 ││
│ │ CPF *             RG *                          ││
│ │ [000.000.000-00] [0000000]                     ││
│ │                                                 ││
│ │ Telefone *        Cargo *                       ││
│ │ [(00)00000-0000] [__________]                  ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ DADOS DE ACESSO                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ E-mail *                                        ││
│ │ [usuario@email.com]                            ││
│ │                                                 ││
│ │ Senha *                                         ││
│ │ [••••••••]                                     ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ PERFIL E PERMISSÕES                                 │
│ ┌─────────────────────────────────────────────────┐│
│ │ Tipo de Perfil *                                ││
│ │ [Selecione o perfil ▼]                         ││
│ │   ─── Zaneli                                    ││
│ │   ○ Admin                                       ││
│ │   ○ Gestor                                      ││
│ │   ○ Colaborador                                 ││
│ │   ─── Prefeitura                                ││
│ │   ○ Gestor                                      ││
│ │   ○ Colaborador                                 ││
│ │                                                 ││
│ │ Municípios Vinculados *                         ││
│ │ ┌───────────────────────────────────────────┐  ││
│ │ │☑ Fortaleza - CE (CNPJ: 07.954.516/...)   │  ││
│ │ │☑ Sobral - CE (CNPJ: 07.599.149/...)      │  ││
│ │ │☐ Juazeiro do Norte - CE                   │  ││
│ │ │☐ Caucaia - CE                             │  ││
│ │ │☑ Maracanaú - CE                           │  ││
│ │ └───────────────────────────────────────────┘  ││
│ │ 3 município(s) selecionado(s)                   ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│                       [Cancelar] [Cadastrar ✓]     │
└─────────────────────────────────────────────────────┘
```

## Fluxos de Trabalho

### 1. Cadastrar Novo Município
```
1. Clicar em "Novo Município"
   ↓
2. Preencher dados básicos (Nome, UF, CNPJ, Códigos)
   ↓
3. [Opcional] Preencher credenciais TCE
   ↓
4. Sistema busca automaticamente Unidades Gestoras do TCE
   ↓
5. Revisar dados e confirmar cadastro
   ↓
6. Município cadastrado com status "Ativo"
```

### 2. Cadastrar Novo Usuário
```
1. Clicar em "Novo Usuário"
   ↓
2. Preencher dados pessoais (Nome, CPF, RG, Telefone, Cargo)
   ↓
3. Definir credenciais de acesso (E-mail, Senha)
   ↓
4. Selecionar tipo de perfil (Zaneli ou Prefeitura)
   ↓
5. Vincular municípios (multiseleção com checkbox)
   ↓
6. Confirmar cadastro
   ↓
7. Usuário criado com status "Ativo"
```

### 3. Editar Município
```
1. Na listagem, clicar no ícone de edição (✏)
   ↓
2. Modal abre pré-preenchido com dados atuais
   ↓
3. Modificar campos necessários
   ↓
4. Salvar alterações
   ↓
5. Sistema atualiza e mostra feedback
```

### 4. Visualizar Detalhes
```
1. Clicar no ícone de visualização (👁)
   ↓
2. Modal abre com informações completas
   ↓
3. Visualizar:
   - Dados cadastrais
   - Status de integração
   - Unidades gestoras (para municípios)
   - Municípios vinculados (para usuários)
   ↓
4. Fechar modal
```

## Responsividade

### Desktop (> 1024px)
- Layout completo com sidebar expandida
- Tabelas com todas as colunas visíveis
- Modais largos (max-w-3xl)
- Grid 2 colunas nos formulários

### Tablet (768px - 1024px)
- Sidebar colapsada (apenas ícones)
- Tabelas com scroll horizontal
- Modais adaptados
- Grid flexível nos formulários

### Mobile (< 768px)
- Sidebar oculta (menu hambúrguer)
- Cards empilhados verticalmente
- Tabelas em formato de cards
- Formulários em coluna única

## Paleta de Cores por Componente

### Status de Integração (Municípios)
```
🟢 Ativo:    bg-green-100  text-green-800  border-green-300
⚪ Inativo:  bg-gray-100   text-gray-800   border-gray-300
🟡 Pendente: bg-yellow-100 text-yellow-800 border-yellow-300
🔴 Erro:     bg-red-100    text-red-800    border-red-300
```

### Perfis de Usuário
```
🟣 Zaneli Admin:          bg-purple-100 text-purple-800 border-purple-300
🔵 Zaneli Gestor:         bg-blue-100   text-blue-800   border-blue-300
🔷 Zaneli Colaborador:    bg-cyan-100   text-cyan-800   border-cyan-300
🟢 Prefeitura Gestor:     bg-green-100  text-green-800  border-green-300
🟩 Prefeitura Colaborador:bg-emerald-100 text-emerald-800 border-emerald-300
```

### Ações
```
👁 Ver:     hover:bg-blue-50
✏ Editar:  hover:bg-green-50
🗑 Deletar: hover:bg-red-50 text-red-600
```

---

**Desenvolvido seguindo as diretrizes de UX/UI do Sistema E-Smart**  
**Versão:** 1.0.0  
**Data:** 07 de Fevereiro de 2026
