import Image from "next/image";

type BrandLogoProps = {
  width?: number;
  height?: number;
};

export default function BrandLogo({
  width = 125,
  height = 100,
}: BrandLogoProps) {
  return (
    <Image
      src="/images/logo/wellcar-logo.png"
      alt="Wellcar — магазин автозапчастей"
      width={width}
      height={height}
      className="h-auto object-contain"
    />
  );
}
