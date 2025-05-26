import {Image} from '@shopify/hydrogen';

// Use a more specific type that matches what we expect for an image
interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

export function ProductImage({
  image,
}: {
  image: ProductImage | null;
}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}
