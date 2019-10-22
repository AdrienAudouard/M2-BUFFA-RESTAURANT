import axios from 'axios';

const basePath = 'http://localhost:8080/api/restaurants';

class RestaurantProvider {
  async getRestaurants(page, pageSize, filter) {
    const url = `${basePath}?page=${page}&pagesize=${pageSize}&filter=${filter}`;

    return (await this._makeRequest('get', url)).data.map(el => { return { id: el._id, name: el.name, cuisine: el.cuisine }});
  }

  async getCount(filter = '') {
    const url = `${basePath}/count?filter=${filter}`;

    return (await this._makeRequest('get', url)).data;
  }

  async _makeRequest(method, url) {
    const response = await axios[method](url);

    if (response.status !== 200) {
      throw new Error("error");
    }

    return response.data;
  }

  async createRestaurant(name, cuisine) {
    let formData = new FormData();
    formData.set('nom', name);
    formData.set('cuisine', cuisine);

    return await axios.post(`${basePath}`, formData);
  }

  async updateRestaurant(id, name, cuisine) {
    let formData = new FormData();
    formData.set('nom', name);
    formData.set('cuisine', cuisine);

    return await axios.put(`${basePath}/${id}`, formData);
  }

  async deleteRestaurant(id) {
    return await axios.delete(`${basePath}/${id}`);
  }
}

export default RestaurantProvider;