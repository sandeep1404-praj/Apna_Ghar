export const Footer = ()=>{
    return(<>
    <footer className="footer">
        <div className="footer-logo">
            <img src="logo.png" alt="Logo"/> 
            <p>© 2024 apna Ghar, Inc.<br/>All rights reserved.</p>
        </div>
        <div className="footer-columns">
            <div className="footer-column">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Our Company</h3>
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Philosophy</a></li>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Resources</h3>
                <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Policies</a></li>
                    <li><a href="#">Testimonials</a></li>
                    <li><a href="#">News</a></li>
                </ul>
            </div>
        </div>
    </footer>
    </>)
}