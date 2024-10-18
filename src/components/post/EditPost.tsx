"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomJwtPayload } from '@/jwtDecoder/jwtDecoder';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import SimpleTextEditor from '../simpleTextEditor/SimpleTextEditor';
import { useUpdateImagePosts, useUpdatePosts } from '@/hooks/posts.hook';
import { TPosts } from '@/types/posts.type';

const EditPost = ({userInfo, postInfo, refetch} : {userInfo:CustomJwtPayload, postInfo:TPosts, refetch:any}) => {

    const [value, setValue] = useState('');
    const [imagePreview, setImgPreview] = useState<string[] | []>([]);
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [category, setCategory] = useState('');
    const [premium, setPremium] = useState(false);
    const [title, setTitle] = useState('');
    const [selectImg, setSelectImg] = useState<number>();
    
    
    const {mutate:updatePostData} = useUpdatePosts(refetch)
    const {mutate:updateImagePostData} = useUpdateImagePosts(refetch)
    console.log(selectImg)
  

    useEffect(() => {
        setCategory(postInfo?.category)
        setTitle(postInfo?.title)
        setValue(postInfo?.description)
        setPremium(postInfo?.premium)
    },[postInfo])
    
   
    const handlePost = (event:any) => {
        event.preventDefault();

        const formData = new FormData();
        
        
        const data = {
            userId: userInfo?.id,
            name: userInfo?.name,
            title: title,
            description: value,
            premium,
            category,
            upvotes:0
        };

        const imageData = {
            id: postInfo?._id,
            index: selectImg
        }

        formData.append("data", JSON.stringify(imageData));

        formData.append("image", imageFiles[0]);

        const postData = {
            data: data,
            id: postInfo?._id
        }

        updatePostData(postData)

        if(imageFiles?.length > 0) {
            updateImagePostData(formData)
        }

        setSelectImg(undefined)
        setImageFiles([])
        setImgPreview([])
    }

    const handleImageChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setImageFiles([file]);

        if(file){
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgPreview([reader.result as string])
            }

            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="px-2">
            <div className="w-full h-[30px] bg-white rounded-full my-4 flex items-center justify-between px-3 font-bold">
                        <p className="italic">update your post :</p>
                        { selectImg !== undefined
                        &&
                        <label htmlFor='image' className="cursor-pointer">update Image</label>

                        }
                        <input  type="file" name="" multiple  id="image" className='hidden' onChange={(e) => handleImageChanges(e)} />
            </div>

            <div>
                <p className={`font-bold ${imagePreview?.length > 0 ? 'block' : 'hidden'}`}>updatable image: </p>
                <div className='w-full h-auto flex flex-wrap'>
                    {
                        imagePreview?.map((image,index) => {
                            return (
                                <Image key={index+1} src={image} width={200} height={200} alt='preview-img'/>
                            )
                        })
                    }
                </div>
            </div>
            <br />
            <div className='w-full h-auto flex flex-wrap'>
                {
                    postInfo?.images?.map((image,index) => {
                        return (
                            <Image onClick={() => setSelectImg(index)} className='cursor-pointer' style={{border: `${(selectImg === index) ? '3px solid blue' : ''}`}} key={index+1} src={image} width={200} height={200} alt='preview-img'/>
                        )
                    })
                }
            </div>
            <br />
            <form className='text-sm' onSubmit={handlePost}>
                <select value={category} name="" id="" onChange={(e) => setCategory(e.target.value)}>
                    <option value="Select Category">Select Category</option>
                    <option value="Flower Gardening">Flower Gardening</option>
                    <option value="Vegetable Gardening">Vegetable Gardening</option>
                    <option value="Fruit Gardening">Fruit Gardening</option>
                    <option value="Herb Gardening">Herb Gardening</option>
                    <option value="Indoor Gardening">Indoor Gardening</option>
                    <option value="Organic Gardening">Organic Gardening</option>
                    <option value="Landscape Gardening">Landscape Gardening</option>
                </select>
                <br />
                <br />
                <input
                    type="checkbox"
                        checked={premium}  
                    onChange={() => setPremium(!premium)}
                />
                <span className="ml-2">Premium</span>
                <br />
                <br />
                <input value={title} className='p-2' type="text"  id="" placeholder='write you title' onChange={(e) => setTitle(e.target.value)}/>
                <br /><br />
                <SimpleTextEditor value={value} setValue={setValue}/>     
                <br />
                <input type="submit" value="Update" className="px-3 py-1 bg-blue-500 font-bold text-white cursor-pointer" />
                <br />
                <br />
            </form>
        </div>
    );
};

export default EditPost;

