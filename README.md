# Chrome Picture-in-Picture Extension 📺

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Description

A Chrome extension that enables easy Picture-in-Picture (PiP) mode activation for any video on web pages. Adds an intuitive button to every video element and offers convenient keyboard shortcuts.

## ✨ Features

- **Automatic video detection** - Extension automatically finds all video elements on the page, including embedded `iframe` videos.
- **Hover button** - A sleek, SVG-based PiP button appears in the top-right corner when hovering over video.
- **Keyboard shortcuts**:
  - `Ctrl+Shift+P` (Native) - Activates PiP for currently playing video globally across the browser. Customizable via `chrome://extensions/shortcuts`.
  - Double-click on video - Instant PiP activation (Can be disabled).
- **Options & Customization** - Access the options page to:
  - Toggle the hover button visibility.
  - Toggle the double-click functionality.
  - Blacklist specific domains where the extension should not run (e.g., YouTube, Netflix).
- **Popup interface** - Convenient control panel from the extension icon, including an easy shortcut to the Options page.
- **Dynamic content support** - Automatically handles videos added after page load.
- **Multi-language support** - English and Polish natively supported.

## 🚀 Installation

### Developer Installation

1. Download or clone this repository:
```bash
git clone https://github.com/AnonBOTpl/Chrome-Picture-in-Picture-Extension.git
cd Chrome-Picture-in-Picture-Extension
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked" and select the extension folder

5. The extension will appear in the list and be ready to use

### Chrome Web Store Installation

*Coming soon to Chrome Web Store*

## 🎮 How to Use

### Method 1: Hover Button
1. Open any page with video content
2. Hover your mouse over the video element
3. Click the appearing icon in the top-right corner

### Method 2: Keyboard Shortcut
1. Press `Ctrl+Shift+P` at any time on a page with video
2. PiP will launch for currently playing video or first available

### Method 3: Double Click
1. Double-click directly on the video element
2. PiP will launch immediately

### Method 4: Extension Panel
1. Click the extension icon in Chrome toolbar
2. Use buttons in popup to activate PiP or find videos



## 🔧 Technical Requirements

- Chrome 88+ (for Manifest V3)
- Picture-in-Picture API support in browser
- Pages must contain `<video>` elements with PiP support

## 🌍 Supported Languages

The extension supports multi-language functionality through files in the `_locales/` folder. Currently prepared for:
- English (en)
- Polish (pl)
- Additional languages can be easily added

## 🤝 Contributing

Contributions are welcome! If you'd like to help:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you found a bug or have a suggestion:
1. Check if the issue hasn't already been reported in [Issues](https://github.com/AnonBOTpl/Chrome-Picture-in-Picture-Extension/issues)
2. If not, create a new Issue with a detailed description of the problem

## 📝 License

This project is available under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**AnonBOTpl**
- GitHub: [@AnonBOTpl](https://github.com/AnonBOTpl)

## 🙏 Acknowledgments

- Chrome DevTools team for Picture-in-Picture API
- Chrome Extensions community for documentation and support

---

⭐ **If you liked this extension, leave a star on GitHub!** ⭐
