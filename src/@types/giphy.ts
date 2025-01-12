export type Gif = {
    id: string;
    title: string;
    import_datetime: string;
    trending_datetime: string;
    rating: string;
    images: {
      downsized_large: {
        url: string;
      };
    };
  }

export type AutocompleteSuggestion = {
  name: string;
}