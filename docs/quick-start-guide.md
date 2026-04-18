# 🚀 Quick Start Guide - AI Dashboard Project

## Before You Begin

### Prerequisites Checklist
- [ ] Node.js installed (v18 or higher)
- [ ] Code editor (VS Code recommended)
- [ ] Git installed
- [ ] OpenAI API account & key
- [ ] Basic knowledge of React/Next.js
- [ ] Terminal/Command line familiarity

### Required Accounts
1. **OpenAI**: Get API key from https://platform.openai.com/api-keys
2. **Vercel**: Free account for frontend deployment
3. **GitHub**: For version control and deployment
4. **Render/Railway**: Free tier for backend hosting

---

## Day 1 Action Plan

### Morning (3-4 hours)
**Phase 1: Foundation Setup**

```bash
# Create Next.js project
npx create-next-app@latest ai-dashboard --typescript --tailwind --app

# Navigate to project
cd ai-dashboard

# Install dependencies
npm install recharts axios papaparse lucide-react

# Install dev dependencies
npm install -D @types/papaparse
```

**Configure Tailwind (tailwind.config.ts):**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0071E3',
        'apple-grey': '#86868B',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
      borderRadius: {
        'apple': '20px',
      },
      boxShadow: {
        'apple': '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
export default config
```

**Create folder structure:**
```
/app
  /api
  /components
    /ui
      Button.tsx
      Card.tsx
      Input.tsx
    /features
  /lib
    /utils
  /styles
  layout.tsx
  page.tsx
```

### Afternoon (3-4 hours)
**Create base UI components**

**components/ui/Button.tsx:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = 'rounded-xl font-semibold transition-all duration-200';
  
  const variants = {
    primary: 'bg-gradient-to-r from-apple-blue to-blue-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-white text-apple-blue border-2 border-apple-blue hover:bg-gray-50'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Test your setup:**
```bash
npm run dev
```

Visit http://localhost:3000 - you should see the Next.js welcome page.

---

## Week 1 Goals

### Days 1-2: Foundation ✅
- Project setup complete
- Design system implemented
- Base components created

### Days 3-4: File Upload
- Drag-and-drop interface
- CSV parsing
- File preview

### Days 5-6: Data Display
- Table component
- Sorting/filtering
- Pagination

### Day 7: Charts
- Recharts integration
- Basic visualizations

---

## Critical Design Decisions

### 1. State Management
**Recommendation:** Start with React Context, migrate to Zustand if needed

```typescript
// lib/store/DataContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

interface DataContextType {
  csvData: any[] | null;
  setCsvData: (data: any[]) => void;
  fileName: string | null;
  setFileName: (name: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <DataContext.Provider value={{ csvData, setCsvData, fileName, setFileName }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
```

### 2. API Structure
**Backend separate from frontend (recommended):**
- Frontend: Next.js on Vercel
- Backend: Express on Render
- Easier scaling and independent deployments

**Alternative - Next.js API routes:**
- Simpler setup
- Good for MVP
- All in one repo

### 3. Data Storage Strategy
**Phase 1 (MVP):** In-memory storage
**Phase 2:** Local file system
**Phase 3:** Database (PostgreSQL/MongoDB)

---

## Cost Breakdown

### Development (Free)
- Next.js: Free
- Tailwind CSS: Free
- Recharts: Free
- React: Free

### Services
- **OpenAI API**: $5-20/month (pay-as-you-go)
  - GPT-3.5-turbo: ~$0.50 per 1M tokens
  - GPT-4: ~$30 per 1M tokens
  - Start with 3.5-turbo for cost efficiency

- **Hosting**:
  - Vercel: Free tier (perfect for this project)
  - Render: Free tier (with limitations)
  - Total: $0-5/month

### Total Monthly Cost: $5-25

---

## Common Pitfalls to Avoid

### 1. ❌ Over-engineering Early
**Don't:** Set up complex state management, database, authentication on Day 1
**Do:** Start simple, add complexity as needed

### 2. ❌ Ignoring Mobile
**Don't:** Build desktop-only, then retrofit mobile
**Do:** Use Tailwind's responsive utilities from the start

### 3. ❌ Hardcoding API Keys
**Don't:** Put API keys in code
**Do:** Use environment variables (.env.local)

### 4. ❌ Perfect Design First Try
**Don't:** Spend days on pixel-perfect design
**Do:** Get functionality working, then polish

### 5. ❌ Skipping Error Handling
**Don't:** Assume everything works
**Do:** Add try-catch, user feedback, loading states

---

## Testing Strategy

### MVP Testing (Days 1-7)
- Manual testing in browser
- Test with sample CSV files
- Chrome DevTools for debugging

### Production Testing (Days 8-14)
- Unit tests for utility functions
- Integration tests for API
- E2E tests for critical flows

---

## Sample CSV Files for Testing

Create these files in `/public/samples/`:

**sales.csv:**
```csv
date,product,region,sales,quantity
2024-01-01,Product A,North,1200,15
2024-01-01,Product B,South,800,10
2024-01-02,Product A,East,1500,20
2024-01-02,Product C,West,900,12
```

**users.csv:**
```csv
user_id,name,age,country,signup_date
1,John Doe,28,USA,2024-01-15
2,Jane Smith,32,UK,2024-01-16
3,Bob Johnson,45,Canada,2024-01-17
```

---

## Resources & Documentation

### Official Docs
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Recharts: https://recharts.org/en-US/
- OpenAI API: https://platform.openai.com/docs

### Tutorials
- Next.js 14 App Router: https://www.youtube.com/watch?v=wm5gMKuwSYk
- Tailwind CSS Crash Course: https://www.youtube.com/watch?v=UBOj6rqRUME
- Recharts Tutorial: https://www.youtube.com/watch?v=Cd0gqN2Tfig

### Communities
- Next.js Discord: https://nextjs.org/discord
- Stack Overflow: Tag with [next.js], [tailwind-css]
- Reddit: r/nextjs, r/webdev

---

## Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: Project setup"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Daily Workflow
```bash
# Start new feature
git checkout -b feature/file-upload

# Make changes, commit frequently
git add .
git commit -m "Add file upload component"

# Push to GitHub
git push origin feature/file-upload

# Merge to main when done
git checkout main
git merge feature/file-upload
git push origin main
```

---

## Success Metrics

### Week 1 Complete When:
- [x] User can upload CSV
- [x] Data displays in table
- [x] Basic chart renders
- [x] Responsive on mobile

### Week 2 Complete When:
- [x] AI query processing works
- [x] Multiple chart types
- [x] Insights generation
- [x] Deployed live

---

## Emergency Contacts & Help

### Stuck on Setup?
- Check Node version: `node --version` (should be 18+)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules && npm install`

### API Not Working?
- Check .env.local file exists
- Verify OPENAI_API_KEY is set
- Test API key at https://platform.openai.com/playground

### Deployment Issues?
- Vercel build logs: Check dashboard
- Environment variables: Set in Vercel dashboard
- Build command: Should be `npm run build`

---

## Next Steps

1. **Right Now:** Set up development environment
2. **Today:** Complete Phase 1 (Foundation)
3. **This Week:** Complete Phases 1-7
4. **Week 2:** AI integration & polish
5. **Day 14:** Deploy & celebrate! 🎉

---

**Remember:** Build in public, ask for help, iterate quickly. You've got this! 💪

---

## Quick Commands Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run tests
npm test

# Install new package
npm install <package-name>

# Format code (if using Prettier)
npm run format

# Lint code
npm run lint
```

Good luck! 🚀
