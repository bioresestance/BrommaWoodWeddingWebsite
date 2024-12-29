import React, { FC } from 'react';

const HotelsPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen text-black pt-[15vh] pb-20">
            <div className="p-6 max-w-4xl mx-auto text-gray-800">
                <h1 className="text-3xl font-bold mb-4">Recommendations for Hotels</h1>
                <p className="mb-4">
                    This is a list of accommodations near the wedding venues. While we've chosen these for their convenience, you are not required to stay at any of them. We encourage you to explore other options, compare prices, and find the best deal that fits your needs.
                </p>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Quality Inn</h2>
                    <p className="mb-2"><strong>Location:</strong> 2476 Mt. Newton Cross Roads, Saanichton, BC V8M 2B8</p>
                    <p className="mb-2"><strong>Hotel Summary:</strong></p>
                    <p className="mb-2">
                        This rustic hotel, located near the wedding venue on Vancouver Island, provides a simple stay. It is 6.7 km from Victoria International Airport and 11 km from the ferry terminal. Guest amenities include a complimentary breakfast, an on-site restaurant, a bar, and afternoon tea. The hotel also features tennis courts, a game room (fees apply), a convenience store, meeting rooms, and free parking.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Motel 6</h2>
                    <p className="mb-2"><strong>Location:</strong> 401 Mt Newton Cross Rd, Saanichton, BC V8M 1T8</p>
                    <p className="mb-2"><strong>Hotel Summary:</strong></p>
                    <p className="mb-2">
                        As the closest and most budget-friendly option near the wedding venue (it is only 2 km from the venue), this hotel offers very basic amenities for a convenient stay. Its only selling point is that it provides pet-friendly, kid-friendly, and smoke-free accommodations. This hotel is a practical choice if you want to save on accommodation and prefer a straightforward, no-frills stay.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Brentwood Bay Resort</h2>
                    <p className="mb-2"><strong>Location:</strong> 849 Verdier Ave, Victoria, BC V8M 1C5</p>
                    <p className="mb-2"><strong>Hotel Summary:</strong></p>
                    <p className="mb-2">
                        This upscale waterfront resort, located 8 km from the venue and 19 km from the ferry terminal, provides a luxurious stay for wedding guests. Studios and one-bedroom suites offer oceanfront balconies, fireplaces, and whirlpool tubs, while two-bedroom villas include full kitchens and indoor/outdoor fireplaces. Guests can enjoy dining at the on-site restaurant or casual pub and unwind at the spa, which features an outdoor pool, hot tub, and fitness center.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Sidney Waterfront Inn</h2>
                    <p className="mb-2"><strong>Location:</strong> 9775 First St, Sidney, BC V8L 3E1</p>
                    <p className="mb-2"><strong>Hotel Summary:</strong></p>
                    <p className="mb-2">
                        This ocean-view hotel is conveniently located 7 km from the venue and the ferry terminal. The air-conditioned one- and two-bedroom suites include essentials like flat-screen TVs, free Wi-Fi, and microwaves, and the rooms are described as “bright and welcoming”.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Best Western Plus Emerald Isle Hotel</h2>
                    <p className="mb-2"><strong>Location:</strong> 2306 Beacon Ave, Sidney, BC V8L 1X2 • (250) 656-4441</p>
                    <p className="mb-2"><strong>Hotel Summary:</strong></p>
                    <p className="mb-2">
                        This hotel is conveniently located 6 km from the venue and the ferry terminal. Like all the others, it offers all the standards, such as free Wi-Fi, iPod docks, flat-screen TVs, minifridges, microwaves, and coffeemakers. Suites offer separate living areas with pull-out sofas, and some include whirlpool tubs and kitchenettes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HotelsPage;