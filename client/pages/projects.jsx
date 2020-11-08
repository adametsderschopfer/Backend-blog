import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <h1>
      hyi
      <Link href="/post/21">
        <a>post 21</a>
      </Link>
    </h1>
  );
}
