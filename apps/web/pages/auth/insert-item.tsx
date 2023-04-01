import React, { useState, useEffect, useId } from 'react';
import Select from 'react-select';
import { useCurrentUser } from '../../src/auth/useCurrentUser';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface Product {
	username: string;
	title: string;
	product_desc: string;
	category: string[];
	price: string;
}

const Insert = () => {
	const { user: currentUser } = useCurrentUser();
	const [product, setProduct] = useState<Product>({
		username: '',
		title: '',
		product_desc: '',
		category: [],
		price: '',
	});

	const router = useRouter();

	const options = [
		{ value: 'Automotive', label: 'Automotive' },
		{ value: 'Book', label: 'Book' },
		{ value: 'Beauty', label: 'Beauty' },
		{ value: 'Camera', label: 'Camera' },
		{ value: 'Computer', label: 'Computer' },
		{ value: 'Electronic', label: 'Electronic' },
		{ value: 'Food and Beverage', label: 'Food and Beverage' },
		{ value: 'Fine Art', label: 'Fine Art' },
		{ value: 'Major Appliances', label: 'Major Appliances' },
		{ value: 'Musical Instruments', label: 'Musical Instruments' },
		{ value: 'Office Products', label: 'Office Products' },
		{ value: 'Pet Supplies', label: 'Pet Supplies' },
		{ value: 'Sports', label: 'Sports' },
		{ value: 'Tools', label: 'Tools' },
		{ value: 'Toys and Games', label: 'Toys and Games' },
		{ value: 'Video and DVD', label: 'Video and DVD' },
		{ value: 'Video Games', label: 'Video Games' },
		{ value: 'Watches', label: 'Watches' },
	];

	const handleInputChange = (selectedOptions: any) => {
		const selectedCategories = selectedOptions.map(
			(option: any) => option.value
		);
		setProduct((prevState) => ({
			...prevState,
			category: selectedCategories,
		}));
	};

	const submitProduct = async (e: any) => {
		e.preventDefault();
		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${currentUser?.token}`,
			},
			url: `http://localhost:5000/products/insert`,
			data: {
				username: product.username,
				title: product.title,
				product_desc: product.product_desc,
				category: product.category,
				price: product.price,
			},
		};
		await axios
			.request(options)
			.then((response: any) => {
				toast.success(response.data);
				router.push('/auth/my-products');
			})
			.catch(function (error: any) {
				toast.error(error.message);
				console.log(error);
			});
		return;
	};

	useEffect(() => {
		if (currentUser) {
			setProduct((product) => ({
				...product,
				username: currentUser.username,
			}));
		}
	}, [currentUser]);

	return (
		<div className='bg-white h-full w-full rounded-lg drop-shadow-lg shadow-black py-4 px-10'>
			<h1 className='font-semibold text-2xl'>Upload Item</h1>
			<form
				onSubmit={submitProduct}
				className='py-5 flex flex-col gap-4 w-full'
			>
				<label>Title</label>
				<input
					type='text'
					placeholder='Type here'
					className='input input-bordered w-full'
					value={product.title}
					onChange={(e) =>
						setProduct((product) => ({
							...product,
							title: e.target.value,
						}))
					}
				/>
				<label>Description</label>
				<textarea
					className='textarea textarea-bordered'
					placeholder='Description'
					value={product.product_desc}
					onChange={(e) =>
						setProduct((product) => ({
							...product,
							product_desc: e.target.value,
						}))
					}
				/>
				<label>Category</label>
				<Select
					instanceId={useId()}
					isMulti
					className='max-w-xs'
					options={options}
					onChange={handleInputChange}
				/>
				<label>Price</label>
				<input
					type='number'
					placeholder='$0.00'
					className='input input-bordered w-full max-w-xs'
					value={product.price}
					onChange={(e) =>
						setProduct((product) => ({
							...product,
							price: e.target.value,
						}))
					}
				/>
				<button type='submit' className='btn btn-secondary mt-4'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Insert;
