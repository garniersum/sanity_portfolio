import { useState, useEffect, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './About.scss';

const QUERY = '*[_type == "about"]';

const AboutSkeleton = () => (
  <div className="app__profiles" aria-busy="true" aria-label="Cargando perfiles">
    {[1, 2, 3].map((n) => (
      <div key={n} className="app__profile-item app__profile-skeleton" />
    ))}
  </div>
);

const AboutCard = memo(({ about, reduce }) => (
  <article className="app__profile-item">
    <img
      src={urlFor(about.imageurl).width(370).height(320).format('webp').url()}
      alt={about.title ? `Ilustración de ${about.title}` : ''}
      width={190}
      height={170}
      loading="lazy"
      decoding="async"
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
    <h3 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h3>
    <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
  </article>
));

AboutCard.displayName = 'AboutCard';

const About = () => {
  const [abouts, setAbouts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    client.fetch(QUERY)
      .then((data) => {
        if (!cancelled) {
          setAbouts(data);
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

  return (
    <>
      <h2 className="head-text">
        I Know that <span>Good Design</span>
        <br />means <span>Good Business</span>
      </h2>

      {error && (
        <p className="p-text" role="alert">{error}</p>
      )}

      {loading && !error && <AboutSkeleton />}

      {!loading && !error && (
        <div
          className="app__profiles"
          role="list"
          aria-label="Áreas de especialización"
        >
          {abouts.map((about, index) => (
            <motion.div
              key={about.title + index}
              role="listitem"
              whileInView={{ opacity: 1 }}
              whileHover={reduce ? {} : { scale: 1.1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, type: 'tween' }}
              viewport={{ once: true }}
            >
              <AboutCard about={about} reduce={reduce} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);