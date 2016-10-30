/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import { CALL_API } from '../middleware/api';
import {
    GET_SEOINFO,
    GET_SEOINFO_SUCCESS,
    GET_SEOINFO_FAILURE,
} from '../ActionTypes';

export function getSeoInfo(url) {
    return {
        [CALL_API]: {
            types: [
                GET_SEOINFO,
                GET_SEOINFO_SUCCESS,
                GET_SEOINFO_FAILURE,
            ],
            url: `v1/seo${url}`,
        },
    };
}

export function setSeoInfo(url) {
    return (dispatch) =>
        dispatch(getSeoInfo(url))
            .then((data) => {
                if (typeof document !== 'undefined' && data.data) {
                    document.title = data.data.title;
                    let descriptionTag = document.querySelector('meta[name="description"]');
                    if (descriptionTag) {
                        descriptionTag.content = data.data.description;
                    } else {
                        descriptionTag = document.createElement('meta');
                        descriptionTag.name = 'description';
                        document.querySelector('head').appendChild(descriptionTag);
                    }
                    descriptionTag.content = data.data.description;
                    let keywordsTag = document.querySelector('meta[name="keywords"]');
                    if (keywordsTag) {
                        keywordsTag.content = data.data.keywords;
                    } else {
                        keywordsTag = document.createElement('meta');
                        keywordsTag.name = 'keywords';
                        document.querySelector('head').appendChild(descriptionTag);
                    }
                    keywordsTag.content = data.data.keywords.join(',');
                }
            });
}
