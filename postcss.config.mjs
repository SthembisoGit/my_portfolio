/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
module.exports = {
  theme:{
    extend:{
      fontFamily:{
        code:['Fira Code', 'monospace',],
      },
    },
  },
}

export default config
