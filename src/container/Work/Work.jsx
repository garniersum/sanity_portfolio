import { useState, useEffect, useCallback, memo } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion, useReducedMotion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const QUERY = '*[_type == "works"]';
const FILTERS = ['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'];

const WorkHover = memo(({ projectLink, codeLink, reduce }) => (
  <motion.div
    whileHover={{ opacity: [0, 1] }}
    transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
    className="app__work-hover app__flex"
  >
    <a
      href={projectLink}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Ver proyecto en vivo"
      title="Ver proyecto en vivo"
    >
      <motion.div
        whileHover={reduce ? {} : { scale: [1, 0.9] }}
        transition={{ duration: 0.25 }}
        className="app__flex"
      >
        <AiFillEye aria-hidden="true" focusable="false" />
      </motion.div>
    </a>
    <a
      href={codeLink}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Ver código fuente en GitHub"
      title="Ver código fuente en GitHub"
    >
      <motion.div
        whileHover={reduce ? {} : { scale: [1, 0.9] }}
        transition={{ duration: 0.25 }}
        className="app__flex"
      >
        <AiFillGithub aria-hidden="true" focusable="false" />
      </motion.div>
    </a>
  </motion.div>
));

WorkHover.displayName = 'WorkHover';

const WorkCard = memo(({ work, reduce }) => (
  <article className="app__work-item app__flex">
    <div className="app__work-img app__flex">
      <img
        src={urlFor(work.imgUrl).width(470).height(350).format('webp').url()}
        alt={work.title}
        width={270}
        height={230}
        loading="lazy"
        decoding="async"
      />
      <WorkHover
        projectLink={work.projectLink}
        codeLink={work.codeLink}
        reduce={reduce}
      />
    </div>

    <div className="app__work-content app__flex">
      <h4 className="bold-text">{work.title}</h4>
      <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

      <div className="app__work-tag app__flex">
        <p className="p-text">{work.tags[0]}</p>
      </div>
    </div>
  </article>
));

WorkCard.displayName = 'WorkCard';

const Work = () => {
  const [works, setWorks]               = useState([]);
  const [filterWork, setFilterWork]     = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard]   = useState({ y: 0, opacity: 1 });
  const [error, setError]               = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    client.fetch(QUERY)
      .then((data) => {
        if (!cancelled) {
          setWorks(data);
          setFilterWork(data);
        }
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron cargar los proyectos.');
      });

    return () => { cancelled = true; };
  }, []);

  const handleWorkFilter = useCallback((item) => {
    setActiveFilter(item);
    setAnimateCard({ y: reduce ? 0 : 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      setFilterWork(item === 'All' ? works : works.filter((w) => w.tags.includes(item)));
    }, 500);
  }, [works, reduce]);

  if (error) return <p className="p-text" role="alert">{error}</p>;

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter" role="group" aria-label="Filtrar proyectos por categoría">
        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            aria-pressed={activeFilter === item}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: reduce ? 0 : 0.5 }}
        className="app__work-portfolio"
        role="list"
        aria-label="Proyectos"
      >
        {filterWork.map((work, index) => (
          <WorkCard
            key={work.title + index}
            work={work}
            reduce={reduce}
          />
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);