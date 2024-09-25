import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IntlProvider, } from 'react-intl';
import { DEFAULT_LOCALE } from '../utils/constant';
import enJson from "../messages/en.json";
import idJson from "../messages/id.json";


export const LocaleContext = createContext<LocaleContextProps>({
    locale: DEFAULT_LOCALE,
    setLocale: () => Function()
});

export const LocaleProvider = ({ children }: PropsWithChildren) => {

    const [locale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);

    const setLocale = (locale: string) => {
        setCurrentLocale(locale);
    }

    const value: LocaleContextProps = {
        locale,
        setLocale
    };

    return (
        <LocaleContext.Provider value={value}>
            <IntlProvider
                key={locale}
                locale={locale}
                messages={locale === 'en' ? enJson : idJson}
                defaultLocale={DEFAULT_LOCALE}>
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    )
}

export const useLocaleContext = () => useContext(LocaleContext);