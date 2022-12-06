// Replace variable with url for internal page within specified brand
export function parseRefs(value: string, state: any){
    if (isString(value)) {
        if (useIncludes(value, '{global:brand_detail')) {
            const stringStart: string[] = useSplit(value, '{global:brand_detail:')
            const stringEnd: string[] = useSplit(stringStart[1], '}')
            const splitDetails: string[] = useSplit(stringEnd[0], ':')
            const contentType = splitDetails[0]
            const replacementValue = (state.value.details[contentType] !== undefined) ? state.value.details[contentType] : ''
            return stringStart[0] + replacementValue + stringEnd[1];
        }
    }
    return value
}

export function parseUrl(value: string, state: any) {
    if(isString(value)) {
        if (useIncludes(value, '{brand:link')) {
            const stringStart: string[] = useSplit(value, '{brand:link:')
            const stringEnd: string[] = useSplit(stringStart[1], '}')
            const splitDetails: string[] = useSplit(stringEnd[0], ':')
            const contentType = splitDetails[0]
            //console.log('parseUrl', contentType);
            //console.log('state', state.value);
            //const replacementValue = (state.value.[contentType] !== undefined) ? state.value.details[contentType] : ''
            //return stringStart[0] + replacementValue + stringEnd[1];
        }
    }
    //return value
}