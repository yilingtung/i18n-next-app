import { appWithTranslation } from 'next-i18next'
import { ApolloProvider } from "@apollo/client";

import client from "../apollo-client";
import usePersistLocaleCookie from '../utils/hooks/usePersistLocaleCookie';

const MyApp = ({ Component, pageProps }) => {
	usePersistLocaleCookie();

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
};

export default appWithTranslation(MyApp)
