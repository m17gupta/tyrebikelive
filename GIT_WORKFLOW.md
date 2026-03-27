# Git Workflow Guide

## Project Information
- **Repository**: payload-ecommerce-template
- **Owner**: codifieddev
- **Main Branch**: development
- **Project Type**: PayloadCMS E-commerce Template with Next.js

## Prerequisites
Make sure you have Git installed and configured:
```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Branch Management

### 1. Check Current Branch
```bash
git branch
# or
git status
```

### 2. Switch to Development Branch
```bash
# Switch to development branch
git checkout development

# If the branch doesn't exist locally, create and switch to it
git checkout -b development

# Pull latest changes from remote development branch
git pull origin development
```

### 3. Create a New Feature Branch
```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/fix-metadata-error
git checkout -b feature/add-payment-integration
git checkout -b hotfix/critical-bug-fix
```

### 4. Switch Between Branches
```bash
# Switch to existing branch
git checkout branch-name

# Switch to development
git checkout development

# Switch to main/master
git checkout main
```

## Making Changes and Pushing Code

### 1. Check Status of Changes
```bash
# See what files have been modified
git status

# See detailed changes
git diff

# See staged changes
git diff --cached
```

### 2. Stage Changes
```bash
# Stage specific files
git add filename.tsx
git add src/components/Header.tsx

# Stage all changes
git add .

# Stage all TypeScript files
git add *.tsx *.ts

# Interactive staging (recommended for selective changes)
git add -i
```

### 3. Commit Changes
```bash
# Commit with a descriptive message
git commit -m "Fix: Resolve null pointer exception in generateMetadata function"

# Commit with detailed message
git commit -m "Feature: Add new payment integration

- Integrate Stripe payment gateway
- Add payment validation logic
- Update checkout flow
- Add error handling for payment failures"

# Amend the last commit (if you forgot something)
git commit --amend -m "Updated commit message"
```

### 4. Push Changes

#### Push to Current Branch
```bash
# Push to the current branch
git push

# Push and set upstream (first time pushing a new branch)
git push -u origin branch-name

# Force push (use with caution!)
git push --force
```

#### Push to Specific Branch
```bash
# Push to development branch
git push origin development

# Push to main branch
git push origin main

# Push to feature branch
git push origin feature/your-feature-name
```

## Complete Workflow Example

### Working on a New Feature
```bash
# 1. Switch to development and get latest changes
git checkout development
git pull origin development

# 2. Create new feature branch
git checkout -b feature/improve-seo

# 3. Make your changes
# ... edit files ...

# 4. Check what changed
git status
git diff

# 5. Stage changes
git add .

# 6. Commit changes
git commit -m "Improve SEO: Add meta tags and structured data

- Add proper meta descriptions for all pages
- Implement JSON-LD structured data
- Optimize page titles for better search ranking
- Fix duplicate meta tag issues"

# 7. Push to remote
git push -u origin feature/improve-seo

# 8. Create pull request on GitHub (via web interface)
# 9. After PR approval, merge to development
# 10. Switch back to development and pull latest
git checkout development
git pull origin development

# 11. Delete feature branch (optional)
git branch -d feature/improve-seo
git push origin --delete feature/improve-seo
```

### Hotfix Workflow
```bash
# 1. Create hotfix branch from development
git checkout development
git checkout -b hotfix/critical-security-fix

# 2. Make the fix
# ... edit files ...

# 3. Stage and commit
git add .
git commit -m "Security: Fix XSS vulnerability in user input validation"

# 4. Push hotfix
git push -u origin hotfix/critical-security-fix

# 5. Create PR for immediate merge
```

## Project-Specific Commands

### Build and Test Before Pushing
```bash
# Install dependencies
pnpm install

# Run type check
pnpm exec tsc --noEmit

# Run linting
pnpm lint

# Run build
pnpm build

# Run development server
pnpm dev
```

### Pre-Push Checklist
- [ ] Code builds successfully (`pnpm build`)
- [ ] No TypeScript errors (`pnpm exec tsc --noEmit`)
- [ ] Code passes linting (`pnpm lint`)
- [ ] All tests pass (if applicable)
- [ ] Changes are properly committed with descriptive messages
- [ ] Working on the correct branch

## Common Git Commands Reference

```bash
# Branch operations
git branch                    # List local branches
git branch -r                 # List remote branches
git branch -a                 # List all branches
git branch -d branch-name     # Delete local branch
git push origin --delete branch-name  # Delete remote branch

# Viewing history
git log                       # View commit history
git log --oneline            # Compact commit history
git log --graph --oneline    # Visual branch history

# Undoing changes
git checkout -- filename     # Discard changes to file
git reset HEAD filename      # Unstage file
git reset --soft HEAD~1      # Undo last commit (keep changes)
git reset --hard HEAD~1      # Undo last commit (discard changes)

# Remote operations
git remote -v                # Show remote repositories
git fetch origin            # Fetch changes without merging
git pull origin branch-name  # Pull and merge changes
git push origin branch-name  # Push to specific branch
```

## Troubleshooting

### Merge Conflicts
```bash
# When you have conflicts during merge/pull
git status                   # See conflicted files
# Edit files to resolve conflicts
git add conflicted-file.tsx  # Mark as resolved
git commit                   # Complete the merge
```

### Reset to Remote State
```bash
# Discard all local changes and reset to remote
git fetch origin
git reset --hard origin/development
```

### Sync Fork with Upstream
```bash
# Add upstream remote (only once)
git remote add upstream https://github.com/original-repo/payload-ecommerce-template.git

# Sync with upstream
git fetch upstream
git checkout development
git merge upstream/development
git push origin development
```

## Best Practices

1. **Always pull before pushing**: `git pull origin development`
2. **Use descriptive commit messages**: Follow conventional commit format
3. **Keep commits atomic**: One feature/fix per commit
4. **Test before pushing**: Run build and tests locally
5. **Use feature branches**: Don't commit directly to development
6. **Create pull requests**: For code review and collaboration
7. **Clean up branches**: Delete merged feature branches
8. **Regular commits**: Don't wait too long between commits

## Commit Message Convention

Use conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(auth): add user authentication system"
git commit -m "fix(api): resolve null pointer in user queries"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(components): format code with prettier"
```

---

## Quick Reference Card

```bash
# Daily workflow
git status                    # Check current state
git pull origin development   # Get latest changes
git checkout -b feature/name  # Create feature branch
# ... make changes ...
git add .                     # Stage changes
git commit -m "descriptive message"  # Commit
git push -u origin feature/name      # Push new branch

# Switch branches
git checkout development      # Switch to development
git checkout feature/name     # Switch to feature branch

# Emergency hotfix
git checkout development
git checkout -b hotfix/issue
# ... fix ...
git add . && git commit -m "fix: critical issue"
git push -u origin hotfix/issue
```