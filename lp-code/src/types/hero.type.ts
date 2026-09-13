/**
 * hero.types.ts
 * Definições de tipos e interfaces para a Hero Section Animada.
 */

/**
 * Direções possíveis para a animação de entrada do logotipo/texto.
 */
export type HeroAnimationDirection = 'left' | 'right' | 'top' | 'bottom';

/**
 * Props para o componente <HeroRoot />
 * O container principal que orquestra toda a sequência.
 */
export interface HeroRootProps {
  /** Callback disparado automaticamente assim que toda a sequência de animação terminar */
  onAnimationComplete: () => void;
  /** Classe opcional para customização de estilos extras via Tailwind */
  className?: string;
}

/**
 * Props para o componente <HeroLogo />
 * Responsável por exibir e animar o logo ou texto da marca.
 */
export interface HeroLogoProps {
  /** Direção por onde o logo vai entrar deslizando na tela */
  direction?: HeroAnimationDirection;
  /** Duração da animação de entrada em segundos. Ex: 1.2 */
  duration?: number;
  /** Delay inicial em segundos antes de começar a mover o logo */
  delay?: number;
  /** URL ou caminho da imagem de fundo */
  src: string;
  /** Imagem usada para "vazar" o texto, revelando o fundo através das letras */
  cutoutSrc: string;
  /** Texto alternativo para acessibilidade (essencial para leitores de tela) */
  alt: string;
}

/**
 * Props para o componente <HeroImage />
 * Responsável pelo plano de fundo inicial da aplicação.
 */
export interface HeroImageProps {
  /** URL ou caminho da imagem de fundo */
  src: string;
  /** Texto alternativo para acessibilidade (essencial para leitores de tela) */
  alt: string;
  /** Se verdadeiro, aplica um leve efeito de zoom (Scale) contínuo no fundo */
  pulseEffect?: boolean;
}