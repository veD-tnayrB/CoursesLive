import isRoleValid from "./isRoleValid";

const isUserTeacher = () => isRoleValid(['teacher']);

const isUserAdmin = () => isRoleValid(['admin']);

const isUserAdminOrTeacher = () => isRoleValid(['admin', 'teacher'])l

const isUserStudent = () => isRoleValid(['student']);

export { isUserTeacher, isUserAdmin, isUserAdminOrTeacher, isUserStudent };