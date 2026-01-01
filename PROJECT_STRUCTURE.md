# Project Structure

```
famipred/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Login page (home)
│   ├── layout.tsx             # Root layout with AuthProvider
│   ├── globals.css            # Global styles with Tailwind
│   ├── predictions/
│   │   └── page.tsx          # Predictions form page
│   └── results/
│       └── page.tsx          # Results/comparison page
├── lib/                       # Shared utilities
│   ├── firebase.ts           # Firebase configuration and initialization
│   ├── authContext.tsx       # Authentication context provider
│   └── types.ts              # TypeScript types and questions
├── components/               # Reusable React components (empty for now)
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── netlify.toml           # Netlify deployment configuration
├── firestore.rules        # Firestore security rules
├── README.md             # Project overview and usage
└── DEPLOYMENT.md         # Deployment guide

```

## Key Features Implementation

### Authentication
- Simple shared code-word authentication
- No complex user management needed
- Stored in localStorage for persistence
- Context API for state management

### Predictions Form
- 10 predefined yes/no questions
- Interactive button selection with visual feedback
- Validation before submission
- Firebase Firestore for data persistence
- Update capability for existing predictions

### Results View
- Table view of all family members' predictions
- Comparison mode with statistics
- CSV export functionality
- Responsive design for mobile/desktop
- Real-time updates from Firestore

### UI/UX
- Norwegian language throughout
- Responsive design using Tailwind CSS
- Dark mode support
- Smooth transitions and hover effects
- Mobile-first approach

## Technology Choices

### Next.js 15 with App Router
- Server-side rendering capabilities
- File-based routing
- Built-in optimization
- Great developer experience

### Firebase Firestore
- Real-time database
- Easy to set up and use
- Free tier sufficient for small projects
- No backend code required

### Tailwind CSS v4
- Utility-first CSS framework
- Rapid UI development
- Consistent design system
- Built-in responsive utilities

### TypeScript
- Type safety
- Better IDE support
- Fewer runtime errors
- Self-documenting code

## Development

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Firebase account
- Basic React knowledge

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Style
- Use TypeScript for all new files
- Follow Next.js conventions
- Use Tailwind for styling
- Keep components focused and reusable
- Write clear, self-documenting code

## Future Enhancements

Potential features to add:

1. **Admin Panel**
   - View all predictions
   - Export data
   - Reset for new year
   - User management

2. **Scoreboard**
   - Track prediction accuracy
   - Points system
   - Leaderboard
   - Historical data

3. **Enhanced Security**
   - Proper Firebase Authentication
   - Email/password or social login
   - Rate limiting
   - Input sanitization

4. **Additional Features**
   - Comments on predictions
   - Notifications
   - Reminder emails
   - Photo uploads
   - Custom questions

5. **Analytics**
   - Usage statistics
   - Popular predictions
   - Family engagement metrics

## Contributing

This is a private family project, but if you want to adapt it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Update documentation
6. Submit a pull request

## Questions Configuration

Questions are defined in `lib/types.ts`. To modify:

1. Edit the `QUESTIONS` array
2. Update the number in the array initialization (line 11 in `app/predictions/page.tsx`)
3. Test the form to ensure all questions work
4. Update this documentation

## License

This project is for private use by the Hammersmark Olsen family.
