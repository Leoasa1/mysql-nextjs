import Link from 'next/link';
import React from 'react';

export interface Product {
	id: string;
	title: string;
	product_desc: string;
	category: string;
	price: number;
}

export interface Props {
	product: Product;
}

const Rows = ({ product }: Props) => {
	return (
		<tr className='w-full hover:border-neutral hover:border-2'>
			<td>{product.title}</td>
			<td>{product.product_desc}</td>
			<td>{product.category}</td>
			<td>${product.price}</td>
			<td>
				<Link
					href={{
						pathname: '/auth/product/[details]',
						query: {
							details: `${product.id}`,
						},
					}}
					className='btn w-full text-white'
				>
					Open
				</Link>
			</td>
		</tr>
	);
};

export default Rows;
