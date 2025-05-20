const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Função para gerar o hash usando HMAC-SHA256
function gerarHash(nome, cpf) {
  const secret = `${nome}:${cpf}`; // Pode customizar essa chave
  const hash = crypto.createHmac('sha256', secret)
                     .update('identificacao_unica')
                     .digest('hex');
  return hash;
}

// Endpoint POST /identificacao
app.post('/identificacao', (req, res) => {
  const { nome, cpf } = req.body;

  if (!nome || !cpf) {
    return res.status(400).json({ erro: 'Nome e CPF são obrigatórios.' });
  }

  const hash = gerarHash(nome, cpf);
  return res.json({ hash });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});
