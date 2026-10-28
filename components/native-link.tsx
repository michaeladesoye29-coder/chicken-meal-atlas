import type { ComponentProps } from "react";

// Full document navigation keeps the dynamic API-backed pages resilient when
// a client-side route transition is interrupted by the network.
export default function Link(props: ComponentProps<"a">) {
  return <a {...props} />;
}
