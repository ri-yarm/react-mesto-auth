import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function HamburgerMenu({isOpen, handleClick}) {
  return (
    <div className="header__hamburger_control" onClick={handleClick}>
      {isOpen ? (
        <AiOutlineClose size={25} color="white" className="button" />
      ) : (
        <AiOutlineMenu size={25} color="white" className="button" />
      )}
    </div>
  );
}

export default HamburgerMenu;
