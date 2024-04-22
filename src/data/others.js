import { AiOutlineHome } from "react-icons/ai";
import { GrGamepad } from "react-icons/gr";
import { MdOutlineContactPage, MdOutlineTrendingUp } from "react-icons/md";
import {
  RiAccountCircleLine,
  RiFileInfoLine,
  RiTaskLine,
  RiTeamLine,
} from "react-icons/ri";

const DashRoutes = [
  {
    label: "Wallet",
    path: "/dashboard/",
    icon: <AiOutlineHome size={20} />,
  },
  {
    label: "About",
    path: "/dashboard/about",
    icon: <RiFileInfoLine size={20} />,
  },
  {
    label: "Works",
    path: "/dashboard/work",
    icon: <RiTaskLine size={20} />,
  },
  {
    label: "Treads",
    path: "/dashboard/tradPrimary",
    icon: <MdOutlineTrendingUp size={20} />,
  },
  {
    label: "Plans",
    path: "/dashboard/planDetails",
    icon: <MdOutlineContactPage size={20} />,
  },
  {
    label: "Games",
    path: "/dashboard/tradSecondary",
    icon: <GrGamepad size={20} />,
  },
  {
    label: "Team",
    path: "/dashboard/team",
    icon: <RiTeamLine size={20} />,
  },
  {
    label: "Profile",
    path: "/dashboard/me",
    icon: <RiAccountCircleLine size={"20px"} />,
  },
];

export default DashRoutes;
