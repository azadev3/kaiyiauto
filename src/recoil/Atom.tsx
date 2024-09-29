import { atom } from "recoil";

export const SelectedLanguageState = atom<any>({
  key: "selectedLanguageState",
  default: "az",
});

export const LoadingState = atom<boolean>({
  key: "loadingStateKey", 
  default: false,
})