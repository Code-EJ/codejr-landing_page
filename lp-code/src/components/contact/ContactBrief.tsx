import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { Button } from '../ui/Button/Button';
import { contact, sendContactMessage, whatsappUrl } from '../../lib/contact';
import styles from '../../app/App.module.css';
import contactStyles from './ContactBrief.module.css';

export function ContactBrief() {
  const accessKey = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const [failed, setFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const request = useRef<AbortController | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successFeedback = useRef<HTMLDivElement | null>(null);

  useEffect(() => () => {
    request.current?.abort();
    request.current = null;
  }, []);

  useEffect(() => {
    const root = successFeedback.current;
    if (!submitted || !root || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const check = root.querySelector<SVGPathElement>('[data-success-check]');
    const ring = root.querySelector<HTMLElement>('[data-success-ring]');
    const icon = root.querySelector<HTMLElement>('[data-success-icon]');
    const particles = Array.from(root.querySelectorAll<HTMLElement>('[data-success-particle]'));
    const copy = Array.from(root.querySelectorAll<HTMLElement>('[data-success-copy]'));
    if (!check || !ring || !icon) return;

    const ctx = gsap.context(() => {
      gsap.set(check, { strokeDasharray: 48, strokeDashoffset: 48 });
      const particleCount = Math.max(particles.length, 1);
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .fromTo(root, { autoAlpha: 0, y: 18, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 })
        .fromTo(icon, { scale: 0.55, rotate: -16 }, { scale: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.28')
        .fromTo(ring, { scale: 0.7, opacity: 0.8 }, { scale: 1.5, opacity: 0, duration: 0.9, ease: 'power2.out' }, '<')
        .to(check, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, '-=0.58')
        .set(particles, { x: 0, y: 0, scale: 0, opacity: 0 }, '-=0.48')
        .to(particles, {
          x: (index) => Math.cos((index / particleCount) * Math.PI * 2) * 62,
          y: (index) => Math.sin((index / particleCount) * Math.PI * 2) * 62,
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.02,
        }, '<')
        .to(particles, { scale: 0, opacity: 0, duration: 0.28, stagger: 0.018 }, '-=0.18')
        .fromTo(copy, { y: 10, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          clearProps: 'transform,opacity',
        }, '-=0.32');
    }, root);

    return () => ctx.revert();
  }, [submitted]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.current || !event.currentTarget.reportValidity()) return;
    const form = event.currentTarget;
    const controller = new AbortController();
    request.current = controller;
    setSending(true);
    setFailed(false);
    setStatus('Enviando sua mensagem…');
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      await sendContactMessage(new FormData(form), accessKey, controller.signal);
      if (request.current !== controller) return;
      form.reset();
      setStatus('');
      setSubmitted(true);
    } catch (error) {
      if (request.current !== controller) return;
      setFailed(true);
      setStatus(controller.signal.aborted
        ? 'Não conseguimos confirmar o envio a tempo. Seus dados foram mantidos; você pode falar conosco pelo WhatsApp.'
        : error instanceof TypeError ? 'Não foi possível conectar ao serviço. Verifique sua conexão ou use o WhatsApp.'
        : error instanceof Error ? error.message : 'Não foi possível confirmar o envio. Tente novamente.');
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) {
        request.current = null;
        setSending(false);
      }
    }
  }

  function restart() {
    setSubmitted(false);
    setFailed(false);
    setStatus('');
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('#brief-name')?.focus());
  }

  return (
    <form
      ref={formRef}
      aria-label="Contato com a CODE"
      aria-busy={sending}
      className={`liquid-glass ${styles.contactForm} ${submitted ? contactStyles.contactFormSuccess : ''}`}
      onSubmit={send}
    >
      {submitted ? (
        <div ref={successFeedback} className={contactStyles.successFeedback}>
          <div className={contactStyles.successVisual} aria-hidden="true">
            <span data-success-ring className={contactStyles.successRing} />
            <span data-success-icon className={contactStyles.successIcon}>
              <svg viewBox="0 0 48 48" focusable="false">
                <path data-success-check d="M10 24l9 9 20-22" />
              </svg>
            </span>
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} data-success-particle className={contactStyles.successParticle} />
            ))}
          </div>
          <div className={contactStyles.successCopy} role="status" aria-live="polite">
            <p data-success-copy className={contactStyles.successEyebrow}>ENVIADO COM SUCESSO</p>
            <h3 data-success-copy>Mensagem enviada.</h3>
            <p data-success-copy>Seu briefing chegou à CODE. Agora nossa equipe pode analisar a ideia e responder pelo e-mail informado.</p>
          </div>
          <Button data-success-copy type="button" className={contactStyles.successButton} onClick={restart}>
            Enviar outra mensagem <span aria-hidden="true">↻</span>
          </Button>
        </div>
      ) : (
        <>
          <label htmlFor="brief-name">Como podemos chamar você?</label>
          <input id="brief-name" name="name" autoComplete="name" required maxLength={100} placeholder="Seu nome" disabled={sending} />
          <label htmlFor="brief-email">Seu e-mail para resposta</label>
          <input id="brief-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="voce@exemplo.com" disabled={sending} />
          <label htmlFor="brief-service">O que você quer construir?</label>
          <select id="brief-service" name="service" disabled={sending}>
            <option>Site ou landing page</option>
            <option>Aplicação web</option>
            <option>Experiência mobile</option>
            <option>Design de interface</option>
            <option>Dados e integrações</option>
            <option>Quero descobrir com vocês</option>
          </select>
          <label htmlFor="brief-idea">Conte um pouco da sua ideia</label>
          <textarea id="brief-idea" name="idea" required minLength={10} maxLength={3000} rows={3} placeholder="Qual problema você gostaria de resolver?" disabled={sending} />
          <div hidden aria-hidden="true">
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
          </div>
          <label className={contactStyles.consent}>
            <input type="checkbox" name="consent" required disabled={sending} />
            <span>Autorizo o envio destes dados à CODE pelo Web3Forms para responder ao meu contato.</span>
          </label>
          <Button type="submit" disabled={sending || !accessKey}>
            {sending ? 'Enviando…' : 'Enviar mensagem'} <span aria-hidden="true">↗</span>
          </Button>
          {!accessKey && <p className={styles.formNote}>O envio pelo formulário está aguardando ativação. Por enquanto, use o WhatsApp ou o e-mail abaixo.</p>}
          <p className={styles.formStatus} role={failed ? 'alert' : 'status'} aria-live="polite">{status}</p>
          <a className={`liquid-glass glass-action ${contactStyles.whatsapp}`} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <a className={contactStyles.email} href={`mailto:${contact.email}`}>{contact.email}</a>
          <p className={styles.formNote}>O WhatsApp abre uma conversa; a mensagem só será enviada quando você confirmar no aplicativo. Não inclua informações sensíveis no formulário.</p>
        </>
      )}
    </form>
  );
}
