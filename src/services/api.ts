import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Funció auxiliar per gestionar el localStorage de forma hibrida
const saveToLocal = (courseId: string, lessonId: string) => {
  const local = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
  local[`${courseId}_${lessonId}`] = true;
  localStorage.setItem('mooc_global_progress', JSON.stringify(local));
};

export const api = {
  // Obté el progrés fusionant Local + API
  getStudentProgress: async (studentId: string) => {
    const localData = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
    
    try {
      const response = await axios.get(`${BASE_URL}/progress/${studentId}`);
      const apiData = response.data || [];
      
      // Fusionem: El que ve de l'API té preferència
      const merged = { ...localData };
      apiData.forEach((p: any) => {
        merged[`${p.courseId}_${p.lessonId}`] = true;
      });
      
      return merged;
    } catch (err) {
      console.warn("API Offline: Usant només dades locals.");
      return localData;
    }
  },

  // Guarda en ambdós llocs
  postProgress: async (data: { studentId: string; courseId: string; lessonId: string; status: boolean }) => {
    // 1. Guardem en local per a proves immediates
    saveToLocal(data.courseId, data.lessonId);

    // 2. Intentem enviar a la API
    try {
      return await axios.post(`${BASE_URL}/progress`, data);
    } catch (err) {
      console.error("No s'ha pogut sincronitzar amb el servidor, però s'ha guardat en local.");
      return { status: 200, data: 'saved_locally' };
    }
  },

  resetCourse: async (studentId: string, courseId: string) => {
    // Netegem local
    const local = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
    Object.keys(local).forEach(key => {
      if (key.startsWith(`${courseId}_`)) delete local[key];
    });
    localStorage.setItem('mooc_global_progress', JSON.stringify(local));

    try {
      return await axios.delete(`${BASE_URL}/progress/${studentId}/${courseId}`);
    } catch (err) {
      return { status: 200 };
    }
  }
};