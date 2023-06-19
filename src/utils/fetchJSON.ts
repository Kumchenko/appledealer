const fetchJSON = async (...args: Parameters<typeof fetch>) => {
    const response = await fetch(...args);
    if (response.ok) {
        return await response.json();
    }
    return Promise.reject(response);
}

export {fetchJSON}