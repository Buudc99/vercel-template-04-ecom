export interface ContentResponse {
  currentPage: number;
  totalPage: number;
  contents: Content[];
}

export interface Content {
  id: string;
  name: string;
  slug: string;
  status: string;
  channel_id: number;
  content_data: ContentDaum[];
  content_type: ContentType;
  created_at: string;
  meta_data: MetaDaum[];
  taxonomies: Taxonomy[];
}

export interface ContentDaum {
  id: number;
  name: string;
  slug: string;
  key_name: string;
  value: string;
}

export interface ContentType {
  id: number;
  name: string;
  slug: string;
}

export interface MetaDaum {
  meta_key: string;
  meta_value: string;
}

export interface Taxonomy {
  name: string;
  slug: string;
  terms: Term[];
}

export interface Term {
  name: string;
  slug: string;
}
