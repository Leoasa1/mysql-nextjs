import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';

export interface Review {
	username: string;
	rating: string;
	review_text: string;
	created_at: string;
}

export interface Props {
	review: Review;
}

const ReviewCard = ({ review }: Props) => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-4 items-center text-xl font-bold'>
				<IoPersonCircle size={40} />
				<div>{review.username}</div>
			</div>
			<div>{review.created_at.split('T')[0]}</div>
			<div className='grid'>
				<div>
					<strong>Rating: </strong>
					{review.rating}
				</div>
				<div>{review.review_text}</div>
			</div>
			<div className='divider' />
		</div>
	);
};

export default ReviewCard;
