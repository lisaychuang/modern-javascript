import { default as _fetch } from 'node-fetch';

// mutable value
const data = {}

// Do not change this function signature or the tests will break
export default function fetchPlus(url, options, fetch = _fetch ) {
    let key = url;
    if (!data[key]) {
        data[key] = fetch(key).then(response => response.json());
    }
    return data[key]

}