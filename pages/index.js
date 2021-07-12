import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import usePersistLocaleCookie from '../utils/hooks/usePersistLocaleCookie';

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Homepage = () => {

  const router = useRouter()
  const { t } = useTranslation('common')
  const changeLocale = usePersistLocaleCookie();

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
			<div
				role="button"
				tabIndex={0}
				onKeyPress={() => {}}
				onClick={()=>{
					changeLocale(router.locale === 'en' ? 'de' : 'en')
				}}
			>
				 <button>
					{t('change-locale')}
				</button>
			</div>
          {/* <Link
            href='/'
            locale={router.locale === 'en' ? 'de' : 'en'}
			onClick={()=>{
				changeLocale(router.locale === 'en' ? 'de' : 'en')
			}}
          >
            <button>
              {t('change-locale')}
            </button>
          </Link> */}
          <Link href={`/${router.locale}/second-page`} locale={false}>
            <button
              type='button'
            >
              {t('to-second-page')}
            </button>
          </Link>
		  <Link href={`/${router.locale}/server-side`} locale={false}>
            <button
              type='button'
            >
              {t('to-server-side') }
            </button>
          </Link>
		  <Link href={`/${router.locale}/server-side-trans`} locale={false}>
            <button
              type='button'
            >
              {t('to-server-side-trans')}
            </button>
          </Link>
		  <Link href={`/${router.locale}/server-side-apollo`} locale={false}>
            <button
              type='button'
            >
              {t('to-server-side-apollo')}
            </button>
          </Link>
		  <Link href={`/${router.locale}/static`} locale={false}>
            <button
              type='button'
            >
              static apollo
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})

export default Homepage
