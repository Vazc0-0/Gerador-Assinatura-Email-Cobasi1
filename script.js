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
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const jobTitle = document.getElementById('job-title').value.trim();
  const lojaSelect = document.getElementById('Loja');
  const loja = lojaSelect.options[lojaSelect.selectedIndex].text; // Obtém o texto completo da loja
  const email = document.getElementById('email').value.trim();

  // Atualiza a pré-visualização
  document.getElementById('full-name').textContent = `${firstName} ${lastName}`;
  document.getElementById('job-title-preview').textContent = jobTitle;
  document.getElementById('store-preview').textContent = loja; // Exibe o texto completo da loja
  document.getElementById('email-preview').textContent = email;
});

// Função para baixar a assinatura como imagem
document.getElementById('download-signature').addEventListener('click', function () {
  const signatureBox = document.getElementById('signature-download-box');

  // Garante que o DOM esteja atualizado antes de capturar
  setTimeout(() => {
    html2canvas(signatureBox).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png"); // Converte o conteúdo para PNG
      link.download = 'assinatura.png'; // Nome do arquivo baixado
      link.click(); // Simula o clique para download
    });
  }, 100); // Pequeno atraso para garantir a renderização
});

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchLojas);
