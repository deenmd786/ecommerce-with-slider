const BASE_URL = 'http://localhost:8080/api';

const fetchData = async (endpoint, method = 'GET', body = null, withCredentials = false) => {
  const headers = {
    'Content-Type': 'application/json',
    // Add any other headers you might need, such as authorization tokens
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
      // Handle non-OK responses (e.g., 4xx/5xx errors)
      if (response.status === 401) {
        throw new Error('Session expired'); // Adjust this as needed based on your API
      }

      // Check if the response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      } else {
        throw new Error('Something went wrong, and response is not in JSON format');
      }
    }

    // If the response status is 204 (No Content), return null
    if (response.status === 204) {
      return null; // No content to return
    }

    // Parse JSON response if applicable
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      throw new Error('Expected JSON response but received a different format');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw to handle in component
  }
};

export default fetchData;
