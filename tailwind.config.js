module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5BB5A2",
          secondary: "#ffa500",
          accent: "#ff6347",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          error: "red",
        },
      },
      "light",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
