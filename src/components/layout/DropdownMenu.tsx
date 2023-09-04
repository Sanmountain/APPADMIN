import { Link } from "react-router-dom";
import { useRef } from "react";
import "../../styles/dropdown.css";
import { IDropdownMenuProps } from "../../types/DropdownMenu.types";

function DropdownMenu({
  buttonLabel,
  menuItems,
  menuPaths,
  isOpen,
  setIsOpen,
}: IDropdownMenuProps) {
  const node = useRef<HTMLDivElement | null>(null);

  const handleLinkClick = () => {
    setIsOpen("");
  };

  return (
    <div className="dropdown" ref={node}>
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
