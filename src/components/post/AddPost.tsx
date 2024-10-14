"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomJwtPayload } from '@/jwtDecoder/jwtDecoder';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import SimpleTextEditor from '../simpleTextEditor/SimpleTextEditor';
import { useUploadPosts } from '@/hooks/posts.hook';

const AddPost = ({userInfo} : {userInfo:CustomJwtPayload}) => {

   

    const [value, setValue] = useState('');
    console.log(value)
    const [imagePreview, setImgPreview] = useState<string[] | []>([]);
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [category, setCategory] = useState('');
    const [premium, setPremium] = useState(false);

    const {mutate:createPostData, data, error} = useUploadPosts()
    console.log(data)
    console.log(error)
   
    const handlePost = (event:any) => {
        event.preventDefault();

        const formData = new FormData();
        
        
        const data = {
            userId: userInfo?.id,
            name: userInfo?.name,
            title: event.target.title.value,
            description: value,
            premium,
            category,
        };

        formData.append("data", JSON.stringify(data));

        for( const image of imageFiles){
            formData.append("images", image)
        }

        createPostData(formData)
    }

    const handleImageChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setImageFiles((prev) => [...prev, file]);

        if(file){
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgPreview((prev) => [...prev, reader.result as string])
            }

            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="px-2">
            <div className="w-full h-[30px] bg-white rounded-full my-4 flex items-center justify-between px-3 font-bold">
                        <p className="italic">write your post :</p>
                        <label htmlFor='images' className="cursor-pointer">Add Images</label>
                        <input  type="file" name="" multiple  id="images" className='hidden' onChange={(e) => handleImageChanges(e)} />
            </div>

            <div className='w-full h-auto flex flex-wrap'>
                {
                    imagePreview?.map((image,index) => {
                        return (
                            <Image key={index+1} src={image} width={200} height={200} alt='preview-img'/>
                        )
                    })
                }
            </div>
            <br />
            <form className='text-sm' onSubmit={handlePost}>
                <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
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
                <input className='p-2' type="text" name="title" id="" placeholder='write you title'/>
                <br /><br />
                <SimpleTextEditor value={value} setValue={setValue}/>     
                <br />
                <input type="submit" value="Post" className="px-3 py-1 bg-blue-500 font-bold text-white cursor-pointer" />
                <br />
                <br />
            </form>
        </div>
    );
};

export default AddPost;

