import * as React from "react"

export interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  theme?: "light" | "dark"
}

const Code = React.forwardRef<HTMLPreElement, CodeProps>(({ className, theme = "light", ...props }, ref) => {
  const themeClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
  return (
    <pre
      ref={ref}
      className={`font-mono text-sm rounded-lg p-4 overflow-x-auto ${themeClass} ${className}`}
      {...props}
    />
  )
})

Code.displayName = "Code"

export { Code }