# Script

Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy). If you load a script that directly modifies the DOM, you are likely to have hydration errors. Use the `waitForHydration` prop to load the script after the page hydrates.

```jsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import {useNonce, Script} from '@shopify/hydrogen';
export default function App() {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {/* Note you don't need to pass a nonce to the script component 
        because it's automatically added */}
        <Script src="https://some-custom-script.js" />
        {/* For security, nonce is not supported with `waitForHydration`.
        Instead you need to add the domain of the script directly to your
        Content Securitiy Policy directives. */}
        <Script
          waitForHydration
          src="https://domain.com/script-that-modifies-dom.js"
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

```

```tsx
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router';
import {useNonce, Script} from '@shopify/hydrogen';
export default function App() {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {/* Note you don't need to pass a nonce to the script component 
        because it's automatically added */}
        <Script src="https://some-custom-script.js" />
        {/* For security, nonce is not supported with `waitForHydration`.
        Instead you need to add the domain of the script directly to your
        Content Securitiy Policy directives. */}
        <Script
          waitForHydration
          src="https://domain.com/script-that-modifies-dom.js"
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

```

## Props

### HydrogenScriptProps

### waitForHydration

value: `boolean`

Wait to load the script until after the page hydrates. This prevents hydration errors for scripts that modify the DOM. Note: For security, `nonce` is not supported when using `waitForHydration`. Instead you need to add the domain of the script directly to your [Content Securitiy Policy directives](https://shopify.dev/docs/storefronts/headless/hydrogen/content-security-policy#step-3-customize-the-content-security-policy).

### ScriptAttributes

### about

value: `string | undefined`


### accessKey

value: `string | undefined`


### aria-activedescendant

value: `string | undefined`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

### aria-atomic

value: `Booleanish | undefined`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

### aria-autocomplete

value: `'none' | 'inline' | 'list' | 'both' | undefined`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.

### aria-braillelabel

value: `string | undefined`

Defines a string value that labels the current element, which is intended to be converted into Braille.

### aria-brailleroledescription

value: `string | undefined`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

### aria-busy

value: `Booleanish | undefined`


### aria-checked

value: `boolean | 'false' | 'mixed' | 'true' | undefined`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

### aria-colcount

value: `number | undefined`

Defines the total number of columns in a table, grid, or treegrid.

### aria-colindex

value: `number | undefined`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

### aria-colindextext

value: `string | undefined`

Defines a human readable text alternative of aria-colindex.

### aria-colspan

value: `number | undefined`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

### aria-controls

value: `string | undefined`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

### aria-current

value: `boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time' | undefined`

Indicates the element that represents the current item within a container or set of related elements.

### aria-describedby

value: `string | undefined`

Identifies the element (or elements) that describes the object.

### aria-description

value: `string | undefined`

Defines a string value that describes or annotates the current element.

### aria-details

value: `string | undefined`

Identifies the element that provides a detailed, extended description for the object.

### aria-disabled

value: `Booleanish | undefined`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

### aria-dropeffect

value: `'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined`

Indicates what functions can be performed when a dragged object is released on the drop target.

### aria-errormessage

value: `string | undefined`

Identifies the element that provides an error message for the object.

### aria-expanded

value: `Booleanish | undefined`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

### aria-flowto

value: `string | undefined`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.

### aria-grabbed

value: `Booleanish | undefined`

Indicates an element's "grabbed" state in a drag-and-drop operation.

### aria-haspopup

value: `boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

### aria-hidden

value: `Booleanish | undefined`

Indicates whether the element is exposed to an accessibility API.

### aria-invalid

value: `boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined`

Indicates the entered value does not conform to the format expected by the application.

### aria-keyshortcuts

value: `string | undefined`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

### aria-label

value: `string | undefined`

Defines a string value that labels the current element.

### aria-labelledby

value: `string | undefined`

Identifies the element (or elements) that labels the current element.

### aria-level

value: `number | undefined`

Defines the hierarchical level of an element within a structure.

### aria-live

value: `'off' | 'assertive' | 'polite' | undefined`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

### aria-modal

value: `Booleanish | undefined`

Indicates whether an element is modal when displayed.

### aria-multiline

value: `Booleanish | undefined`

Indicates whether a text box accepts multiple lines of input or only a single line.

### aria-multiselectable

value: `Booleanish | undefined`

Indicates that the user may select more than one item from the current selectable descendants.

### aria-orientation

value: `'horizontal' | 'vertical' | undefined`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

### aria-owns

value: `string | undefined`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

### aria-placeholder

value: `string | undefined`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.

### aria-posinset

value: `number | undefined`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

### aria-pressed

value: `boolean | 'false' | 'mixed' | 'true' | undefined`

Indicates the current "pressed" state of toggle buttons.

### aria-readonly

value: `Booleanish | undefined`

Indicates that the element is not editable, but is otherwise operable.

### aria-relevant

value: `'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals' | undefined`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

### aria-required

value: `Booleanish | undefined`

Indicates that user input is required on the element before a form may be submitted.

### aria-roledescription

value: `string | undefined`

Defines a human-readable, author-localized description for the role of an element.

### aria-rowcount

value: `number | undefined`

Defines the total number of rows in a table, grid, or treegrid.

### aria-rowindex

value: `number | undefined`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

### aria-rowindextext

value: `string | undefined`

Defines a human readable text alternative of aria-rowindex.

### aria-rowspan

value: `number | undefined`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

### aria-selected

value: `Booleanish | undefined`

Indicates the current "selected" state of various widgets.

### aria-setsize

value: `number | undefined`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

### aria-sort

value: `'none' | 'ascending' | 'descending' | 'other' | undefined`

Indicates if items in a table or grid are sorted in ascending or descending order.

### aria-valuemax

value: `number | undefined`

Defines the maximum allowed value for a range widget.

### aria-valuemin

value: `number | undefined`

Defines the minimum allowed value for a range widget.

### aria-valuenow

value: `number | undefined`

Defines the current value for a range widget.

### aria-valuetext

value: `string | undefined`

Defines the human readable text alternative of aria-valuenow for a range widget.

### async

value: `boolean | undefined`


### autoCapitalize

value: `string | undefined`


### autoCorrect

value: `string | undefined`


### autoFocus

value: `boolean | undefined`


### autoSave

value: `string | undefined`


### charSet

value: `string | undefined`


### children

value: `ReactNode | undefined`


### className

value: `string | undefined`


### color

value: `string | undefined`


### content

value: `string | undefined`


### contentEditable

value: `Booleanish | "inherit" | undefined`


### contextMenu

value: `string | undefined`


### crossOrigin

value: `CrossOrigin`


### dangerouslySetInnerHTML

value: `{
            // Should be InnerHTML['innerHTML'].
            // But unfortunately we're mixing renderer-specific type declarations.
            __html: string | TrustedHTML;
        } | undefined`


### datatype

value: `string | undefined`


### defaultChecked

value: `boolean | undefined`


### defaultValue

value: `string | number | ReadonlyArray<string> | undefined`


### defer

value: `boolean | undefined`


### dir

value: `string | undefined`


### draggable

value: `Booleanish | undefined`


### hidden

value: `boolean | undefined`


### id

value: `string | undefined`


### inlist

value: `any`


### inputMode

value: `'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined`

Hints at the type of data that might be entered by the user while editing the element or its contents

### integrity

value: `string | undefined`


### is

value: `string | undefined`

Specify that a standard HTML element should behave like a defined custom built-in element

### itemID

value: `string | undefined`


### itemProp

value: `string | undefined`


### itemRef

value: `string | undefined`


### itemScope

value: `boolean | undefined`


### itemType

value: `string | undefined`


### lang

value: `string | undefined`


### noModule

value: `boolean | undefined`


### nonce

value: `string | undefined`


### onAbort

value: `ReactEventHandler<T> | undefined`


### onAbortCapture

value: `ReactEventHandler<T> | undefined`


### onAnimationEnd

value: `AnimationEventHandler<T> | undefined`


### onAnimationEndCapture

value: `AnimationEventHandler<T> | undefined`


### onAnimationIteration

value: `AnimationEventHandler<T> | undefined`


### onAnimationIterationCapture

value: `AnimationEventHandler<T> | undefined`


### onAnimationStart

value: `AnimationEventHandler<T> | undefined`


### onAnimationStartCapture

value: `AnimationEventHandler<T> | undefined`


### onAuxClick

value: `MouseEventHandler<T> | undefined`


### onAuxClickCapture

value: `MouseEventHandler<T> | undefined`


### onBeforeInput

value: `FormEventHandler<T> | undefined`


### onBeforeInputCapture

value: `FormEventHandler<T> | undefined`


### onBlur

value: `FocusEventHandler<T> | undefined`


### onBlurCapture

value: `FocusEventHandler<T> | undefined`


### onCanPlay

value: `ReactEventHandler<T> | undefined`


### onCanPlayCapture

value: `ReactEventHandler<T> | undefined`


### onCanPlayThrough

value: `ReactEventHandler<T> | undefined`


### onCanPlayThroughCapture

value: `ReactEventHandler<T> | undefined`


### onChange

value: `FormEventHandler<T> | undefined`


### onChangeCapture

value: `FormEventHandler<T> | undefined`


### onClick

value: `MouseEventHandler<T> | undefined`


### onClickCapture

value: `MouseEventHandler<T> | undefined`


### onCompositionEnd

value: `CompositionEventHandler<T> | undefined`


### onCompositionEndCapture

value: `CompositionEventHandler<T> | undefined`


### onCompositionStart

value: `CompositionEventHandler<T> | undefined`


### onCompositionStartCapture

value: `CompositionEventHandler<T> | undefined`


### onCompositionUpdate

value: `CompositionEventHandler<T> | undefined`


### onCompositionUpdateCapture

value: `CompositionEventHandler<T> | undefined`


### onContextMenu

value: `MouseEventHandler<T> | undefined`


### onContextMenuCapture

value: `MouseEventHandler<T> | undefined`


### onCopy

value: `ClipboardEventHandler<T> | undefined`


### onCopyCapture

value: `ClipboardEventHandler<T> | undefined`


### onCut

value: `ClipboardEventHandler<T> | undefined`


### onCutCapture

value: `ClipboardEventHandler<T> | undefined`


### onDoubleClick

value: `MouseEventHandler<T> | undefined`


### onDoubleClickCapture

value: `MouseEventHandler<T> | undefined`


### onDrag

value: `DragEventHandler<T> | undefined`


### onDragCapture

value: `DragEventHandler<T> | undefined`


### onDragEnd

value: `DragEventHandler<T> | undefined`


### onDragEndCapture

value: `DragEventHandler<T> | undefined`


### onDragEnter

value: `DragEventHandler<T> | undefined`


### onDragEnterCapture

value: `DragEventHandler<T> | undefined`


### onDragExit

value: `DragEventHandler<T> | undefined`


### onDragExitCapture

value: `DragEventHandler<T> | undefined`


### onDragLeave

value: `DragEventHandler<T> | undefined`


### onDragLeaveCapture

value: `DragEventHandler<T> | undefined`


### onDragOver

value: `DragEventHandler<T> | undefined`


### onDragOverCapture

value: `DragEventHandler<T> | undefined`


### onDragStart

value: `DragEventHandler<T> | undefined`


### onDragStartCapture

value: `DragEventHandler<T> | undefined`


### onDrop

value: `DragEventHandler<T> | undefined`


### onDropCapture

value: `DragEventHandler<T> | undefined`


### onDurationChange

value: `ReactEventHandler<T> | undefined`


### onDurationChangeCapture

value: `ReactEventHandler<T> | undefined`


### onEmptied

value: `ReactEventHandler<T> | undefined`


### onEmptiedCapture

value: `ReactEventHandler<T> | undefined`


### onEncrypted

value: `ReactEventHandler<T> | undefined`


### onEncryptedCapture

value: `ReactEventHandler<T> | undefined`


### onEnded

value: `ReactEventHandler<T> | undefined`


### onEndedCapture

value: `ReactEventHandler<T> | undefined`


### onError

value: `ReactEventHandler<T> | undefined`


### onErrorCapture

value: `ReactEventHandler<T> | undefined`


### onFocus

value: `FocusEventHandler<T> | undefined`


### onFocusCapture

value: `FocusEventHandler<T> | undefined`


### onGotPointerCapture

value: `PointerEventHandler<T> | undefined`


### onGotPointerCaptureCapture

value: `PointerEventHandler<T> | undefined`


### onInput

value: `FormEventHandler<T> | undefined`


### onInputCapture

value: `FormEventHandler<T> | undefined`


### onInvalid

value: `FormEventHandler<T> | undefined`


### onInvalidCapture

value: `FormEventHandler<T> | undefined`


### onKeyDown

value: `KeyboardEventHandler<T> | undefined`


### onKeyDownCapture

value: `KeyboardEventHandler<T> | undefined`


### onKeyPress

value: `KeyboardEventHandler<T> | undefined`


### onKeyPressCapture

value: `KeyboardEventHandler<T> | undefined`


### onKeyUp

value: `KeyboardEventHandler<T> | undefined`


### onKeyUpCapture

value: `KeyboardEventHandler<T> | undefined`


### onLoad

value: `ReactEventHandler<T> | undefined`


### onLoadCapture

value: `ReactEventHandler<T> | undefined`


### onLoadedData

value: `ReactEventHandler<T> | undefined`


### onLoadedDataCapture

value: `ReactEventHandler<T> | undefined`


### onLoadedMetadata

value: `ReactEventHandler<T> | undefined`


### onLoadedMetadataCapture

value: `ReactEventHandler<T> | undefined`


### onLoadStart

value: `ReactEventHandler<T> | undefined`


### onLoadStartCapture

value: `ReactEventHandler<T> | undefined`


### onLostPointerCapture

value: `PointerEventHandler<T> | undefined`


### onLostPointerCaptureCapture

value: `PointerEventHandler<T> | undefined`


### onMouseDown

value: `MouseEventHandler<T> | undefined`


### onMouseDownCapture

value: `MouseEventHandler<T> | undefined`


### onMouseEnter

value: `MouseEventHandler<T> | undefined`


### onMouseLeave

value: `MouseEventHandler<T> | undefined`


### onMouseMove

value: `MouseEventHandler<T> | undefined`


### onMouseMoveCapture

value: `MouseEventHandler<T> | undefined`


### onMouseOut

value: `MouseEventHandler<T> | undefined`


### onMouseOutCapture

value: `MouseEventHandler<T> | undefined`


### onMouseOver

value: `MouseEventHandler<T> | undefined`


### onMouseOverCapture

value: `MouseEventHandler<T> | undefined`


### onMouseUp

value: `MouseEventHandler<T> | undefined`


### onMouseUpCapture

value: `MouseEventHandler<T> | undefined`


### onPaste

value: `ClipboardEventHandler<T> | undefined`


### onPasteCapture

value: `ClipboardEventHandler<T> | undefined`


### onPause

value: `ReactEventHandler<T> | undefined`


### onPauseCapture

value: `ReactEventHandler<T> | undefined`


### onPlay

value: `ReactEventHandler<T> | undefined`


### onPlayCapture

value: `ReactEventHandler<T> | undefined`


### onPlaying

value: `ReactEventHandler<T> | undefined`


### onPlayingCapture

value: `ReactEventHandler<T> | undefined`


### onPointerCancel

value: `PointerEventHandler<T> | undefined`


### onPointerCancelCapture

value: `PointerEventHandler<T> | undefined`


### onPointerDown

value: `PointerEventHandler<T> | undefined`


### onPointerDownCapture

value: `PointerEventHandler<T> | undefined`


### onPointerEnter

value: `PointerEventHandler<T> | undefined`


### onPointerEnterCapture

value: `PointerEventHandler<T> | undefined`


### onPointerLeave

value: `PointerEventHandler<T> | undefined`


### onPointerLeaveCapture

value: `PointerEventHandler<T> | undefined`


### onPointerMove

value: `PointerEventHandler<T> | undefined`


### onPointerMoveCapture

value: `PointerEventHandler<T> | undefined`


### onPointerOut

value: `PointerEventHandler<T> | undefined`


### onPointerOutCapture

value: `PointerEventHandler<T> | undefined`


### onPointerOver

value: `PointerEventHandler<T> | undefined`


### onPointerOverCapture

value: `PointerEventHandler<T> | undefined`


### onPointerUp

value: `PointerEventHandler<T> | undefined`


### onPointerUpCapture

value: `PointerEventHandler<T> | undefined`


### onProgress

value: `ReactEventHandler<T> | undefined`


### onProgressCapture

value: `ReactEventHandler<T> | undefined`


### onRateChange

value: `ReactEventHandler<T> | undefined`


### onRateChangeCapture

value: `ReactEventHandler<T> | undefined`


### onReset

value: `FormEventHandler<T> | undefined`


### onResetCapture

value: `FormEventHandler<T> | undefined`


### onResize

value: `ReactEventHandler<T> | undefined`


### onResizeCapture

value: `ReactEventHandler<T> | undefined`


### onScroll

value: `UIEventHandler<T> | undefined`


### onScrollCapture

value: `UIEventHandler<T> | undefined`


### onSeeked

value: `ReactEventHandler<T> | undefined`


### onSeekedCapture

value: `ReactEventHandler<T> | undefined`


### onSeeking

value: `ReactEventHandler<T> | undefined`


### onSeekingCapture

value: `ReactEventHandler<T> | undefined`


### onSelect

value: `ReactEventHandler<T> | undefined`


### onSelectCapture

value: `ReactEventHandler<T> | undefined`


### onStalled

value: `ReactEventHandler<T> | undefined`


### onStalledCapture

value: `ReactEventHandler<T> | undefined`


### onSubmit

value: `FormEventHandler<T> | undefined`


### onSubmitCapture

value: `FormEventHandler<T> | undefined`


### onSuspend

value: `ReactEventHandler<T> | undefined`


### onSuspendCapture

value: `ReactEventHandler<T> | undefined`


### onTimeUpdate

value: `ReactEventHandler<T> | undefined`


### onTimeUpdateCapture

value: `ReactEventHandler<T> | undefined`


### onTouchCancel

value: `TouchEventHandler<T> | undefined`


### onTouchCancelCapture

value: `TouchEventHandler<T> | undefined`


### onTouchEnd

value: `TouchEventHandler<T> | undefined`


### onTouchEndCapture

value: `TouchEventHandler<T> | undefined`


### onTouchMove

value: `TouchEventHandler<T> | undefined`


### onTouchMoveCapture

value: `TouchEventHandler<T> | undefined`


### onTouchStart

value: `TouchEventHandler<T> | undefined`


### onTouchStartCapture

value: `TouchEventHandler<T> | undefined`


### onTransitionEnd

value: `TransitionEventHandler<T> | undefined`


### onTransitionEndCapture

value: `TransitionEventHandler<T> | undefined`


### onVolumeChange

value: `ReactEventHandler<T> | undefined`


### onVolumeChangeCapture

value: `ReactEventHandler<T> | undefined`


### onWaiting

value: `ReactEventHandler<T> | undefined`


### onWaitingCapture

value: `ReactEventHandler<T> | undefined`


### onWheel

value: `WheelEventHandler<T> | undefined`


### onWheelCapture

value: `WheelEventHandler<T> | undefined`


### placeholder

value: `string | undefined`


### prefix

value: `string | undefined`


### property

value: `string | undefined`


### radioGroup

value: `string | undefined`


### referrerPolicy

value: `HTMLAttributeReferrerPolicy | undefined`


### rel

value: `string | undefined`


### resource

value: `string | undefined`


### results

value: `number | undefined`


### rev

value: `string | undefined`


### role

value: `AriaRole | undefined`


### security

value: `string | undefined`


### slot

value: `string | undefined`


### spellCheck

value: `Booleanish | undefined`


### src

value: `string | undefined`


### style

value: `CSSProperties | undefined`


### suppressContentEditableWarning

value: `boolean | undefined`


### suppressHydrationWarning

value: `boolean | undefined`


### tabIndex

value: `number | undefined`


### title

value: `string | undefined`


### translate

value: `'yes' | 'no' | undefined`


### type

value: `string | undefined`


### typeof

value: `string | undefined`


### unselectable

value: `'on' | 'off' | undefined`


### vocab

value: `string | undefined`


## Related

- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/utilities/createcontentsecuritypolicy)
- [useNonce](https://shopify.dev/docs/api/hydrogen/hooks/usenonce)

