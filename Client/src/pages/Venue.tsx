import React from 'react';

const VenuePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen text-black pt-[15vh] pb-20">
            <div className="p-6 max-w-4xl mx-auto text-gray-800 font-sans">
                <h1 className="text-3xl font-bold mb-4">Wedding Venue</h1>
                <p className="mb-4">
                    We are excited to celebrate our special day with you at our chosen venue. Below are the details about the venue, including location and parking/transportation information.
                </p>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Venue Name</h2>
                    <p className="mb-2"><strong>Location:</strong> 1234 Wedding Lane, Celebration City, ST 56789</p>
                    <p className="mb-2"><strong>Venue Summary:</strong></p>
                    <p className="mb-2">
                        Our wedding will take place at this beautiful venue, which offers a perfect blend of elegance and charm. The venue features a spacious hall for the reception, a picturesque garden for the ceremony, and various amenities to ensure a comfortable and enjoyable experience for all our guests.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Parking and Transportation</h2>
                    <p className="mb-2"><strong>Parking:</strong></p>
                    <p className="mb-2">
                        The venue offers ample parking space for all guests. There is a main parking lot located adjacent to the venue, as well as overflow parking available nearby. Parking attendants will be on-site to assist with directions and parking.
                    </p>
                    <p className="mb-2"><strong>Transportation:</strong></p>
                    <p className="mb-2">
                        For those who prefer not to drive, we recommend using ride-sharing services such as Uber or Lyft. Additionally, there will be a shuttle service available from select hotels to the venue. Please check with your hotel for shuttle schedules and availability.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VenuePage;