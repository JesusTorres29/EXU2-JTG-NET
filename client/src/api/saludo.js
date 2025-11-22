// Construir URL de la API desde variables de entorno o usar valores por defecto
const API_HOST = import.meta.env.VITE_API_HOST || 'localhost';
const API_PORT = import.meta.env.VITE_API_PORT || '8086';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${API_HOST}:${API_PORT}`;

export const saludoApi = {
  saludar: async (request) => {
    const response = await fetch(`${API_BASE_URL}/api/saludo/saludar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al enviar el saludo');
    }

    return response.json();
  },
};

