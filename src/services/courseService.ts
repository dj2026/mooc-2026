import axios from 'axios';
import { Course, Lesson, Student } from '../types';

const API_URL = 'http://localhost:8080/api/v1';

const getLocalFallback = async () => {
  try {
    const response = await fetch('/data.json');
    return await response.json();
  } catch (err) {
    console.error("No s'ha pogut carregar ni l'API ni el fitxer local", err);
    return { courses: [], students: [] };  }
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const courseService = {
  
  async getAllCourses(): Promise<Course[]> {
    try {
      const { data } = await api.get('/courses/');
      return data; 
    } catch (error) {
      console.warn("⚠️ Mode Proves: L'API no respon, demanant dades al JSON...");
      const local = await getLocalFallback();
      return local.courses as Course[];
    }
  },

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    try {
      const { data } = await api.get(`/courses/${slug}/`);
      return data;
    } catch (error) {
      console.warn(`⚠️ Mode Proves: Buscant curs ${slug} al JSON`);
      const local = await getLocalFallback();
      return (local.courses as Course[]).find(c => c.id === slug);
    }
  },

  async getCourseLessons(slug: string): Promise<Lesson[]> {
    try {
      const { data } = await api.get(`/courses/${slug}/topics/`);
      return data.map((topic: any) => ({
        id: topic.slug || topic.id,
        title: topic.title,
        description: topic.description,
        instructions: topic.instructions || "",
        challenge: topic.challenge || "",
        initialCode: topic.initialCode || "",
        solution: topic.solution || ""
      }));
    } catch (error) {
      console.warn(`⚠️ Mode Proves: Carregant lliçons de ${slug} des del JSON`);
      const local = await getLocalFallback();
      const course = (local.courses as Course[]).find(c => c.id === slug);
      return course?.content || [];
    }
  },

  async getCourseStudents(slug: string): Promise<Student[]> {
    try {
      const { data } = await api.get(`/courses/${slug}/students/`);
      return data;
    } catch (error) {
      console.warn("⚠️ Mode Proves: Estudiants carregats des del JSON");
      const local = await getLocalFallback();
      return local.students as Student[];
    }
  },

  async submitChallenge(courseSlug: string, topicSlug: string, problemSlug: string, code: string) {
    try {
      const response = await api.post(
        `/courses/${courseSlug}/topics/${topicSlug}/problems/${problemSlug}/submissions/`,
        { code }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error: No es pot enviar el codi sense connexió a l'API.");
      throw error;
    }
  }
};