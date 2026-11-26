import enzoPortrait from "../../assets/team/enzo-ribas.jpg";

interface TeamProfile {
  name: string;
  photo: string;
  links: { label: string; href: string }[];
}

export interface TeamAppointment {
  id: string;
  role: string;
  profile: TeamProfile;
}

interface TeamGroup {
  id: string;
  title: string;
  appointments: TeamAppointment[];
}

const enzo: TeamProfile = {
  name: "Enzo Ribas",
  photo: enzoPortrait,
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oenzoribas/" },
    { label: "GitHub", href: "https://github.com/oEnzoRibas" },
    { label: "Portfólio", href: "https://oenzoribas.com/" },
  ],
};

export const teamGroups: TeamGroup[] = [
  {
    id: "presidencia",
    title: "Presidência e Vice-presidência",
    appointments: [],
  },
  {
    id: "diretorias",
    title: "Diretorias",
    appointments: [{ id: "enzo-cito", role: "CITO", profile: enzo }],
  },
  {
    id: "coordenacoes",
    title: "Coordenações",
    appointments: [
      {
        id: "enzo-tech-lead",
        role: "Full Stack Engineer / Tech Lead",
        profile: enzo,
      },
    ],
  },
  {
    id: "membros",
    title: "Membros",
    appointments: [],
  },
];
