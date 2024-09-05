import axios from "axios"
import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

const Editor = () => {
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const [tittle, setTittle] = useState('')
  return (

    <div className="">
      <div className="tittleInput w-full max-w-screen-lg focus:ring-blue-500 focus:border-blue-500">
        <textarea onChange={e => {
          setTittle(e.target.value)
        }}
          id="message"
          rows={3}
          className="block outline-none p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg  resize-none" placeholder="Title"></textarea>        </div>
      <div className="contenInput mt-8 w-full max-w-screen-lg ">
        <form>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">

            <div className="px-4 py-2 bg-white rounded-b-lg ">

              <textarea rows={10}
                id="editor"
                className="block w-full px-0 text-lg text-gray-800 bg-white border-0 outline-none  "
                placeholder="Write you story here "
                required
                onChange={e => {
                  setContent(e.target.value)
                }}
              ></textarea>
            </div>
          </div>
          <button type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
            onClick={e => {
              e.preventDefault()
              console.log(tittle)
              console.log(content)
              sendRequest(content, tittle, navigate)
            }}
          >
            Publish blog
          </button>
        </form>
      </div>
    </div >

  )
}


async function sendRequest(content: string, title: string, navigate: NavigateFunction) {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Token not found');
    return;
  }

  try {
    const response = await axios.post(
      'http://backend.rinshadp014.workers.dev/app/v1/blog/post',
      { content, title: title },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    navigate(`/blog/${response.data.blogId}`);
  } catch (error) {
    console.error('Error sending request:', error);
  }
}
export default Editor
