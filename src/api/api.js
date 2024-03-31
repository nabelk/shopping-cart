export async function fetchAPI(url) {
    const response = await fetch(url, {
        mode: 'cors',
    });

    if (response.status >= 400) {
        throw new Error('server error');
    }

    const data = await response.json();
    return data;
}
