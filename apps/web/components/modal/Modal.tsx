import React from 'react';

export interface Props {
	children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
	return (
		<>
			<input type='checkbox' id='modal' className='modal-toggle' />
			<div className='modal cursor-pointer'>
				<div className='modal-box relative p-8 h-96'>
					<label
						htmlFor='modal'
						className='btn btn-sm btn-circle absolute right-2 top-2'
					>
						✕
					</label>
					{children}
				</div>
			</div>
		</>
	);
};

export default Modal;
