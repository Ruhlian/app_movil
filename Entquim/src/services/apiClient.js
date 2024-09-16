import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (email, password) => {
  try {
    const response = await apiClient.post('/users', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error en la API:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Error en la red');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.get('/users');
    const users = response.data;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      return user;
    } else {
      // Devuelve un mensaje genérico para evitar revelar detalles
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    // En caso de error, devuelve un mensaje genérico
    console.error('Error en la API:', error.message);
    throw new Error('Error al intentar iniciar sesión');
  }
};

export default apiClient;
