import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button } from '../ui/Button/Button';
import { contact, sendContactMessage, whatsappUrl } from '../../lib/contact';
import styles from '../../app/App.module.css';
import contactStyles from './ContactBrief.module.css';

export function ContactBrief() {
  const accessKey = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const [failed, setFailed] = useState(false);
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => { request.current?.abort(); request.current = null; }, []);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.current || !event.currentTarget.reportValidity()) return;
    const form = event.currentTarget;
    const controller = new AbortController();
    request.current = controller;
    setSending(true); setFailed(false); setStatus('Enviando sua mensagem…');
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      await sendContactMessage(new FormData(form), accessKey, controller.signal);
      if (request.current !== controller) return;
      setStatus('Mensagem aceita pelo serviço de envio. A CODE responderá pelo e-mail informado.');
      form.reset();
    } catch (error) {
      if (request.current !== controller) return;
      setFailed(true);
      setStatus(controller.signal.aborted
        ? 'Não conseguimos confirmar o envio a tempo. Seus dados foram mantidos; você pode falar conosco pelo WhatsApp.'
        : error instanceof TypeError ? 'Não foi possível conectar ao serviço. Verifique sua conexão ou use o WhatsApp.'
        : error instanceof Error ? error.message : 'Não foi possível confirmar o envio. Tente novamente.');
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) { request.current = null; setSending(false); }
    }
  }

  return <form aria-label="Contato com a CODE" aria-busy={sending} className={`liquid-glass ${styles.contactForm}`} onSubmit={send}>
    <label htmlFor="brief-name">Como podemos chamar você?</label>
    <input id="brief-name" name="name" autoComplete="name" required maxLength={100} placeholder="Seu nome" disabled={sending} />
    <label htmlFor="brief-email">Seu e-mail para resposta</label>
    <input id="brief-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="voce@exemplo.com" disabled={sending} />
    <label htmlFor="brief-service">O que você quer construir?</label>
    <select id="brief-service" name="service" disabled={sending}><option>Site ou landing page</option><option>Aplicação web</option><option>Experiência mobile</option><option>Design de interface</option><option>Dados e integrações</option><option>Quero descobrir com vocês</option></select>
    <label htmlFor="brief-idea">Conte um pouco da sua ideia</label>
    <textarea id="brief-idea" name="idea" required minLength={10} maxLength={3000} rows={3} placeholder="Qual problema você gostaria de resolver?" disabled={sending} />
    <div hidden aria-hidden="true"><input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" /></div>
    <label className={contactStyles.consent}><input type="checkbox" name="consent" required disabled={sending} /><span>Autorizo o envio destes dados à CODE pelo Web3Forms para responder ao meu contato.</span></label>
    <Button type="submit" disabled={sending || !accessKey}>{sending ? 'Enviando…' : 'Enviar mensagem'} <span aria-hidden="true">↗</span></Button>
    {!accessKey && <p className={styles.formNote}>O envio pelo formulário está aguardando ativação. Por enquanto, use o WhatsApp ou o e-mail abaixo.</p>}
    <p className={styles.formStatus} role={failed ? 'alert' : 'status'}>{status}</p>
    <a className={`liquid-glass glass-action ${contactStyles.whatsapp}`} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp <span aria-hidden="true">↗</span></a>
    <a className={contactStyles.email} href={`mailto:${contact.email}`}>{contact.email}</a>
    <p className={styles.formNote}>O WhatsApp abre uma conversa; a mensagem só será enviada quando você confirmar no aplicativo. Não inclua informações sensíveis no formulário.</p>
  </form>;
}
