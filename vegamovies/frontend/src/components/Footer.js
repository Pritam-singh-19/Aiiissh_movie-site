import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Aiiissh. All Rights Reserved.</p>
      <p>connect with us </p>
      <div className="social-links">
        <a href="https://www.pinterest.com/Aiiissh" target="_blank" rel="noopener noreferrer">
          <img src="/pinterest-logo.png" alt="Pinterest" />
        </a>
        <a href="https://www.instagram.com/pritamsingh1903" target="_blank" rel="noopener noreferrer">
          <img src="/instagram logo.jpeg" alt="Instagram" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
 