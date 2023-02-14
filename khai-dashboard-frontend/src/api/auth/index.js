import { createResourceId } from '../../utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from '../../utils/jwt';
import { wait } from '../../utils/wait';
import { users } from './data';
import axios from '../../utils/axios';

class AuthApi {
  async signIn(request) {
    const { username, password } = request;

    //await wait(100);

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        axios
          .post('login', {
            username: username,
            password: password,
          })
          .then((response) => {
            const user = response.data;

            if (!user) {
              reject(new Error('Please check your email and password'));
              return;
            }

            // const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            //const accessToken = user.token;
            resolve({ user });
          });

        // Create the access token
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signOut() {
    //await wait(100);

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        axios.post('logout').then((response) => {
          resolve();
        });

        // Create the access token
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signUp(request) {
    return;
    const { email, name, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find((user) => user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          plan: 'Standard',
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me() {
    //const { user } = request;

    return new Promise((resolve, reject) => {
      try {
        axios
          .get('user')
          .then((response) => {
            resolve(response.data);
            return;
          })
          .catch((err) => {
            reject();
          });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
