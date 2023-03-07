import { authService } from '../services';
import Cookies from 'js-cookie';
import { User } from '../types/user';

export const useRegister = () => {
	const register = async (
		username: string,
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => {
		const res = await authService.register(
			username,
			firstName,
			lastName,
			email,
			password
		);
		if (res.errors) {
			return res;
		} else {
			Cookies.set('currentUser', JSON.stringify(res));
			return res as User;
		}
	};

	return { register };
};
