// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** createApp POST /aiaq/app/create */
export async function createAppUsingPost(
  body: API.AppCreateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/aiaq/app/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteApp GET /aiaq/app/delete/${param0} */
export async function deleteAppUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAppUsingGETParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/aiaq/app/delete/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** detailApp GET /aiaq/app/detail/${param0} */
export async function detailAppUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailAppUsingGETParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params;
  return request<API.BaseResponseAppDetailVO_>(`/aiaq/app/detail/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateApp POST /aiaq/app/edit */
export async function updateAppUsingPost(
  body: API.AppUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/aiaq/app/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listIndexApp POST /aiaq/app/index/list */
export async function listIndexAppUsingPost(
  body: API.AppQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultAppVO_>("/aiaq/app/index/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

// myapp
/** listMyApp POST /aiag/app/my/list */
export async function listMyAppUsingPost(
  body: API.AppQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultAppVO_>("/aiaq/app/my/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listApp POST /aiaq/app/list */
export async function listAppUsingPost(
  body: API.AppQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultAppVO_>("/aiaq/app/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** reviewApp POST /aiaq/app/review */
export async function reviewAppUsingPost(
  body: API.AppReviewRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/aiaq/app/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
