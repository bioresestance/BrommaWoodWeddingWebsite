import React from 'react';

const VenuePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen text-black pt-[15vh] pb-20">
            <div className="p-6 max-w-4xl mx-auto text-gray-800">
                <h1 className="text-5xl font-bold text-center mb-4">Wedding Venue</h1>
                <p className="mb-4">
                    We are excited to celebrate our special day with you at our chosen venue. Below are the details about the venue, including location and parking/transportation information.
                </p>

                <div className="mb-6">
                    <h2 className="text-5xl font-semibold mb-2 text-center">Sea Cider Farm & Ciderhouse</h2>
                    <p className="mb-2"><strong>Location:</strong> 2487 Mt St Michael Rd, Saanichton, BC V8M 1T7</p>
                    <p className="mb-2"><strong>Venue Summary:</strong></p>
                    <p className="mb-2">
                        Sea Cider Farm & Ciderhouse is a charming cidery on the Saanich Peninsula, offering stunning orchard and water views, award-winning organic ciders, and a warm setting for weddings and special events. With its farm-to-table philosophy and serene atmosphere, it’s the perfect place to celebrate our big day.
                    </p>
                </div>

                <div className="flex justify-center mb-6">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.34675966523!2d-123.39710280000001!3d48.60320540000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548f6f33114811b5%3A0x53cd86baafbe7207!2s2487%20Mt%20St%20Michael%20Rd%2C%20Saanichton%2C%20BC%20V8M%201T7!5e0!3m2!1sen!2sca!4v1735495229307!5m2!1sen!2sca" width="600" height="450" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy={"no-referrer-when-downgrade"}></iframe>
                </div>

                <div className="mb-6">
                    <h2 className="text-5xl font-semibold mb-2 text-center">Parking and Transportation</h2>
                    <p className="mb-2"><strong>Parking:</strong></p>
                    <p className="mb-2">
                        Sea Cider provides plenty of parking for events and the gneral public. Parking is free and available on a first-come, first-served basis. If you plan to drive, we recommend carpooling with other guests to save on parking space.
                    </p>
                    <p className="mb-2"><strong>Transportation:</strong></p>
                    <p className="mb-2">
                        For those who prefer not to drive, we recommend using ride-sharing services such as Uber or getting a taxi. If you know that another guest is driving, we recommend reaching out to them and arranging to carpool to the venue.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VenuePage;