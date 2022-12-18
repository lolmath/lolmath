import React from 'react';
import clsx from 'clsx';
import styles from './home.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Pluggable',
    Svg: require('@site/static/img/undraw_logic.svg').default,
    description: (
      <>
        Use the League of Legends Math Libraries to build your own tools and
        applications.
      </>
    ),
  },
  {
    title: 'Minimal',
    Svg: require('@site/static/img/undraw_percentages.svg').default,
    description: (
      <>
        Keeping the core of the library small and focused on the core features
        of League of Legends.
      </>
    ),
  },
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_blooming.svg').default,
    description: (
      <>
        The League of Legends Math Libraries are easy to use and understand.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}