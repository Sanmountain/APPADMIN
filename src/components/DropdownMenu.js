import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../styles/dropdown.css";

function DropdownMenu({
  buttonLabel,
  menuItems,
  menuPaths,
  isOpen,
  setIsOpen,
}) {
  const node = useRef();

  const handleLinkClick = () => {
    setIsOpen(null);
  };

  return (
    <div className='dropdown' ref={node}>
      <div
        className='btnMenu'
        onClick={() => setIsOpen(isOpen === buttonLabel ? null : buttonLabel)}
      >
        {buttonLabel}
      </div>
      {isOpen === buttonLabel && (
        <div className='dropdownMenu'>
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
