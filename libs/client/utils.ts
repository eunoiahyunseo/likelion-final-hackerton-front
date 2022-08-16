export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const imgUrl = (imageUrl: string) => {
  return `https://imagedelivery.net/_SMYXsMOOEvTYhYAAKoRCQ/${imageUrl}/public`;
};

export const userUrl = (avatarUrl: string) => {
  return `https://imagedelivery.net/_SMYXsMOOEvTYhYAAKoRCQ/${avatarUrl}/avatar`;
};

export const streamThumbnail = (streamUrl: string) => {
  return `https://videodelivery.net/${streamUrl}/thumbnails/thumbnail.jpg?height=320`;
};
