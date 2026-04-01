# Task: Make header bar buttons constant across pages

## Steps:
1. [x] Update Navigation.tsx: Add useLocation for active states (copy logic from old DashboardLayout header).
2. [x] Update DashboardLayout.tsx: 
   - Remove entire header/nav/mobile menu code.
   - Import and add <Navigation /> at top.
   - Keep/adjust main content wrapper (container/py-8 etc.).
3. [ ] Test: Run dev server, check all pages (/ , /browse, /leaderboard, /account, /admin, /fake-detector) have identical glassy header with all buttons.
4. [ ] Complete task.

Current progress: Starting step 1.
