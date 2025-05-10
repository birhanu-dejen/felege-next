// utils/withSearchParams.tsx
"use client";

import { Suspense } from "react";

export default function withSearchParams<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  function ComponentWithSearchParams(props: P) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }

  return ComponentWithSearchParams;
}
