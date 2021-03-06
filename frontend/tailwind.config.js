module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out forwards",
      },
      colors: {
        custom: {
          cream: "#edf5e1",
          blue: "#05386b",
        },
      },
    },
  },
  plugins: [],
};
