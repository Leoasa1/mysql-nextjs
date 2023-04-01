import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../../src/auth/useCurrentUser';
import { toast } from 'react-toastify';
import axios from 'axios';
import Rows from '../../components/table-rows/Table-Rows';

const Dashboard = () => {
	const { user: currentUser } = useCurrentUser();
	const [allProducts, setAllProducts] = useState([]);

	const getMyProducts = async () => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${currentUser?.token}`,
			},
			url: `http://localhost:5000/products/all-products`,
		};
		await axios
			.request(options)
			.then((response: any) => {
				setAllProducts(response.data);
			})
			.catch((error: any) => {
				toast.error(error.message);
				console.log(error);
			});
	};
	const createTables = async () => {
		const options = {
			method: 'POST',
			url: `http://localhost:5000/tables/createTables`,
		};
		await axios
			.request(options)
			.then(function (response: any) {
				toast.success(response.data);
			})
			.catch(function (error: any) {
				toast.error(error);
			});
		return;
	};

	useEffect(() => {
		if (currentUser) getMyProducts();
	}, [currentUser]);

	return (
		<div className='p-4'>
			<div className='max-w-md'>
				<h1 className='text-4xl font-bold mb-4'>Initialize Table</h1>
				<button
					onClick={() => createTables()}
					className='btn btn-secondary'
				>
					Submit
				</button>
			</div>
			<h1 className='font-semibold text-2xl my-10'>All Products</h1>
			<div className='overflow-x-auto'>
				<table className='table border-2 table-zebra w-full'>
					<thead className='font-bold'>
						<tr>
							<th className='text-lg'>Title</th>
							<th className='text-lg'>Description</th>
							<th className='text-lg'>Category</th>
							<th className='text-lg'>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{allProducts.length > 0 ? (
							allProducts.map((product, i) => (
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

export default Dashboard;
