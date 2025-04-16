// Função para buscar as lojas do back-end e preencher o select
function loadLojas() {
  const selectLoja = document.getElementById('Loja');

  // Faz a requisição para a API
  fetch('http://127.0.0.1:5000/lojas') // URL do Flask
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar as lojas: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Limpa o select antes de adicionar os novos dados
      selectLoja.innerHTML = '<option value="">Selecione a loja</option>';

      // Adiciona as opções ao select
      data.forEach(loja => {
        const option = document.createElement('option');
        option.value = loja.codigo; // Código da loja
        option.textContent = `${loja.codigo} - ${loja.nome}`; // Código e nome da loja
        selectLoja.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as lojas:', error);
      alert('Erro ao carregar as lojas. Verifique o console para mais detalhes.');
    });
}

// Função para gerar a assinatura
document.getElementById('generate-signature').addEventListener('click', function () {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const jobTitle = document.getElementById('job-title').value.trim();
  const loja = document.getElementById('Loja').value.trim();
  const email = document.getElementById('email').value.trim();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  // Função para verificar se a primeira letra de cada palavra é maiúscula
  function areAllWordsCapitalized(name) {
    return name.split(' ').every(word => /^[A-Z]/.test(word));
  }

  // Resetando mensagens de erro
  firstNameInput.setCustomValidity('');
  lastNameInput.setCustomValidity('');

  if (!firstName || !lastName || !jobTitle || !loja || !email) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  if (!/^[A-Z]/.test(firstName)) {
    firstNameInput.setCustomValidity('A primeira letra do nome deve ser maiúscula.');
    firstNameInput.reportValidity();
    return;
  }

  if (!areAllWordsCapitalized(lastName)) {
    lastNameInput.setCustomValidity('Todas as palavras do sobrenome devem começar com letra maiúscula.');
    lastNameInput.reportValidity();
    return;
  }

  // Atualiza a pré-visualização
  const signatureText = document.querySelector('.signature-text');
  signatureText.innerHTML = `
    <p><strong>${firstName} ${lastName}</strong><br>${jobTitle}</p>
    <p>${loja}</p>
    <p>${email}</p>
  `;
});

// Função para baixar a assinatura como imagem
document.getElementById('download-signature').addEventListener('click', function () {
  const signatureBox = document.getElementById('signature-download-box');

  // Usa html2canvas para capturar o conteúdo como imagem
  html2canvas(signatureBox).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png"); // Converte o conteúdo para PNG
    link.download = 'assinatura.png'; // Nome do arquivo baixado
    link.click(); // Simula o clique para download
  });
});

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', loadLojas);
