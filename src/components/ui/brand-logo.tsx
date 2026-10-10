import Image from "next/image";
import wellcarLogo from "../../../public/images/logo/wellcar-logo.png";

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
      src={wellcarLogo}
      alt="Wellcar — магазин автозапчастей"
      width={width}
      height={height}
      className="h-auto object-contain"
    />
  );
}
