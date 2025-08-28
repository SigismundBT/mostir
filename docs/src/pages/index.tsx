import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
        <Translate id="homepage.tagline">
          Simplify and standardize esbuild builds with a flexible scaffold tool.
        </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            <Translate id="homepage.gettingStarted">Getting Started</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
        <Layout
          title={`${siteConfig.title} — ${translate({
            id: 'homepage.headline',
            message: 'Flexible esbuild scaffold tool',
          })}`}
          description={translate({
            id: 'homepage.description',
            message: 'Simplify and standardize esbuild builds with a customizable scaffold tool.',
          })}
        >
        <div
          style={{
            backgroundColor: "var(--ifm-background-color)",
            padding: "0.8rem",
            textAlign: "center",
          }}
        >
          <a
            href="https://www.npmjs.com/package/mostir"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/npm/v/mostir"
              alt="npm version"
              style={{ margin: "0 6px" }}
            />
          </a>
          <img
            src="https://img.shields.io/npm/l/mostir"
            alt="License"
            style={{ margin: "0 6px" }}
          />
          <img
            src="https://img.shields.io/node/v/mostir"
            alt="Node.js Version"
            style={{ margin: "0 6px" }}
          />
          <img
            src="https://img.shields.io/badge/language-TypeScript-blue"
            alt="TypeScript"
            style={{ margin: "0 6px" }}
          />
        </div>

      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
