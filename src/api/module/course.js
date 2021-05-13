import httpClient from "./httpClient";

export const getAll = async () => {
  return await httpClient.get(`private/courses`);
};

export const get = async (id) => {
  return await httpClient.get(`private/course/${id}`);
};

export const getCourseClasses = async (course) => {
  return await httpClient.get(`private/course-classes/${course}`);
};

export const getCourseInstructors = async (course) => {
  return await httpClient.get(`private/course-instructors/${course}`);
};

export const getCourseSponsors = async (course) => {
  return await httpClient.get(`private/course-sponsors/${course}`);
};
