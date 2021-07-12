export const withServerSidePropsHelper = (getServerSidePropsFunc) => {
	return async (context) => {
		const { req, locale: nextLocale, resolvedUrl } = context;

		const cookieLocale = req.cookies && req.cookies.NEXT_LOCALE;
		const lastLocale = cookieLocale || nextLocale;
		
		if (cookieLocale && (cookieLocale !== nextLocale || !nextLocale)) {
			return {
				redirect: {
					destination: `/${lastLocale}${resolvedUrl}`,
					permanent: false,
				},
			};
		}

		if (getServerSidePropsFunc) {
			const { pageProps } = await getServerSidePropsFunc(context);

			return pageProps;
		}

		return { props: {} };
	};
};

export default withServerSidePropsHelper;
