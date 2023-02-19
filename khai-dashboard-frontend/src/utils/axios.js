import axios from "axios";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { URLS, AXIOS_HEADER } from "../config";
import { useRouter } from 'next/router';
import { notification } from "./notification";

const instance = axios.create({
    baseURL: URLS.backend,
    timeout: 5000,
});

instance.defaults.baseURL = URLS.backend;

instance.defaults.headers = AXIOS_HEADER;

instance.defaults.withCredentials = true;

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
    // If http method is `post | put | delete` and XSRF-TOKEN cookie is 
    // not present, call '/sanctum/csrf-cookie' to set CSRF token, then 
    // proceed with the initial response
    if ((
            config.method == 'post' || 
            config.method == 'put' || 
            config.method == 'delete',
            /* other methods you want to add here */
        ) &&
        !Cookies.get('XSRF-TOKEN')) {
        return setCSRFToken()
            .then(response => config);
    }
    return config;
}

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The 
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
    return instance.get('csrf-cookie'); // resolves to '/api/csrf-cookie'.
}

// attach your interceptor
// instance.interceptors.request.use(onRequest, null);

const AxiosInterceptor = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      /**
       * 401 ERROR
       */
      if (
        error.response.status === 401 &&
        localStorage.getItem("user") !== null
      ) {
        console.log("401, logout");
        localStorage.removeItem("user");
        localStorage.removeItem("permissions");
        router.push("/login");
      }

      /**
       * 403 ERROR
       */
      if (error.response.status === 403) {
        console.log("403, unauthorized");
        notification.show(
          "Unauthorized",
          `You are not authorized to perform this action: ${
            error.response.data.message || ""
          }`,
          "warning"
        );
      }

      /**
       * 422 Error
       */
      if (error.response.status === 422) {
        console.log("422, Unprocessable Entity");

        const message = error.response.data.hasOwnProperty("message")
          ? error.response.data.message
          : "Unprocessable Entity";

        let errors = "";
        // debugger;
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          errors += `${key}: ${value}`;
        }

        notification.show(message, errors, "danger");
        //throw 'test';
        // return error.response;
      }

      /**
       * 404 Error
       */
      if (error.response.status === 404) {
        console.log("404");
        console.error(error.response);
        router.push("/404");
      }

      /**
       * 429 Error
       */
      if (error.response.status === 429) {
        console.log("429");
        router.push("/429");
      }

      /**
       * 500 ERROR
       */
      if (error.response.status === 500) {
        if (window.location.pathname.split("/").pop() !== "500") {
          console.log("500");
          console.error(error.response);
          router.push("/500");
        }
      }

      /**
       * 503 ERROR
       */
      if (error.response.status === 503) {
        console.log("503");
        console.error(error.response);
        window.location.reload();
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [router]);

  return children;
};

instance.interceptors.response.use(
  (response) => response,
    (error) => {

        if (error.response.status === 422) {
            const message = error.response.data.hasOwnProperty("message")
            ? error.response.data.message
            : "Unprocessable Entity";

            let errors = "";
            // debugger;
            for (const [key, value] of Object.entries(error.response.data.errors)) {
                errors += `${key}: ${value}`;
            }

            notification.show(message, errors, "danger");
      }
      
        if (error.response.status === 500) {
            const ex_name = error.response.data.hasOwnProperty("exception")
            ? error.response.data.exception
            : "Server error";
          
            const message = error.response.data.hasOwnProperty("message")
            ? error.response.data.message
            : "";


            notification.show("Server error", `${ex_name}: ${message}`, "danger");
        }

        return Promise.reject((error.response && error.response.data) || 'Something went wrong')
    }
);


export default instance;
