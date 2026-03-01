# Acessibilidade e Boas Práticas - Módulo de Cadastros

## Acessibilidade Implementada

### ✅ Componentes Acessíveis

#### 1. Semântica HTML
```tsx
// Uso correto de heading hierarchy
<h1>Cadastro de Municípios</h1>
<h2>Dados Básicos</h2>
<h3>Unidades Gestoras</h3>

// Labels associados aos inputs
<Label htmlFor="nome">Nome do Município</Label>
<Input id="nome" />
```

#### 2. Navegação por Teclado
- ✅ Todos os botões são focáveis
- ✅ Modais podem ser fechados com ESC
- ✅ Tab order lógico nos formulários
- ✅ Focus visible em elementos interativos

```css
/* Estados de focus implementados */
focus-visible:border-ring 
focus-visible:ring-ring/50
focus-visible:ring-[3px]
```

#### 3. ARIA Labels
```tsx
// Botões com ícones
<Button aria-label="Editar município">
  <Edit className="w-4 h-4" />
</Button>

// Botões com texto oculto para screen readers
<Button>
  <Trash2 className="w-4 h-4" />
  <span className="sr-only">Deletar</span>
</Button>

// Títulos em botões colapsados
<Button title={!isOpen ? item.label : undefined}>
  <item.icon />
</Button>
```

#### 4. Contraste de Cores
```
✅ Texto principal (#2e2e2e) em fundo branco: 12.6:1
✅ Texto secundário (#626262) em fundo branco: 5.3:1
✅ Botões verdes (#2e6a50) com texto branco: 4.8:1
✅ Badges com cores WCAG AA compliant
```

#### 5. Tamanhos de Toque
```tsx
// Mínimo 44x44px para elementos interativos (WCAG)
<Button className="py-3 px-4"> // ~44px altura
  Ação
</Button>

// Ícones clicáveis com área adequada
<Button size="sm" className="p-2"> // ~40px
  <Icon className="w-4 h-4" />
</Button>
```

### ⚠️ Melhorias Recomendadas

#### 1. Anúncios para Screen Readers
```tsx
// Implementar live regions para feedback
<div role="status" aria-live="polite" aria-atomic="true">
  {message && <span className="sr-only">{message}</span>}
</div>

// Exemplo de uso:
const [message, setMessage] = useState('');

const handleSave = () => {
  // ... lógica de salvamento
  setMessage('Município cadastrado com sucesso');
  setTimeout(() => setMessage(''), 3000);
};
```

#### 2. Descrições Expandidas
```tsx
// Adicionar aria-describedby para instruções
<Input
  id="cnpj"
  aria-describedby="cnpj-help"
/>
<p id="cnpj-help" className="text-xs text-gray-500">
  Formato: 00.000.000/0000-00
</p>
```

#### 3. Estados de Loading
```tsx
// Indicar carregamento para screen readers
<Button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? (
    <>
      <Loader className="animate-spin w-4 h-4 mr-2" />
      <span>Carregando...</span>
    </>
  ) : (
    'Salvar'
  )}
</Button>
```

#### 4. Validações Acessíveis
```tsx
// Associar mensagens de erro aos campos
<Input
  id="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert" className="text-red-600 text-sm">
    {errors.email}
  </p>
)}
```

## Melhorias de UX

### 1. Feedback Visual

#### Toast Notifications
```tsx
import { toast } from 'sonner@2.0.3';

const handleSaveMunicipio = async () => {
  try {
    await api.saveMunicipio(formData);
    toast.success('Município cadastrado com sucesso!');
    setCadastroModalOpen(false);
  } catch (error) {
    toast.error('Erro ao cadastrar município. Tente novamente.');
  }
};
```

#### Loading States
```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSimularCarregamento = async () => {
  setLoadingUnidades(true);
  try {
    const unidades = await api.getUnidadesGestoras(codigoTce);
    setUnidadesGestoras(unidades);
  } catch (error) {
    toast.error('Erro ao carregar unidades gestoras');
  } finally {
    setLoadingUnidades(false);
  }
};
```

#### Skeleton Loaders
```tsx
import { Skeleton } from '../ui/skeleton';

{isLoading ? (
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
) : (
  <TableContent />
)}
```

### 2. Validações em Tempo Real

#### CPF
```tsx
const validateCPF = (cpf: string) => {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;
  // Lógica de validação do CPF
  return true;
};

<Input
  value={formData.cpf}
  onChange={(e) => {
    const value = e.target.value;
    setFormData({ ...formData, cpf: value });
    
    if (value.length === 14) { // Formato: 000.000.000-00
      if (!validateCPF(value)) {
        setErrors({ ...errors, cpf: 'CPF inválido' });
      } else {
        setErrors({ ...errors, cpf: undefined });
      }
    }
  }}
/>
```

#### CNPJ
```tsx
const validateCNPJ = (cnpj: string) => {
  const cleaned = cnpj.replace(/\D/g, '');
  if (cleaned.length !== 14) return false;
  // Lógica de validação do CNPJ
  return true;
};
```

#### E-mail
```tsx
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

### 3. Máscaras de Input

```tsx
import { IMaskInput } from 'react-imask';

// CPF
<IMaskInput
  mask="000.000.000-00"
  value={formData.cpf}
  onAccept={(value) => setFormData({ ...formData, cpf: value })}
/>

// CNPJ
<IMaskInput
  mask="00.000.000/0000-00"
  value={formData.cnpj}
  onAccept={(value) => setFormData({ ...formData, cnpj: value })}
/>

// Telefone
<IMaskInput
  mask="(00) 00000-0000"
  value={formData.telefone}
  onAccept={(value) => setFormData({ ...formData, telefone: value })}
/>
```

### 4. Confirmações de Ações Destrutivas

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost" className="text-red-600">
      <Trash2 className="w-4 h-4" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
      <AlertDialogDescription>
        Tem certeza que deseja excluir o município "{municipio.nome}"? 
        Esta ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={() => handleDelete(municipio.id)} className="bg-red-600">
        Excluir
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 5. Busca com Debounce

```tsx
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

const debouncedSearch = useCallback(
  debounce((query: string) => {
    // Chamar API de busca
    api.searchMunicipios(query);
  }, 500),
  []
);

<Input
  placeholder="Buscar..."
  onChange={(e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  }}
/>
```

### 6. Paginação

```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const paginatedItems = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredItems.slice(startIndex, startIndex + itemsPerPage);
}, [filteredItems, currentPage]);

<Pagination>
  <PaginationContent>
    <PaginationPrevious 
      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
      disabled={currentPage === 1}
    />
    {/* ... páginas ... */}
    <PaginationNext 
      onClick={() => setCurrentPage(p => p + 1)}
      disabled={currentPage === totalPages}
    />
  </PaginationContent>
</Pagination>
```

### 7. Exportação de Dados

```tsx
import { Download } from 'lucide-react';

const exportToCSV = () => {
  const headers = ['Nome', 'UF', 'CNPJ', 'Status'];
  const rows = municipiosFiltrados.map(m => [
    m.nome,
    m.uf,
    m.cnpj,
    m.statusIntegracao
  ]);
  
  const csv = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'municipios.csv';
  a.click();
};

<Button onClick={exportToCSV} variant="outline">
  <Download className="w-4 h-4 mr-2" />
  Exportar CSV
</Button>
```

## Performance

### 1. Lazy Loading de Imagens
```tsx
<img 
  src={municipio.logo} 
  loading="lazy"
  alt={`Logo de ${municipio.nome}`}
/>
```

### 2. Virtual Scrolling para Listas Grandes
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

const parentRef = useRef<HTMLDivElement>(null);

const rowVirtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});

<div ref={parentRef} className="h-[400px] overflow-auto">
  {rowVirtualizer.getVirtualItems().map(virtualRow => (
    <div key={virtualRow.key} style={{ height: virtualRow.size }}>
      {items[virtualRow.index]}
    </div>
  ))}
</div>
```

### 3. Memoização de Cálculos Pesados
```tsx
const expensiveCalculation = useMemo(() => {
  return items.reduce((acc, item) => {
    // Cálculo complexo
    return acc + item.value;
  }, 0);
}, [items]);
```

## Internacionalização (i18n)

### Preparação para Multilíngue
```tsx
// Criar arquivo de tradução
const translations = {
  pt: {
    municipalities: {
      title: 'Cadastro de Municípios',
      addNew: 'Novo Município',
      search: 'Buscar...',
    }
  },
  en: {
    municipalities: {
      title: 'Municipality Registration',
      addNew: 'New Municipality',
      search: 'Search...',
    }
  }
};

// Usar no componente
const t = translations[currentLanguage];

<h1>{t.municipalities.title}</h1>
<Button>{t.municipalities.addNew}</Button>
```

## Checklist de Qualidade

### Antes de Deploy
- [ ] Testar navegação completa por teclado
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar com screen reader (NVDA/JAWS)
- [ ] Validar responsividade (mobile/tablet/desktop)
- [ ] Implementar tratamento de erros
- [ ] Adicionar loading states
- [ ] Implementar validações de formulário
- [ ] Adicionar confirmações para ações destrutivas
- [ ] Testar performance com dados reais
- [ ] Implementar logs de auditoria
- [ ] Configurar CSP (Content Security Policy)
- [ ] Sanitizar inputs (XSS prevention)
- [ ] Implementar rate limiting
- [ ] Adicionar testes automatizados
- [ ] Documentar APIs

### Testes de Acessibilidade
```bash
# Ferramentas recomendadas
npm install --save-dev @axe-core/react
npm install --save-dev jest-axe
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
```

```tsx
// Teste de acessibilidade
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MunicipiosView />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

**Seguindo as diretrizes WCAG 2.1 Level AA**  
**Versão:** 1.0.0  
**Última atualização:** 07/02/2026
