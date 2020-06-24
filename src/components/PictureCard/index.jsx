import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, ArrowRightCircle } from 'react-feather';

export function useHover() {
	const [value, setValue] = useState(false);

	const hoverRef = useRef(null);

	useEffect(
		// eslint-disable-next-line consistent-return
		() => {
			const handleMouseOver = () => setValue(true);
			const handleMouseOut = () => setValue(false);
			const element = hoverRef && hoverRef.current;

			if (element) {
				element.addEventListener('mouseover', handleMouseOver);
				element.addEventListener('mouseout', handleMouseOut);
				return () => {
					element.removeEventListener('mouseover', handleMouseOver);
					element.removeEventListener('mouseout', handleMouseOut);
				};
			}
		},
		[hoverRef],
	);

	return [hoverRef, value];
}

const PictureCard = ({ className, image, link, onClick, orientation, title, type }) => {
	const [hoverRef, hovered] = useHover();
	const orig = (
		<a
			className={`ssb-picture-card ${orientation}${className ? ` ${className}` : ''}`}
			href={link}
			onClick={onClick}
			ref={hoverRef}
		>
			<div className="image-background"><img src={image} /></div>
			<span className="il-type">{type}</span>
			<span className="il-title">{title}</span>
			{hovered ? <ArrowRightCircle className="arrow-icon" size={32} />
				: <ArrowRight className="arrow-icon" size={32} />}
		</a>
	);

	return (
		<a
			className={`ssb-picture-card ${orientation} ${className || ''}`}
			href={link}
			onClick={onClick}
			ref={hoverRef}
		>
			<div className="image-background">
				<img src={image} alt="" />
			</div>
			<div className="overlay">
				<span className="il-type">{type}</span>
				<span className="il-title">{title}</span>
				{hovered
					? <ArrowRightCircle className="arrow-icon" size={32} />
					: <ArrowRight className="arrow-icon" size={32} />}
			</div>
		</a>
	);

	// return (
	// 	<div>
	// 		{v2}
	// 	</div>
	// );
};

PictureCard.defaultProps = {
	onClick: () => {
	},
	orientation: 'vertical',
};

PictureCard.propTypes = {
	className: PropTypes.string,
	image: PropTypes.element.isRequired,
	link: PropTypes.string,
	onClick: PropTypes.func,
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	title: PropTypes.string,
	type: PropTypes.string,
};

export default PictureCard;
