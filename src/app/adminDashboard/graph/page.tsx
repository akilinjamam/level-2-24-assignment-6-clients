"use client"
import { useGetAllPost } from "@/hooks/posts.hook";
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { TPosts } from "@/types/posts.type";

const Graph = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    const {data:getPosts} = useGetAllPost();
    console.log(getPosts?.data)

    const data = {
        labels: getPosts?.data?.map((post:TPosts) => post?.title),
        datasets: [
          {
            label: 'Sales',
            data: getPosts?.data?.map((post:TPosts) => post?.upvotes),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      };
   
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Sales Data',
          },
        },
      };

    return (
        <div className="w-full p-2">
            <div className="w-full h-[40px] bg-gray-300 p-2">
                <p className="font-bold text-blue-500">View upvotes for All Posts :</p>
            </div>
            <div>
                <Line data={data}/>
            </div>
        </div>
    );
};

export default Graph;