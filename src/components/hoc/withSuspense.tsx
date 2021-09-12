import React, { Suspense } from "react";
import Preloader from "../common/preloader/preloader";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense
        fallback={
          <div>
            <Preloader />
          </div>
        }
      >
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}
