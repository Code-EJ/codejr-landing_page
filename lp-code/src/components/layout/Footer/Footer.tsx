import { cn } from "../../../lib/cn";
import styles from "./Footer.module.css";

const navigationLinks = [
  { label: "Sobre a CODE", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Projetos", href: "#projects" },
  { label: "Planejar um projeto", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/code.ejr/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/codeejr/",
  },
  {
    label: "GitHub",
    href: "https://github.com/Code-EJ",
  },
];

const address =
  "R. Álvares Maciel, 628 - Santa Efigênia, Belo Horizonte - MG, 30150-250";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  address,
)}`;

export function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("liquid-glass", styles.footer, className)}>
      <div className={styles.inner}>
        <div className={styles.brandColumn}>
          <a href="#home" className={styles.brand}>
            CODE<span>[]</span>
          </a>

          <p className={styles.tagline}>
            Ideias humanas.
            <br />
            Possibilidades digitais.
          </p>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.columnTitle}>Navegação</span>

          <nav
            className={styles.navigation}
            aria-label="Navegação do rodapé"
          >
            {navigationLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
                {link.href === "#contact" && (
                  <span aria-hidden="true"> ↗</span>
                )}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.columnTitle}>Conecte-se</span>

          <nav className={styles.socials} aria-label="Redes sociais">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} da CODE`}
              >
                {social.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.columnTitle}>Onde estamos</span>

          <address className={styles.address}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              R. Álvares Maciel, 628
              <br />
              Santa Efigênia
              <br />
              Belo Horizonte — MG
              <br />
              30150-250
              <span aria-hidden="true"> ↗</span>
            </a>
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.legal}>
          <span>
            © {currentYear} Code Soluções em Tecnologia Júnior.
          </span>

          <span>CNPJ 53.244.903/0001-84</span>

          <span>Todos os direitos reservados.</span>
        </div>

        <div className={styles.bottomActions}>
          <span className={styles.credit}>
            Developed by CODE
            <span aria-hidden="true"> · </span>
            <a
              href="https://github.com/oEnzoRibas"
              target="_blank"
              rel="noopener noreferrer"
            >
              oEnzoRibas
            </a>
          </span>

          <a href="#home" className={styles.backToTop}>
            Voltar ao início
            <span aria-hidden="true"> ↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}