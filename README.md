# ResuX - Free Resume Builder

A modern, free resume builder built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful, professional templates with real preview designs
- ⚡ Fast and intuitive resume builder
- 📱 Fully mobile-responsive design
- 💾 Auto-save to browser local storage
- 👁️ Real-time live preview
- 📄 Export to PDF (client-side)
- 📸 Photo upload support
- 🆓 100% Free Forever - No login required

## Tech Stack

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **jsPDF & html2canvas** - PDF export
- **Lucide React** - Icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ResuX/
├── app/
│   ├── builder/          # Resume builder page
│   ├── templates/        # Template selection page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── Footer.tsx        # Footer component
│   ├── Navbar.tsx        # Navigation bar
│   └── ResumePreview.tsx # Resume preview component
├── lib/
│   ├── pdfExport.ts      # PDF export utility
│   ├── resumeStorage.ts  # Local storage utilities
│   └── utils.ts          # Utility functions
└── types/
    └── resume.ts         # TypeScript types
```

## Usage

1. **Choose a Template**: Visit the Templates page and select a design
2. **Build Your Resume**: Fill in your information in the builder
3. **Live Preview**: See your resume update in real-time
4. **Save**: Your data is automatically saved to local storage
5. **Export**: Download your resume as a PDF

## License

Free to use forever. No restrictions.

