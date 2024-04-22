import game1 from "../assets/lottie/lottie (2).json";
import game2 from "../assets/lottie/lottie (1).json";
import plinko from "../assets/images/plinko.png";
import crush from "../assets/images/Crash.png";
import casino from "../assets/images/casinio.jpg";

export const sortGameData = [
  {
    name: "Gambling",
    path: "/games/rouletteWheel",
    img: game2,
  },
  {
    name: "Casinio",
    path: "/games/casiniogame",
    img: game1,
  },
  {
    name: "Plinko",
    path: "/games/plinko",
    img: plinko,
  },
];

export const bigGameData = [
  {
    name: "Gambling",
    path: "/games/rouletteWheel",
    img: crush,
  },
  {
    name: "Casinio",
    path: "/games/casiniogame",
    img: casino,
  },
  {
    name: "Plinko",
    path: "/games/plinko",
    img: plinko,
  },
];
