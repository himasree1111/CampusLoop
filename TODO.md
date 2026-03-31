# CampusLoop Admin Metrics & Leaderboard Enhancement TODO

## Plan Breakdown
1. [x] Extend LeaderboardUser interface in src/types/sustainability.ts to include itemsGiven and carbon
2. [x] Create new src/components/ImpactCard.tsx - reusable responsive stats grid for admin metrics (Total Items Reused, CO₂ Saved, Active Users, Listings)
3. [x] Update src/pages/AdminPage.tsx - Add adminStats mock data and insert ImpactCard before existing Tabs
4. [x] Update src/components/Leaderboard.tsx - Replace mockUsers with exact sample data (Himasree, Ravi etc.), update table to use real itemsGiven/carbon values, enhance with badges like "Top Contributor", "Eco Champion"
5. [x] Test: Run dev server, check /admin metrics grid responsive/colors/icons, /leaderboard updated data/badges

