import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../../src/auth/useCurrentUser';
import { toast } from 'react-toastify';
import axios from 'axios';
import Rows from '../../components/table-rows/Table-Rows';
import Link from 'next/link';

const Myproducts = () => {
	const { user: currentUser } = useCurrentUser();
	const [myProduct, setMyProduct] = useState([]);

	const getMyProducts = async () => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${currentUser?.token}`,
			},
			url: `http://localhost:5000/products/my-products`,
		};
		await axios
			.request(options)
			.then((response: any) => {
				setMyProduct(response.data);
			})
			.catch(function (error: any) {
				toast.error(error.message);
				console.log(error);
			});
	};

	useEffect(() => {
		if (currentUser) getMyProducts();
	}, [currentUser]);

	return (
		<div className='p-4'>
			<div className='flex justify-between'>
				<h1 className='text-4xl font-bold mb-10'>My Products</h1>
				<Link href={'/auth/insert-item'} className='btn btn-secondary'>
					Upload Product
				</Link>
			</div>

			<div className='overflow-x-auto'>
				<table className='table border-2 table-zebra w-full'>
					<thead className='font-bold text-2xl'>
						<tr>
							<th className='text-lg'>Title</th>
							<th className='text-lg'>Description</th>
							<th className='text-lg'>Category</th>
							<th className='text-lg'>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{myProduct.length > 0 ? (
							myProduct.map((product, i) => (
								<Rows key={i} product={product} />
							))
						) : (
							<></>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Myproducts;
