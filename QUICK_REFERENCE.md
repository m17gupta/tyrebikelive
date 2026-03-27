# Quick Reference: Adding Inline Editing to Components

## Step-by-Step Guide

### 1. Import EditableText
```tsx
import { EditableText } from "@/components/EditableText";
```

### 2. Add fieldPath Prop to Your Component Interface
```tsx
interface YourBlockProps {
  heading: string;
  description?: string;
  // ... other props
  fieldPath?: string; // ADD THIS
}
```

### 3. Accept fieldPath in Component Parameters
```tsx
export const YourBlock: React.FC<YourBlockProps> = ({
  heading,
  description,
  // ... other params
  fieldPath = "", // ADD THIS
}) => {
  // component code
}
```

### 4. Wrap Text Fields with EditableText
```tsx
// Before:
<h2 className="text-4xl font-bold">{heading}</h2>

// After:
<EditableText 
  fieldPath={fieldPath ? `${fieldPath}.heading` : "heading"}
  as="h2"
  className="text-4xl font-bold"
>
  {heading}
</EditableText>
```

### 5. For Optional Fields (use conditional rendering)
```tsx
{description && (
  <EditableText 
    fieldPath={fieldPath ? `${fieldPath}.description` : "description"}
    as="p"
    className="text-lg"
  >
    {description}
  </EditableText>
)}
```

---

## Common Field Paths

| Location | Field Path Example |
|----------|-------------------|
| Top-level block | `layout.0.heading` |
| Nested block (1st level) | `layout.0.blocks.0.heading` |
| Nested block (2nd level) | `layout.0.blocks.0.items.0.title` |
| Mission/Vision | `layout.1.mission.title` |
| Team member | `layout.2.team.0.name` |

---

## EditableText Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `fieldPath` | string | ✅ | - | Full Payload field path |
| `as` | React.ElementType | ❌ | "div" | HTML element to render |
| `className` | string | ❌ | "" | CSS classes |
| `children` | ReactNode | ✅ | - | Text content to edit |

---

## Real Examples

### Example 1: Simple Heading
```tsx
<EditableText 
  fieldPath={fieldPath ? `${fieldPath}.title` : "title"}
  as="h1"
  className="text-5xl font-bold mb-4"
>
  {title}
</EditableText>
```

### Example 2: Subheading with Custom Styles
```tsx
<EditableText 
  fieldPath={fieldPath ? `${fieldPath}.subtitle` : "subtitle"}
  as="p"
  className="text-primary text-sm uppercase tracking-wide"
>
  {subtitle}
</EditableText>
```

### Example 3: Array Item (Team Member)
```tsx
{team.map((member, index) => (
  <div key={index}>
    <EditableText 
      fieldPath={`${fieldPath}.team.${index}.name`}
      as="h3"
      className="text-2xl font-semibold"
    >
      {member.name}
    </EditableText>
    <EditableText 
      fieldPath={`${fieldPath}.team.${index}.role`}
      as="p"
      className="text-gray-600"
    >
      {member.role}
    </EditableText>
  </div>
))}
```

### Example 4: Nested Object (Mission/Vision)
```tsx
<EditableText 
  fieldPath={`${fieldPath}.mission.title`}
  as="h3"
  className="text-2xl font-bold"
>
  {mission.title}
</EditableText>
```

---

## Block Renderer Pattern

If your block contains sub-blocks, pass fieldPath down:

```tsx
export const YourBlockRenderer: React.FC<{ blocks: any[], fieldPath?: string }> = ({ 
  blocks, 
  fieldPath = "" 
}) => {
  return (
    <>
      {blocks.map((block, index) => {
        // Build complete field path
        const blockFieldPath = fieldPath 
          ? `${fieldPath}.blocks.${index}` 
          : `blocks.${index}`;
        
        return <YourBlock {...block} fieldPath={blockFieldPath} />;
      })}
    </>
  );
};
```

---

## Troubleshooting

### ❌ "Cannot read property 'heading' of undefined"
**Fix**: Check field path matches your Payload schema exactly

### ❌ Click not opening editor
**Fix**: Ensure you're in draft mode (click Preview in admin)

### ❌ "Website validation error"
**Fix**: This means the update API is working! Just need to ensure all required fields are preserved.

### ❌ Nothing happens when clicking
**Fix**: Check browser console for errors, verify VisualEditingClient is rendered

---

## Testing Your Changes

1. **Click Preview** in Payload admin
2. **Navigate** to page with your component
3. **Click on text** wrapped in EditableText
4. **Modal should open** with current text
5. **Edit** and click Save
6. **Check console** for success/error messages
7. **Refresh page** to see changes

---

## When NOT to Use EditableText

❌ **Don't use for**:
- Rich text content (use Lexical editor)
- Images (use media field)
- Complex nested structures
- Non-text data

✅ **Do use for**:
- Headings (h1-h6)
- Short text (titles, labels)
- Descriptions
- Names, roles, captions

---

## Console Debugging

Open browser DevTools Console and look for:

```
📦 Found X editable blocks        ← EditableText components detected
📝 Editing field: {...}           ← Which field you clicked
✅ Update successful               ← Save worked
❌ Update failed: ...             ← Save error
```

In terminal (server logs):

```
📊 Current document structure:    ← See full document before update
🎯 Updating field at path: ...   ← Which field is being updated
✅ Document updated successfully  ← Update saved to Payload
```

---

## Best Practices

✅ **Always** pass fieldPath from parent
✅ **Always** provide fallback: `fieldPath || "defaultField"`
✅ **Keep** className consistent with existing design
✅ **Use** semantic HTML elements (`as="h2"` for headings)
✅ **Test** in draft mode before deploying

❌ **Don't** hardcode field paths without `fieldPath` prop
❌ **Don't** skip the fieldPath prop in component interface
❌ **Don't** use EditableText for rich text content
❌ **Don't** nest EditableText components

---

## Need Help?

1. Check `INLINE_EDITING_GUIDE.md` for detailed documentation
2. Look at `src/blocks/About/component.tsx` for working example
3. Review console logs for debugging information
4. Check `/api/update-content/route.ts` server logs

---

**Status**: ✅ Ready to use
**Last Updated**: 2024
