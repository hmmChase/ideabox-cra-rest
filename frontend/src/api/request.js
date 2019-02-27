export const request = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw Error(`${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw Error(`Network request failed. (error: ${error.message})`);
  }
};
