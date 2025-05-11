import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

const ImageDisplay = ({ src, alt, className, style }: Props) => (
  <Image
    src={src}
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


export default ImageDisplay