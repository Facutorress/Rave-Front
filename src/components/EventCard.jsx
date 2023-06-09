// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Assets
import { ImLocation2 } from "react-icons/im";
import { AiOutlineCalendar } from "react-icons/ai";

export const EventCard = ({ id, name, image, date, venue, hour }) => {
    // Format date
    const dateNew = new Date(date);
    const day = dateNew.getDate().toString().padStart(2, "0");
    const month = (dateNew.getMonth() + 1).toString().padStart(2, "0");
    const year = dateNew.getFullYear().toString();

    const formatDate = `${day}-${month}-${year}`;

    const formatHour = hour ? hour.slice(0, 5) : "-";

    // Buy click
    const navigate = useNavigate();
    const handleBuyClick = () => {
        navigate(`/event/${id}`);
    };

    return (
        <div className="h-[15rem] w-[35rem] mx-auto flex flex-row bg-slate-900 rounded-xl border border-secondaryBorder">
            <div className="w-[15rem] rounded-l-xl">
                <Link to={`/event/${id}`}>
                    <div
                        className="h-full w-full rounded-l-xl bg-cover bg-bottom bg-no-repeat"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        loading="lazy"
                    ></div>
                </Link>
            </div>

            <div className="w-[20rem] flex flex-col py-4 px-4 rounded-r-xl">
                <div className="flex flex-row items-center justify-center py-2 border-b border-secondaryBorder">
                    <h2 className="text-xl align-center font-semibold">
                        {name}
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 border-b border-secondaryBorder">
                    <AiOutlineCalendar size="1.3rem" />
                    <span className="">
                        {formatDate} - {formatHour}
                    </span>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 border-b border-secondaryBorder">
                    <ImLocation2 size="1.3rem" />
                    <span>{venue}</span>
                </div>
                <div className="flex flex-row items-center justify-start py-2 px-8">
                    <button className="btnPrimary" onClick={handleBuyClick}>
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
};
export default EventCard;
