# Supabase Items Save Implementation

**Status**: Conflicts resolved, DB integration exists but needs image upload fix + condition field.

## Plan:
**src/pages/MyAccountPage.tsx**:
1. Add `condition` field to form/UI (Select: Good, Fair, Poor).
2. Fix image upload: use `imageFile` state, upload to Supabase storage (bucket 'items'), get public URL for `image_url`.
3. Update `handleSubmit`: use uploaded URL, save tags=[], owner_id.
4. Make `handleDelete`, `handleMarkAsGiven` update DB (DELETE/UPDATE status).
5. Add loading states for actions.
6. Clean duplicate toast/useEffect.

**Dependencies**: supabaseClient.js, types/item.ts (already match schema).

**Follow-up**: Test `npm run build`, `npm start`, add item → check Supabase dashboard.

Approve plan before edits?

