export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IPhotos {
  listPhotos?: IPhoto[];
  compare?: number;
}
