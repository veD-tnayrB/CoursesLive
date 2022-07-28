// COURSES
export const COURSES_BASE_URL = '/courses';
export const CREATE_COURSE_URL = '${COURSES_BASE_URL}/create/';
export const EDIT_COURSE_URL = courseId => `${COURSES_BASE_URL}/${courseId}/edit`;
export const REMOVE_COURSE_URL = courseId => `${COURSES_BASE_URL}/${courseId}/remove`;
export const SUSCRIBE_TO_COURSE_URL = courseId => `${COURSES_BASE_URL}/${courseId}/suscribe`;
export const UNSUSCRIBE_TO_COURSE_URL = courseId => `${COURSE_BASE_URL}/${courseId}/unsuscribe`;
