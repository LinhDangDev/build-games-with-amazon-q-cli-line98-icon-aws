# 🎮 AWS Line 98 Game

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS">
</div>

<div align="center">
  <h3>🚀 A modern Line 98-style puzzle game featuring AWS service icons</h3>
</div>

---

## 📖 Project Description

AWS Line 98 Game is a modern puzzle game inspired by the classic Line 98 game, but with a unique twist - using AWS service icons instead of traditional colored balls. The game is built with modern web technologies, delivering a smooth and engaging experience for players.

## ✨ Game Features

### 🎯 Core Gameplay
- **9x9 Grid Board**: Standard game board with 81 squares
- **AWS Service Icons**: 7 different AWS service icon types
- **Line Matching**: Match 5+ icons of the same type horizontally, vertically, or diagonally
- **Path Finding**: Smart pathfinding algorithm for movement
- **Progressive Difficulty**: Difficulty increases over time

### 🎨 Visual & UX
- **Responsive Design**: Compatible with all screen sizes
- **AWS Orange Theme**: Gradient interface featuring AWS's signature orange
- **Smooth Animations**: Fluid animations with CSS3
- **Interactive Feedback**: Visual feedback on interactions
- **Modern UI Components**: Contemporary and intuitive design

### 🏆 Game Mechanics
- **Smart Scoring System**: Intelligent scoring system
- **Combo Multipliers**: Score multipliers for consecutive matches
- **Game Over Detection**: Automatic detection when no moves are possible
- **Move Validation**: Validation of each move's legality

## 🏗️ Project Architecture
### 📁 Directory Structure

```
aws-line98/
├── 📁 public/                    # Static assets
│   └── vite.svg                 # Vite logo
├── 📁 src/                      # Source code
│   ├── 📁 assets/               # Game assets
│   │   ├── images/              # AWS service icons and images
│   │   └── audio/               # Game sound effects
│   ├── 📁 components/           # React components
│   │   ├── GameBoard.tsx        # Main game board
│   │   ├── GameBoard.css        # Game board styles
│   │   ├── GameOver.tsx         # Game over component
│   │   ├── GameOver.css         # Game over styles
│   │   ├── GameTimer.tsx        # Game timer component
│   │   ├── ScoreDisplay.tsx     # Score display component
│   │   ├── Leaderboard.tsx      # Leaderboard component
│   │   ├── Leaderboard.css      # Leaderboard styles
│   │   ├── Timer.tsx            # Timer component
│   │   ├── Timer.css            # Timer styles
│   │   ├── ScoreBoard.tsx       # Score board component
│   │   ├── ScoreBoard.css       # Score board styles
│   │   ├── Card.tsx             # Card component
│   │   └── Button.tsx           # Button component
│   ├── 📁 hooks/                # Custom React hooks
│   │   └── useSound.ts          # Sound management hook
│   ├── 📁 types/                # TypeScript definitions
│   │   └── index.ts             # Type exports
│   ├── 📁 utils/                # Utility functions
│   │   └── gameUtils.ts         # Game utility functions
│   ├── App.tsx                  # Main app component
│   ├── App.css                  # App-specific styles
│   ├── index.css                # Global styles
│   └── main.tsx                 # App entry point
├── 📄 index.html                # HTML template
├── 📄 package.json              # Dependencies & scripts
├── 📄 tsconfig.json             # TypeScript config
├── 📄 tsconfig.node.json        # Node-specific TypeScript config
├── 📄 tailwind.config.js        # TailwindCSS config
├── 📄 postcss.config.js         # PostCSS configuration
├── 📄 vite.config.ts            # Vite configuration
├── 📄 eslint.config.js          # ESLint configuration
└── 📄 README.md                 # Project documentation
```

## 🧩 Core Components

### 🎮 GameBoard Component
```typescript
// Main game board with 9x9 grid
- Renders game cells
- Handles click events
- Manages selection state
- Displays animations
```

### 🔲 GameCell Component
```typescript
// Individual cell in the grid
- Shows AWS service icons
- Handles selection highlighting
- Displays move animations
- Manages cell states
```

### 📊 GameHeader Component
```typescript
// Game information display
- Current score
- High score tracking
- Game controls
- Status indicators
```

## 🛠️ Technologies Used

### 🚀 Frontend Framework
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 6.3.5**: Lightning-fast build tool

### 🎨 Styling & UI
- **TailwindCSS 3.4.1**: Utility-first CSS framework
- **CSS3 Animations**: Smooth transitions and effects
- **Lucide React 0.515.0**: Beautiful icon library
- **Responsive Design**: Mobile-first approach

### 🔧 Development Tools
- **ESLint 9.25.0**: Code linting and formatting
- **PostCSS 8.5.5**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixes

### ⚡ Performance
- **Code Splitting**: Automatic bundle optimization
- **Tree Shaking**: Dead code elimination
- **Hot Module Replacement**: Instant development feedback

## 🚀 Setup and Installation

### 📋 Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (or yarn/pnpm)
- **Git**: For version control

### 💻 Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/LinhDangDev/aws_line_98q_cli.git
cd aws_line_98q_cli
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:5173
```

### 🏗️ Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```
## 🎮 How To Play

### 🎯 Game Objective
The goal is to score as many points as possible by creating lines of 5 or more identical AWS service icons. The game ends when the board is completely filled and no more moves are possible.

### 🕹️ Basic Controls
1. **Select an Icon**: Click on any AWS service icon on the board to select it
   - Selected icon will be highlighted with a glowing border
   - Only one icon can be selected at a time

2. **Move the Icon**: Click on an empty cell to move the selected icon
   - The icon will only move if there's a clear path (no obstacles)
   - Path is calculated using smart pathfinding algorithm

3. **Create Lines**: Align 5 or more identical icons in a row
   - **Horizontal**: Left to right in the same row
   - **Vertical**: Top to bottom in the same column
   - **Diagonal**: Both directions (↗ and ↘)

### 📋 Game Rules

#### ✅ Valid Moves
- You can only move one icon per turn
- Icons can only move to empty cells
- There must be a clear path between source and destination
- Path cannot go through occupied cells

#### 🎯 Scoring Lines
- **Minimum**: 5 identical icons in a line
- **Maximum**: Up to 9 icons (full row/column/diagonal)
- Lines can be formed in any direction
- Multiple lines can be cleared simultaneously

#### 🔄 Turn Sequence
1. Select and move an icon
2. If lines are formed, they disappear and you score points
3. If no lines are formed, 3 new random icons appear on the board
4. Repeat until the board is full

### 🎖️ Scoring System

#### 📊 Base Scoring
- **5 icons**: 5 points
- **6 icons**: 7 points
- **7 icons**: 10 points
- **8 icons**: 14 points
- **9 icons**: 20 points

#### 🔥 Combo System
- **Consecutive matches**: +50% bonus for each additional line cleared in the same turn
- **Multiple lines**: Score multiplier increases with simultaneous line clears
- **Perfect clear**: Bonus points for clearing multiple lines at once

#### 🏆 Bonus Points
- **Long lines**: Extra points for lines longer than 5 icons
- **Corner bonus**: Additional points for using corner positions
- **Efficiency bonus**: Points for clearing lines with fewer moves

### 💡 Strategy Tips

#### 🧠 Beginner Strategies
- **Plan ahead**: Think 2-3 moves in advance
- **Use corners**: Corner positions are harder to block
- **Create setups**: Position icons to create multiple line opportunities
- **Manage space**: Don't let the board fill up too quickly

#### 🎯 Advanced Strategies
- **Multi-line setups**: Create opportunities for multiple simultaneous lines
- **Defensive play**: Block opponent's potential lines (in future multiplayer)
- **Icon distribution**: Keep track of which icons appear most frequently
- **Path optimization**: Choose moves that keep maximum paths open

#### ⚠️ Common Mistakes
- **Rushing moves**: Taking the first available move without planning
- **Ignoring corners**: Not utilizing corner positions effectively
- **Poor spacing**: Letting the board become too crowded
- **Single focus**: Only looking for one type of line at a time

### 🎨 AWS Service Icons

The game features 7 different AWS service icons, each representing a major AWS service:

| Icon | Service | Description |
|------|---------|-------------|
| ![EC2 Icon](./src/assets/images/EC2.png) | **EC2** | Elastic Compute Cloud - Virtual servers |
| ![S3 Icon](./src/assets/images/AmazonSimpleStorageService.png) | **S3** | Simple Storage Service - Object storage |
| ![S3 Glacier Icon](./src/assets/images/AmazonSimpleStorageServiceGlacier.png) | **S3 Glacier** | Long-term archival storage |
| ![Lambda Icon](./src/assets/images/AWSLambda.png) | **Lambda** | Serverless computing platform |
| ![Aurora Icon](./src/assets/images/AmazonAurora.png) | **Aurora** | Managed relational database service |
| ![WorkSpaces Icon](./src/assets/images/AmazonWorkSpacesFamily.png) | **WorkSpaces** | Virtual desktop infrastructure |
| ![VPC Icon](./src/assets/images/VPC.png) | **VPC** | Virtual Private Cloud - Isolated network infrastructure |

### 🎪 Game Modes

#### 🎯 Classic Mode (Current)
- Standard 9x9 grid
- 7 different AWS service icons
- Progressive difficulty
- Local high score tracking

#### 🚀 Future Modes (Planned)
- **Time Attack**: Race against the clock
- **Puzzle Mode**: Pre-set challenges to solve
- **Multiplayer**: Compete against other players
- **Tournament**: Ranked competitive play

### 📱 Platform Support

#### 💻 Desktop
- **Recommended**: Chrome 90+, Firefox 88+, Safari 14+
- **Controls**: Mouse click and drag
- **Performance**: Optimized for desktop experience

#### 📱 Mobile & Tablet
- **Touch support**: Tap to select and move
- **Responsive design**: Adapts to screen size
- **Performance**: Optimized for mobile devices

### 🎵 Audio & Visual Effects

#### 🎨 Visual Feedback
- **Selection highlight**: Glowing border around selected icons
- **Move animation**: Smooth icon movement along paths
- **Line clearing**: Satisfying disappearing animation
- **Score popup**: Points display when lines are cleared

#### 🔊 Audio (Future Enhancement)
- **Move sounds**: Audio feedback for icon movements
- **Match sounds**: Different sounds for different line lengths
- **Background music**: Ambient game music
- **UI sounds**: Button clicks and menu interactions
## ⚡ Performance Optimizations

### 🚀 Build Optimizations
- **Vite Bundle Optimization**: Automatic code splitting and tree shaking
- **Asset Optimization**: Image compression and lazy loading
- **CSS Purging**: Unused CSS removal with TailwindCSS
- **Minification**: JavaScript and CSS minification

### 🎯 Runtime Optimizations
- **React.memo**: Prevent unnecessary re-renders
- **useMemo & useCallback**: Expensive computation caching
- **Efficient State Updates**: Immutable state patterns
- **Event Delegation**: Optimized event handling

### 📱 Mobile Optimizations
- **Touch Events**: Optimized for mobile interactions
- **Viewport Meta**: Proper mobile viewport configuration
- **Performance Budgets**: Lighthouse score optimization

## 🎨 Assets

### 🔧 AWS Service Icons
The game features 7 different AWS service icons:
- **EC2**: Elastic Compute Cloud
- **S3**: Simple Storage Service
- **RDS**: Relational Database Service
- **Lambda**: Serverless Computing
- **CloudFront**: Content Delivery Network
- **DynamoDB**: NoSQL Database
- **API Gateway**: API Management

### 🎵 Audio (Future Enhancement)
- Sound effects for moves and matches
- Background music
- Audio feedback for user interactions

## 🏆 High Score System

### 💾 Local Storage
- **Persistent High Scores**: Saved in browser localStorage
- **Score History**: Track improvement over time
- **Statistics**: Games played, average score, best streaks

### 📊 Scoring Algorithm
```typescript
Base Score = Number of matched icons × 10
Combo Multiplier = 1.5x for consecutive matches
Bonus Points = Length bonus for 6+ matches
Final Score = (Base Score + Bonus) × Combo Multiplier
```

### 🎯 Score Categories
- **Current Score**: Points earned in the current game
- **High Score**: Best score achieved across all games
- **Session Best**: Highest score in the current session
- **Average Score**: Mean score across all completed games

### 📈 Statistics Tracking
- **Games Played**: Total number of completed games
- **Total Points**: Cumulative points across all games
- **Best Streak**: Longest consecutive line clearing sequence
- **Favorite Icon**: Most frequently matched AWS service icon
## 🐛 Troubleshooting

### 🔧 Common Issues

#### Game Won't Start
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Performance Issues
- **Check Browser**: Use modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- **Clear Cache**: Hard refresh with Ctrl+Shift+R
- **Close Other Tabs**: Free up system resources

#### Build Errors
```bash
# Check Node.js version
node --version  # Should be 18.0.0+

# Update dependencies
npm update

# Clear Vite cache
rm -rf node_modules/.vite
```

#### Mobile Issues
- **Touch Not Working**: Ensure touch events are enabled
- **Layout Problems**: Check viewport meta tag
- **Performance**: Reduce animation complexity on mobile

### 📞 Getting Help
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check inline code comments
- **Community**: Join discussions in GitHub Discussions

## 🚀 Future Enhancements

### 🎮 Gameplay Features
- [ ] **Multiplayer Mode**: Real-time online multiplayer
- [ ] **Tournament System**: Competitive gameplay
- [ ] **Power-ups**: Special abilities and boosters
- [ ] **Daily Challenges**: New puzzles every day
- [ ] **Achievement System**: Unlock rewards and badges

### 🎨 Visual Enhancements
- [ ] **3D Graphics**: WebGL-based 3D board
- [ ] **Particle Effects**: Enhanced visual feedback
- [ ] **Themes**: Multiple visual themes
- [ ] **Animations**: More sophisticated animations
- [ ] **Dark Mode**: Alternative color scheme

### 🔧 Technical Improvements
- [ ] **PWA Support**: Offline gameplay capability
- [ ] **WebSocket Integration**: Real-time multiplayer
- [ ] **AI Opponent**: Single-player vs AI
- [ ] **Cloud Saves**: Cross-device progress sync
- [ ] **Analytics**: Gameplay analytics and insights

### 📱 Platform Expansion
- [ ] **Mobile App**: React Native version
- [ ] **Desktop App**: Electron wrapper
## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 LinhDangDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🛠️ Development Process
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📝 Contribution Guidelines
- **Code Style**: Follow existing code patterns
- **Testing**: Add tests for new features
- **Documentation**: Update README and comments
- **Commits**: Use conventional commit messages
- **Issues**: Check existing issues before creating new ones

### 🐛 Bug Reports
When reporting bugs, please include:
- **Environment**: OS, browser, Node.js version
- **Steps to Reproduce**: Clear reproduction steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable

### 💡 Feature Requests
For feature requests, please provide:
- **Use Case**: Why is this feature needed?
- **Description**: Detailed feature description
- **Examples**: Similar implementations or mockups
- **Priority**: How important is this feature?

## 🙏 Acknowledgments

### 🎮 Inspiration
- **Line 98**: The original classic puzzle game
- **AWS**: For the amazing service ecosystem and branding


### 🛠️ Tools & Libraries
- **Vite Team**: For the amazing build tool
- **TailwindCSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **TypeScript Team**: For type-safe JavaScript

### 👥 Contributors
- **LinhDangDev**: Project creator and maintainer
- **Community**: All contributors and testers

### 🎨 Design Resources
- **AWS Brand Guidelines**: Official AWS design resources
- **Color Palette**: AWS orange gradient theme
- **Icons**: AWS service icons and Lucide icons

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/LinhDangDev">LinhDangDev</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p><em>"In the game of AWS Line 98, as in cloud architecture, success comes not from reacting to each move, but from planning several steps ahead."</em></p>
</div>
