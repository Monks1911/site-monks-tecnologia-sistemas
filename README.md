# Monks Tecnologia & Sistemas – Ajuste de identidade do contato

Versão editada a partir dos arquivos enviados pelo Monks em 13/11/2026.

## O que mudou
- Seção de contato (`#contato`) reformulada em azul escuro.
- Fundo verde-claro e círculo com `M.` removidos.
- Texto comercial mais objetivo e botão do WhatsApp preservado.
- Painel de três etapas de um projeto, substituindo a decoração abstrata.
- Estilos responsivos para desktop, tablet e celular.
- No celular, o botão flutuante de WhatsApp se recolhe enquanto a seção de contato está visível para não cobrir informações.
- O favicon enviado foi incluído em `assets/favicon.svg` e referenciado localmente.

## O que foi mantido
- Outras seções, textos, menu e JavaScript originais.
- Número de WhatsApp `5547933868451` e mensagens pré-preenchidas.
- Os endereços originais de site, demonstração e redes.

## A logo original
Os arquivos de assets fornecidos incluem favicon.svg, og-monks.png e og-monks.svg, mas **não** a imagem original `logo-monks.png`. Assim, as logos exibidas no topo e rodapé continuam usando o endereço público do site original. Para tornar o novo site independente desse endereço, adicione `logo-monks.png` à pasta `assets` e troque as referências remotas no `index.html` por `assets/logo-monks.png`.

## Como testar
1. Extraia a pasta completa, mantendo `index.html`, `styles.css`, `script.js` e `assets/` no mesmo nível.
2. Abra `index.html` no navegador ou rode um servidor local (`python -m http.server 8000`).
3. Role até a seção de contato, teste no celular e verifique os botões do WhatsApp.
4. **Não substitua arquivos em produção antes de fazer um backup e conferir a versão nova.**

## Como publicar no GitHub Pages
Depois de testar, envie os arquivos para o repositório do site, com a pasta `assets` preservada. Se o arquivo estiver em subpasta, mantenha as URLs relativas consistentes. O código não depende de build ou frameworks.


## V5: Assistente Virtual Monks (respostas programadas)

### Como testar
1. Abra `index.html` em um navegador (na pasta, com os arquivos ao lado).
2. Clique no botão **Assistente Monks**, localizado no canto inferior esquerdo.
3. Escolha **Quero um site** ou **Preciso de um sistema**.
4. Digite uma descrição de teste, por exemplo: `Preciso de um sistema para orçamentos`.
5. Confira se o botão **Enviar pelo WhatsApp** abre uma conversa contendo o serviço e o texto informado.
6. Teste também as perguntas: `quanto custa?`, `prazo`, `hospedagem`, `projeto real` e uma pergunta desconhecida.
7. Teste em celular e reinicie a conversa pelo ícone de seta circular.

### Arquivos modificados
- `index.html`: inclusão do widget e do carregamento de `assistente.js`.
- `styles.css`: estilos isolados com classes `.mc-*`, sem alterar as demais seções.
- `assistente.js` (novo): fluxos programados, mensagens, botões, perguntas comuns e preparação do WhatsApp.

### Manutenção
- Para editar serviços e respostas, abra `assistente.js`, objeto `services` e a função `handleText`.
- O número do WhatsApp permanece definido em `script.js`, variável `WHATSAPP_NUMBER`. O assistente reutiliza essa variável.
- Não existe IA generativa nem banco de dados. A conversa fica apenas na memória do navegador e é descartada quando a página é recarregada.
- O botão do WhatsApp **não envia automaticamente**: apenas abre o aplicativo ou site com uma mensagem preenchida, que o visitante pode revisar.
- Evite coletar senhas, documentos ou dados sensíveis no chat. Uma política de privacidade poderá ser adicionada antes de implementar formulários persistentes/analytics.

### Publicação no GitHub Pages
Envie todos os arquivos da pasta, incluindo **o novo `assistente.js`**, preservando a estrutura dos diretórios. Revise o número comercial em `script.js` antes de publicar. Não foi feita qualquer alteração no repositório online.


## V6: favicon com a marca oficial

- O antigo `assets/favicon.svg`, com a letra M simplificada, foi removido.
- O favicon agora mostra a **marca oficial da Monks**, com símbolo azul e o nome MONKS, extraída de uma captura do cabeçalho enviada pelo proprietário.
- Arquivos locais criados: `favicon.ico`, `assets/favicon-monks.png`, `assets/favicon-monks-16.png`, `assets/favicon-monks-32.png`, `assets/favicon-monks-48.png` e `assets/apple-touch-icon.png`.
- As tags no `<head>` de `index.html` foram atualizadas. O parâmetro `?v=6` ajuda a atualizar o cache.
- O resto do site e o assistente virtual foram preservados. Nada foi publicado automaticamente.

**Qualidade do arquivo:** essa versão utiliza um recorte da captura de tela da logo, e não o PNG vetorial ou de alta resolução. Em tamanhos de aba de navegador, a resolução é suficiente para reconhecer a marca, mas a substituição futura pelo arquivo original dará mais nitidez. Evite ampliar esse favicon como se fosse a logo principal.

**Para testar:** abra a V6 no navegador, confirme a imagem na aba e faça Ctrl+F5 se ainda surgir a versão antiga. Se necessário, feche e reabra a aba ou limpe o cache do favicon. Para publicar, mantenha `favicon.ico` na raiz e a pasta `assets` completa.
