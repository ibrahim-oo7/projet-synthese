import { Link, useNavigate } from "react-router-dom";
function Header(){
    const navigate = useNavigate();
    return(
        <div className="header">
            <div className="logo">
            <img src="logo.png" alt="" className="img"/>
            <h2 className="titre">FormInova</h2>
            </div>
            <input type="text" placeholder="Search Courses..." className="search"/>
            <ul className="nav-links">
                <li>Home</li>
                <li>About'us</li>
                <li>Courses</li>
            </ul>
            <div className="auth-buttons">
            
            <button className="login" onClick={() => { window.scrollTo(0, 0); navigate('/'); }}>Logout</button>
        </div>
        </div>
    )
}
export default Header;