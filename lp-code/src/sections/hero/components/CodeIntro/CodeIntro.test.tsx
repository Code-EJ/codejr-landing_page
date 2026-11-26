import { StrictMode } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CodeIntro } from './CodeIntro';

describe('CodeIntro', () => {
  it('não cria uma região fixada quando movimento não está habilitado', () => {
    const { container } = render(<CodeIntro />);
    expect(container.querySelector('[data-animated]')).toBeNull();
    expect(container.querySelector('.pin-spacer')).toBeNull();
  });

  it('permite remontagem e cleanup em StrictMode', () => {
    const { container, unmount } = render(<StrictMode><CodeIntro /></StrictMode>);
    expect(container.textContent).toContain('CODE');
    expect(container.querySelector('a')).toHaveAttribute('href', '#main-content');
    unmount();
    expect(container).toBeEmptyDOMElement();
  });
});
