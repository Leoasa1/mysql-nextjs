import React, { useState, useId } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Select from 'react-select';
import Rows from '../../components/table-rows/Table-Rows';

const Search = () => {
	const [search, setSearch] = useState([]);
	const [searchResult, setSearchResult] = useState([]);

	const getSearch = async (e: any) => {
		e.preventDefault();
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			url: `http://localhost:5000/products/search`,
			params: {
				category: search,
			},
		};

		if (search.length > 0) {
			await axios
				.request(options)
				.then((response: any) => {
					setSearchResult(response.data);
					console.log(response);
				})
				.catch((error: any) => {
					toast.error(error.message);
					console.log(error);
				});
		} else {
			toast.error('Missing search category!');
		}
	};

	const options = [
		{ value: 'Automotive', label: 'Automotive' },
		{ value: 'Book', label: 'Book' },
		{ value: 'Beauty', label: 'Beauty' },
		{ value: 'Camera', label: 'Camera' },
		{ value: 'Computer', label: 'Computer' },
		{ value: 'Electronic', label: 'Electronic' },
		{ value: 'Food and Beverage', label: 'Food and Beverage' },
		{ value: 'Fine Art', label: 'Fine Art' },
		{ value: 'Major Appliance', label: 'Major Appliances' },
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
		setSearch(selectedCategories);
	};

	return (
		<div className='p-4'>
			<div className='max-w-xl mx-auto text-center'>
				<h1 className='text-4xl font-bold'>
					Search for a Item Category!
				</h1>
				<div className='my-10'>
					<form onSubmit={getSearch} className='max-w-xl grid gap-5'>
						<Select
							instanceId={useId()}
							isMulti
							className='w-full h-full text-start'
							options={options}
							onChange={handleInputChange}
							placeholder='Select Categories'
						/>
						<button type='submit' className='btn'>
							Search
						</button>
					</form>
				</div>
			</div>
			{searchResult.length > 0 ? (
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
						{searchResult.map((product, i) => (
							<Rows key={i} product={product} />
						))}
					</tbody>
				</table>
			) : (
				<div className='w-full h-full text-center mt-20 text-xl'>
					<div>No Results</div>
				</div>
			)}
		</div>
	);
};

export default Search;
