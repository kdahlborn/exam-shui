import './index.css';

const Button = ({ text, type, onClick }) => {
    return (
        <button
            className={`button button--${type}`}
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};

export default Button;
