import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRegister } from '../../src/auth/useRegister';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
	const [username, setUserName] = useState('');
	const [firstName, setfirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const { register } = useRegister();

	const onSubmit = () => {
		if (!username || !password || !firstName || !lastName || !email) {
			toast.error('Please enter information');
		} else {
			register(username, firstName, lastName, email, password)
				.then((data) => {
					if (data.hasOwnProperty('errors')) {
						toast.error(data.errors);
					} else {
						router.push('/account/profile');
					}
				})
				.catch((e) => alert(e));
		}
	};

	return (
		<div className='hero min-h-screen bg-base-200'>
			<ToastContainer theme='colored' position='top-center' />
			<div className='hero-content text-center grid'>
				<h1 className='text-5xl font-bold mb-5'>Register Now!</h1>
				<div className='card flex-shrink-0 w-full w-96 shadow-2xl bg-base-100'>
					<div className='card-body'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>
										First Name
									</span>
								</label>
								<input
									value={firstName}
									onChange={(e) =>
										setfirstName(e.target.value)
									}
									type='text'
									placeholder='John'
									className='input input-bordered'
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>
										Last Name
									</span>
								</label>
								<input
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
									type='text'
									placeholder='Doe'
									className='input input-bordered'
								/>
							</div>
						</div>
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
								<span className='label-text'>Email</span>
							</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								placeholder='email'
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
							<button
								onClick={() => onSubmit()}
								className='btn btn-secondary'
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
