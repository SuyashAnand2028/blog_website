import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog, fetchBlogs, index}) => {

    const {axios} = useAppContext()
    const {title,createdAt, _id} = blog ;
    const BlogDate = new Date(createdAt)

    const deleteBlog = async () => {
        try {
            const response = await axios.post('/api/blog/delete', {id: _id})
            if(response.data.success){
                toast.success('Blog deleted successfully')
                fetchBlogs()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const togglePublish = async () => {
        try {
            const response = await axios.post('/api/blog/toggle-publish', {id: _id})
            if(response.data.success){
                toast.success(blog.isPublished ? 'Blog unpublished' : 'Blog published')
                fetchBlogs()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4'>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}
            >{blog.isPublished ? 'Published' : 'Unpublished'}</p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-gray-100'>
                {blog.isPublished ? 'Unpublish' : 'Publish'}</button>
                <img onClick={deleteBlog} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" />
        </td>
    </tr>
  )
}

export default BlogTableItem