
const FAQPage: React.FC = () => {

    return (
        <div className="flex flex-col items-center w-full min-h-screen text-black pt-[40vh]">
            <p className="text-5xl font-bold text-black rounded-full p-12 pr-16">
                FAQ
            </p>

            <p>
                This page contains the most common question, along with their answers. Please find them below under each catagory!
            </p>
            <br />

            <p className="text-2xl">
                General
            </p>



            <p className="text-2xl">
                Clothing/Attire
            </p>

            <p className="text-2xl">
                Venue
            </p>



            <p className="text-2xl">
                Invitions/How to RSVP
            </p>

            <br />
            <p className="text-black">
                For general inquires and questions on how to use this website, please email Aaron at aaron@bromma.dev.
            </p>
        </div>
    );
};

export default FAQPage;
