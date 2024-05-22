/* eslint-disable @typescript-eslint/no-explicit-any */

const Cache = {
  /**
   * Set Data to storage
   * @param key
   * @param data
   */


  set(token: string, value: string) {
    if (!token) {
      return;
    }
    localStorage.setItem(token, value);

  },

  /**
   * get Data from storage
   * @param key
   */
  // get(key: string, token: string) {

  get(token: string) {
    const storedToken = localStorage.getItem(token);
    return storedToken;
  },

  remove(token: string) {
    localStorage.removeItem(token);
  },

};

export default Cache;
