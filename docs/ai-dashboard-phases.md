# 🎯 AI Data Analyst Dashboard - 15-Phase Development Plan
## Apple-Inspired Design Aesthetic

---

## **Phase 1: Foundation & Design System**
**Duration:** 1-2 days

### Master Prompt:
```
Create a Next.js 14 project with TypeScript and Tailwind CSS configured. Implement a comprehensive design system inspired by Apple's Human Interface Guidelines:

DESIGN TOKENS:
- Colors:
  * Primary: Gradient from #0071E3 to #0077ED (Apple blue)
  * Background: #FBFBFD (light), #1D1D1F (dark)
  * Surface: #FFFFFF with subtle shadows
  * Text: #1D1D1F (primary), #86868B (secondary)
  * Accent: #06C (links), #34C759 (success), #FF3B30 (error)

- Typography:
  * Headings: SF Pro Display (-apple-system, BlinkMacSystemFont)
  * Body: SF Pro Text
  * Scale: 13px, 17px, 21px, 28px, 40px, 56px
  * Weight: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

- Spacing: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64, 96)

- Border Radius: 
  * Small: 8px
  * Medium: 12px
  * Large: 20px
  * XLarge: 28px

- Shadows:
  * Subtle: 0 1px 3px rgba(0, 0, 0, 0.04)
  * Card: 0 4px 16px rgba(0, 0, 0, 0.08)
  * Elevated: 0 12px 48px rgba(0, 0, 0, 0.12)

- Motion:
  * Duration: 200ms (quick), 400ms (standard), 600ms (deliberate)
  * Easing: cubic-bezier(0.4, 0, 0.2, 1)

PROJECT STRUCTURE:
/app
  /api
  /components
    /ui (button, card, input, etc.)
    /features
  /lib
  /styles
  globals.css
  layout.tsx
  page.tsx

Create reusable UI components: Button, Card, Input, Select with Apple-style hover states and transitions. Use glassmorphism effects where appropriate.
```

**Deliverables:**
- ✅ Next.js project with TypeScript
- ✅ Tailwind config with custom design tokens
- ✅ Base UI component library
- ✅ Dark mode support
- ✅ Responsive layout system

---

## **Phase 2: Landing Page & Navigation**
**Duration:** 1 day

### Master Prompt:
```
Design and implement the main landing page with Apple-aesthetic principles:

LAYOUT:
- Full-viewport hero section with gradient background
- Floating navigation bar (blur effect on scroll)
- Center-aligned content with generous white space
- Minimal, purposeful copy

HERO SECTION:
- Large heading: "Data Analysis, Reimagined"
- Subheading: "Upload. Ask. Understand. AI-powered insights in seconds."
- Primary CTA: "Get Started" (prominent blue button with subtle shadow)
- Secondary CTA: "See How It Works" (text link)
- Animated background gradient or subtle particle effect

NAVIGATION:
- Logo on left
- Menu items: Features, How It Works, Pricing (for future)
- "Dashboard" button on right
- Sticky navigation with backdrop blur when scrolling
- Smooth scroll animations

VISUAL ELEMENTS:
- Use SF Symbols-inspired icons
- Subtle fade-in animations on scroll
- Mockup preview of the dashboard (use placeholder)
- Feature cards with hover lift effect

RESPONSIVE:
- Mobile: Stack elements, hamburger menu
- Tablet: 2-column grid for features
- Desktop: Multi-column layout with side padding
```

**Deliverables:**
- ✅ Marketing landing page
- ✅ Sticky navigation with blur effect
- ✅ Animated hero section
- ✅ Feature showcase cards

---

## **Phase 3: File Upload Interface**
**Duration:** 1-2 days

### Master Prompt:
```
Create an elegant file upload interface inspired by macOS Finder drag-drop:

UPLOAD COMPONENT:
- Large dropzone with dashed border (subtle, not aggressive)
- Center icon: Document with arrow (SF Symbols style)
- Text: "Drag CSV file here" / "or click to browse"
- Hover state: Lift effect + border color change to blue
- Active drag state: Solid blue border, slight scale animation

FILE PREVIEW:
- After upload: Show file card with:
  * File icon (CSV badge)
  * Filename (truncate with ellipsis if long)
  * File size (human-readable: "2.4 MB")
  * Row/column count preview
  * Remove button (X icon, subtle, appears on hover)
- Card style: White background, soft shadow, rounded corners

STATES:
- Idle: Neutral grey
- Hover: Blue tint
- Uploading: Progress bar (Apple-style indeterminate loader)
- Success: Green checkmark animation
- Error: Red border + error message below

VALIDATIONS:
- Accept only .csv files
- Max size: 50MB
- Show inline error messages with icons
- Toast notification for success/failure

TECHNICAL:
- Use React Dropzone or custom implementation
- File reading with FileReader API
- Parse CSV headers immediately for preview
- Store file in state (don't upload to server yet)
```

**Deliverables:**
- ✅ Drag-and-drop file upload
- ✅ File validation & error handling
- ✅ Upload progress indicator
- ✅ File preview card

---

## **Phase 4: Backend API Foundation**
**Duration:** 1-2 days

### Master Prompt:
```
Build a robust Node.js + Express.js backend with clean architecture:

PROJECT STRUCTURE:
/backend
  /src
    /routes
      upload.routes.js
      query.routes.js
    /controllers
      upload.controller.js
      query.controller.js
    /services
      csv.service.js
      ai.service.js
    /middleware
      errorHandler.js
      validation.js
    /utils
      logger.js
  server.js
  .env

API ENDPOINTS:
POST /api/upload
- Accept multipart/form-data
- Validate file type and size
- Parse CSV using PapaParse
- Return: { success, fileId, columns, rowCount, preview }

POST /api/query
- Body: { fileId, question }
- Process natural language query
- Return: { data, chartType, insights }

GET /api/files/:fileId
- Retrieve stored file metadata
- Return columns and sample data

MIDDLEWARE:
- CORS configuration (allow frontend origin)
- Body parser (json, urlencoded)
- File upload handling (Multer)
- Error handling middleware
- Request logging

CSV PROCESSING:
- Use PapaParse for parsing
- Detect column types (number, string, date)
- Store in memory or temporary file system
- Generate data statistics (min, max, avg, count)

RESPONSE FORMAT:
{
  "success": true,
  "data": {...},
  "meta": {
    "timestamp": "2024-...",
    "processingTime": "120ms"
  }
}

ERROR HANDLING:
- Standard error codes (400, 404, 500)
- Descriptive error messages
- Log errors with winston
```

**Deliverables:**
- ✅ Express.js server setup
- ✅ File upload endpoint
- ✅ CSV parsing service
- ✅ Error handling middleware
- ✅ API documentation

---

## **Phase 5: Data Table Display**
**Duration:** 1-2 days

### Master Prompt:
```
Create a sophisticated data table component with Apple design language:

TABLE DESIGN:
- Clean white/dark mode backgrounds
- Subtle grid lines (1px, #E5E5E7)
- Header row: Slightly darker background, semibold text
- Alternating row backgrounds for readability
- Hover effect: Light blue highlight (#F5F5F7)
- Selected row: Blue tint background

FEATURES:
- Virtual scrolling for large datasets (use react-window)
- Fixed header on scroll
- Column sorting (click header, show arrow indicator)
- Column resizing (drag column border)
- Search/filter bar above table
- Pagination (Apple-style dots + arrows)
- Rows per page selector (10, 25, 50, 100)

HEADER:
- Column names in title case
- Data type indicators (icon: 123 for numbers, ABC for text, 📅 for dates)
- Sort arrows (subtle, only visible on hover)
- Overflow menu for column actions (hide, rename)

CELL RENDERING:
- Numbers: Right-aligned, formatted with commas
- Dates: Consistent format (MMM DD, YYYY)
- Long text: Truncate with ellipsis + tooltip on hover
- Empty cells: "-" in light grey

RESPONSIVENESS:
- Mobile: Card view instead of table
- Tablet: Horizontal scroll with sticky first column
- Desktop: Full table with all features

INTERACTIONS:
- Smooth animations for sorting
- Keyboard navigation (arrow keys, tab)
- Accessibility: ARIA labels, screen reader support

TOOLBAR:
- Search input (magnifying glass icon)
- Filter dropdown (funnel icon)
- Export button (download icon)
- View options (list/grid toggle)
```

**Deliverables:**
- ✅ Virtual scrolled data table
- ✅ Sorting & filtering
- ✅ Search functionality
- ✅ Responsive card view
- ✅ Export to CSV option

---

## **Phase 6: Chart Visualization Foundation**
**Duration:** 2 days

### Master Prompt:
```
Implement beautiful data visualizations using Recharts with Apple aesthetics:

CHART LIBRARY SETUP:
- Install Recharts
- Create reusable chart wrapper components
- Implement consistent theming across all charts

CHART TYPES:
1. Line Chart (trend analysis)
2. Bar Chart (comparisons)
3. Pie/Donut Chart (composition)
4. Area Chart (cumulative trends)

DESIGN PRINCIPLES:
- Colors: Use gradient fills (#0071E3 → #00A3FF)
- Backgrounds: Transparent or subtle grid
- Axes: Minimal, clean labels
- Gridlines: Dotted, light grey (#E5E5E7)
- Tooltips: Floating cards with blur effect
- Legends: Horizontal, below chart, with colored dots

COMPONENT STRUCTURE:
ChartContainer
- Responsive wrapper (maintain aspect ratio)
- Loading state (skeleton loader)
- Empty state (placeholder message)
- Title and description section

INTERACTIVITY:
- Hover tooltips with smooth animations
- Click to select data points
- Zoom and pan for time series
- Legend toggle to show/hide series
- Export chart as PNG/SVG

RESPONSIVE BEHAVIOR:
- Mobile: Single column, reduced height
- Tablet: 2 charts per row
- Desktop: Grid layout, 2-3 charts per row

ACCESSIBILITY:
- ARIA labels for screen readers
- Keyboard navigation
- High contrast mode support
- Alt text for exported images

EXAMPLE CONFIGURATION:
Line Chart:
- Smooth curves (monotone)
- Data points only on hover
- Gradient fill under line
- Animated line drawing on mount
- X-axis: Time labels (smart formatting)
- Y-axis: Auto-scaled with currency/percentage formatting

Bar Chart:
- Rounded corners on bars
- Spacing between bars
- Gradient fill or solid color
- Value labels on top of bars (optional)
- Horizontal or vertical orientation
```

**Deliverables:**
- ✅ Recharts integration
- ✅ Line, Bar, Pie chart components
- ✅ Responsive chart containers
- ✅ Interactive tooltips
- ✅ Export functionality

---

## **Phase 7: AI Service Integration**
**Duration:** 1-2 days

### Master Prompt:
```
Set up AI integration using OpenAI API for natural language query processing:

SETUP:
- Install OpenAI SDK
- Configure API key in environment variables
- Create AI service layer with error handling

AI SERVICE STRUCTURE:
/services/ai.service.js
- Function: processNaturalLanguageQuery(question, dataSchema)
- Function: generateInsights(data, context)
- Function: suggestVisualizations(queryType)

QUERY PROCESSING WORKFLOW:
1. Receive user question
2. Send to OpenAI with data schema context
3. Parse AI response into structured format
4. Return actionable query parameters

PROMPT ENGINEERING:
System Prompt:
"""
You are a data analysis expert. Convert natural language questions into structured query objects.

Available data columns: {columns}
Data types: {types}
Sample data: {preview}

When given a question, respond with a JSON object:
{
  "operation": "aggregation|filter|sort|top|trend",
  "column": "column_name",
  "metric": "sum|avg|count|max|min",
  "groupBy": "column_name",
  "limit": number,
  "filter": { "column": "value" },
  "chartType": "line|bar|pie",
  "visualization": {
    "type": "chart_type",
    "xAxis": "column",
    "yAxis": "column"
  }
}

Examples:
Q: "Show monthly sales trend"
A: { "operation": "trend", "column": "date", "groupBy": "month", "metric": "sum", "chartType": "line" }

Q: "Top 5 products by revenue"
A: { "operation": "top", "column": "product", "metric": "sum", "limit": 5, "chartType": "bar" }
"""

ERROR HANDLING:
- API rate limiting (implement retry with exponential backoff)
- Invalid responses (fallback to predefined query templates)
- Network errors (show user-friendly messages)
- Token limit exceeded (chunk large datasets)

OPTIMIZATION:
- Cache frequent queries
- Implement request debouncing
- Stream responses for better UX
- Use GPT-3.5-turbo for speed, GPT-4 for complex queries

RESPONSE PARSING:
- Validate AI JSON output
- Sanitize parameters
- Map to internal query engine
- Log queries for improvement
```

**Deliverables:**
- ✅ OpenAI API integration
- ✅ Prompt engineering system
- ✅ Query parsing logic
- ✅ Error handling & retries
- ✅ Response caching

---

## **Phase 8: Data Processing Engine**
**Duration:** 2 days

### Master Prompt:
```
Build a powerful data processing engine that executes AI-generated queries:

QUERY ENGINE ARCHITECTURE:
/services/dataProcessor.service.js

Core Functions:
1. executeQuery(data, queryParams)
2. aggregateData(data, groupBy, metric)
3. filterData(data, conditions)
4. sortData(data, column, order)
5. getTopN(data, column, n)
6. calculateMetrics(data, column)

SUPPORTED OPERATIONS:

1. AGGREGATION:
Input: { operation: "aggregation", column: "sales", metric: "sum", groupBy: "month" }
Output: Monthly sales totals

2. FILTERING:
Input: { operation: "filter", conditions: [{ column: "region", operator: "equals", value: "North" }] }
Output: Filtered dataset

3. SORTING:
Input: { operation: "sort", column: "revenue", order: "desc" }
Output: Sorted dataset

4. TOP N:
Input: { operation: "top", column: "product", metric: "revenue", limit: 5 }
Output: Top 5 products

5. TREND ANALYSIS:
Input: { operation: "trend", column: "date", metric: "sales", groupBy: "month" }
Output: Time-series data

6. STATISTICAL:
Input: { operation: "stats", column: "price" }
Output: { min, max, avg, median, stdDev }

DATA TRANSFORMATION:
- Date parsing and formatting
- Number formatting (currency, percentage)
- String normalization
- Handle null/undefined values
- Type coercion

OPTIMIZATION:
- Use lodash for efficient operations
- Implement memoization for repeated queries
- Lazy evaluation for large datasets
- Web Workers for heavy computations

VALIDATION:
- Check column existence
- Validate data types
- Handle edge cases (empty datasets, single row)
- Sanitize user inputs

RESULT FORMATTING:
{
  "data": [...],
  "metadata": {
    "rowCount": 100,
    "processingTime": "45ms",
    "queryType": "aggregation"
  },
  "visualization": {
    "chartType": "bar",
    "xAxis": "month",
    "yAxis": "total_sales",
    "format": {
      "yAxis": "currency"
    }
  }
}
```

**Deliverables:**
- ✅ Query execution engine
- ✅ Data aggregation functions
- ✅ Filter & sort utilities
- ✅ Statistical calculations
- ✅ Performance optimization

---

## **Phase 9: Chat Interface**
**Duration:** 2 days

### Master Prompt:
```
Create a conversational chat interface inspired by iMessage/macOS Messages:

LAYOUT:
- Left sidebar: File info panel (collapsible)
- Center: Chat conversation area
- Right: Visualization results panel

CHAT DESIGN:
- Messages bubble design:
  * User: Right-aligned, blue gradient (#0071E3)
  * AI: Left-aligned, light grey (#F5F5F7)
  * Rounded corners (20px)
  * Tail pointer (optional, subtle)
  * Max width: 70% of container

- Message content:
  * Text: SF Pro Text, 15px
  * Timestamp: Small grey text below
  * Status indicators: Sending, sent, error
  * Avatar icons (user initial, AI robot icon)

INPUT AREA:
- Sticky bottom bar with blur background
- Multi-line text input (auto-expand, max 5 lines)
- Placeholder: "Ask a question about your data..."
- Send button: Blue circle with arrow icon
- Microphone icon for voice input (future)
- Attach file icon (future enhancement)

SUGGESTIONS:
- Show smart suggestions as chips above input:
  * "Show sales trend"
  * "Top 5 products"
  * "Average order value"
  * "Compare regions"
- Tap to populate input
- Fade in animation

MESSAGE TYPES:
1. Text message
2. Chart result (embedded visualization)
3. Table result (compact view with "View full table" link)
4. Error message (red accent, helpful text)
5. Loading message (animated dots)

INTERACTIONS:
- Smooth scroll to bottom on new message
- Auto-focus input after sending
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Copy message text on long-press
- Regenerate response button (retry icon)

ANIMATIONS:
- Message slide-in from bottom
- Typing indicator (three animated dots)
- Chart fade-in with scale effect
- Skeleton loaders for pending charts

ACCESSIBILITY:
- Screen reader announcements for new messages
- Keyboard navigation
- Focus management
- ARIA labels

EXAMPLE MESSAGE FLOW:
User: "Show monthly sales trend"
AI: [Typing indicator]
AI: "Here's your sales trend analysis:"
    [Line chart embedded]
    "Sales increased by 24% from January to March."
    [View Details button]
```

**Deliverables:**
- ✅ Chat interface layout
- ✅ Message bubbles (user & AI)
- ✅ Input component with suggestions
- ✅ Typing indicators
- ✅ Message history

---

## **Phase 10: Insights Generation**
**Duration:** 2 days

### Master Prompt:
```
Implement intelligent insights generation using AI:

INSIGHTS ENGINE:
Generate contextual insights based on data analysis:

1. TREND INSIGHTS:
- "Sales increased by 23% month-over-month"
- "Peak performance in Q3 with $1.2M revenue"
- "Declining trend observed since October"

2. COMPARATIVE INSIGHTS:
- "North region outperforms South by 45%"
- "Product A accounts for 60% of total revenue"
- "Weekend sales are 2x higher than weekdays"

3. ANOMALY DETECTION:
- "Unusual spike detected on March 15th"
- "This month's revenue is 3σ above average"
- "Missing data for 12 days in February"

4. PREDICTIVE INSIGHTS:
- "Based on current trend, expect $500K next month"
- "Seasonality pattern suggests peak in December"

AI PROMPT FOR INSIGHTS:
"""
Analyze this data and provide 3-5 actionable insights:

Data Summary:
{statistics}

Chart Type: {chartType}
Time Period: {dateRange}
Key Metrics: {metrics}

Generate insights in this format:
- Trend observation (% change, direction)
- Comparison (highest, lowest, outliers)
- Recommendation (actionable next step)

Be concise, specific, and business-focused.
"""

INSIGHT CARD DESIGN:
- Icon: Light bulb or trend arrow
- Title: Bold, concise (max 60 chars)
- Description: 1-2 sentences
- Metric: Highlighted number or percentage
- Color coding:
  * Green: Positive trend
  * Red: Negative trend
  * Blue: Neutral information

DISPLAY:
- Show insights below chart
- Collapsible accordion for multiple insights
- Smooth expand/collapse animation
- Share button for individual insights

SMART RECOMMENDATIONS:
Based on insights, suggest:
- "Export this chart for presentation"
- "Set up alert for this metric"
- "Compare with previous period"
- "Drill down into this segment"

PERSONALIZATION:
- Learn from user interactions
- Prioritize insights based on viewing history
- Remember preferred metrics
```

**Deliverables:**
- ✅ AI-powered insights generation
- ✅ Insight card components
- ✅ Trend analysis
- ✅ Anomaly detection
- ✅ Smart recommendations

---

## **Phase 11: Dashboard Layout**
**Duration:** 1-2 days

### Master Prompt:
```
Create a comprehensive dashboard view with Apple-inspired layout:

DASHBOARD STRUCTURE:
Header Bar:
- App logo/name
- File selector dropdown
- User profile menu
- Settings icon
- Theme toggle (light/dark)

Main Grid Layout:
- CSS Grid with responsive breakpoints
- Card-based design
- Drag-and-drop rearrangement (optional)

CARD COMPONENTS:
1. Overview Card:
   - Key metrics (4 tiles)
   - Large numbers with trend indicators
   - Sparkline mini-charts

2. Chart Cards:
   - Title with description
   - Chart visualization
   - Expand button (fullscreen modal)
   - Download/share options

3. Insights Card:
   - AI-generated insights list
   - Refresh button
   - "Ask AI" quick action

4. Recent Queries Card:
   - History of asked questions
   - Click to re-run
   - Clear history option

CARD STYLING:
- White/dark background
- Soft shadow: 0 2px 8px rgba(0,0,0,0.08)
- Border radius: 16px
- Padding: 24px
- Hover: Subtle lift effect

GRID LAYOUT:
Desktop (1920px+):
- 4 columns
- Sidebar: 280px
- Main: Flexible

Tablet (768px - 1919px):
- 2 columns
- Collapsible sidebar

Mobile (< 768px):
- 1 column
- Bottom navigation

EMPTY STATES:
- No data uploaded: Large icon + CTA
- No charts: Suggestion cards
- No insights: Placeholder message

LOADING STATES:
- Skeleton loaders for cards
- Progressive rendering
- Shimmer effect

HEADER METRICS:
- Total rows
- Total columns
- Last updated timestamp
- File size

ACTIONS BAR:
- Add new chart
- Export dashboard
- Share link
- Schedule report
```

**Deliverables:**
- ✅ Dashboard grid layout
- ✅ Overview metrics cards
- ✅ Chart containers
- ✅ Sidebar navigation
- ✅ Responsive design

---

## **Phase 12: Advanced Visualizations**
**Duration:** 2 days

### Master Prompt:
```
Implement advanced chart types and interactive features:

CHART TYPES:
1. Heatmap:
   - Color gradient visualization
   - Hover to show values
   - Use case: Correlation matrix

2. Scatter Plot:
   - Correlation analysis
   - Trend line overlay
   - Quadrant divisions

3. Combo Chart:
   - Line + Bar combination
   - Dual Y-axes
   - Different metrics on same timeline

4. Funnel Chart:
   - Conversion analysis
   - Stage-by-stage breakdown
   - Percentage labels

5. Gauge Chart:
   - KPI visualization
   - Target vs actual
   - Color zones (red/yellow/green)

INTERACTIVITY:
- Brush selection (zoom on time range)
- Cross-filtering (click bar to filter other charts)
- Drill-down (click to see details)
- Annotations (mark important events)

CUSTOMIZATION PANEL:
- Chart type selector
- Color scheme picker
- Axis configuration
- Legend position
- Data label toggle

ANIMATION:
- Entrance animations (stagger effect)
- Transition animations on data change
- Loading state with skeleton
- Smooth updates (no jarring redraws)

EXPORT OPTIONS:
- PNG (high resolution)
- SVG (vector format)
- PDF (with context)
- CSV (underlying data)

COMPARISON MODE:
- Side-by-side charts
- Overlay mode
- Difference highlighting
- Synchronized axes

REAL-TIME UPDATES:
- Live data refresh (polling)
- Smooth transitions
- Update notifications
- Pause/resume controls
```

**Deliverables:**
- ✅ Advanced chart types
- ✅ Interactive features
- ✅ Chart customization
- ✅ Export functionality
- ✅ Comparison tools

---

## **Phase 13: UI Polish & Micro-interactions**
**Duration:** 2 days

### Master Prompt:
```
Add delightful micro-interactions and polish inspired by Apple:

ANIMATIONS:
1. Page Transitions:
   - Fade + slide on route change
   - Modal slide up from bottom
   - Drawer slide from side

2. Button Interactions:
   - Scale down on press (0.95)
   - Ripple effect on click
   - Loading spinner transformation

3. Card Animations:
   - Hover: Lift (translateY: -4px)
   - Focus: Glow border
   - Enter viewport: Fade in + slide up

4. Data Updates:
   - Number count-up animations
   - Chart transitions (interpolate values)
   - Progress bar fills

LOADING STATES:
- Skeleton screens (shimmer effect)
- Spinner: Apple-style indeterminate loader
- Progress bars: Smooth gradient fill
- Optimistic UI updates

FEEDBACK:
- Toast notifications:
  * Success: Green with checkmark
  * Error: Red with exclamation
  * Info: Blue with info icon
  * Position: Top center
  * Auto-dismiss: 3-5 seconds
  * Swipe to dismiss

- Haptic feedback (mobile):
  * Button press
  * Toggle switch
  * Error shake

EMPTY STATES:
- Illustration or icon
- Helpful message
- Primary action button
- Secondary help link

ERROR STATES:
- Inline validation (real-time)
- Error messages below inputs
- Shake animation on submit error
- Focus on first error field

TOOLTIPS:
- Dark background with white text
- Rounded corners (8px)
- Small arrow pointer
- Fade in/out (200ms)
- Smart positioning (avoid overflow)

ACCESSIBILITY:
- Focus indicators (blue ring)
- Reduced motion support
- High contrast mode
- Screen reader improvements

PERFORMANCE:
- Lazy load images
- Code splitting
- Debounce search inputs
- Virtualize long lists
- Optimize re-renders (React.memo)

POLISH DETAILS:
- Consistent spacing (8px grid)
- Proper text hierarchy
- Icon alignment
- Color contrast (WCAG AA)
- Touch target sizes (44x44px minimum)
```

**Deliverables:**
- ✅ Page transitions
- ✅ Micro-interactions
- ✅ Loading states
- ✅ Toast notifications
- ✅ Accessibility improvements

---

## **Phase 14: Testing & Optimization**
**Duration:** 2 days

### Master Prompt:
```
Implement comprehensive testing and performance optimization:

UNIT TESTING:
- Jest for component testing
- React Testing Library
- Test coverage: 80%+

Test Cases:
- File upload validation
- CSV parsing
- Query processing
- Chart rendering
- Error handling

INTEGRATION TESTING:
- API endpoint testing
- End-to-end user flows
- AI query to visualization pipeline

E2E TESTING:
- Cypress or Playwright
- Critical user journeys:
  * Upload file
  * Ask question
  * View chart
  * Export data

PERFORMANCE OPTIMIZATION:
1. Frontend:
   - Code splitting (Next.js automatic)
   - Image optimization (next/image)
   - Lazy loading components
   - Memoization (useMemo, useCallback)
   - Virtual scrolling (large datasets)

2. Backend:
   - Response caching (Redis)
   - Query optimization
   - Compression (gzip)
   - Rate limiting

3. Bundle Analysis:
   - Webpack Bundle Analyzer
   - Remove unused dependencies
   - Tree shaking
   - Minification

MONITORING:
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)
- User analytics (Google Analytics)
- API logging (Winston)

LIGHTHOUSE SCORE TARGETS:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

SECURITY:
- Input sanitization
- CSRF protection
- Rate limiting
- Environment variable security
- Dependency vulnerability scan

LOAD TESTING:
- Test with large CSV files (10MB+)
- Concurrent user simulation
- Memory leak detection
- Stress testing API endpoints

BROWSER COMPATIBILITY:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Chrome Mobile
- Responsive testing (mobile, tablet, desktop)
```

**Deliverables:**
- ✅ Unit test suite
- ✅ Integration tests
- ✅ E2E test coverage
- ✅ Performance optimization
- ✅ Security audit

---

## **Phase 15: Deployment & Documentation**
**Duration:** 1-2 days

### Master Prompt:
```
Deploy the application and create comprehensive documentation:

DEPLOYMENT:

Frontend (Vercel):
- Connect GitHub repository
- Configure environment variables
- Set up custom domain (optional)
- Enable automatic deployments
- Configure preview deployments

Backend (Render/Railway):
- Create new web service
- Connect GitHub repo
- Set environment variables:
  * OPENAI_API_KEY
  * DATABASE_URL (if applicable)
  * CORS_ORIGIN
- Configure health check endpoint
- Set up auto-deploy on push

Database (if using):
- PostgreSQL on Railway/Supabase
- MongoDB Atlas
- Connection string in env vars

ENVIRONMENT SETUP:
.env.example:
```
NEXT_PUBLIC_API_URL=
OPENAI_API_KEY=
NODE_ENV=production
```

CI/CD:
- GitHub Actions workflow
- Automated tests on PR
- Lint checks
- Build verification

DOCUMENTATION:

1. README.md:
   - Project overview
   - Features list
   - Tech stack
   - Setup instructions
   - Environment variables
   - Deployment guide

2. API Documentation:
   - Endpoint descriptions
   - Request/response examples
   - Error codes
   - Rate limits

3. User Guide:
   - How to upload CSV
   - Example queries
   - Chart interpretations
   - Tips and tricks

4. Developer Guide:
   - Project structure
   - Component architecture
   - State management
   - Adding new features

POST-DEPLOYMENT:
- Test all features in production
- Monitor error rates
- Check performance metrics
- Set up alerts
- Create backup strategy

MARKETING PAGE:
- Add screenshots
- Demo video (optional)
- Feature highlights
- Call to action

ANALYTICS:
- Google Analytics setup
- User flow tracking
- Conversion tracking
- A/B testing (future)

MAINTENANCE:
- Update dependencies regularly
- Security patches
- Performance monitoring
- User feedback collection
```

**Deliverables:**
- ✅ Production deployment
- ✅ Documentation site
- ✅ API documentation
- ✅ User guide
- ✅ Monitoring setup

---

## **🎨 Apple Design Principles Summary**

Throughout all phases, maintain:

1. **Simplicity**: Remove unnecessary elements
2. **Clarity**: Obvious hierarchy and purpose
3. **Depth**: Subtle shadows and layers
4. **Motion**: Purposeful, smooth animations
5. **Consistency**: Unified design language
6. **Attention to Detail**: Pixel-perfect execution

## **📊 Success Metrics**

- Page load < 2 seconds
- First contentful paint < 1 second
- Query response < 500ms
- Mobile responsive (100%)
- Accessibility score 95+
- User satisfaction 4.5+/5

---

**Total Timeline: 14-18 days**
**Budget: $0-50 (OpenAI API costs)**
**Outcome: Production-ready AI Data Analytics Dashboard**
