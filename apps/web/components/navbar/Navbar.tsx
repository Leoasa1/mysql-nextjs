import React from 'react';
import { useRouter } from 'next/router';
import { useLogout } from '../../src/auth/useLogout';

export interface props {
	firstName: string;
	lastName: string;
}

const Navbar = ({ firstName, lastName }: props) => {
	const { logout } = useLogout();
	const router = useRouter();

	return (
		<div className='navbar bg-secondary'>
			<div className='flex-1'>
				<a className='btn btn-ghost normal-case text-xl'>
					Hello {firstName}!
				</a>
			</div>
			<div className='flex-none gap-2'>
				<div className='dropdown dropdown-end'>
					<label
						tabIndex={0}
						className='btn btn-ghost btn-circle bg-gray-800 text-white text-xl'
					>
						{firstName.charAt(0)}
						{lastName.charAt(0)}
					</label>
					<ul
						tabIndex={0}
						className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary rounded-box w-52 text-black font-bold'
					>
						<li>
							<button
								onClick={() => {
									logout();
									router.push('/');
								}}
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
