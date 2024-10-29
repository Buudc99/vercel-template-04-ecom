export interface ContentDetailResponse {
  data: ContentDetail;
}

export interface ContentDetail {
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
  comments: Comment[];
  total_comments: number;
  reactions: any[];
  total_reactions: number;
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
export interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  media: string;
  meta_data: string;
  parent_comment_id: any;
  replies: any[];
}
