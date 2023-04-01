import React, { useEffect } from 'react';
import { useCurrentUser } from '../../../src/auth/useCurrentUser';

const Profile = () => {
	const { user: currentUser } = useCurrentUser();

	return (
		<div className='p-4 text-lg'>
			<h1 className='text-4xl font-bold mb-4'>My Profile</h1>
			<div>
				<strong>Username: </strong>
				{currentUser?.username}
			</div>
			<div>
				<strong>Name: </strong>
				{currentUser?.firstName} {currentUser?.lastName}
			</div>
			<div>
				<strong>Email: </strong>
				{currentUser?.email}
			</div>
		</div>
	);
};

export default Profile;
