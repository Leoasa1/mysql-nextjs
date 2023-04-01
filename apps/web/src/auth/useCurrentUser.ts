import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User } from '../types/user';
import { authService } from '../services';

export const useCurrentUser = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const currentUser = Cookies.get('currentUser');
		if (currentUser) {
			setUser(JSON.parse(currentUser));
		}
	}, []);

	const refetchUser = async (username: string) => {
		const userInfo = await authService.getUser(username);
		const currentUser = Cookies.get('currentUser');

		if (userInfo && currentUser) {
			const newUser = JSON.parse(currentUser);
			Cookies.set('currentUser', JSON.stringify(newUser));
			setUser(newUser);
		}
	};

	return { user, refetchUser };
};
