import React from 'react';
import { useRouter } from 'next/router';
import { useLogout } from '../../src/auth/useLogout';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';

export interface props {
	firstName: string;
	lastName: string;
}

const Navbar = ({ firstName, lastName }: props) => {
	const { logout } = useLogout();
	const router = useRouter();

	return (
		<div className='navbar bg-secondary px-5 items-center'>
			<div className='flex-none lg:hidden'>
				<label
					htmlFor='my-drawer-3'
					className='btn btn-square btn-ghost'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						className='inline-block w-6 h-6 stroke-current'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16M4 18h16'
						></path>
					</svg>
				</label>
			</div>
			<div className='flex-1'>
				<a className='normal-case font-bold text-xl'>
					Hello {firstName}!
				</a>
			</div>
			<div className='flex-none gap-2'>
				<Link href={'/auth/search'} className='btn btn-ghost mr-5'>
					<IoSearch size={30} />
				</Link>
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
						className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-40 text-white font-bold'
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
