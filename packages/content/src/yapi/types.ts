/**
 * YApi相关类型定义
 */

// 请求查询参数类型
export interface RequestQueryParam {
  required: string;
  _id: string;
  name: string;
  example: string;
  desc: string;
}

// 查询路径类型
export interface QueryPath {
  path: string;
  params: any[];
}

// API接口数据类型
export interface ApiData {
  query_path: QueryPath;
  edit_uid: number;
  status: string;
  type: string;
  req_body_is_json_schema: boolean;
  res_body_is_json_schema: boolean;
  api_opened: boolean;
  index: number;
  tag: any[];
  _id: number;
  method: string;
  catid: number;
  title: string;
  path: string;
  project_id: number;
  req_params: any[];
  res_body_type: string;
  req_body_other?: string;
  uid: number;
  add_time: number;
  up_time: number;
  req_query: RequestQueryParam[];
  req_headers: any[];
  req_body_form: RequestQueryParam[];
  __v: number;
  markdown: string;
  desc: string;
  res_body: string;
  username: string;
}

export interface ApiResponse {
  errcode?: number;
  errmsg?: string;
  data?: ApiData;
  error?: boolean;
  message?: string;
}

export interface YapiConfig {
  baseUrl: string;
  buttonText: string;
  buttonId: string;
  panelId: string;
}
