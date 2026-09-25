import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";
import {
  RiSignalTowerLine,
  RiMenuLine,
  RiCloseLine,
  RiSunLine,
  RiMoonLine,
} from "react-icons/ri";
import { useState } from "react";

const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Interpreter", path: "/interpreter" },
  { name: "Analyze Image", path: "/analyze" },
  { name: "Dictionary", path: "/dictionary" },
  { name: "History", path: "/history" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <RiSignalTowerLine size={18} className="text-white" />
            </div>
            <span className="font-semibold text-txt text-sm tracking-wide">
              SignBridge
            </span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? "bg-surface-hover text-txt"
                      : "text-txt-secondary hover:text-txt hover:bg-surface"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* ── Theme Toggle ── */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg bg-surface border border-border text-txt-secondary hover:text-txt flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <RiMoonLine size={17} />
            ) : (
              <RiSunLine size={17} />
            )}
          </button>

          {user ? (
            <>
              <span className="text-sm text-txt-secondary hidden sm:block">
                {user.full_name}
              </span>
              <Button variant="ghost" onClick={handleLogout} className="text-sm">
                Sign out
              </Button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-lg bg-surface border border-border text-txt flex items-center justify-center"
              >
                {menuOpen ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && user && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? "bg-surface-hover text-txt"
                  : "text-txt-secondary hover:text-txt"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}