import { ref } from "vue";
import axios from "axios";
import type { Gif, AutocompleteSuggestion } from "../@types/giphy";

const giphyURL = import.meta.env.VITE_GIPHY_URL;
const giphyKey = import.meta.env.VITE_GIPHY_KEY;

const gifsCache: Record<string, Gif[]> = {};
const autocompleteCache: Record<string, string[]> = {};


export const useGiphy = () => {
  const gifs = ref<Gif[]>([]);
  const isLoading = ref(false);
  const offset = ref(0);

  const queryGifs = async (query: string, limit = 20) => {
    if (!query) return;
  
    isLoading.value = true;
  
    const isCacheAvailable = gifsCache[query];
  
    if (isCacheAvailable && offset.value === 0) {
      gifs.value = gifsCache[query];
      isLoading.value = false;
      return;
    }
  
    try {
      const result = await axios.get(`${giphyURL}/search`, {
        params: {
          api_key: giphyKey,
          q: query,
          offset: offset.value,
          limit,
        },
      });
  
      const newGifs = result.data.data;
  
      if (!isCacheAvailable) {
        gifsCache[query] = newGifs;
      } else {
        gifsCache[query] = [...gifsCache[query], ...newGifs];
      }
  
      gifs.value = [...gifs.value, ...newGifs];
    } catch (err) {
      console.error("Error fetching GIFs: ", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchAutocompleteSuggestions = async (query: string) => {
    if (!query) return [];
  
    if (autocompleteCache[query]) {
      return autocompleteCache[query];
    }
  
    try {
      const result = await axios.get(`${giphyURL}/search/tags`, {
        params: {
          api_key: giphyKey,
          q: query,
          limit: 5,
        },
      });
  
      const suggestions = result.data.data.map((suggestion: AutocompleteSuggestion) => suggestion.name);
  
      autocompleteCache[query] = suggestions;
  
      return suggestions;
    } catch (err) {
      console.error("Error autocompleting:", err);
      return [];
    }
  };

  const loadMore = (query: string) => {
    offset.value += 20;
    queryGifs(query);
  };

  const resetSearch = () => {
    gifs.value = [];
    offset.value = 0;
  };

  return {
    queryGifs,
    fetchAutocompleteSuggestions,
    loadMore,
    resetSearch,
    gifs,
    isLoading
  }
}