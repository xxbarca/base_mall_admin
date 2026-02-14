import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // 请求超时时间
  timeout: 3000,
  // 请求头
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：添加 token 到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 可以在这里添加 loading 效果
    // 或者记录请求开始时间等

    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const {data, status} = response

    // 根据你的接口返回结构进行处理
    // 假设接口返回格式为：{ code: 200, data: {}, message: 'success' }

    if ([201, 200].includes(status)) {
      // 请求成功，返回数据
      return data
    } else {


      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export const GET = (url: string, params?: object) => {
  return request.get(url, params)
}

export const POST = <T>(url: string, data?: object): Promise<T> => {
  return request.post(url, data)
}

export const PUT = (url: string, data?: object) => {
  return request.put(url, data)
}

export const DELETE = (url: string) => {
  return request.delete(url)
}

export const PATCH = (url: string, data?: object) => {
  return request.patch(url, data)
}