export const apiFetch = async (url, options) => {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw res;
    }
    return res;
  };
  
  export const getHeaders = (extraheaders) => {
    const headers = {
      'cash-control': 'no-store',
      ...extraheaders,
    };
    return headers;
  };
  