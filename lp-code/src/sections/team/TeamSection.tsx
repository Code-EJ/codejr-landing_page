import { useRef } from "react";
import layout from "../../app/App.module.css";
import { useGlassMotion } from "../../hooks/useGlassMotion";
import styles from "./TeamSection.module.css";
import { teamGroups, type TeamAppointment } from "./team.data";

function MemberCard({ appointment }: { appointment: TeamAppointment }) {
  const card = useRef<HTMLElement>(null);
  const motion = useGlassMotion(card);
  const { profile, role } = appointment;

  return (
    <li data-reveal>
      <article ref={card} className={`liquid-glass ${styles.card}`} {...motion}>
        <img
          className={styles.portrait}
          src={profile.photo}
          width={256}
          height={256}
          loading="lazy"
          decoding="async"
          alt={`Foto de ${profile.name}`}
        />
        <div className={styles.info}>
          <h4>{profile.name}</h4>
          <p>{role}</p>
          <ul className={styles.links} aria-label={`Perfis de ${profile.name}`}>
            {profile.links.map(({ label, href }) => (
              <li key={href}>
                <a
                  className="liquid-glass glass-action"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} de ${profile.name} (nova aba)`}
                >
                  {label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}

export function TeamSection() {
  return (
    <section id="team" className={layout.section} aria-labelledby="team-title">
      <div className={layout.sectionHead} data-reveal>
        <h2 id="team-title">Conheça os membros <span>da CODE.</span></h2>
      </div>
      <div className={styles.groups}>
        {teamGroups.map(({ id, title, appointments }) => (
          <section key={id} className={styles.group} aria-labelledby={`team-${id}`}>
            <h3 id={`team-${id}`} className={styles.groupTitle} data-reveal>
              {title}
            </h3>
            {appointments.length ? (
              <ul className={styles.members}>
                {appointments.map((appointment) => (
                  <MemberCard key={appointment.id} appointment={appointment} />
                ))}
              </ul>
            ) : (
              <p className={styles.pending} data-reveal>Perfis em preparação.</p>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
