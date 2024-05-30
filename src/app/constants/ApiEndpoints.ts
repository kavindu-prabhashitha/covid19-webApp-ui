export const API_PORT = 44332;
export const API_PROTOCOL = "https"

// Authentication
export const API_LOGIN_USER = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/Login`;
export const API_REGISTER_USER = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/Register`;
export const API_REGISTER_ADMIN = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/Register-Admin`;
export const API_REFRESH_TOKEN = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/refresh-token`;
export const API_REVOKE_REFRESH_TOKEN = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/revoke-refresh-token`;

//Coivd19 Data
export const API_ALL_COVID19_DATA = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/country`;
export const API_SAVE_DATA_DB = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/save-data`;
export const API_GET_ALL_DB_COUNTRY_DATA = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/get-db-data`;
export const API_GET_DB_DATA_BY_COUNTRY_NAME = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/get-db-data-country`;
export const API_ADD_COUNTRY_CASE_TO_DB = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data`;
export const API_UPDATE_COUNTRY_CASE_TO_DB = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data`;
export const API_GET_DB_COUNTRY_NAMES = `${API_PROTOCOL}://localhost:${API_PORT}/api/Covid19Data/get-all-country-names`

//Roles
export const API_GET_ROLES = `${API_PROTOCOL}://localhost:${API_PORT}/api/UserRole`;
export const API_GET_ROLE_BY_ID = `${API_PROTOCOL}://localhost:${API_PORT}/api/UserRole/GetRoleById`;
export const API_CREATE_ROLE = `${API_PROTOCOL}://localhost:${API_PORT}/api/UserRole`;
export const API_UPDATE_ROLE = `${API_PROTOCOL}://localhost:${API_PORT}/api/UserRole`;
export const API_UPGRADE_ROLE_PERMISSION = `${API_PROTOCOL}://localhost:${API_PORT}/api/UserRole/add-permissions-to-role`;


//Permissions
export const API_GET_ROLE_PERMISSION = `${API_PROTOCOL}://localhost:${API_PORT}/api/RolePermission`;
export const API_CREATE_ROLE_PERMISSION = `${API_PROTOCOL}://localhost:${API_PORT}/api/RolePermission`;
export const API_UPDATE_ROLE_PERMISSION = `${API_PROTOCOL}://localhost:${API_PORT}/api/RolePermission`;