const BASE_URL = 'http://localhost:8080/api';

const fetchData = async (endpoint, method = 'GET', body = null, withCredentials = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
    credentials: withCredentials ? 'include' : 'same-origin', // Handle cookies if needed
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await response.json(); // Return parsed JSON data
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw to handle in component
  }
};

export default fetchData;
