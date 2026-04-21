# 🧹 Code Consolidation Guide

This document outlines the duplicate files in the project and how they've been consolidated for cleaner code.

## Consolidated Files

### 1. API Clients

**Consolidation**: `services/api.js` now imports from `utils/api.js`

```
client/src/
├── utils/
│   └── api.js           ← Single axios instance (source of truth)
└── services/
    └── api.js           ← Imports from utils/api.js
```

**Migration**:

- All API calls should be imported from `services/api.js`
- The axios instance is centralized in `utils/api.js`
- This allows for easier API middleware/interceptor management

### 2. Supabase Clients

**Consolidation**: Use `lib/supabase.js` as source of truth

```
client/src/
├── lib/
│   └── supabase.js      ← Primary Supabase client (cleaned)
└── services/
    └── supabase.js      ← DEPRECATED - Use lib/supabase.js instead
```

**Migration Steps**:

1. Update all imports from `services/supabase.js` to `lib/supabase.js`
2. Delete `services/supabase.js` after migration
3. Example:

   ```javascript
   // OLD (remove)
   import { supabase } from "../services/supabase.js";

   // NEW (use)
   import { supabase } from "../lib/supabase.js";
   ```

---

## Duplicate File Cleanup Checklist

### Files to Delete After Migration

- [ ] `client/src/services/supabase.js` - After updating all imports to use `lib/supabase.js`

### Files to Keep

- ✅ `client/src/utils/api.js` - Axios instance
- ✅ `client/src/services/api.js` - API functions
- ✅ `client/src/lib/supabase.js` - Supabase client

---

## Updated File Structure (After Consolidation)

```
client/src/
├── components/         # React components
├── context/           # Context providers
├── hooks/             # Custom hooks
├── lib/               # Library instances
│   └── supabase.js    # Supabase client (single source of truth)
├── pages/             # Page components
├── services/          # API functions
│   └── api.js         # All API calls
├── utils/             # Utility functions
│   └── api.js         # Axios instance
├── templates/         # Resume templates
└── App.jsx
```

---

## Benefits of Consolidation

✅ **Single Source of Truth** - Only one axios instance and Supabase client  
✅ **Easier Maintenance** - Changes in one place  
✅ **Better Testing** - Mocking is simpler  
✅ **Cleaner Imports** - Consistent import paths  
✅ **Reduced Confusion** - No duplicate code paths

---

## Notes

- Environment variables are validated at instantiation time
- Errors will be thrown if Supabase or API config is missing
- This prevents runtime errors from missing credentials
