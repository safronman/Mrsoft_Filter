class ApiService {
    getData() {
        // При получении данных с сервера была ошибка CORS.
        // Для того чтобы обойти эту проблему был исрользован CORS Proxy https://codetabs.com/cors-proxy/cors-proxy.html
        return axios.get(`https://api.codetabs.com/v1/proxy?quest=http://www.mrsoft.by/data.json`)
            .then(response => {
                return response.data.data;
            });
    }
}