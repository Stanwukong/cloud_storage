import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <section className="bg-black w-full hidden flex-col text-white items-center justify-center lg:flex">
        <div className="space-y-8">
          <span className="h1">CLOUDIFY</span>
          <div className="space-y-4">
            <p className="h2">Optimized file management</p>
            <p className="text-lg">
              Awesome, we&apos;ve created the perfect place for you to store all your
              documents
            </p>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center items-center">
        {children}
      </section>
    </div>
  );
};

export default Layout;
