import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-block hover:opacity-90 transition-opacity duration-200"
    >
      <Image
        src="/logo.svg"
        alt="FELEGEHIWOT logo"
        width={140}
        height={42}
        className="object-contain"
      />
    </Link>
  );
}
