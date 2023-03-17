import axios from 'axios';

import { BASE_URL } from 'constants/constants';

axios.defaults.baseURL = BASE_URL;

const setToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const fetchToken = async () => {
  try {
    const response = await axios.get('/auth/anonymous?platform=subscriptions');
    setToken(response.data.token);
  } catch (error) {
    console.error(error);
  }
};

export const fetchCourses = async () => {
  try {
    await fetchToken();
    const response = await axios.get('/core/preview-courses');
    return response.data.courses;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCourseIdDetails = async courseId => {
  try {
    await fetchToken();
    const response = await axios.get(`core/preview-courses/${courseId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
