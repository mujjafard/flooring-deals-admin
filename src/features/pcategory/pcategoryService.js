import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCourses = async () => {
  const response = await axios.get(`${base_url}courses/`);

  return response.data;
};
const createCourse = async (courses) => {
  const response = await axios.post(`${base_url}courses/`, courses, config);

  return response.data;
};

const getCourse = async (id) => {
  const response = await axios.get(`${base_url}courses/${id}`, config);

  return response.data;
};

const deleteCourse = async (id) => {
  const response = await axios.delete(`${base_url}courses/${id}`, config);

  return response.data;
};
const updateCourse = async (courses) => {
  console.log(courses);
  const response = await axios.put(
    `${base_url}courses/${courses.id}`,
    { title: courses.pCatData.title },
    config
  );

  return response.data;
};
const pCategoryService = {
  getCourses,
  createCourse,
  getCourse,
  deleteCourse,
  updateCourse,
};

export default pCategoryService;
