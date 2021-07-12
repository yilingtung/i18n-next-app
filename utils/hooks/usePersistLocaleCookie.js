import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import cookie from '../cookie';

const usePersistLocaleCookie = () => {
	const { locale, defaultLocale, push, asPath } = useRouter();

	useEffect(() => {
		const cLocale = cookie.getItem('NEXT_LOCALE');
		if (!cLocale && locale) {
			cookie.setItem('NEXT_LOCALE', locale, 100);
		}
	}, [locale, defaultLocale]);

	const changeLocale = useCallback(
		(value) => {
			if (value !== locale) {
				cookie.setItem('NEXT_LOCALE', value, 100);
				push(asPath, asPath, { locale: value });
			}
		},
		[locale, asPath, push]
	);

	return changeLocale;
};

export default usePersistLocaleCookie;
