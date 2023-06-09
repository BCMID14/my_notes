import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import LogoEdit from './ImgsSidebar/edit.svg';
import FolderIcon from './ImgsSidebar/folder.svg';
import Tools from './ImgsSidebar/settings.svg';
import Menu from './ImgsSidebar/menu.svg';
import './Sidebar.css';
import SideNotes from "../SideNotes/SideNotes";


export default function Sidebar() {
    const [checkWidth, setCheckWidth] = useState(window.innerWidth);
    const [toggleNav, setToggleNav] = useState(false);

    const handleCheckWidth = () => {
        setCheckWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleCheckWidth);

        return () => {
            window.removeEventListener('resize', handleCheckWidth);
        }
    }, []);

    const handleToggleNav = () => {
        setToggleNav(!toggleNav);
    };

  return (
      <>
        {checkWidth < 900 && (
            <button 
             onClick={handleToggleNav}
             className="toggle-nav-btn"
             >
                <img src={Menu} alt="menu icon" />
            </button>
        )}
        <nav className={
           toggleNav ? "container-sidebar visible-nav" : "container-sidebar"
        }>
            <div className="sidebar">
                <div className="three-dots">
                    <div className="dot-nav d-red"></div>
                    <div className="dot-nav d-yellow"></div>
                    <div className="dot-nav d-green"></div>
                </div>
                <ul>
                    <Link to="/">
                        <li>
                            <img src={FolderIcon} alt="logo folder" />
                        </li>
                    </Link>
                    <Link to="/edit">
                        <li>
                            <img src={LogoEdit} alt="logo folder" />
                        </li>
                    </Link>
                        <li>
                            <img src={Tools} alt="logo tools" />
                        </li>
                </ul>
            </div>
            <SideNotes />
        </nav>
    </>
  )
}
