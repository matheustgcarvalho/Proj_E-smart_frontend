# Sistema E-Smart - Plataforma de BI Governamental

Sistema de Business Intelligence para visualização de dados municipais, desenvolvido com React, TypeScript, Tailwind CSS e Recharts.

## 🚀 Deploy no Vercel

### Opção 1: Deploy via Interface Web (Recomendado)

1. **Acesse o Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub, GitLab ou Bitbucket

2. **Prepare o Repositório Git**
   ```bash
   # Inicialize o repositório Git (se ainda não tiver)
   git init
   
   # Adicione todos os arquivos
   git add .
   
   # Faça o commit inicial
   git commit -m "feat: Sistema E-Smart completo com visualizações de BI"
   
   # Crie um repositório no GitHub e conecte
   git remote add origin https://github.com/seu-usuario/e-smart.git
   git branch -M main
   git push -u origin main
   ```

3. **Importe o Projeto no Vercel**
   - Clique em "Add New..." → "Project"
   - Selecione seu repositório Git
   - Configure as opções:
     - **Framework Preset**: Vite (ou Auto-detect)
     - **Root Directory**: `./` (raiz do projeto)
     - **Build Command**: `npm run build` ou deixe vazio para auto-detect
     - **Output Directory**: `dist` ou deixe vazio para auto-detect
   - Clique em "Deploy"

4. **Aguarde o Deploy**
   - O Vercel irá instalar as dependências e fazer o build
   - Em poucos minutos, você receberá uma URL pública (ex: `e-smart.vercel.app`)

### Opção 2: Deploy via CLI

1. **Instale o Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Faça Login**
   ```bash
   vercel login
   ```

3. **Deploy do Projeto**
   ```bash
   # Deploy de desenvolvimento
   vercel
   
   # Deploy de produção
   vercel --prod
   ```

## 🔧 Configuração

O arquivo `vercel.json` já está configurado para garantir que o roteamento do React funcione corretamente, redirecionando todas as rotas para o `index.html`.

## 📦 Dependências Principais

- React 18+
- TypeScript
- Tailwind CSS v4
- Recharts
- Lucide React (ícones)
- shadcn/ui (componentes)

## 🎨 Funcionalidades

- **Dashboard**: Visualização geral com cards de status e gráficos
- **CAUC**: Acompanhamento de pendências no Cadastro Único de Convênios
- **E-Parcerias**: Gestão de parcerias e convênios
- **Certidões**: Controle de certidões negativas e regularidade fiscal
- **Chamados**: Sistema de suporte técnico
- **Configurações**: Gerenciamento de usuário e tema (Dark Mode)

## 🏙️ Municípios Suportados

- Fortaleza
- Maracanaú
- Caucaia
- Eusébio
- Aquiraz

## 🔐 Credenciais de Teste

- **Usuário**: admin
- **Senha**: admin123

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎯 Destaques Técnicos

- **ChartWrapper** com ResizeObserver para prevenir erros de renderização
- Tratamento inteligente de "sem dados" vs "sucesso" (ex: 0 pendências)
- Layouts adaptáveis com CSS Grid e Flexbox
- Performance otimizada com lazy loading e memoization

## 📄 Licença

© 2026 Sistema E-Smart - Plataforma de BI Governamental
