import { atom } from "recoil";

let localUser = localStorage.getItem("user");
if (localUser) {
  localUser = JSON.parse(localUser);
} else {
  localUser = { username: "", token: "", id: null };
}

export const userAtom = atom({
  key: "userAtom", // unique ID (with respect to other atoms/selectors)
  default: localUser, // default value (aka initial value)
});
