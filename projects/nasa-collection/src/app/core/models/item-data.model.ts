export interface ItemDataModel {
  title: string;
  nasa_id: string;
  location: string;
  center: string;
  date_created: string;
  description: string;
  media_type: string;
  keywords: { [key: number]: string }[];
}
