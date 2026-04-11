/**
 * Professional cookie utility as a lightweight alternative to js-cookie.
 */
const cookieUtils = {
  /**
   * Sets a cookie with optional security and expiry settings.
   */
  set: (name, value, options = {}) => {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const d = new Date();
        d.setTime(d.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${d.toUTCString()}`;
      } else if (options.expires instanceof Date) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    } else {
      cookieString += `; path=/`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += '; secure';
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  },

  /**
   * Gets a cookie value by name.
   */
  get: (name) => {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },

  /**
   * Removes a cookie by name.
   */
  remove: (name, options = {}) => {
    cookieUtils.set(name, '', { ...options, expires: -1 });
  }
};

export default cookieUtils;
