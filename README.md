# UnpackURL

A powerful web application for analyzing, decoding, and editing URL query parameters, built with Next.js, TypeScript, and Supabase. Perfect for developers needing to debug complex URLs including nested parameters.

## 🚀 Features

- **URL Analysis and Unpacking**: Decode and display URL components in a readable format
- **Query Parameter Editing**: Edit, add, or remove query parameters
- **Nested URL Support**: Handle URLs within query parameters recursively
- **Real-time Preview**: See the updated URL as you edit
- **Privacy-focused**: Client-side processing only, no URL data stored or tracked
- **Modern, Responsive UI**: Works on desktop, tablet, and mobile
- **Type-safe Development**: Built with TypeScript for reliability
- **Real-time Data**: Supabase integration for authenticated users
- **Analytics Integration**: Optional Tinybird analytics for usage insights

## 🛠️ Tech Stack

- **Frontend:**
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Framer Motion for animations

- **Backend/Infrastructure:**
  - Supabase for authentication and data storage
  - Tinybird for analytics
  - Vercel for deployment

## 🏁 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/crviradiya/unpackurl.git
   cd unpackurl
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment setup:
   - Copy `.env.example` to `.env.local`
   - Fill in your environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📂 Project Structure

```
unpackurl/
├── app/              # Next.js app router pages and layouts
├── components/       # React components
│   ├── shared/       # Shared components like Header, Footer
│   └── ui/           # Reusable UI components
├── constants/        # Configuration constants
├── lib/              # Utility functions and API clients
├── public/           # Static assets
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## 🧰 Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Write clean, maintainable code
- Follow the project's coding standards
- Ensure responsive design for all screen sizes
- Prioritize accessibility (WCAG AA compliance)

## 🚢 Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with a single click

## 📄 License

This project is proprietary and not open source. It is made available for personal, non-commercial use only. Commercial use requires explicit permission from the author. See the [LICENSE](LICENSE) file for details.

## 👤 Author

Built by [Chirag Viradiya](https://github.com/crviradiya)
