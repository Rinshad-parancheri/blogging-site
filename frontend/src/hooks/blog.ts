import axios from "axios"
import { useEffect, useState } from "react"


interface Blog {
  "title": string,
  "id": number,
  "content": string,
  "createdAt": string,
  "author": {
    "name": string

  }
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([])


  let token = localStorage.getItem('token')
  let AuthStr = ''
  if (!token) {
    console.error('Token Error')
  } else {
    AuthStr = `Bearer ${token}`
  }
  useEffect(() => {
    axios.get(
      'http://backend.rinshadp014.workers.dev/app/v1/blog/getblogs',
      {
        headers: {
          Authorization: AuthStr
        }
      }
    ).then(response => {
      setBlogs(response.data.blogs)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    blogs
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>(Object)

  let token = localStorage.getItem('token')
  let AuthStr = ''
  if (!token) {
    console.error('Token Error')
  } else {
    AuthStr = `Bearer ${token}`
  }

  useEffect(() => {
    axios.get(
      `http://backend.rinshadp014.workers.dev/app/v1/blog/getblog/${id}`,
      {
        headers: {
          Authorization: AuthStr
        }
      }
    ).then(response => {
      setBlog(response.data.blog)
      setLoading(false)
    })
  }, [id])

  return {
    loading,
    blog
  }
}

const CustomHooks = {
  useBlog,
  useBlogs
}

export default CustomHooks
