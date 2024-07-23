import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "check gradient":
          "linear-gradient(hsl(192, 100%, 67%) to hsl(280, 87%, 65%))",
        "bright-blue": "hsl(220, 98%, 61%)",
        "l-very-dark-grayish-blue": "hsl(235, 19%, 35%)",
        "l-dark-grayish-blue": "hsl(236, 9%, 61%)",
        "l-light-grayish-blue": "hsl(233, 11%, 84%)",
        "l-very-light-grayish-blue": "hsl(236, 33%, 92%)",
        "l-very-light-gray": " hsl(0, 0%, 98%)",
        "d-very-dark-blue": "hsl(235, 21%, 11%)",
        "d-very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "d-light-grayish-blue": "hsl(234, 39%, 85%)",
        "d-light-grayish-blue-hover": "hsl(236, 33%, 92%)",
        "d-dark-grayish-blue": "hsl(234, 11%, 52%)",
        "d-very-dark-grayish-blue": "hsl(233, 14%, 35%)",
        "d-very-dark-grayish-blue-hover": "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
export default config;
