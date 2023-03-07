import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useCurrentUser } from '../../src/auth/useCurrentUser';
import Navbar from '../../components/navbar/Navbar';

const Profile = () => {
	const { user: currentUser } = useCurrentUser();

	return (
		<>
			<Navbar
				firstName={currentUser?.firstName ? currentUser?.firstName : ''}
				lastName={currentUser?.lastName ? currentUser?.lastName : ''}
			/>
			<div>Profile</div>{' '}
		</>
	);
};

export default Profile;
