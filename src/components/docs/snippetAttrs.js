/** Builds JSX attribute strings for configurator snippets. */

const clean = (value) => String(value).trim().replace(/"/g, "'")

/** `key="value"`, or nothing when the value is empty. */
export function stringAttr(key, value) {
  const text = clean(value ?? '')
  return text ? [`${key}="${text}"`] : []
}

/** `key="value"` only when it differs from the component default. */
export function optionAttr(key, value, defaultValue) {
  return value === defaultValue ? [] : [`${key}="${value}"`]
}

/** Emits `key` / `key={false}` only when the value differs from the default. */
export function boolAttr(key, value, defaultValue) {
  if (value === defaultValue) return []
  return [value ? key : `${key}={false}`]
}

/** Copies non-empty trimmed strings from state into a props object. */
export function pickStrings(state, keys) {
  const props = {}
  for (const key of keys) {
    const value = String(state[key] ?? '').trim()
    if (value) props[key] = value
  }
  return props
}
