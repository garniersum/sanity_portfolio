/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { memo } from 'react';
import './NavigationDots.scss';
const NAV_ITEMS = ['home', 'about', 'work', 'skills', 'testimonial', 'contact'];

const NavigationDots = memo(({ active }) => (
  <div className="app__navigation">
    {NAV_ITEMS.map((item) => (
      <a
        href={`#${item}`}
        key={item}
        aria-label={`Navigate to ${item}`}
        className={`app__navigation-dot${active === item ? ' app__navigation-dot--active' : ''}`}
      />
    ))}
  </div>
));

NavigationDots.displayName = 'NavigationDots';

export default NavigationDots;
