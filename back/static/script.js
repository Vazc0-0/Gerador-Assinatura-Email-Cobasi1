// Função para buscar lojas do backend e preencher o select
async function fetchLojas() {
  try {
    // URL relativa: vai funcionar em localhost e em produção
    const response = await fetch('/lojas');
    if (!response.ok) {
      throw new Error('Erro ao buscar lojas');
    }
    const lojas = await response.json();

    // Preenche o select com as opções de lojas
    const lojaSelect = document.getElementById('Loja');
    lojas.forEach(loja => {
      const option = document.createElement('option');
      option.value = loja.codigo;                     // Define o código como valor
      option.textContent = `${loja.codigo} - ${loja.nome}`;  // Exibe código e nome
      lojaSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar lojas:', error);
  }
}

// Quando o DOM estiver pronto, carrega as lojas e configura eventos
document.addEventListener('DOMContentLoaded', () => {
  fetchLojas();

  // Função para gerar a assinatura
  document.getElementById('generate-signature').addEventListener('click', function () {
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const jobTitle = document.getElementById('job-title').value.trim();
    const lojaSelect = document.getElementById('Loja');
    const loja = lojaSelect.options[lojaSelect.selectedIndex].text; // Obtém o texto completo da loja
    const email = document.getElementById('email').value.trim();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    // Função para verificar se todas as palavras começam com letra maiúscula
    function isCapitalized(name) {
      return name.split(' ').every(word => word[0] === word[0].toUpperCase());
    }

    // Validação de nome e sobrenome
    if (!isCapitalized(firstName)) {
      alert('Por favor, insira o primeiro nome com a primeira letra de cada palavra em maiúsculo.');
      firstNameInput.focus();
      return;
    }

    if (!isCapitalized(lastName)) {
      alert('Por favor, insira o sobrenome com a primeira letra de cada palavra em maiúsculo.');
      lastNameInput.focus();
      return;
    }

    if (!firstName || !lastName || !jobTitle || !loja || !email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Atualiza a pré-visualização
    document.getElementById('full-name').textContent = `${firstName} ${lastName}`;
    document.getElementById('job-title-preview').textContent = jobTitle;
    document.getElementById('store-preview').textContent = loja; // Exibe o texto completo da loja
    document.getElementById('email-preview').textContent = email;
  });

  // Função para baixar a assinatura como imagem
  document.getElementById('download-signature').addEventListener('click', () => {
    const signatureBox = document.getElementById('signature-download-box');

    // Pequeno atraso para garantir que tudo tenha sido renderizado
    setTimeout(() => {
      html2canvas(signatureBox).then(canvas => {
        const link = document.createElement('a');
        link.href    = canvas.toDataURL("image/png");
        link.download= 'assinatura.png';
        link.click();
      });
    }, 100);
  });
});
