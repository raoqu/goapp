// Vite-compatible replacement for Webpack's require.context
// Eagerly import all svg modules so the keys are available at build time
const modules = import.meta.glob('../../icons/svg/*.svg', { eager: true })

const re = /\/([^\/]+)\.svg$/

const icons = Object.keys(modules).map((path) => {
  const m = path.match(re)
  return m ? m[1] : path
})

export default icons
