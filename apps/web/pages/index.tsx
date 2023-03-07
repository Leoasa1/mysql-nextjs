import { useEffect } from 'react';
import Link from 'next/link';
import { useCurrentUser } from '../src/auth/useCurrentUser';
import { useRouter } from 'next/router';

export default function Web() {
	const { user: currentUser } = useCurrentUser();
	const router = useRouter();

	useEffect(() => {
		if (currentUser) {
			router.push('/account/profile');
		}
	}, [currentUser]);

	return (
		<div className='hero min-h-screen bg-base-200'>
			<div className='hero-content text-center'>
				<div className='max-w-md'>
					<h1 className='text-5xl font-bold'>MySQL Project</h1>
					<p className='py-6'>
						&quot;SQL, MySQL, and I have a love-hate relationship -
						mostly hate, but it’s mostly love.&quot; <br /> -
						Michael J. Ross
					</p>
					<div className='grid grid-cols-2 gap-4 justify-content-center'>
						<Link href={'/account/register'} className='btn '>
							Register
						</Link>
						<Link
							href={'/account/login'}
							className='btn btn-secondary'
						>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
