/*
 * Assistente Virtual Monks V5
 * Atendimento programado: sem IA, sem API e sem servidor.
 * Usa WHATSAPP_NUMBER do script.js para manter um unico numero comercial.
 * Nenhuma mensagem e salva ou enviada automaticamente.
 */
(() => {
  'use strict';

  const widget = document.querySelector('.mc-widget');
  if (!widget) return;

  const launcher = document.getElementById('mc-launcher');
  const panel = document.getElementById('mc-panel');
  const closeButton = document.getElementById('mc-close');
  const resetButton = document.getElementById('mc-reset');
  const messagesElement = document.getElementById('mc-messages');
  const actionsElement = document.getElementById('mc-actions');
  const conversationElement = document.querySelector('.mc-conversation');
  const form = document.getElementById('mc-form');
  const input = document.getElementById('mc-input');

  // Os mesmos servicos divulgados na pagina. Atualize aqui caso o portfolio mude.
  const services = {
    site: {
      name: 'Site profissional',
      label: '💻 Quero um site',
      description: 'A Monks cria sites profissionais para apresentar seu negócio com clareza e facilitar o contato com clientes.\n\nQual é a ideia para o seu site?'
    },
    sistema: {
      name: 'Sistema sob medida',
      label: '⚙️ Preciso de um sistema',
      description: 'Desenvolvemos sistemas conforme a rotina do negócio, como organização de clientes, serviços, orçamentos e documentos. As funções são definidas no planejamento.\n\nO que você gostaria de organizar ou automatizar?'
    },
    google: {
      name: 'Perfil da Empresa no Google',
      label: '📍 Presença no Google',
      description: 'Podemos ajudar a configurar o Perfil da Empresa no Google para melhorar a apresentação do negócio nas buscas locais.\n\nO que você precisa ajustar ou criar?'
    },
    suporte: {
      name: 'Suporte técnico',
      label: '🛠️ Suporte técnico',
      description: 'A Monks atende demandas de montagem, manutenção, configuração e suporte para computadores e notebooks.\n\nQual problema você está enfrentando?'
    }
  };

  const state = { started: false, service: null, awaitingBrief: false, brief: '' };

  function normalize(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function addMessage(text, type = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = 'mc-message' + (type === 'visitor' ? ' mc-message--visitor' : '');
    // textContent impede que mensagens digitadas sejam interpretadas como HTML.
    bubble.textContent = text;
    messagesElement.appendChild(bubble);
    conversationElement.scrollTop = conversationElement.scrollHeight;
  }

  function whatsappUrl() {
    const number = WHATSAPP_NUMBER; // Definido uma unica vez em script.js.
    let message = 'Olá! Vim pelo Assistente Virtual do site da Monks e gostaria de conversar sobre os serviços.';
    if (state.service) {
      message = 'Olá! Vim pelo Assistente Virtual do site da Monks. Tenho interesse em: ' + services[state.service].name + '.';
      if (state.brief) message += '\nMinha necessidade: ' + state.brief;
      else message += '\nGostaria de explicar melhor o que preciso.';
    }
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  function showActions(actions) {
    actionsElement.replaceChildren();
    actions.forEach(action => {
      const element = document.createElement(action.kind === 'whatsapp' || action.kind === 'external' ? 'a' : 'button');
      element.className = 'mc-option' + (action.primary ? ' mc-option--primary' : '');
      element.textContent = action.label;
      if (element.tagName === 'A') {
        element.href = action.kind === 'whatsapp' ? whatsappUrl() : action.url;
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
      } else {
        element.type = 'button';
        element.addEventListener('click', action.run);
      }
      actionsElement.appendChild(element);
    });
    conversationElement.scrollTop = conversationElement.scrollHeight;
  }

  function mainOptions() {
    return [
      ...Object.keys(services).map(id => ({label: services[id].label, run: () => chooseService(id)})),
      {label: '❔ Como funciona?', run: showProcess},
      {label: '💬 Falar no WhatsApp', kind: 'whatsapp'}
    ];
  }

  function showMainMenu(withMessage = false) {
    state.service = null;
    state.awaitingBrief = false;
    state.brief = '';
    input.placeholder = 'Escreva sua dúvida...';
    if (withMessage) addMessage('Sem problema! Qual assunto você quer explorar agora?');
    showActions(mainOptions());
  }

  function startConversation() {
    state.started = true;
    messagesElement.replaceChildren();
    addMessage('Olá! 👋 Eu sou o Assistente Virtual Monks.\n\nMeu atendimento é automático, com respostas programadas. Posso te mostrar os serviços e ajudar a preparar uma mensagem para a nossa equipe.');
    addMessage('Por onde você quer começar?');
    showMainMenu();
  }

  function chooseService(id, showVisitor = true) {
    if (showVisitor) addMessage(services[id].label, 'visitor');
    state.service = id;
    state.brief = '';
    state.awaitingBrief = true;
    input.placeholder = 'Conte em poucas palavras o que precisa...';
    addMessage(services[id].description);
    showActions([
      {label: '📲 Conversar direto no WhatsApp', kind: 'whatsapp', primary: true},
      {label: '↩ Ver outros serviços', run: () => showMainMenu(true)}
    ]);
    input.focus({preventScroll:true});
  }

  function confirmBrief(text) {
    state.brief = text;
    state.awaitingBrief = false;
    input.placeholder = 'Outra dúvida? Escreva aqui...';
    addMessage('Entendi! Preparei uma mensagem com essa necessidade para você enviar pelo WhatsApp.\n\nEla só será compartilhada quando você tocar no botão e confirmar o envio no WhatsApp.');
    showActions([
      {label: '📲 Enviar pelo WhatsApp', kind: 'whatsapp', primary: true},
      {label: '✏️ Alterar descrição', run: () => {
        state.brief = '';
        state.awaitingBrief = true;
        input.placeholder = 'Descreva sua necessidade...';
        addMessage('Tudo bem. Como você prefere descrever sua necessidade?');
        showActions([{label:'📲 Ir direto ao WhatsApp',kind:'whatsapp'}, {label:'↩ Outro serviço',run: () => showMainMenu(true)}]);
        input.focus({preventScroll:true});
      }},
      {label: '↩ Outro serviço', run: () => showMainMenu(true)}
    ]);
  }

  function showProcess() {
    addMessage('❔ Como funciona?', 'visitor');
    addMessage('O processo costuma ter três etapas:\n1. Conversamos para entender sua necessidade.\n2. Definimos o escopo e a proposta.\n3. Desenvolvemos, testamos e alinhamos a publicação.\n\nPrazos e valores dependem de cada projeto.');
    showActions([{label:'💻 Ver serviços',run: () => showMainMenu(true)}, {label:'💬 Conversar sobre um projeto',kind:'whatsapp',primary:true}]);
  }

  function showAnswer(answer, actions = null) {
    addMessage(answer);
    showActions(actions || [{label:'📌 Ver serviços',run: () => showMainMenu(true)}, {label:'💬 Falar no WhatsApp',kind:'whatsapp',primary:true}]);
  }

  function handleText(rawText) {
    const text = rawText.trim();
    if (!text) return;
    addMessage(text, 'visitor');
    const normalized = normalize(text);

    if (/^(menu|inicio|reiniciar|voltar|comecar de novo)$/.test(normalized)) {
      showMainMenu(true);
      return;
    }
    if (/(whats|falar com (alguem|pessoa|atendente|humano)|atendimento humano|contato)/.test(normalized)) {
      showAnswer('Claro! Nossa equipe atende diretamente pelo WhatsApp. Toque abaixo para abrir a conversa.');
      return;
    }
    if (/(preco|valor|quanto custa|orcamento|cobram|pagamento)/.test(normalized)) {
      showAnswer('O valor depende do escopo, da complexidade e das funcionalidades. A Monks faz um levantamento antes de apresentar uma proposta, sem preço inventado por aqui.');
      return;
    }
    if (/(prazo|quanto tempo|demora|entrega|urgente)/.test(normalized)) {
      showAnswer('O prazo é definido depois de entender o projeto e as funcionalidades necessárias. Podemos conversar sobre a sua necessidade para montar uma estimativa.');
      return;
    }
    if (/(manutencao depois|pos[- ]entrega|hospedagem|dominio|mensalidade|backup)/.test(normalized)) {
      showAnswer('Hospedagem, domínio, backups, manutenção e suporte podem ser tratados na proposta. O que está incluído depende do projeto e do acordo feito com o cliente.');
      return;
    }
    if (/(exemplo|projeto real|portfolio|sos solucoes|demonstracao)/.test(normalized)) {
      showAnswer('Temos um exemplo real: o projeto da SOS Soluções, com site publicado e solução de gestão. Você pode conhecer o site pelo botão abaixo.', [
        {label:'↗ Ver SOS Soluções',kind:'external',url:'https://sossolucoes.net.br/',primary:true},
        {label:'↩ Ver serviços',run: () => showMainMenu(true)}
      ]);
      return;
    }

    // Durante o levantamento, a resposta vira um resumo para o WhatsApp.
    if (state.awaitingBrief) {
      confirmBrief(text);
      return;
    }

    if (/(google|perfil da empresa|busca local|maps|mapa)/.test(normalized)) return chooseService('google', false);
    if (/(suporte|notebook|computador|formatacao|manutencao|pc|hardware)/.test(normalized)) return chooseService('suporte', false);
    if (/(sistema|software|automac|estoque|gestao|orcamentos|processos|banco de dados)/.test(normalized)) return chooseService('sistema', false);
    if (/(site|pagina|landing page|website|presenca digital)/.test(normalized)) return chooseService('site', false);
    if (/^(ola|oi|bom dia|boa tarde|boa noite|e ai|opa|tudo bem)[!.? ]*$/.test(normalized)) {
      showAnswer('Olá! Como posso ajudar? Selecione um serviço abaixo ou escreva sua dúvida.', mainOptions());
      return;
    }
    if (/(como funciona|quem (sao|e voces)|sobre a monks)/.test(normalized)) {
      addMessage('A Monks Tecnologia & Sistemas atua com sites, sistemas sob medida, Perfil da Empresa no Google e suporte técnico. Começamos entendendo o que sua empresa precisa.');
      showActions(mainOptions());
      return;
    }
    showAnswer('Ainda não tenho uma resposta programada para essa pergunta. Posso te orientar por um dos assuntos abaixo ou encaminhar para uma conversa no WhatsApp.');
  }

  function openPanel() {
    panel.hidden = false;
    widget.classList.add('mc-open');
    launcher.setAttribute('aria-expanded', 'true');
    if (!state.started) startConversation();
    input.focus({preventScroll:true});
  }

  function closePanel() {
    panel.hidden = true;
    widget.classList.remove('mc-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus({preventScroll:true});
  }

  launcher.addEventListener('click', openPanel);
  closeButton.addEventListener('click', closePanel);
  resetButton.addEventListener('click', () => {
    startConversation();
    input.value = '';
    input.focus({preventScroll:true});
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!input.value.trim()) return;
    const text = input.value;
    input.value = '';
    handleText(text);
    input.focus({preventScroll:true});
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      closePanel();
    }
  });
})();
