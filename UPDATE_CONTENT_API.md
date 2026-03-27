# Update Content API - Technical Details

## Overview
The `/api/update-content` endpoint handles inline content updates by:
1. Fetching the entire page document from Payload
2. Updating the specific field while preserving all other data
3. Cleaning up metadata and IDs
4. Saving the entire page back to Payload

## Why This Approach?

### Problem with Field-Only Updates
Initially, we tried updating only the specific field, but Payload validation failed with errors like:
```
"The following field is invalid: Website"
```

This happened because:
- Payload requires ALL required fields to be present in updates
- Complex nested structures need proper relationship handling
- Block IDs need to be removed before updating

### Solution: Full Page Updates
Instead of sending partial data, we:
1. **Fetch the complete page** with `depth: 2` to get relationships
2. **Update only the changed field** in memory
3. **Clean up the data** by removing metadata and IDs
4. **Send the entire page** back to Payload

This ensures:
- ✅ All required fields are preserved (website, slug, etc.)
- ✅ Relationships are properly maintained
- ✅ Nested blocks update correctly
- ✅ No validation errors

## API Endpoint

### Request
```typescript
POST /api/update-content
Content-Type: application/json

{
  "collection": "pages",
  "docId": "69079a39393e7eedb0958b20",
  "field": "layout.0.blocks.0.heading",
  "value": "Our New Story Title"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "Content updated successfully",
  "data": { /* updated document */ }
}
```

### Response (Error)
```json
{
  "error": "Failed to update content",
  "details": "Specific error message"
}
```

## Field Path Navigation

The endpoint handles complex nested paths:

### Examples
| Field Path | Navigates To |
|------------|--------------|
| `hero.type` | `doc.hero.type` |
| `layout.0.heading` | `doc.layout[0].heading` |
| `layout.0.blocks.0.heading` | `doc.layout[0].blocks[0].heading` |
| `layout.1.mission.title` | `doc.layout[1].mission.title` |

### Path Format Support
The endpoint supports both array notation formats:
- Dot notation: `layout.0.blocks.0.heading`
- Bracket notation: `layout[0].blocks[0].heading`

## Data Cleanup Process

Before sending to Payload, the endpoint removes:

### 1. Metadata Fields
```typescript
delete pageData.id;
delete pageData.createdAt;
delete pageData.updatedAt;
delete pageData.createdBy;
delete pageData.publishedAt;
```

### 2. Relationship Objects
```typescript
// Convert: { id: "123", name: "Website" }
// To: "123"
if (pageData.website && typeof pageData.website === 'object') {
  pageData.website = pageData.website.id;
}
```

### 3. Nested Block IDs
```typescript
const cleanupIds = (obj: any): any => {
  // Recursively remove 'id' fields from nested objects
  // Keeps blockType, heading, content, etc.
  // Removes id, createdAt, updatedAt
};
```

This prevents Payload from treating the update as a duplicate or conflicting with existing records.

## Error Handling

### Common Errors

#### 1. "Document not found"
**Cause**: Invalid `docId`
**Fix**: Verify the page ID is correct

#### 2. "Missing required fields"
**Cause**: Missing `collection`, `docId`, `field`, or `value` in request
**Fix**: Ensure all required parameters are sent

#### 3. Validation errors
**Cause**: The cleaned data doesn't pass Payload's schema validation
**Fix**: Check the schema requirements, ensure all required fields exist

### Debugging

Enable console logging to see:
```bash
📝 Update request: { collection, docId, field, value }
📊 Current document fetched
🎯 Updating field: layout.0.blocks.0.heading = "New Title"
💾 Saving entire page data to Payload...
📦 Page data keys: [slug, title, _status, website, ...]
✅ Update successful!
```

## Performance Considerations

### Network
- **Fetch**: ~500ms (gets full page document)
- **Update**: ~300ms (saves full page)
- **Total**: ~800ms per field update

### Optimization Opportunities
1. **Caching**: Cache the full document for 5-10 seconds to allow multiple quick edits
2. **Batch Updates**: Queue multiple field changes and send one update
3. **Diff Detection**: Only send changed fields (requires schema awareness)

### Current Trade-offs
- ✅ **Pros**: Reliable, preserves all data, no validation errors
- ⚠️ **Cons**: Sends more data than necessary, multiple edits = multiple full updates

## Security

### Authentication
- Uses Payload's built-in authentication
- Requires valid session cookie
- Draft mode must be enabled

### Authorization
- Payload checks user permissions on `update` operation
- User must have `update` permission for the collection

### Validation
- Payload validates the full document against schema
- Relationships are validated
- Required fields are enforced

## Example Flow

### User Action
1. User clicks on "Our Story" heading in draft mode
2. Modal opens with current text: "Our Story"
3. User edits to "Our Amazing Story"
4. User clicks "Save"

### API Processing
```typescript
// 1. Fetch current page
const currentDoc = await payload.findByID({
  collection: 'pages',
  id: '69079a39393e7eedb0958b20',
  depth: 2
});
// Returns: { slug: "home", layout: [...], website: {...} }

// 2. Clone and update
const pageData = JSON.parse(JSON.stringify(currentDoc));
pageData.layout[0].blocks[0].heading = "Our Amazing Story";

// 3. Clean up
delete pageData.id;
delete pageData.createdAt;
// ... etc

// 4. Update Payload
const updatedDoc = await payload.update({
  collection: 'pages',
  id: '69079a39393e7eedb0958b20',
  data: pageData
});
```

### Result
- Heading updated: ✅
- All other fields preserved: ✅
- Website relationship intact: ✅
- No validation errors: ✅

## Testing

### Manual Test
1. Enable draft mode (click Preview in admin)
2. Navigate to page with editable content
3. Click on any heading wrapped in `<EditableText>`
4. Edit the text
5. Click "Save Changes"
6. Check terminal for console logs
7. Verify success toast appears
8. Refresh page to see changes

### Expected Terminal Output
```
📝 Update request: { 
  collection: 'pages',
  docId: '69079a39393e7eedb0958b20',
  field: 'layout.0.blocks.0.heading',
  value: 'Our Amazing Story'
}
📊 Current document fetched
🎯 Updating field: layout.0.blocks.0.heading = "Our Amazing Story"
💾 Saving entire page data to Payload...
📦 Page data keys: [ 'slug', 'title', '_status', 'website', ... ]
✅ Update successful!
```

### Browser Console Output
```
📝 Editing field: {
  collection: "pages",
  docId: "69079a39393e7eedb0958b20",
  field: "layout.0.blocks.0.heading",
  text: "Our Story"
}
✅ Content saved successfully!
```

## Future Enhancements

1. **Batch Updates**: Allow saving multiple fields at once
2. **Optimistic Updates**: Show changes immediately, sync in background
3. **Undo/Redo**: Track change history
4. **Diff-based Updates**: Only send changed fields
5. **WebSocket Sync**: Real-time updates across multiple editors
6. **Auto-save**: Save changes every 30 seconds
7. **Conflict Resolution**: Handle concurrent edits

## Related Files

- `/src/app/api/update-content/route.ts` - This API endpoint
- `/src/components/VisualEditingClient/index.tsx` - Calls this API
- `/src/components/EditableText/index.tsx` - Marks fields as editable
- `INLINE_EDITING_GUIDE.md` - Complete usage guide
- `QUICK_REFERENCE.md` - Developer quick start

---

Last Updated: November 3, 2025
Status: ✅ Production Ready
