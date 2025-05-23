import PropTypes from 'prop-types';

export default function ChevronDown({
    width = 16,
    height = 16,
    fill = 'currentColor',
    rotate = false,
    className = 'icon icon__chevron-down',
    ...props
}) {
    return (
        <svg
            className={className}
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 512 512'
            style={{
                transform: rotate ? 'rotate(180deg)' : 'none',
                transition: 'transform 300ms',
            }}
            {...props}
        >
            <path
                fill={fill}
                d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
            ></path>
        </svg>
    );
}

ChevronDown.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
    rotate: PropTypes.bool,
    className: PropTypes.string,
};
