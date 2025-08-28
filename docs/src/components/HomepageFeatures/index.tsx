import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const EmptySvg = () => <></>;

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'feature.keepModulesClean',
      message: '📦 Keep modules clean',
    }),
    Svg: EmptySvg,
    description: (
      <Translate id="feature.keepModulesClean.desc">
        {'Run zero-bundle builds with native esbuild.'}
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'feature.useGlob',
      message: '⚡ Use glob patterns',
    }),
    Svg: EmptySvg,
    description: (
      <Translate
        id="feature.useGlob.desc"
        values={{
          pattern: <code>src/**/*.ts</code>,
        }}
      >
        {'{pattern} works out of the box.'}
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'feature.syncInstantly',
      message: '🔄 Sync instantly',
    }),
    Svg: EmptySvg,
    description: (
      <Translate
        id="feature.syncInstantly.desc"
        values={{
          src: <code><Translate id="feature.syncInstantly.src" /></code>,
          dist: <code><Translate id="feature.syncInstantly.dist" /></code>,
        }}
      >
        {'Mirror {src} to {dist} and remove orphan files.'}
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'feature.cleanFast',
      message: '🧹 Clean fast',
    }),

    Svg: EmptySvg,
    description: (
      <Translate
        id="feature.cleanFast.desc"
        values={{
          dist: <code><Translate id="feature.cleanFast.dist" /></code>,
        }}
      >
        {'Wipe your {dist} in one command.'}
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'feature.configureEasily',
      message: '🔧 Configure easily',
    }),
    Svg: EmptySvg,
    description: (
      <Translate
        id="feature.configureEasily.desc"
        values={{
          config: <code>mostir.config.mjs</code>,
        }}
      >
        {'Manage builds with {config}.'}
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'feature.stayFlexible',
      message: '🛠 Stay flexible',
    }),
    Svg: EmptySvg,
    description: (
      <Translate id="feature.stayFlexible.desc">
        {'Forward any esbuild option, no lock-in.'}
      </Translate>
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
        <Heading as="h3">{title}</Heading> 
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
