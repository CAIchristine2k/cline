# 💰 KlingAI Cost Optimization Guide

## Model Cost Hierarchy (Cheapest to Most Expensive)

1. **kling-v1** 🟢 **CHEAPEST** - Default choice
2. **kling-v1-5** 🟡 **EXPENSIVE** - Only when necessary
3. **kling-v2** 🔴 **VERY EXPENSIVE** - Avoid when possible

## Automatic Cost Optimization Strategy

### ✅ **Default Behavior (kling-v1)** - MOST USAGE

- **Text-to-image** generation (with/without negative prompts)
- **Basic image-to-image** editing (using image as style/content reference)
- **Logo design** with or without reference images
- **Fan-together** with basic image blending (no subject/face targeting)

### 🟡 **Upgrade to kling-v1-5** (Only When Required)

- **Subject/face targeting** with `image_reference: 'subject'` or `'face'`
- **Fan-together** requiring specific person/pet preservation
- **Advanced editing** with facial/subject preservation

### 🔴 **Avoid kling-v2** (Only for Special Cases)

- **Advanced features** not available in v1/v1.5
- **Specific capabilities** only available in v2

## Cost-Saving Best Practices

### 🎯 **Smart Model Selection**

```
✅ CHEAPEST: Text-to-image with negative prompts → kling-v1
✅ CHEAPEST: Image reference for style inspiration → kling-v1
✅ CHEAPEST: Basic image editing/blending → kling-v1
❌ EXPENSIVE: Subject/face targeting → kling-v1-5 (only when needed)
```

### 🖼️ **Image Reference Strategy**

- **Style/inspiration reference** → Use kling-v1 (cheapest)
- **Subject/face preservation** → Use kling-v1-5 (expensive but necessary)
- **Avoid targeting when not needed** → Massive cost savings

### 📝 **Negative Prompt Usage**

```
✅ SUPPORTED with kling-v1 (cheapest):
- Text-to-image with negative prompts
- "Create bright logo, no dark colors, no text"

❌ NOT SUPPORTED:
- Image-to-image scenarios (any model)
- When using reference images
```

## Implementation Details

### Text-to-Image with Negative Prompts

```typescript
// CHEAPEST - kling-v1 supports negative prompts for text-only generation
const modelName = 'kling-v1';
klingRequest = {
  model_name: modelName,
  prompt: 'bright colorful logo design',
  negative_prompt: 'dark colors, text, complexity',
};
```

### Basic Image Reference (Style/Content)

```typescript
// CHEAPEST - kling-v1 supports basic image reference
const modelName = 'kling-v1';
klingRequest = {
  model_name: modelName,
  prompt: 'style like this image',
  image: base64ImageData,
  // No image_reference parameter = basic reference
};
```

### Subject/Face Targeting (Only When Necessary)

```typescript
// EXPENSIVE - kling-v1-5 required for targeting
const needsTargeting =
  imageReference === 'subject' || imageReference === 'face';
const modelName = needsTargeting ? 'kling-v1-5' : 'kling-v1';

if (modelName === 'kling-v1-5') {
  klingRequest.image_reference = imageReference; // 'subject' or 'face'
}
```

## Expected Savings

### Massive Cost Reductions:

- **90%+ savings** using kling-v1 for basic image reference vs kling-v1-5
- **Text-to-image with negative prompts** → kling-v1 (not v2!)
- **Style inspiration** → kling-v1 (not v1.5!)
- **Basic image editing** → kling-v1 (not v1.5!)

### When Expensive Models Are Worth It:

- **Face/subject preservation** is critical → kling-v1-5 justified
- **Advanced features** not available in v1 → Consider v2

## Key Insights from Documentation

1. **kling-v1 supports `image` parameter** - Basic image-to-image works!
2. **`image_reference` only in kling-v1-5** - Subject/face targeting is expensive
3. **`negative_prompt` works with kling-v1** - For text-to-image only
4. **No negative prompts with images** - Any model, any image input

## Monitoring

Check console logs for cost decisions:

```
🎨 Logo/design generation config (COST-OPTIMIZED):
  hasReferenceImage: true
  needsSubjectFaceTargeting: false
  modelName: 'kling-v1'
  costLevel: 'CHEAPEST'
  savings: 'Using kling-v1 for basic image reference instead of expensive kling-v1-5'
```
