# 🔐 Password Generator Project

A simple, accessible password generator built with **HTML**, **CSS**, and **JavaScript**, including ARIA live-region support for screen readers.

## ⭐ Features

- Generate two secure passwords at once
- Options to select password length and include **numbers**, **symbols**, and **letters**
- Option for **numeric-only** passwords
- Click-to-copy functionality for each password
- Screen-reader friendly **live status announcements** using `aria-live="polite"`
- Responsive styling and accessible markup

## ♿ Accessibility

This project includes:

- A `<p role='status' aria-live='polite'>` live region
- Dynamic announcements such as:
  - "Two passwords generated."
  - "Password 1 copied."
  - "Password 2 copied."
- Non-visual feedback using screen-reader-only text

## 🧠 How It Works

### 1. Password Generation Logic

Passwords are generated from three character pools:

- **Numbers** (0–9)
- **Symbols** (!, @, #, etc.)
- **Letters** (a–z, A–Z)

The user chooses password length and which sets to include.

### 2. 📋 Clipboard Copying

Clicking a generated password:

- Copies it to the clipboard
- Displays a small visual message
- Announces the action to screen readers

### 3. 🔊 Live Region Announcements

The `announceStatus(message)` function updates the `#status` element to notify assistive technologies.

## 📁 Code Structure

```
index.html    → Markup and live region
style.css     → Styling
script.js     → Password generation and accessibility logic
```

## 🛠 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/password-generator.git
cd password-generator
```

Open `index.html` in your browser.

## 🎨 Customization

You can modify:

- Character sets in `characters` object
- Visual theme in `style.css`
- Announcement messages in `announceStatus()`

## 🎓 Scrimba Project

This project is part of the Scrimba Front-end Developer course:

Password Generator.

## 📄 License

This project is licensed under the
**Creative Commons Attribution–NonCommercial 4.0 International (CC BY‑NC 4.0)** license.

You are free to:

✔ Use the code  
✔ Modify it  
✔ Share it

…but **only for personal and non‑commercial purposes**.  
Commercial use is **not permitted**.

For full legal details, see the official license:  
🔗 https://creativecommons.org/licenses/by-nc/4.0/
