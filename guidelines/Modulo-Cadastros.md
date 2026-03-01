# Módulo de Cadastros - Sistema E-Smart

## Visão Geral

O módulo de **Cadastros** foi desenvolvido para gerenciar os dados fundamentais do sistema E-Smart, incluindo:

- **Municípios**: Cadastro e integração com TCE
- **Usuários**: Gestão de perfis e permissões de acesso

## Estrutura do Módulo

### 1. Navegação (Sidebar)

Nova seção **CADASTROS** adicionada à sidebar com:
- 📍 **Municípios** - Gestão de municípios e integração TCE
- 👥 **Usuários** - Gestão de usuários e permissões

### 2. Cadastro de Municípios

#### Funcionalidades:
- ✅ Listagem em tabela com filtros por nome, UF, CNPJ e status
- ✅ Cadastro/edição via modal
- ✅ Visualização de detalhes
- ✅ Integração automática com TCE
- ✅ Carregamento automático de Unidades Gestoras

#### Campos do Formulário:
**Dados Básicos:**
- Nome do Município
- UF (dropdown)
- CNPJ
- Código IBGE
- Código TCE

**Credenciais TCE (Opcional):**
- Login TCE
- Senha TCE

**Unidades Gestoras (Automático):**
Após preencher os códigos IBGE e TCE, o sistema carrega automaticamente:
- Código da Unidade
- Nome da Unidade
- CPF/Nome do Responsável
- Data de Criação
- Data de Início

#### Status de Integração:
- 🟢 **Ativo** - Integração funcionando normalmente
- ⚪ **Inativo** - Município sem integração ativa
- 🟡 **Pendente** - Aguardando configuração
- 🔴 **Erro** - Falha na integração

### 3. Cadastro de Usuários

#### Funcionalidades:
- ✅ Listagem em tabela com filtros avançados
- ✅ Cards de estatísticas (Total, Ativos, Zaneli, Prefeitura)
- ✅ Cadastro/edição via modal
- ✅ Visualização de detalhes
- ✅ Multiseleção de municípios vinculados

#### Campos do Formulário:
**Dados Pessoais:**
- Nome Completo
- CPF
- RG
- Telefone
- Cargo

**Dados de Acesso:**
- E-mail
- Senha

**Perfil e Permissões:**
- Tipo de Perfil (dropdown categorizado):
  - **Zaneli**: Admin, Gestor, Colaborador
  - **Prefeitura**: Gestor, Colaborador
- Municípios Vinculados (multiseleção com checkbox)

#### Perfis Disponíveis:

**Zaneli:**
- 🟣 **Admin** - Acesso total ao sistema
- 🔵 **Gestor** - Gestão de múltiplos municípios
- 🔷 **Colaborador** - Acesso limitado

**Prefeitura:**
- 🟢 **Gestor** - Gestão do município
- 🟩 **Colaborador** - Acesso operacional

### 4. Design System

O módulo segue rigorosamente a identidade visual do E-Smart:

**Cores:**
- **Primária:** `#2e6a50` (Verde Escuro)
- **Secundária:** `#1a3e3e` (Verde Muito Escuro)
- **Background:** `#f7f7f7` (Cinza Claro)
- **Texto Principal:** `#2e2e2e`
- **Texto Secundário:** `#626262`

**Componentes:**
- Header com ícone, título e descrição
- Cards brancos com bordas suaves
- Botões verdes com hover states
- Badges coloridos para status
- Tabelas responsivas
- Modais com scroll interno
- Inputs com estados de focus
- Filtros com dropdown e busca

### 5. Arquivos Criados

```
/lib/
  ├── municipios-data.ts      # Dados mockados de municípios
  └── usuarios-data.ts         # Dados mockados de usuários

/components/views/
  ├── MunicipiosView.tsx       # Tela de cadastro de municípios
  └── UsuariosView.tsx         # Tela de cadastro de usuários
```

### 6. Integração

O módulo está totalmente integrado:
- ✅ Sidebar atualizada com nova seção
- ✅ Rotas adicionadas no App.tsx
- ✅ Componentes UI reutilizados (shadcn/ui)
- ✅ Dados mockados estruturados
- ✅ TypeScript com tipagem completa

### 7. Funcionalidades Futuras (Próximos Passos)

**Municípios:**
- [ ] Integração real com API do TCE
- [ ] Sincronização automática de dados
- [ ] Histórico de alterações
- [ ] Exportação de relatórios
- [ ] Auditoria de acessos

**Usuários:**
- [ ] Recuperação de senha
- [ ] Autenticação 2FA
- [ ] Log de atividades
- [ ] Permissões granulares por módulo
- [ ] Notificações por e-mail
- [ ] Integração com SSO/LDAP

### 8. Uso

**Acessar Cadastro de Municípios:**
1. Faça login no sistema
2. Na sidebar, clique em **CADASTROS** > **Municípios**
3. Use os filtros para buscar municípios
4. Clique em "Novo Município" para cadastrar

**Acessar Cadastro de Usuários:**
1. Faça login no sistema
2. Na sidebar, clique em **CADASTROS** > **Usuários**
3. Use os filtros para buscar usuários
4. Clique em "Novo Usuário" para cadastrar

---

**Desenvolvido por:** Zaneli Tech  
**Sistema:** E-Smart - Gov. Intelligence  
**Versão:** 1.0.0  
**Data:** 07 de Fevereiro de 2026
