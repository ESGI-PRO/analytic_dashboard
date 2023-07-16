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

    async get(url, params) {
        try {
            const response = await fetch(config.API_URL + url + new URLSearchParams(params), {
                method: 'GET',
                headers: await getHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
            return error
        }
    }

    /**
     * post given data to url
     */

    async post(url, data){
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'POST',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
            return error
        }
    }

    /**
     * Updates data
     */

    async patch (url, data){
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'PATCH',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
            return error
        }

    }

    /**
     * Update though put
     */

    async  put(url, data){
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'PUT',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
            return error
        }
    }

    /**
     * Delete
     */
    
    async delete (url) {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'DELETE',
                headers: await getHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
            return error
        }
    }
}


export { APIClient };

