import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '../../src/auth/useLogin';
import { toast } from 'react-toastify';

const Login = () => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const { login } = useLogin();
	const onSubmit = (e: any) => {
		e.preventDefault();
		if (!username || !password) {
			toast.error('Please enter information');
		} else {
			login(username, password)
				.then((data) => {
					if (data.hasOwnProperty('errors')) {
						toast.error(data.errors);
					} else {
						router.push('/auth');
					}
				})
				.catch((e) => toast.error(e));
		}
	};

	return (
		<div className='hero min-h-screen bg-base-200'>
			<div className='hero-content flex-col lg:flex-row-reverse max-w-3xl gap-10'>
				<div className='text-center lg:text-left'>
					<h1 className='text-5xl font-bold'>Welcome Back!</h1>
					<p className='text-xl py-6'>
						Why did the SQL query break up with the NoSQL database?
						Because it couldn&lsquo;t JOIN the party!
					</p>
				</div>
				<form
					onSubmit={onSubmit}
					className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'
				>
					<div className='card-body'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Username</span>
							</label>
							<input
								value={username}
								onChange={(e) => setUserName(e.target.value)}
								type='text'
								placeholder='username'
								className='input input-bordered'
							/>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								placeholder='password'
								className='input input-bordered'
							/>
						</div>
						<div className='form-control mt-6'>
							<button type='submit' className='btn btn-secondary'>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
