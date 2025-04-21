// Função para buscar as lojas do back-end e preencher o select
async function fetchLojas() {
  try {
    const response = await fetch('http://127.0.0.1:5000/lojas'); // Endpoint do backend
    if (!response.ok) {
      throw new Error('Erro ao buscar lojas');
    }
    const lojas = await response.json();

    // Preenche o select com as opções de lojas
    const lojaSelect = document.getElementById('Loja');
    lojas.forEach(loja => {
      const option = document.createElement('option');
      option.value = loja.codigo;
      option.textContent = `${loja.codigo} - ${loja.nome}`;
      lojaSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar lojas:', error);
  }
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

  // Resetando mensagens de erro
  firstNameInput.setCustomValidity('');
  lastNameInput.setCustomValidity('');

  if (!firstName || !lastName || !jobTitle || !loja || !email) {
    alert('Por favor, preencha todos os campos obrigatórios.');
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
document.addEventListener('DOMContentLoaded', fetchLojas);
