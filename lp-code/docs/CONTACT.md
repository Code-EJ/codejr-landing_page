# Contato — CODE / oEnzoRibas

## Canais provisórios

- E-mail: enzo.ribas@juniorcode.com.br
- WhatsApp: +55 31 97542-4678
- Configuração dos canais: `src/lib/contact.ts`.

## Ativar o envio sem backend próprio

1. Crie um formulário em https://web3forms.com/ usando o e-mail acima e conclua a verificação solicitada pelo serviço.
2. Gere a access key do formulário. O destinatário é definido pela chave, não pelo endereço mostrado no site: confirme que ela pertence ao e-mail correto.
3. Copie `.env.example` para `.env.local` e preencha `VITE_WEB3FORMS_ACCESS_KEY`.
4. Reinicie o Vite. Em produção, configure a mesma variável no provedor de hospedagem e execute um novo build.
5. Faça um envio de teste autorizado e confirme o recebimento na caixa de entrada/spam. A resposta positiva da API significa aceitação, não comprova entrega na caixa postal.

A chave de formulário foi projetada pelo fornecedor para uso no frontend e ficará visível no bundle. Não coloque senha do e-mail, credenciais SMTP ou chaves privadas em variáveis VITE_. `.env.local` já é ignorado pelo Git.

Sem chave, o botão de envio fica indisponível, com aviso de ativação pendente e canais diretos utilizáveis. Nenhuma mensagem de sucesso é simulada. WhatsApp abre uma conversa com saudação genérica: não copia os dados do formulário nem envia automaticamente. O link de e-mail abre o aplicativo do usuário; não substitui o envio pela API.

## Dados, limites e operação

Somente após autorização e envio explícito, nome, e-mail, serviço e mensagem são encaminhados ao Web3Forms para processamento. A implementação não grava esses dados em localStorage nem em logs. Timeout de 15 segundos não garante que o servidor não tenha aceitado a mensagem; por isso a interface informa ausência de confirmação e não faz retry automático.

Há honeypot e validação de campos; a validação no navegador não substitui as proteções do fornecedor. Considere habilitar hCaptcha se houver spam. Plano gratuito consultado: 250 envios/mês; revisar limites e política de retenção do fornecedor antes da publicação. Referências: https://web3forms.com/pricing e https://docs.web3forms.com/.

Um backend próprio não é necessário para este fluxo. Caso sejam necessários controles avançados de acesso, retenção, auditoria ou integrações internas, discutir arquitetura antes de adicioná-lo.

Testes automatizados usam fetch simulado: não enviam dados reais ao fornecedor.
