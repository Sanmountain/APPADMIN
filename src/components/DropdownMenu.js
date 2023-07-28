import { Link } from "react-router-dom";
import "../styles/dropdown.css";

function DropdownMenu({
  buttonLabel,
  menuItems,
  menuPaths,
  isOpen,
  setIsOpen,
}) {
  return (
    <div className='dropdown'>
      <button
        onClick={() => setIsOpen(isOpen === buttonLabel ? null : buttonLabel)}
      >
        {buttonLabel}
      </button>
      {isOpen === buttonLabel && (
        <div className='dropdownMenu'>
          {menuItems.map((item, index) => (
            <Link to={menuPaths[index]} key={index}>
              <p>{item}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
