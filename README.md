# 🌟 Conselheiro Pessoal

Um aplicativo React moderno e elegante que gera conselhos personalizados usando a API do Claude da Anthropic. Receba orientações únicas baseadas no seu perfil, interesses e estilo preferido.

![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Claude API](https://img.shields.io/badge/Claude_API-Anthropic-FF6B35?style=for-the-badge)

## ✨ Características

### 🎨 Design Moderno
- Interface elegante com gradientes suaves
- Animações e transições fluidas
- Design responsivo para todos os dispositivos
- Componentes com efeitos hover interativos

### 🧠 IA Personalizada
- Integração completa com a API do Claude Sonnet 4
- Conselhos limitados a 10 linhas para fácil leitura
- Múltiplos estilos: engraçado, sério, motivacional, filosófico, prático
- Personalização baseada em idade, gênero e interesses

### 🚀 Funcionalidades
- Formulário intuitivo com validação
- Geração de novos conselhos instantânea
- Sistema de compartilhamento em redes sociais
- Estados de loading elegantes
- Tratamento de erros robusto

### 📱 Compartilhamento Social
- WhatsApp
- Twitter
- Facebook
- Copiar para área de transferência

## 🛠️ Tecnologias Utilizadas

- **React 18+** - Biblioteca JavaScript para interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos e elegantes
- **Claude API** - IA da Anthropic para geração de conselhos
- **JavaScript ES6+** - Funcionalidades modernas do JavaScript

## 📋 Pré-requisitos

- Node.js 16.0 ou superior
- npm ou yarn
- Conta na Anthropic para acesso à API do Claude

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/conselheiro-pessoal.git
cd conselheiro-pessoal
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e adicione suas chaves de API:
```env
REACT_APP_ANTHROPIC_API_KEY=sua_chave_aqui
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm start
# ou
yarn start
```

5. **Acesse o aplicativo**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Cria build de produção
npm test           # Executa os testes
npm run eject      # Ejeta a configuração do Create React App
```

## 🎯 Como Usar

1. **Preencha seus dados pessoais:**
   - Idade
   - Gênero
   - Data de nascimento (opcional)
   - Áreas de interesse
   - Estilo preferido do conselho

2. **Clique em "Gerar Conselho Personalizado"**

3. **Receba seu conselho único e personalizado**

4. **Compartilhe nas redes sociais ou gere um novo conselho**

## 🔧 Configuração da API

O aplicativo utiliza a API do Claude da Anthropic. Para obter acesso:

1. Visite [https://console.anthropic.com](https://console.anthropic.com)
2. Crie uma conta e obtenha sua API key
3. Configure a chave no arquivo `.env.local`

### Exemplo de Configuração
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }]
  })
});
```

## 📁 Estrutura do Projeto

```
conselheiro-pessoal/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── AdviceGenerator.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
├── .gitignore
└── .env.example
```

## 🎨 Personalização

### Estilos de Conselho Disponíveis:
- **😄 Engraçado** - Conselhos com humor e leveza
- **🎯 Sério** - Orientações diretas e focadas
- **💪 Motivacional** - Mensagens inspiradoras
- **🤔 Filosófico** - Reflexões profundas
- **⚡ Prático** - Dicas aplicáveis no dia a dia

### Customizar Cores:
Edite as classes Tailwind no componente para alterar a paleta de cores:
```jsx
// Gradiente principal
from-indigo-600 to-purple-600

// Botão de compartilhamento
from-green-500 to-emerald-600
```

## 🔒 Segurança

- ✅ Validação de entrada do usuário
- ✅ Sanitização de dados antes do envio à API
- ✅ Tratamento seguro de erros
- ✅ Não armazenamento de dados sensíveis no localStorage
- ✅ Variáveis de ambiente para chaves de API

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arraste a pasta build para o Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Sistema de histórico de conselhos
- [ ] Categorias específicas de conselhos
- [ ] Modo escuro/claro
- [ ] PWA (Progressive Web App)
- [ ] Sistema de favoritos
- [ ] Exportação para PDF
- [ ] Integração com mais redes sociais
- [ ] Versão mobile nativa

## 🐛 Problemas Conhecidos

- A API do Claude pode ter limitações de rate limiting
- Alguns navegadores podem bloquear popups de compartilhamento

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/Leotech47)
- LinkedIn: [Seu Perfil](https://linkedin.com/in/leonardo-silva-tech1975)

## 🙏 Agradecimentos

- [Anthropic](https://anthropic.com) pela API do Claude
- [Lucide](https://lucide.dev) pelos ícones elegantes
- [Tailwind CSS](https://tailwindcss.com) pelo framework CSS
- Comunidade React pelo suporte contínuo

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

📧 Dúvidas? Abra uma [issue](https://github.com/seu-usuario/conselheiro-pessoal/issues) ou entre em contato!
