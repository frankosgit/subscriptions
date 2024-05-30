import { ButtonSecondary } from "@/components/buttonSecondary";
import { IWorkout } from "@/models/interfaces/content";
import axios from "axios";
import { useEffect, useState } from "react";

const Basic = () => {
  const [contents, setContents] = useState<IWorkout[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await axios.get(
        "http://localhost:3000/content?type=workouts"
      );
      setContents(response.data);
    };
    fetchContents();
  }, [contents]);

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl">THIS IS BASIC PAGE</h1>
      <h2 className="text-3xl">All workouts</h2>
      <div className="flex flex-wrap gap-12 px-10">
        {contents.map((content) => (
          <a
            key={content.id}
            href=""
            className="relative w-80 h-64 rounded-xl overflow-hidden bg-cover bg-center grayscale bg-[url('/src/assets/_29082154-8468-478d-baca-283c04521995.jpg')] duration-200 hover:scale-110 hover:grayscale-0"
          >
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-white">
              <h3 className="">{content.title}</h3>
              <p className="">{content.description}</p>
              {/* <img src={content.imageUrl} alt={content.title} /> */}
            </div>
          </a>
        ))}
      </div>
      {/* <ButtonSecondary text={"Subscribe"} url={""} height={"Medium"} /> */}
    </div>
  );
};

export default Basic;
