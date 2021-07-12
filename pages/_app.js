import { appWithTranslation } from 'next-i18next'
import usePersistLocaleCookie from '../utils/hooks/usePersistLocaleCookie';

const MyApp = ({ Component, pageProps }) => {
	usePersistLocaleCookie();
	return <Component {...pageProps} />
};

export default appWithTranslation(MyApp)
