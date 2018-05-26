

declare interface scene_data {
  scene_id: string;
  site: string;
  paysite: string;
  paysite_id: string;

  title: string;
  url: string;
  image: string;
  date: string;
  actors: string[];
  tags: string[];
  description?: string;
}

declare class Scene {
  private scene: scene_data;
  constructor(paysite: string);

  public set_site(site: string): void;
  public set_title(title: string): void;
  public set_url(url: string): void;
  public set_image(image: string): void;
  public set_date(date: string): void;
  public set_description(description: string): void;

  public add_actors(actors: string[]): void;
  public add_tags(tags: string[]): void;
  public set_paysite_id(unique_id: string): void;

  public commit(): void;
}
