# Caliber Research Lab - Official Website

Official website for Caliber Research Lab, a pioneering research organization focused on advanced manufacturing and regenerative medicine.

## 🌐 Live Website

Visit us at: [https://caliberlabs.io](https://caliberlabs.io)

## 📋 About

Caliber Research Lab is dedicated to groundbreaking research in:
- **Advanced Manufacturing**: Bio 3D printers, FDM systems, SLA systems, and water cutting technologies
- **Regenerative Medicine**: Next-generation biomaterials and tissue engineering for oral healthcare

## 🛠️ Technology Stack

This is a static website built with:
- HTML5
- CSS3 (with custom properties for theming)
- Vanilla JavaScript
- Google Fonts (Inter)

## 📂 Project Structure

```
caliberlabs.io/
├── index.html              # Homepage
├── research.html           # Research focus areas
├── capabilities.html       # Lab capabilities
├── publications.html       # Research publications
├── careers.html            # Job openings
├── contact.html            # Contact information
├── css/
│   ├── style.css          # Main stylesheet
│   └── careers.css        # Careers page specific styles
├── js/
│   ├── main.js            # Main JavaScript functionality
│   └── careers.js         # Careers page specific scripts
├── images/                 # Image assets
├── CNAME                   # Custom domain configuration
└── LICENSE                 # License information
```

## ✨ Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Interactive Job Listings**: Expandable job details with apply functionality
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: Semantic HTML and ARIA labels for better accessibility
- **Fast Loading**: Optimized assets and minimal dependencies

## 🚀 Development

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/CaliberLabsIn/caliberlabs.io.git
   cd caliberlabs.io
   ```

2. Open with a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. Push to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request

## 📝 Updating Content

### Adding a New Job Posting

Edit `careers.html` and add a new job card following the existing structure:

```html
<div class="job-card">
    <div class="job-header">
        <div>
            <h3>Job Title</h3>
            <div class="job-meta">
                <span class="tag">Full-time</span>
                <span class="location">📍 Location</span>
            </div>
        </div>
        <div class="job-actions">
            <button class="btn-expand" onclick="toggleJob('jobX')">View Details</button>
            <button class="btn btn-primary" onclick="openApplicationForm('Job Title')">Apply Now</button>
        </div>
    </div>
    <div class="job-summary">
        <p>Job summary...</p>
    </div>
    <div class="job-details" id="jobX">
        <!-- Job details content -->
    </div>
</div>
```

### Adding Publications

Edit `publications.html` and add entries following the existing format.

### Updating Research Areas

Edit `research.html` to add or modify research focus areas.

## 🎨 Theming

The website supports light and dark modes. Theme variables are defined in `css/style.css`:

```css
[data-theme="light"] {
    --bg-white: #ffffff;
    --primary-dark: #1a202c;
    --primary-cyan: #3498db;
    /* ... */
}

[data-theme="dark"] {
    --bg-white: #1a202c;
    --primary-dark: #e2e8f0;
    --primary-cyan: #4a9eff;
    /* ... */
}
```

## 📧 Contact

- **Email**: careers@caliberlab.in
- **Location**: Chikhli, Gujarat, India
- **GitHub**: [CaliberLabsIn](https://github.com/CaliberLabsIn)

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 🙏 Acknowledgments

- Icons and emojis for visual enhancement
- Google Fonts for typography
- Zoho Forms for application processing

---

**Built with ❤️ by the Caliber Research Lab Team**
