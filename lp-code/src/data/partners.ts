import canonical from '../assets/partners/canonical.svg';
import domHelder from '../assets/partners/dom-helder.png';
import redBull from '../assets/partners/red-bull.svg';
import ambev from '../assets/partners/ambev.svg';
import localiza from '../assets/partners/localiza.svg';
import sydle from '../assets/partners/sydle.svg';
import ubuntu from '../assets/partners/ubuntu.svg';
import type { Partner } from '../components/partners/PartnersMarquee';

// Layout references only — confirm relationships and brand permissions before publication.
export const partnerReferences: Partner[] = [
  { name: 'Ambev', logo: ambev, alt: 'Ambev', url: 'https://www.ambev.com.br/' },
  { name: 'Localiza', logo: localiza, alt: 'Localiza', url: 'https://www.localiza.com/' },
  { name: 'Red Bull', logo: redBull, alt: 'Red Bull', url: 'https://www.redbull.com/' },
  { name: 'Canonical', logo: canonical, alt: 'Canonical', url: 'https://canonical.com/' },
  { name: 'Centro Universitário Dom Helder', logo: domHelder, alt: 'Centro Universitário Dom Helder', url: 'https://domhelder.edu.br/' },
  { name: 'Sydle', logo: sydle, alt: 'Sydle', url: 'https://www.sydle.com/' },
  { name: 'Ubuntu', logo: ubuntu, alt: 'Ubuntu', url: 'https://ubuntu.com/' },
];
