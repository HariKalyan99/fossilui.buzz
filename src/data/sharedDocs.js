export const INSTALL_SNIPPET = `# Install
npm install @fossilui/react

# Tailwind v4 — app.css
@import "tailwindcss";
@source "../node_modules/@fossilui/react/dist";`

export function motionSnippet(component, motionProp, motion, body) {
  return `<${component} ${motionProp}="${motion}"${body ? `\n  ${body}` : ''}\n/>`
}
