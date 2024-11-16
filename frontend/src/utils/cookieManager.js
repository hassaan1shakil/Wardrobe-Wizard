import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Function to set cookies with options like HttpOnly, secure, etc.
export const setCookie = (name, value, options = {}) => {
  cookies.set(name, value, {
    path: '/',
    ...options,
  });
};

// Function to get a cookie value
export const getCookie = (name) => cookies.get(name);

// Function to remove a cookie
export const removeCookie = (name) => cookies.remove(name, { path: '/' });
