const NewsCard = ({ info }) => {
  const { author, title, description, urlToImage, url, date } = info;
  return (
    <div className=" shadow-2xl rounded-b-lg hover:scale-90 transition-transform ">
      <div className="">
        <img
          className="w-full h-80 object-cover rounded-t-lg"
          src={urlToImage}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col justify-between p-2 h-48">
        <p className="text-xs line-clamp-2">{date}</p>
        <p className="font-semibold line-clamp-2 text-md">{title}</p>
        <p className="line-clamp-2 text-md ">{description}</p>
        <div className="flex justify-between items-center pb-2 align-bottom">
          <p className="text-sm truncate w-20 md:w-48">{author}</p>
          <a href={url} target="_blank" className="">
            <button className=" px-4 py-1.5 rounded-md capitalize bg-sky-500 text-white text-sm font-bold ">
              read more
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
