import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

const ImageDisplay = ({ src, alt, className, style }: Props) => {
  // Normalize inside the component
  const normalizedSrc =
    src?.startsWith("//") ? `https:${src}` : src || null;

  if (!normalizedSrc) return null;

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      width={600}
      height={400}
      style={{
        borderRadius: 16,
        width: "100%",
        height: "auto",
        ...style,
      }}
      className={className}
      priority
    />
  );
};

export default ImageDisplay;
