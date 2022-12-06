import { CurrencyMap } from '~/enums/currency'

// Get product price at term requested
// INPUT: {price:product:term} {price:productName:}
// OUTPUT: $25
export function getPrice(parseRef: string, currency: string){
    if (isString(parseRef)) {
        if (useIncludes(parseRef, '{price')) {
            const stringStart: string[] = useSplit(parseRef, '{price:')
            const stringEnd: string[] = useSplit(stringStart[1], '}')
            const splitDetails: string[] = useSplit(stringEnd[0], ':')
            const product = splitDetails[0]
            const term = splitDetails[2]
            return stringStart[0] + getPriceData(product, currency, term) + stringEnd[1]
        }
    }
	return parseRef
}

// Get the product price from API
// INPUT: getPriceData('web-hosting', 'USD', 'monthly')
// OUTPUT: £25
function getPriceData(product: string, currency: string, term: string){
    if(currency == 'USD'){
        return '$25'
    }else{
        return '£25'
    }
}

// Selects the currency based on queryParam, cookie or browser language.
// Order of selection queryParam, cookie then browser language as fallback.
// INPUT: getCurrency('EUR', '')
// OUTPUT: EUR 
export function getCurrency(queryValue: string, selectedCookieCurrency: string){
    let currencyCookie: string = useCookie('upm-currency').value
    let currency: string = ''
    if(process.client){
        currency = CurrencyMap[window.navigator.language]
        if(isUndefined(currency)){
            currency = 'USD'
        }
    }
    if (queryValue){
        currency = queryValue
    }else if(currencyCookie || selectedCookieCurrency != ''){
        currency = selectedCookieCurrency != '' ? selectedCookieCurrency : currencyCookie
    }
    return currency
}

// Sets the currency cookie
// INPUT: setCurrencyCookie('EUR')
// OUTPUT: N/A
export function setCurrencyCookie(selectedCurrency: string){
    let currencyCookie = useCookie('upm-currency')
    currencyCookie.value = selectedCurrency
}

// Initialises the currency variable
// INPUT: initCurrency('EUR')
// OUTPUT: 'EUR'
export function initCurrency(queryCurrency: string){
    let currency = ref('')
    currency.value = getCurrency(queryCurrency, '')
    return currency
}