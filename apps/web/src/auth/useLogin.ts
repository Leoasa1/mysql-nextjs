import { authService } from '../services';
import Cookies from 'js-cookie';
import { User } from '../types/user';

export const useLogin = () => {
	const login = async (username: string, password: string) => {
		const res = await authService.login(username, password);
		if (res.errors) {
			return res;
		} else {
			Cookies.set('currentUser', JSON.stringify(res));
			return res as User;
		}
	};

	return { login };
};
