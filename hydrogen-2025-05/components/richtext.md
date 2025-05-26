# RichText

The `RichText` component renders a metafield of type `rich_text_field`. By default the rendered output uses semantic HTML tags. Customize how nodes are rendered with the `components` prop.

```jsx
import {RichText} from '@shopify/hydrogen';

export function MainRichText({metaFieldData}) {
  return (
    <RichText
      data={metaFieldData}
      components={{
        paragraph({node}) {
          return <p className="customClass">{node.children}</p>;
        },
      }}
    />
  );
}

```

```tsx
import {RichText} from '@shopify/hydrogen';

export function MainRichText({metaFieldData}: {metaFieldData: string}) {
  return (
    <RichText
      data={metaFieldData}
      components={{
        paragraph({node}) {
          return <p className="customClass">{node.children}</p>;
        },
      }}
    />
  );
}

```

## Props

### RichTextPropsForDocs

### as

value: `ComponentGeneric`

An HTML tag or React Component to be rendered as the base element wrapper. The default is `div`.

### components

value: `CustomComponents`

  - CustomComponents: {
  /** The root node of the rich text. Defaults to `<div>` */
  root?: typeof Root;
  /** Customize the headings. Each heading has a `level` property from 1-6. Defaults to `<h1>` to `<h6>` */
  heading?: typeof Heading;
  /** Customize paragraphs. Defaults to `<p>` */
  paragraph?: typeof Paragraph;
  /** Customize how text nodes. They can either be bold or italic. Defaults to `<em>`, `<strong>` or text. */
  text?: typeof Text;
  /** Customize links. Defaults to a React Router `<Link>` component in Hydrogen and a `<a>` in Hydrogen React. */
  link?: typeof RichTextLink;
  /** Customize lists. They can be either ordered or unordered. Defaults to `<ol>` or `<ul>` */
  list?: typeof List;
  /** Customize list items. Defaults to `<li>`. */
  listItem?: typeof ListItem;
}
Customize how rich text components are rendered

### data

value: `string`

The JSON string that correspond to the Storefront API's [RichText format](https://shopify.dev/docs/apps/custom-data/metafields/types#rich-text-formatting).

### plain

value: `boolean`

Remove rich text formatting and render plain text

### CustomComponents

### heading

value: `({ node, }: { node: { type: "heading"; level: number; children?: ReactNode[]; }; }) => ReactNode`

Customize the headings. Each heading has a `level` property from 1-6. Defaults to `<h1>` to `<h6>`

### link

value: `({ node, }: { node: { type: "link"; url: string; title?: string; target?: string; children?: ReactNode[]; }; }) => ReactNode`

Customize links. Defaults to a React Router `<Link>` component in Hydrogen and a `<a>` in Hydrogen React.

### list

value: `({ node, }: { node: { type: "list"; listType: "unordered" | "ordered"; children?: ReactNode[]; }; }) => ReactNode`

Customize lists. They can be either ordered or unordered. Defaults to `<ol>` or `<ul>`

### listItem

value: `({ node, }: { node: { type: "list-item"; children?: ReactNode[]; }; }) => ReactNode`

Customize list items. Defaults to `<li>`.

### paragraph

value: `({ node, }: { node: { type: "paragraph"; children?: ReactNode[]; }; }) => ReactNode`

Customize paragraphs. Defaults to `<p>`

### root

value: `({ node, }: { node: { type: "root"; children?: ReactNode[]; }; }) => ReactNode`

The root node of the rich text. Defaults to `<div>`

### text

value: `({ node, }: { node: { type: "text"; italic?: boolean; bold?: boolean; value?: string; }; }) => ReactNode`

Customize how text nodes. They can either be bold or italic. Defaults to `<em>`, `<strong>` or text.

