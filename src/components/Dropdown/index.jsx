import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const Dropdown = ({
	header, icon, items, onSelect, open, placeholder, searchable, selectedItem,
}) => {
	const id = uuid();
	const node = useRef();
	const [isOpen, setOpen] = useState(open);
	const [availableOptions, filterOptions] = useState(items);
	const [selectedOption, selectItem] = useState(selectedItem || { title: '', id: '' });
	const [inputFieldValue, updateInputValue] = useState('');

	const filterItems = event => {
		updateInputValue(event.target.value);
		filterOptions(items.filter(it => it.title.toLowerCase().includes(event.target.value.toLowerCase())));
	};

	const handleSelection = item => {
		selectItem({ title: item.title, id: item.id });
		onSelect(item);
		setOpen(false);
		filterOptions(items);
		updateInputValue('');
	};

	const handleClickOutside = e => {
		if (!node.current.contains(e.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="ssb-dropdown">
			{header && <label htmlFor={id}>{header}</label>}
			<div className="dropdown-interactive-area" ref={node} onClick={() => setOpen(!isOpen)}>
				<input
					className={isOpen ? 'focused' : ''}
					id={id}
					onChange={e => filterItems(e)}
					disabled={!searchable}
					placeholder={selectedOption.title ? selectedOption.title : placeholder}
					value={inputFieldValue}
				/>
				<div className="dd-icon">{icon}</div>
				{isOpen && (
					<div className="list-of-options">
						{availableOptions.map(it => (
							<div
								className={`option-list-element${selectedOption.id === it.id ? ' selected' : ''}`}
								key={it.id}
								onClick={() => handleSelection(it)}
								value={it.id}
								id={it.id}
							>{it.title}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

Dropdown.defaultProps = {
	header: '',
	items: [{ id: '', title: '' }],
	onSelect: () => {},
	open: false,
	searchable: false,
	placeholder: '-- Select --',
};

Dropdown.propTypes = {
	header: PropTypes.string,
	icon: PropTypes.node,
	items: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		id: PropTypes.string,
	})),
	onSelect: PropTypes.func,
	open: PropTypes.bool,
	placeholder: PropTypes.string,
	searchable: PropTypes.bool,
	selectedItem: PropTypes.object,
};

export default Dropdown;
