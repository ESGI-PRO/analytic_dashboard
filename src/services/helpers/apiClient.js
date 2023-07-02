import config from "../config";


const getHeaders = async () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

class APIClient {
    /**
     * Fetches data from given url
     */
    get = async (url, params) => {
        try {
            const response = await fetch(config.API_URL + url + new URLSearchParams(params), {
                method: 'GET',
                headers: await getHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
    }

    /**
     * post given data to url
     */
    post = async (url, data) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'POST',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
    }

    /**
     * Updates data
     */
    patch = async (url, data) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'PATCH',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }

    }

    /**
     * Update though put
     */
    put = async (url, data) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'PUT',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
    }
    /**
     * Delete
     */
    delete = async (url) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'DELETE',
                headers: await getHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
    }
}


export { APIClient };

