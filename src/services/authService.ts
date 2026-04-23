import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const authService = {
  login: async (credentials: { email: string; code: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/auth/login/`, credentials);
      const data = response.data || response;

      if (data && data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('currentStudent', JSON.stringify(data.user));
        }
      }
      return data;

    } catch (error) {
      console.warn("⚠️ API Offline o Error: Intentant validació local amb data.json...");

      try {
        const response = await fetch('/data.json');
        const localData = await response.json();

        const student = localData.students.find(
          (s: any) => s.email === credentials.email && s.code === credentials.code
        );

        if (student) {
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
      await axios.post(`${BASE_URL}/users/auth/logout/`);
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
      const response = await axios.get(`${BASE_URL}/users/me/settings/`);
      return response.data || response;
    } catch (error) {
      const saved = localStorage.getItem('currentStudent');
      if (saved) return JSON.parse(saved);
      
      console.error("Error obtenint dades de l'usuari:", error);
      throw error;
    }
  },

  getCurrentUser: () => {
    const saved = localStorage.getItem('currentStudent');
    return saved ? JSON.parse(saved) : null;
  }
};