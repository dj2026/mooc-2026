import { api } from './api';

export const authService = {
  login: async (credentials: { email: string; code: string }) => {
    try {
      // 1. Intentem el login real a l'API
      const response = await api.post('/users/auth/login/', credentials);
      const data = response.data || response;

      if (data && data.token) {
        localStorage.setItem('token', data.token);
        // Guardem l'usuari de l'API si ens el retorna
        if (data.user) {
          localStorage.setItem('currentStudent', JSON.stringify(data.user));
        }
      }
      return data;

    } catch (error) {
      console.warn("⚠️ API Offline o Error: Intentant validació local amb data.json...");

      // 2. FALLBACK: Si l'API falla, busquem al JSON de la carpeta public
      try {
        const response = await fetch('/data.json');
        const localData = await response.json();

        // Busquem l'estudiant que coincideixi amb l'email i el PIN (code)
        const student = localData.students.find(
          (s: any) => s.email === credentials.email && s.code === credentials.code
        );

        if (student) {
          // Generem un token fals per mantenir l'app funcionant
          const fakeToken = `fake-jwt-token-${student.id}`;
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('currentStudent', JSON.stringify(student));
          
          console.log("✅ Login local correcte per a:", student.name);
          return { token: fakeToken, user: student };
        } else {
          throw new Error("Email o PIN incorrectes");
        }
      } catch (fetchError: any) {
        console.error("Error en la validació local:", fetchError.message);
        throw fetchError;
      }
    }
  },

  logout: async () => {
    try {
      // Intentem avisar al servidor del logout
      await api.post('/users/auth/logout/');
    } catch (error) {
      console.warn("Servidor no ha respost al logout, netejant localment...");
    } finally {
      // Netegem sempre el localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('currentStudent');
      localStorage.removeItem('mooc_global_progress');
    }
  },

  getMe: async () => {
    try {
      const response = await api.get('/users/me/settings/');
      return response.data || response;
    } catch (error) {
      // Si l'API falla, retornem el que tenim guardat a local
      const saved = localStorage.getItem('currentStudent');
      if (saved) return JSON.parse(saved);
      
      console.error("Error obtenint dades de l'usuari:", error);
      throw error;
    }
  },

  // Funció auxiliar útil per al Dashboard
  getCurrentUser: () => {
    const saved = localStorage.getItem('currentStudent');
    return saved ? JSON.parse(saved) : null;
  }
};