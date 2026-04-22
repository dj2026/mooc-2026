import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const authService = {
  login: async (credentials: { email: string; code: string }) => {
    try {
<<<<<<< HEAD
      // 1. Intentem el login real a l'API
      const response = await api.post('/users/auth/login/', credentials);
=======
      const response = await axios.post(`${BASE_URL}/users/auth/login/`, credentials);
>>>>>>> d735607 (THEME + LANGUAGE)
      const data = response.data || response;

      if (data && data.token) {
        localStorage.setItem('token', data.token);
<<<<<<< HEAD
        // Guardem l'usuari de l'API si ens el retorna
=======
>>>>>>> d735607 (THEME + LANGUAGE)
        if (data.user) {
          localStorage.setItem('currentStudent', JSON.stringify(data.user));
        }
      }
      return data;

    } catch (error) {
      console.warn("⚠️ API Offline o Error: Intentant validació local amb data.json...");

<<<<<<< HEAD
      // 2. FALLBACK: Si l'API falla, busquem al JSON de la carpeta public
=======
>>>>>>> d735607 (THEME + LANGUAGE)
      try {
        const response = await fetch('/data.json');
        const localData = await response.json();

<<<<<<< HEAD
        // Busquem l'estudiant que coincideixi amb l'email i el PIN (code)
=======
>>>>>>> d735607 (THEME + LANGUAGE)
        const student = localData.students.find(
          (s: any) => s.email === credentials.email && s.code === credentials.code
        );

        if (student) {
<<<<<<< HEAD
          // Generem un token fals per mantenir l'app funcionant
=======
>>>>>>> d735607 (THEME + LANGUAGE)
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
<<<<<<< HEAD
      // Intentem avisar al servidor del logout
      await api.post('/users/auth/logout/');
=======
      await axios.post(`${BASE_URL}/users/auth/logout/`);
>>>>>>> d735607 (THEME + LANGUAGE)
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
<<<<<<< HEAD
      // Si l'API falla, retornem el que tenim guardat a local
=======
>>>>>>> d735607 (THEME + LANGUAGE)
      const saved = localStorage.getItem('currentStudent');
      if (saved) return JSON.parse(saved);
      
      console.error("Error obtenint dades de l'usuari:", error);
      throw error;
    }
  },

<<<<<<< HEAD
  // Funció auxiliar útil per al Dashboard
=======
>>>>>>> d735607 (THEME + LANGUAGE)
  getCurrentUser: () => {
    const saved = localStorage.getItem('currentStudent');
    return saved ? JSON.parse(saved) : null;
  }
};