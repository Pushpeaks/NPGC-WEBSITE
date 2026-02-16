(function () {
    // Find how many levels deep we are to the root
    // Assumes the assets folder is at the root
    const scripts = document.getElementsByTagName('script');
    let rootPath = '';

    // Attempt to find the root path based on this script's location
    for (let i = 0; i < scripts.length; i++) {
        const src = scripts[i].getAttribute('src');
        if (src && src.includes('footer-loader.js')) {
            const parts = src.split('assets/js/footer-loader.js');
            if (parts.length > 0) {
                rootPath = parts[0];
            }
            break;
        }
    }

    const cssUrl = rootPath + 'assets/includes/footer.css';

    // IMMEDIATE: Inject CSS
    if (!document.querySelector(`link[href="${cssUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        document.head.appendChild(link);
    }

    // Footer HTML content embedded to support local file viewing (file://)
    const footerHTML = `
<footer class="main-footer">
    <div class="footer-container">
        <!-- About Section -->
        <div class="footer-column">
            <h3>About NPGC</h3>
            <div class="footer-content">
                <p>National P.G. College</p>
                <p>2, Rana Pratap Marg</p>
                <p>Lucknow 226001, India</p>
            </div>

            <div class="footer-follow">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="https://twitter.com" target="_blank" class="social-icon"><i class="fab fa-twitter"></i></a>
                    <a href="https://facebook.com/npgcin" target="_blank" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/@npgcin14" target="_blank" class="social-icon"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.instagram.com/npgcin" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>

        <!-- Important Links -->
        <div class="footer-column">
            <h3>Important Links</h3>
            <ul class="footer-links">
                <li><a href="https://www.lkouniv.ac.in/" target="_blank">University of Lucknow</a></li>
                <li><a href="https://www.education.gov.in/" target="_blank">Ministry of Education</a></li>
                <li><a href="https://www.ugc.ac.in/" target="_blank">UGC</a></li>
                <li><a href="http://www.naac.gov.in/" target="_blank">NAAC</a></li>
            </ul>
        </div>

        <!-- Quick Contact -->
        <div class="footer-column">
            <h3>Quick Contact</h3>
            <div class="footer-content">
                <p>Phone: +91 522 4021304</p>
                <p>Email: support@npgc.in</p>
            </div>
        </div>

        <!-- Our Location -->
        <div class="footer-column">
            <h3>Our Location</h3>
            <div class="footer-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d80.9409029!3d26.8567355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0a819131cb:0x11553d04f3a32d9c!2sNational%20Post%20Graduate%20College!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                    width="100%" height="120" style="border:0; border-radius: 4px;" allowfullscreen="" loading="lazy">
                </iframe>
            </div>
        </div>

    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 National P.G. College. All Rights Reserved.</p>
    </div>
</footer>`;

    // Function to load the footer
    function loadFooter() {
        const placeholder = document.getElementById('footer-placeholder');
        if (!placeholder) return false;

        if (placeholder.innerHTML.trim() !== '') return true;

        // Inject HTML
        placeholder.innerHTML = footerHTML;
        return true;
    }

    // Try to load immediately
    if (!loadFooter()) {
        document.addEventListener('DOMContentLoaded', loadFooter);
    }
})();


