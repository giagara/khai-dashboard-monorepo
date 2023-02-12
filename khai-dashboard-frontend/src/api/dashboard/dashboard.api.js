import axios from '../../utils/axios';

class DashboardApi {
  async applications(request) {
    //await wait(100);

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        axios.get('dashboard/applications').then((response) => {
          resolve(response.data);
        });
        // Create the access token
      } catch (err) {
        console.error('[Dashboard Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
  async stats(request) {
    //await wait(100);

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        axios.get('dashboard/stats').then((response) => {
          resolve(response.data);
        });
        // Create the access token
      } catch (err) {
        console.error('[Dashboard Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const dashboardapi = new DashboardApi();
