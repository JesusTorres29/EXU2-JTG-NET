// Construir URL de la API
// En desarrollo: usa localhost:8086
// En producción (Docker): usa la misma URL del frontend (el proxy de Nginx manejará /api)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://localhost:8086' : '');

export const saludoApi = {
  saludar: async (request) => {
    const url = API_BASE_URL ? `${API_BASE_URL}/api/saludo/saludar` : '/api/saludo/saludar';
    const response = await fetch(url, {
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

