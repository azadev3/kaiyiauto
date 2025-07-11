import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../recoil/Atom";
import { TranslatesType } from "../types/ApiTypes";
import { api } from "./useRequests";

export const useTranslates = () => {
  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  const options = {
    headers: {
      "Accept-Language": selectedLanguage,
    },
  };

  const {
    data: translations = {},
    error,
    isLoading,
  } = useQuery<Record<string, string>>({
    queryKey: ["translatesKey", selectedLanguage],
    queryFn: async () => {
      try {
        const response = await axios.get(`${api}/translatesfront`, { headers: options.headers });
        const data = response.data;

        const translationsMap: Record<string, string> = {};
          data?.forEach((item: TranslatesType) => {
            if (item?.key && item?.text) {
              translationsMap[item.key] = item.text;
            }
          });

        return translationsMap;
      } catch (error) {
        console.error("Error fetching translations:", error);
        throw new Error(`Error fetching translations: ${error}`);
      }
    },
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  if (error) {
    console.error("Error fetching translations:", error);
  }

  return { translations, isLoading };
};
