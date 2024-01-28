import { getCurrentUser } from './authService';

export function authHeader() {
 const currentUser = getCurrentUser();
 if (currentUser && currentUser.accessToken) {
    return { Authorization: `Bearer ${currentUser.accessToken}` };
 } else {
    return {};
 }
}
