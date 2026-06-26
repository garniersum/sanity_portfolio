import { useState, useEffect, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const QUERY_EXPERIENCES = '*[_type == "experiences"] | order(year desc)';
const QUERY_SKILLS      = '*[_type == "skills"] | order(name desc)';

// -- Skill individual --
const SkillItem = memo(({ skill, reduce }) => (
  <motion.div
    whileInView={{ opacity: [0, 1] }}
    transition={{ duration: reduce ? 0 : 0.5 }}
    viewport={{ once: true }}
    className="app__skills-item app__flex"
  >
    <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
      <img
        src={urlFor(skill.icon).width(90).height(90).format('webp').url()}
        alt={skill.name}
        width={45}
        height={45}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
    <p className="p-text">{skill.name}</p>
  </motion.div>
));

SkillItem.displayName = 'SkillItem';

// -- Trabajo dentro de una experiencia --
const WorkItem = memo(({ work, reduce }) => (
  <motion.div
    whileInView={{ opacity: [0, 1] }}
    transition={{ duration: reduce ? 0 : 0.5 }}
    viewport={{ once: true }}
    className="app__skills-exp-work"
    data-tooltip-id={`tooltip-${work.name}`}
    data-tooltip-content={work.description}
    aria-describedby={`tooltip-${work.name}`}
    tabIndex={0}
    role="button"
    aria-label={`${work.name} en ${work.company} — ver descripción`}
  >
    <h4 className="bold-text">{work.name}</h4>
    <p className="p-text">{work.company}</p>

    <Tooltip
      id={`tooltip-${work.name}`}
      effect="solid"
      arrowColor="#fff"
      className="skills-tooltip"
    />
  </motion.div>
));

WorkItem.displayName = 'WorkItem';

// -- Skeleton loader --
const SkillsSkeleton = () => (
  <div className="app__skills-container" aria-busy="true" aria-label="Cargando skills">
    <div className="app__skills-list">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="app__skills-skeleton-item" />
      ))}
    </div>
  </div>
);

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      client.fetch(QUERY_EXPERIENCES),
      client.fetch(QUERY_SKILLS),
    ])
      .then(([expData, skillsData]) => {
        if (!cancelled) {
          setExperiences(expData);
          setSkills(skillsData);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('No se pudieron cargar los datos.');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  if (error) return <p className="p-text" role="alert">{error}</p>;

  return (
    <>
      <h2 className="head-text">Skills &amp; Experiences</h2>

      {loading && <SkillsSkeleton />}

      {!loading && (
        <div className="app__skills-container">

          {/* Lista de skills */}
          <motion.div
            className="app__skills-list"
            role="list"
            aria-label="Habilidades técnicas"
          >
            {skills.map((skill) => (
              <div role="listitem" key={skill.name}>
                <SkillItem skill={skill} reduce={reduce} />
              </div>
            ))}
          </motion.div>

          {/* Experiencias */}
          <section
            className="app__skills-exp"
            aria-label="Experiencia laboral"
          >
            {experiences.map((experience) => (
              <div className="app__skills-exp-item" key={experience.year}>
                <div className="app__skills-exp-year">
                  <time dateTime={String(experience.year)} className="bold-text">
                    {experience.year}
                  </time>
                </div>

                <div
                  className="app__skills-exp-works"
                  role="list"
                  aria-label={`Trabajos en ${experience.year}`}
                >
                  {experience.works.map((work) => (
                    <div role="listitem" key={work.name}>
                      <WorkItem work={work} reduce={reduce} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);