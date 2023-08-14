import React from "react";
import { Button } from "@lolmath/ui";
import Link from "next/link";

export default function HomepageFeatures(): JSX.Element {
  return (
    <div className="p-4 flex flex-col h-screen items-center justify-center bg-black gap-16 bg-gradient-to-tr from-black  to-lol-gray-900">
      <div className="font-beaufort uppercase font-bold text-3xl text-lol-gold-100">
        League of Legends Math Docs
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-3xl">
        <div className="flex flex-col p-8 pt-7 border border-lol-gold-700 hover:border-lol-gold-500 bg-black items-start gap-8 hover:bg-lol-blue-950">
          <h1 className="font-beaufort uppercase font-bold text-2xl text-lol-gold-200">
            Calc
          </h1>
          <p className="font-spiegel text-lol-gold-50">
            League of Legends math and theorycrafting tools.
          </p>
          <Link className="mt-auto" href="/calc">
            <Button>Docs</Button>
          </Link>
        </div>
        <div className="flex flex-col p-8 pt-7 border border-lol-gold-700 hover:border-lol-gold-500 bg-black items-start gap-8 hover:bg-lol-blue-950">
          <h1 className="font-beaufort uppercase font-bold text-2xl text-lol-gold-200">
            UI
          </h1>
          <p className="font-spiegel text-lol-gold-50">
            A React Component Library with League of Legends-inspired design.
            Based on Tailwind CSS and React Aria Components.
          </p>
          <Link className="mt-auto" href="/ui">
            <Button>Docs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
