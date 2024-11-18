const serialize = (obj: any, prefix: string | null = null): string => {
    const str = []
    let p
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? prefix + "[" + p + "]" : p
        const v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
}

export const setParams = (params: any) => {
    const paramsImage = {...params}
    const filters: string[] = []
    if(typeof paramsImage.filters == 'object') {
        Object.keys(paramsImage.filters).forEach(function (key) {
            if(key && paramsImage.filters[key]) filters.push(key + '-' + paramsImage.filters[key])
        });
        paramsImage.filters = filters.join(',')
    }
    const stringParams = serialize(paramsImage)

    window.history.pushState({},"", window.location.href.split("?")[0] + '?' + stringParams);
}

export const getParams = () => {
    let linkText = window.location.href.split("?")[1]
    if (linkText && linkText != '') {
        let searchParams: any = new URLSearchParams(linkText).entries();
        let result:any = {}
        for(let entry of searchParams) {
            if(entry[0] == 'filters') {
                const items: string[] = entry[1].split(',')
                if(items.length && items[0] != '') {
                    const filters: any = {}
                    items.forEach((el: string) => {
                        const item = el.split('-')
                        filters[item[0]] = item[1]
                    })
                    result['filters'] = filters
                }
            } else {
                result[entry[0]] = entry[1];
            }
        }
        if (!result.filters) result.filters = {}

        return result;
    } else {
        return false;
    }
}