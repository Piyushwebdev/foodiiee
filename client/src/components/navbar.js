import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const isLarge = useMediaQuery("(min-width:800px)");
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">F🍊🍈diee🧑‍🍳</Link>
      </div>
      {!isLarge && (
        <div className="toggle-button" onClick={toggleMenu}>
          {showMenu ? <CloseIcon /> : <MenuIcon />}
        </div>
      )}
      {(isLarge || showMenu) && (
        <div className="links">
          <Link to="/recipes">Recipes</Link>
          <Link to="/saved-recipes">Saved Recipes</Link>
          <Link to="/create-recipe">Add Recipe</Link>
          {!cookies.access_token ? (
            <Link to="/auth">Login/Register</Link>
          ) : (
            <Button
              variant="contained"
              sx={{
                ":hover": {
                  backgroundColor: "#FFA500",
                  borderColor: "#FFA500",
                },
                backgroundColor: "#FF830F",
              }}
              onClick={logout}
            >
              {" "}
              Logout{" "}
            </Button>
          )}
        </div>
      )}
      {showMenu && !isLarge && (
        <div className="menu-popup">
          <div className="menu-links">
            <Link to="/recipes">Recipes</Link>
            <Link to="/saved-recipes">Saved Recipes</Link>
            <Link to="/create-recipe">Add Recipe</Link>
            {!cookies.access_token ? (
              <Link to="/auth">Login/Register</Link>
            ) : (
              <Button
                variant="contained"
                sx={{
                  ":hover": {
                    backgroundColor: "#FFA500",
                    borderColor: "#FFA500",
                  },
                  backgroundColor: "#FF830F",
                }}
                onClick={logout}
              >
                {" "}
                Logout{" "}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
