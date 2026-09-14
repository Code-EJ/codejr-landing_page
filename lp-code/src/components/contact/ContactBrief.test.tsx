import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactBrief } from './ContactBrief';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });
function fill() {
  fireEvent.change(screen.getByLabelText('Como podemos chamar você?'), { target: { value: 'Pessoa de teste' } });
  fireEvent.change(screen.getByLabelText('Seu e-mail para resposta'), { target: { value: 'teste@example.com' } });
  fireEvent.change(screen.getByLabelText('Conte um pouco da sua ideia'), { target: { value: 'Gostaria de construir um site.' } });
  fireEvent.click(screen.getByRole('checkbox'));
}
describe('Contato CODE', () => {
  it('mostra canais provisórios sem simular envio quando falta a chave', () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
    render(<ContactBrief />);
    expect(screen.getByRole('button', { name: /Enviar mensagem/ })).toBeDisabled();
    expect(screen.getByText(/aguardando ativação/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', expect.stringContaining('https://wa.me/5531975424678?text='));
    expect(screen.getByRole('link', { name: 'enzo.ribas@juniorcode.com.br' })).toHaveAttribute('href', 'mailto:enzo.ribas@juniorcode.com.br');
  });
  it('envia os campos e só confirma depois da aceitação da API', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-key');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactBrief />); fill();
    fireEvent.submit(screen.getByRole('form'));
    await screen.findByText(/Mensagem aceita pelo serviço/);
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload).toMatchObject({ access_key: 'test-key', name: 'Pessoa de teste', email: 'teste@example.com', message: 'Gostaria de construir um site.', botcheck: false });
    expect(screen.getByLabelText('Como podemos chamar você?')).toHaveValue('');
  });
  it.each(['rejected', 'network'])('preserva a mensagem quando há falha: %s', async kind => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-key');
    vi.stubGlobal('fetch', kind === 'network' ? vi.fn().mockRejectedValue(new Error('Falha de conexão')) : vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) }));
    render(<ContactBrief />); fill(); fireEvent.submit(screen.getByRole('form'));
    await screen.findByRole('alert');
    expect(screen.getByLabelText('Conte um pouco da sua ideia')).toHaveValue('Gostaria de construir um site.');
    expect(screen.queryByText(/Mensagem aceita pelo serviço/)).not.toBeInTheDocument();
  });
  it('impede envios duplicados enquanto uma requisição está em andamento', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-key');
    let finish!: (value: unknown) => void;
    const fetchMock = vi.fn(() => new Promise(resolve => { finish = resolve; }));
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactBrief />); fill();
    fireEvent.submit(screen.getByRole('form')); fireEvent.submit(screen.getByRole('form'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /Enviando/ })).toBeDisabled();
    finish({ ok: true, json: async () => ({ success: true }) });
    await waitFor(() => expect(screen.getByRole('form')).toHaveAttribute('aria-busy', 'false'));
  });
  it('não chama a API sem autorização', () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-key');
    const fetchMock = vi.fn(); vi.stubGlobal('fetch', fetchMock);
    render(<ContactBrief />); fill(); fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.submit(screen.getByRole('form'));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
