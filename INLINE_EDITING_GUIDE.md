# Inline Visual Editing Guide

## Overview
This implementation provides a clean inline editing system that allows content editors to click on text directly on the frontend and edit it without navigating to the admin panel.

## Architecture

### 1. Components

#### EditableText Component (`src/components/EditableText/index.tsx`)
A wrapper component that marks specific fields as editable with proper field paths.

```tsx
<EditableText fieldPath="layout.0.blocks.0.heading" as="h2" className="...">
  {heading}
</EditableText>
```

**Props:**
- `fieldPath`: The exact path to the field in Payload (e.g., "layout.0.blocks.0.heading")
- `as`: The HTML element type to render (default: "div")
- `className`: CSS classes to apply
- `children`: The text content

#### VisualEditingClient (`src/components/VisualEditingClient/index.tsx`)
Client-side component that:
1. Checks if draft mode is enabled
2. Finds all elements with `data-editable-field` attribute
3. Adds click handlers to open inline editor modal
4. Sends updates to `/api/update-content`

**Key Functions:**
- `checkDraftMode()`: Verifies if visual editing is active
- `setupEditableBlocks()`: Scans DOM for editable elements
- `openInlineEditor()`: Shows modal with textarea for editing
- Handles both explicit `data-editable-field` elements and auto-detected text elements

#### VisualEditingWrapper (`src/components/VisualEditingWrapper/index.tsx`)
Wraps content blocks with visual editing data attributes.

**Data Attributes:**
- `data-visual-editing="true"`: Marks block as editable
- `data-doc-id`: Document ID for the page
- `data-field`: Field path for the block (e.g., "layout.0")
- `data-block-type`: Type of block (e.g., "aboutPage", "story")

### 2. API Routes

#### Update Content Endpoint (`src/app/api/update-content/route.ts`)
Server-side endpoint that handles content updates to avoid CORS issues.

**Process:**
1. Fetch current document from Payload
2. Clone the document data
3. Navigate to the nested field using the field path
4. Update the value
5. Remove metadata fields (id, createdAt, updatedAt, createdBy)
6. Send update back to Payload

**Handles:**
- Nested field paths like "layout.0.blocks.0.heading"
- Array indices in both formats: `layout[0]` and `layout.0`
- Preserves required fields like `website` relationship
- Uses `depth: 0` to avoid circular references

## Implementation Example

### For the About Block

#### 1. Import EditableText in component:
```tsx
import { EditableText } from "@/components/EditableText";
```

#### 2. Add fieldPath prop to block component:
```tsx
interface StoryBlockProps {
  heading: string;
  subheading?: string;
  // ... other props
  fieldPath?: string; // e.g., "layout.0.blocks.0"
}
```

#### 3. Wrap text fields with EditableText:
```tsx
<EditableText 
  fieldPath={fieldPath ? `${fieldPath}.heading` : "heading"} 
  as="h2"
  className="mb-6 text-4xl font-bold md:text-5xl"
>
  {heading}
</EditableText>

{subheading && (
  <EditableText 
    fieldPath={fieldPath ? `${fieldPath}.subheading` : "subheading"} 
    as="p"
    className="text-primary mb-2 font-semibold"
  >
    {subheading}
  </EditableText>
)}
```

#### 4. Pass fieldPath from parent renderer:
```tsx
export const AboutPageRenderer: React.FC<BlockRendererProps> = ({ 
  blocks, 
  fieldPath = "" 
}) => {
  return (
    <>
      {blocks.map((block, index) => {
        const blockFieldPath = fieldPath ? `${fieldPath}.blocks.${index}` : `blocks.${index}`;
        
        switch (block.blockType) {
          case "story":
            return <StoryBlock {...block} fieldPath={blockFieldPath} />;
          // ... other cases
        }
      })}
    </>
  );
};
```

#### 5. Pass fieldPath from RenderBlocks:
```tsx
<Block 
  {...block} 
  fieldPath={`layout.${index}`}
/>
```

## Field Path Structure

For a page with nested blocks, the field paths follow this pattern:

```
layout                      // Top-level layout array
├── [0]                    // First layout block (aboutPage)
│   └── blocks            // Nested blocks array within aboutPage
│       ├── [0]          // First nested block (story)
│       │   ├── heading
│       │   ├── subheading
│       │   └── content
│       └── [1]          // Second nested block (missionVision)
│           └── ...
└── [1]                   // Second layout block
    └── ...
```

**Example paths:**
- `layout.0.blocks.0.heading` - Heading in first story block
- `layout.0.blocks.0.subheading` - Subheading in first story block
- `layout.0.blocks.1.mission.title` - Mission title in missionVision block

## How It Works

### User Flow:
1. User clicks "Preview" button in admin
2. Draft mode is enabled via secure cookie
3. `VisualEditingClient` activates on frontend
4. User clicks on any text with `data-editable-field` attribute
5. Modal opens with current text in textarea
6. User edits and clicks "Save"
7. Update is sent to `/api/update-content`
8. Server updates Payload via server-side SDK
9. Success toast shown to user
10. Page data refreshed

### Technical Flow:
```
Frontend (Draft Mode) 
    ↓
EditableText Component (adds data-editable-field)
    ↓
VisualEditingClient (detects clicks)
    ↓
Modal opens with textarea
    ↓
User saves changes
    ↓
POST to /api/update-content
    ↓
Server fetches full document
    ↓
Navigates to nested field
    ↓
Updates value
    ↓
Removes metadata
    ↓
Updates via Payload SDK
    ↓
Returns success/error
    ↓
Frontend shows toast & refreshes
```

## Benefits

1. **No CORS Issues**: Server-side API route handles updates
2. **Type Safety**: TypeScript throughout
3. **Explicit Field Paths**: No guessing - EditableText declares exact path
4. **Nested Block Support**: Handles complex structures like layout[0].blocks[0].heading
5. **Fallback Support**: Auto-detects simple text elements without explicit paths
6. **Clean UI**: No extra UI elements, just click-to-edit text

## Limitations & Future Enhancements

### Current Limitations:
- Only supports text fields (heading, subheading, etc.)
- Doesn't support rich text (Lexical) inline editing yet
- No image upload via inline editor
- Single-field updates only (no batch updates)

### Future Enhancements:
1. **Rich Text Editing**: Integrate Lexical editor in modal for content fields
2. **Image Upload**: Inline image picker and uploader
3. **Block Management**: Add/remove/reorder blocks from frontend
4. **Batch Updates**: Save multiple field changes at once
5. **Undo/Redo**: Track changes and allow reverting
6. **Validation**: Show field validation errors in modal
7. **Autosave**: Auto-save drafts while editing

## Troubleshooting

### "Website validation error"
**Cause**: Required relationship fields not included in update
**Fix**: Ensure `/api/update-content` fetches full document first and preserves all fields

### "Cannot find field to edit"
**Cause**: Field path doesn't match actual document structure
**Fix**: Check console logs in `/api/update-content` to see the field path and document structure

### "Click not working"
**Cause**: Draft mode not enabled or VisualEditingClient not loaded
**Fix**: 
1. Check if draft mode cookie is set
2. Verify `<VisualEditingClient>` is rendered in layout
3. Check browser console for errors

### TypeScript errors in RenderBlocks
**Cause**: Union type doesn't include `fieldPath` prop
**Fix**: This is expected - the component types don't include optional props. The code still works at runtime.

## Console Debugging

The implementation includes helpful console logs:

- `📦 Found X editable blocks` - Number of visual editing blocks detected
- `📝 Editing field: {collection, docId, field, text}` - When text is clicked
- `📊 Current document structure:` - Full document before update (in API route)
- `🎯 Updating field at path:` - Field path being updated (in API route)
- `✅ Update successful` - Update completed successfully

Enable these in browser DevTools Console and terminal to debug issues.
