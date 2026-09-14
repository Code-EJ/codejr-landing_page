/** CODE contact channels — maintained by oEnzoRibas. */
export const contact = {
  email: 'enzo.ribas@juniorcode.com.br',
  whatsapp: '5531975424678',
};

export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Olá, CODE! Gostaria de conversar sobre um projeto.')}`;

export async function sendContactMessage(data: FormData, accessKey: string, signal: AbortSignal) {
  if (!accessKey.trim()) throw new Error('Envio por formulário ainda não configurado.');
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('idea') ?? '').trim();
  if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 10 || message.length > 3000) {
    throw new Error('Confira seu nome, e-mail e mensagem (mínimo de 10 caracteres).');
  }
  if (data.get('botcheck')) throw new Error('Não foi possível validar o formulário.');
  if (data.get('consent') !== 'on') throw new Error('Confirme a autorização de envio dos dados.');
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal,
    body: JSON.stringify({
      access_key: accessKey.trim(), name, email, message,
      service: String(data.get('service') ?? '').slice(0, 100),
      subject: 'Novo contato — Landing page CODE',
      from_name: 'Site CODE', botcheck: false,
    }),
  });
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok || typeof result !== 'object' || result === null || !('success' in result) || result.success !== true) {
    throw new Error('O serviço não confirmou o envio. Tente novamente ou fale conosco pelo WhatsApp.');
  }
}
