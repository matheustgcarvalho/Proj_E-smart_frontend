# Documentação Técnica - Módulo de Cadastros

## Arquitetura

### Estrutura de Dados

#### Municípios (`/lib/municipios-data.ts`)

```typescript
interface UnidadeGestora {
  id: string;
  codigo: string;
  nome: string;
  dataCriacao: string;
  cpfResponsavel: string;
  nomeResponsavel: string;
  dataInicio: string;
}

interface Municipio {
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
  unidadesGestoras: UnidadeGestora[];
}
```

#### Usuários (`/lib/usuarios-data.ts`)

```typescript
interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  cpf: string;
  rg: string;
  telefone: string;
  cargo: string;
  tipoPerfil: 'zaneli-admin' | 'zaneli-gestor' | 'zaneli-colaborador' | 
               'prefeitura-gestor' | 'prefeitura-colaborador';
  municipiosVinculados: string[];
  status: 'ativo' | 'inativo';
  dataCadastro: string;
  ultimoAcesso?: string;
}
```

### Componentes Principais

#### MunicipiosView.tsx

**Responsabilidades:**
- Listagem paginada de municípios
- Filtros: busca, UF, status de integração
- CRUD completo (Create, Read, Update, Delete)
- Simulação de carregamento de Unidades Gestoras

**Estados principais:**
```typescript
const [cadastroModalOpen, setCadastroModalOpen] = useState(false);
const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
const [municipioSelecionado, setMunicipioSelecionado] = useState<Municipio | null>(null);
const [isEditMode, setIsEditMode] = useState(false);
```

**Funções principais:**
- `handleOpenCadastro()` - Abre modal de novo cadastro
- `handleOpenEdit(municipio)` - Abre modal de edição
- `handleVerDetalhes(municipio)` - Exibe detalhes completos
- `handleSimularCarregamento()` - Simula busca de unidades gestoras do TCE
- `handleSaveMunicipio()` - Salva/atualiza município

#### UsuariosView.tsx

**Responsabilidades:**
- Listagem paginada de usuários
- Filtros: busca, perfil, status
- Cards de estatísticas (KPIs)
- CRUD completo
- Multiseleção de municípios vinculados

**Estados principais:**
```typescript
const [cadastroModalOpen, setCadastroModalOpen] = useState(false);
const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
const [isEditMode, setIsEditMode] = useState(false);
```

**Funções principais:**
- `handleOpenCadastro()` - Abre modal de novo cadastro
- `handleOpenEdit(usuario)` - Abre modal de edição
- `handleVerDetalhes(usuario)` - Exibe detalhes completos
- `handleToggleMunicipio(municipioId)` - Toggle de municípios vinculados
- `handleSaveUsuario()` - Salva/atualiza usuário
- `getMunicipiosNomes(ids)` - Converte IDs em nomes de municípios

### Componentes UI Reutilizados

```typescript
// shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
```

### Integrações

#### Sidebar (`/components/Sidebar.tsx`)

```typescript
// Nova seção adicionada
{
  title: 'Cadastros',
  items: [
    { id: 'municipios', label: 'Municípios', icon: Building2 },
    { id: 'usuarios', label: 'Usuários', icon: Users },
  ]
}
```

#### App.tsx

```typescript
// Imports
import MunicipiosView from './components/views/MunicipiosView';
import UsuariosView from './components/views/UsuariosView';

// Router
case 'municipios':
  return <MunicipiosView />;
case 'usuarios':
  return <UsuariosView />;
```

## Padrões de Código

### 1. Filtros Dinâmicos

```typescript
const municipiosFiltrados = useMemo(() => {
  return MUNICIPIOS_MOCK.filter(municipio => {
    const matchesSearch = 
      municipio.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      municipio.cnpj.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'todos' || municipio.statusIntegracao === statusFilter;
    const matchesUf = ufFilter === 'todos' || municipio.uf === ufFilter;
    
    return matchesSearch && matchesStatus && matchesUf;
  });
}, [searchQuery, statusFilter, ufFilter]);
```

### 2. Estados de Formulário

```typescript
const [formData, setFormData] = useState({
  nome: '',
  uf: '',
  cnpj: '',
  // ...
});

// Atualização
<Input
  value={formData.nome}
  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
/>
```

### 3. Badges de Status

```typescript
const statusConfig = STATUS_INTEGRACAO_CONFIG[municipio.statusIntegracao];
<Badge className={`${statusConfig.color} flex items-center gap-1`}>
  {getStatusIcon(municipio.statusIntegracao)}
  {statusConfig.label}
</Badge>
```

### 4. Modais Responsivos

```typescript
<Dialog open={cadastroModalOpen} onOpenChange={setCadastroModalOpen}>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
    {/* Conteúdo com scroll interno */}
  </DialogContent>
</Dialog>
```

## Performance

### Otimizações Aplicadas

1. **useMemo** para cálculos de filtros
```typescript
const conveniosFiltrados = useMemo(() => {
  return data.filter(/* ... */);
}, [dependencies]);
```

2. **Estados locais** para evitar re-renders desnecessários

3. **Lazy loading** de Unidades Gestoras (simulado)

4. **Debouncing** recomendado para busca em produção

## Segurança

### Considerações

1. **Senhas**: Atualmente armazenadas em plain text (apenas mock)
   - ⚠️ **ATENÇÃO**: Implementar hash bcrypt em produção
   
2. **Validações**: Apenas frontend (mock)
   - ✅ Implementar validações backend
   - ✅ Sanitização de inputs
   - ✅ Proteção contra SQL Injection

3. **Autenticação**: 
   - ✅ Implementar JWT ou sessões seguras
   - ✅ Refresh tokens
   - ✅ Rate limiting

4. **Autorização**:
   - ✅ Middleware de verificação de perfil
   - ✅ RBAC (Role-Based Access Control)

## Testes Recomendados

### Unitários
```typescript
// Exemplo: Testes de filtros
describe('MunicipiosView', () => {
  test('filtra municípios por nome', () => {
    // ...
  });
  
  test('filtra municípios por UF', () => {
    // ...
  });
});
```

### Integração
- Fluxo completo de cadastro de município
- Fluxo completo de cadastro de usuário
- Vinculação de municípios a usuários

### E2E
- Navegação entre telas
- CRUD completo
- Validações de formulário

## APIs Futuras (Backend)

### Endpoints Sugeridos

#### Municípios
```
GET    /api/municipios              # Lista todos
GET    /api/municipios/:id          # Detalhes
POST   /api/municipios              # Cria novo
PUT    /api/municipios/:id          # Atualiza
DELETE /api/municipios/:id          # Remove
GET    /api/municipios/:id/unidades # Busca unidades gestoras do TCE
```

#### Usuários
```
GET    /api/usuarios                # Lista todos
GET    /api/usuarios/:id            # Detalhes
POST   /api/usuarios                # Cria novo
PUT    /api/usuarios/:id            # Atualiza
DELETE /api/usuarios/:id            # Remove
PATCH  /api/usuarios/:id/status     # Ativa/Desativa
POST   /api/usuarios/:id/municipios # Vincula municípios
```

#### TCE Integration
```
POST   /api/tce/validate            # Valida credenciais
GET    /api/tce/:codigo/unidades    # Busca unidades gestoras
POST   /api/tce/sync                # Sincroniza dados
```

## Manutenção

### Checklist para Produção

- [ ] Substituir dados mock por chamadas API
- [ ] Implementar autenticação JWT
- [ ] Adicionar validações Zod/Yup
- [ ] Implementar tratamento de erros
- [ ] Adicionar loading states
- [ ] Implementar paginação backend
- [ ] Adicionar toasts de feedback
- [ ] Implementar auditoria
- [ ] Adicionar testes unitários
- [ ] Configurar CI/CD
- [ ] Documentar APIs (Swagger/OpenAPI)
- [ ] Implementar rate limiting
- [ ] Configurar CORS adequadamente
- [ ] Criptografar dados sensíveis

## Dependências

```json
{
  "dependencies": {
    "react": "^18.x",
    "lucide-react": "latest",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-select": "latest"
  }
}
```

---

**Última atualização:** 07/02/2026  
**Versão:** 1.0.0  
**Responsável:** Zaneli Tech
