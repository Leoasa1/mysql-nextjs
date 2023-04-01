import Link from 'next/link';

export default function Web() {
	return (
		<div className='hero min-h-screen bg-base-200'>
			<div className='hero-content text-center grid'>
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
				<div className='py-10'>
					<h2 className='text-xl'>Created By - Leo Asadourian</h2>
				</div>
			</div>
		</div>
	);
}
