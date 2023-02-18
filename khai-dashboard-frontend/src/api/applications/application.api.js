import axios from '../../utils/axios';

class ApplicationApi {
  async getApplications(search) {
    //await wait(100);

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        const uri = `application?page=${search.page + 1}&per_page=${search.rowsPerPage}&sort=${
          search.sortDir === 'desc' ? '-' : ''
        }${search.sortBy}&filter[name]=${search.filters.query ?? ''}`;

        axios.get(uri).then((response) => {
          resolve(response.data);
        });
        // Create the access token
      } catch (err) {
        console.error('[ApplicationApi Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async getApplicationUsers(application) {
    //await wait(100);

    return new Promise((resolve, reject) => {
      try {
        // Find the users

        axios.get(`application/${application.uuid}/users`).then((response) => {
          resolve(response.data);
        });
        // Create the access token
      } catch (err) {
        console.error('[ApplicationApi Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const applicationApi = new ApplicationApi();
