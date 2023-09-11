import { Link } from "react-router-dom";
import "../../styles/dropdown.css";
import { IDropdownMenuProps } from "../../types/DropdownMenu.types";

function DropdownMenu({
  buttonLabel,
  menuItems,
  menuPaths,
  isOpen,
  setIsOpen,
}: IDropdownMenuProps) {
  const handleLinkClick = () => {
    setIsOpen("");
  };

  return (
    <div className="dropdown">
      <div
        className="btnMenu"
        onClick={() => setIsOpen(isOpen === buttonLabel ? "" : buttonLabel)}
      >
        {buttonLabel}
      </div>
      {isOpen === buttonLabel && (
        <div className="dropdownMenu">
          {menuItems.map((item, index) => (
            <Link to={menuPaths[index]} key={index} onClick={handleLinkClick}>
              <p>{item}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
