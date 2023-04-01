import React from 'react';
import Navbar from '../navbar/Navbar';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

export interface Props {
	title: string;
	description: string;
	children: React.ReactNode;
	isAuth: boolean;
	currentUser: any;
}

const Layout = ({ children, isAuth, currentUser }: Props) => {
	const router = useRouter();

	return (
		<div>
			{isAuth ? (
				<>
					<ToastContainer theme='colored' position='top-center' />
					<Navbar
						firstName={
							currentUser?.firstName ? currentUser?.firstName : ''
						}
						lastName={
							currentUser?.lastName ? currentUser?.lastName : ''
						}
					/>
					<div className='drawer md:drawer-mobile md:h-[calc(100vh-(var(--navbar-header-height)+var(--navbar-height)))]'>
						<input
							id='my-drawer-3'
							type='checkbox'
							className='drawer-toggle'
						/>
						<div className='drawer-content flex flex-col p-4'>
							<main className='h-full'>{children}</main>
						</div>
						<div className='drawer-side w-40'>
							<label
								htmlFor='my-drawer-3'
								className='drawer-overlay'
							></label>
							<div className='menu overflow-y-auto w-64 bg-accent text-white'>
								<li>
									<Link
										className={`${
											router.pathname === '/auth'
												? 'bg-primary  text-black'
												: 'hover:bg-secondary hover:text-black'
										}`}
										href={'/auth'}
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										className={`${
											router.pathname ===
											'/auth/my-products'
												? 'bg-primary text-black'
												: 'hover:bg-secondary hover:text-black'
										}`}
										href={'/auth/my-products'}
									>
										My Products
									</Link>
								</li>
								<li>
									<Link
										className={`${
											router.pathname === '/auth/profile'
												? 'bg-primary text-black'
												: 'hover:bg-secondary hover:text-black'
										}`}
										href={'/auth/profile'}
									>
										Profile
									</Link>
								</li>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<ToastContainer theme='colored' position='top-center' />
					<main>{children}</main>
				</>
			)}
		</div>
	);
};

Layout.defaultProps = {
	title: 'Mysql Project',
	description: 'Project about databases.',
};

export default Layout;
