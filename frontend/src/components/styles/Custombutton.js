import '../../css/customButton.css'

const CustomButton = ({ handleClick, color, padding, backgroundColor, className, children, borderRadius, style }) => {
    return (
        <button
            onClick={handleClick}
            style={{backgroundColor, color, padding, borderRadius, ...style}}
            className={className}
        >{children}</button>
    );
}

export default CustomButton;