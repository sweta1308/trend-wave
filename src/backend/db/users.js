import {
  boyAvatar1,
  boyAvatar2,
  boyAvatar3,
  girlAvatar1,
  girlAvatar2,
  girlAvatar3,
  girlAvatar4,
} from "../../assets";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "ijsiojks_838s_skkneknd",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarsh@123",
    bio: "I love myself!",
    avatarUrl: girlAvatar1,
    website: "https://swetaagarwalla.netlify.app/",
    createdAt: "2023-06-07T10:10:22+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "jjnsijw29_i3js_9smo3j993kd",
    firstName: "Sweta",
    lastName: "Agarwal",
    username: "swetaagarwal",
    password: "sweta1331",
    bio: "Be yourself!",
    avatarUrl: girlAvatar2,
    website: "https://swetaagarwalla.netlify.app/",
    createdAt: "2022-10-24T10:15:08+05:30",
    updatedAt: formatDate(),
  },


  {
    _id: "ksjiojiks_83je_jknsih388",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "john1234",
    bio: "Be limitless",
    avatarUrl: boyAvatar1,
    website: "",
    createdAt: "2023-01-12T10:52:14+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "jhshiwuui_82js_kjnsjn2us",
    firstName: "Julie",
    lastName: "Evans",
    username: "julieevans",
    password: "julie@789",
    bio: "Happy Summer!",
    avatarUrl: girlAvatar4,
    website: "",
    createdAt: "2021-03-25T10:43:09+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "ksjoijwxm_8jed_nsjni38snk",
    firstName: "Arya",
    lastName: "Joshi",
    username: "aryajoshi",
    password: "arya@789",
    bio: "Hello everyone!",
    avatarUrl: boyAvatar2,
    website: "",
    createdAt: "2022-07-10T10:15:23+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "kksnisiknx_38e8_djij3ndj",
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    password: "janedoe9876",
    bio: "Freelancer",
    avatarUrl: girlAvatar3,
    website: "https://swetaagarwalla.netlify.app/",
    createdAt: "2023-09-02T10:28:18+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "shuhej3_8u3j_ijei3nkdi",
    firstName: "Scott",
    lastName: "Ward",
    username: "scottward",
    password: "ward2022",
    bio: "Wev Developer",
    avatarUrl: boyAvatar3,
    website: "",
    createdAt: "2021-11-07T10:01:23+05:30",
    updatedAt: formatDate(),
  },
];
