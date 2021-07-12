import { useMemo } from 'react';
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
// import { parseCookies } from 'nookies';
// import localeSchema from './localeSchema/user';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const createErrorLink = (context) => {
	return onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			console.warn(graphQLErrors);

			context?.res.writeHead(301, {
				Location: '/something-went-wrong',
			});
			context?.res.end();
		}
		if (networkError) {
			console.warn(`[Network error]: ${networkError}`);

			context?.res.writeHead(301, {
				Location: '/network-error',
			});
			context?.res.end();
		}
	});
};

// const authMiddleware = (context) =>
// 	new ApolloLink((operation, forward) => {
// 		// add the authorization to the headers
// 		const { token = '' } = parseCookies(context);

// 		if (token) {
// 			operation.setContext({
// 				headers: {
// 					authorization: `Bearer ${token}`,
// 				},
// 			});
// 		}

// 		return forward(operation);
// 	});

const httpLink = new HttpLink({
	// uri: `${process.env.APP_URL}/api/graphql`,
	// credentials: 'same-origin',

	uri: "https://countries.trevorblades.com",
});

const createApolloClient = (context) => {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: from([createErrorLink(context), httpLink]),
		cache: new InMemoryCache(),
	});
};

export const initializeApollo = (
	initialState = null,
	context
) => {
	const _apolloClient = apolloClient ?? createApolloClient(context);

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = merge(initialState, existingCache, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
			],
		});

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
};

export const addApolloState = (
	client,
	pageProps
) => {
	const newPageProps = pageProps;
	if (newPageProps?.props) {
		newPageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return newPageProps;
};

export const useApollo = (pageProps) => {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo(state), [state]);
	return store;
};
