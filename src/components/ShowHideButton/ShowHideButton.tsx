interface ShowHideButtonProps {
    handleClick: () => void;
    show: boolean;
}

const ShowHideButton = ({
    handleClick,
    show
}: ShowHideButtonProps) => {
    return (
        <button
            onClick={handleClick}
            className="btn btn-primary"
        >
            {show ? "Hide Task Input" : "Show Task Input"}
        </button>
    )
};

export default ShowHideButton;