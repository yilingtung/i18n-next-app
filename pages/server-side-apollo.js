import Head from "next/head";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import client from "../apollo-client";
import { initializeApollo } from '../client';
import withServerSidePropsHelper from '../utils/withServerSidePropsHelper';

export default function Home({ countries }) {
	const { locale } = useRouter();
  const { t } = useTranslation('second-page')

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href={`/${locale}/`} locale={false}>
          <button
            type='button'
          >
            {t('back-to-home')}
          </button>
        </Link>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {countries.map((country) => (
            <div key={country.code} className={styles.card}>
              <h3>{country.name}</h3>
              <p>
                {country.code} - {country.emoji}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps = withServerSidePropsHelper(
	async (context) => {
		const client = initializeApollo(null, context);
		const { data } = await client.query({
			query: gql`
			query Countries {
				countries {
				code
				name
				emoji
				}
			}
			`,
		});

		if (context.locale) {
			const resourse = await serverSideTranslations(context.locale, [
				'header',
				'footer',
			]);
			return {
				client,
				pageProps: {
					props: { ...resourse, countries: data.countries.slice(0, 4) },
				},
			};
		}

		return {
			client,
			pageProps: {
				props: { countries: data.countries.slice(0, 4) },
			},
		};
	}
);
