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
