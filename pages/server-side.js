import Link from 'next/link'
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const ServerSide = () => {
const { locale } = useRouter();

  const { t } = useTranslation('server-side')

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <Link href={`/${locale}/`} locale={false}>
          <button
            type='button'
          >
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
		...await serverSideTranslations(locale, ['server-side', 'footer']),
	},
  }
}

export default ServerSide
