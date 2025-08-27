import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const EmptySvg = () => <></>;

const FeatureList: FeatureItem[] = [
  {
    title: '📦 Keep modules clean',
    Svg: EmptySvg,
    description: <>Run zero-bundle builds with native esbuild.</>,
  },
  {
    title: '⚡ Use glob patterns',
    Svg: EmptySvg,
    description: <><code>src/**/*.ts</code> works out of the box.</>,
  },
  {
    title: '🔄 Sync instantly',
    Svg: EmptySvg,
    description: <>Mirror <code>indir</code> to <code>outdir</code> and remove orphan files.</>,
  },
  {
    title: '🧹 Clean fast',
    Svg: EmptySvg,
    description: <>Wipe your dist directory in one command.</>,
  },
  {
    title: '🔧 Configure easily',
    Svg: EmptySvg,
    description: <>Manage builds with <code>mostir.config.mjs</code>.</>,
  },
  {
    title: '🛠 Stay flexible',
    Svg: EmptySvg,
    description: <>Forward any esbuild option, no lock-in.</>,
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
