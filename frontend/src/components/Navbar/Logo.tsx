import Link from "next/link";

const Logo = () => (
  <div className="text-xl font-bold">
    <Link href={"/"}>
      <span className={""}>Logo</span>
    </Link>
  </div>
);

export default Logo;