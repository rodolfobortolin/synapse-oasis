"use client";

import Image from "next/image";

export default function SynapseOasisLogo({ size = 40 }: { size?: number }) {
  // Pick the best source based on requested size
  const src = size <= 48 ? "/logo-64.png" : size <= 96 ? "/logo-128.png" : "/logo-256.png";

  return (
    <Image
      src={src}
      alt="SynapseOasis"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      priority
    />
  );
}
