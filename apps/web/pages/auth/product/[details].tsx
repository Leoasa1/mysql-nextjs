import React, { useState, useEffect, useId } from 'react';
import { useCurrentUser } from '../../../src/auth/useCurrentUser';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ReviewCard from '../../../components/review-card/Review';
import axios from 'axios';
import Modal from '../../../components/modal/Modal';
import Select from 'react-select';

export interface Product {
	username: string;
	title: string;
	product_desc: string;
	category: string;
	price: number;
	reviews: object[];
}

const ProductDetails = () => {
	const router = useRouter();
	const getId = router.query.details || '';
	const { user: currentUser } = useCurrentUser();
	const [product, setProduct] = useState<Product>({
		username: '',
		title: '',
		product_desc: '',
		category: '',
		price: 0,
		reviews: [],
	});
	const [reviews, setReviews] = useState([]);
	const [canReview, setCanReview] = useState(false);

	const [reviewRating, setReviewRating] = useState('');
	const [reviewDesc, setReviewDesc] = useState('');

	const getProductDetails = async (productID: any) => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${currentUser?.token}`,
				'Content-Type': 'application/json',
			},
			url: `http://localhost:5000/products/product-details`,
			params: {
				id: productID,
			},
		};

		await axios
			.request(options)
			.then((response: any) => {
				setProduct(response.data.products[0]);
				setReviews(response.data.reviews);
				setCanReview(response.data.canReview);
				console.log(response.data);
			})
			.catch((error: any) => {
				toast.error(error.message);
			});
	};

	function handleClick() {
		router.back();
	}

	const submitReview = async (e: any) => {
		e.preventDefault();
		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${currentUser?.token}`,
			},
			url: `http://localhost:5000/products/submit-review`,
			data: {
				product_id: getId,
				rating: reviewRating,
				review_text: reviewDesc,
			},
		};
		if (canReview) {
			await axios
				.request(options)
				.then((response: any) => {
					toast.success(response.message);
					router.reload();
				})
				.catch((error: any) => {
					toast.error(error.message);
					console.log(error);
				});
		} else {
			toast.error("You're not allowed to write a review.");
		}
	};

	const selectOption = [
		{ value: 'Excellent', label: 'Excellent' },
		{ value: 'Good', label: 'Good' },
		{ value: 'Fair', label: 'Fair' },
		{ value: 'Poor', label: 'Poor' },
	];

	const handleInputChange = (selectedOptions: any) => {
		setReviewRating(selectedOptions.value);
	};

	useEffect(() => {
		if (currentUser) getProductDetails(getId);
	}, [currentUser]);

	return (
		<>
			<Modal>
				<div className='grid'>
					<h3 className='text-xl font-bold mb-5'>Write a Review</h3>
					<form className='grid gap-2' onSubmit={submitReview}>
						<label>Rating</label>
						<Select
							instanceId={useId()}
							className='w-full'
							options={selectOption}
							onChange={handleInputChange}
						/>
						<label>Add a written review</label>
						<textarea
							className='textarea textarea-bordered h-24'
							placeholder='What did you like or dislike?'
							value={reviewDesc}
							onChange={(e: any) => {
								setReviewDesc(e.target.value);
							}}
						/>
						<button className='btn mt-2 text-white'>Submit</button>
					</form>
				</div>
			</Modal>
			<div className='w-2/3 mx-auto pb-5'>
				<button onClick={handleClick} className='btn text-white w-full'>
					Back
				</button>
				<section className='mt-5 mb-20'>
					<div>
						Created By: <strong>{product.username}</strong>
					</div>
					<div className='flex justify-between'>
						<h1 className='text-4xl font-bold mb-10'>
							{product.title}
						</h1>
						<div className='badge badge-secondary text-2xl p-4'>
							${product.price}
						</div>
					</div>
					<h2 className='text-lg font-bold'>Product Description</h2>
					<div>{product.product_desc}</div>
					{canReview ? (
						<label
							htmlFor='modal'
							className='btn btn-outline mt-5 '
						>
							Write a review
						</label>
					) : (
						<></>
					)}
				</section>
				<div className='flex justify-between w-full text-lg font-bold'>
					<div>Reviews</div>
					<div>Count: {reviews.length}</div>
				</div>
				<section className='w-full border-4 rounded-lg p-4'>
					<div className='flex flex-col gap-4'>
						{reviews.length > 0 ? (
							reviews.map((review, i) => (
								<ReviewCard key={i} review={review} />
							))
						) : (
							<></>
						)}
					</div>
				</section>
			</div>
		</>
	);
};

export default ProductDetails;
