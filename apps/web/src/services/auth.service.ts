import axios, { AxiosInstance } from 'axios';
import { getAuthorizationHeader } from '../utils/getAuthHeader';

export class AuthService {
	protected readonly instance: AxiosInstance;
	public constructor(url: string) {
		this.instance = axios.create({
			baseURL: url,
			timeout: 30000,
			timeoutErrorMessage: 'Time out!',
		});
	}

	register = async (
		username: string,
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => {
		try {
			const res = await this.instance.post(
				'user/register',
				{
					username,
					firstName,
					lastName,
					email,
					password,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);
			return {
				username: res.data.username,
				firstName: res.data.firstName,
				lastName: res.data.lastName,
				email: res.data.email,
				token: res.data.token,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return error.response?.data;
			} else {
				return error;
			}
		}
	};

	login = async (username: string, password: string) => {
		try {
			const res = await this.instance.post(
				'user/login',
				{
					username,
					password,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);
			return {
				username: res.data.username,
				firstName: res.data.firstName,
				lastName: res.data.lastName,
				email: res.data.email,
				token: res.data.token,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return error.response?.data;
			} else {
				return error;
			}
		}
	};

	getUser = async (username: string) => {
		try {
			const res = await this.instance.get(`/user/${username}`, {
				headers: getAuthorizationHeader(),
			});
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(error.response?.data);
			} else {
				console.error(error);
			}
		}
	};
}
