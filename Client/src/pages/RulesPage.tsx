const RulesPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen text-black pt-[20vh] md:pt-[40vh] pb-20">
            <div className="w-[90%] md:w-[75%] mx-auto">

                <div className="text-center px-5 md:px-20 p-5 md:p-10 mb-5 mx-4 md:mx-16">

                    <p className="text-3xl md:text-5xl font-bold text-black rounded-full p-6 md:p-12 pr-8 md:pr-16">
                        Wedding Ground Rules and Expectations
                    </p>

                    <p className="mt-4">
                        This page contains the ground rules for our wedding, please be aware that these rules exist to ensure our wedding day goes without a hitch.
                        Failure to follow these rules may result in your removal from the event and Venue. We hope that you understand that most of these rules are
                        common sense, so they should be easy to follow! Thanks for your understanding!
                    </p>
                </div>

                <div className="px-5 md:px-20 p-5 md:p-10 mb-5 mx-4 md:mx-16">
                    <p className="text-3xl md:text-5xl font-semibold mt-6 text-center pb-5">
                        General
                    </p>

                    <ul className="list-disc list-inside mt-4 space-y-6 md:space-y-10">
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">👰</span>
                            Only the Bride (Gina) can wear White or any related shade of White - including but not limited to Ivory, cream, and 'off-white' - with the only exception being men's dress shirts.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">👗</span>
                            Only members of the wedding party can wear clothing that is, or contains, shades of Purple or Blue.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">🗣️</span>
                            If a guest would like to say a quick few words during the speech time, a request must be made at least two weeks before the wedding so we can allocate an appropriate timeline for the wedding program. Please understand that although we welcome words, we ask these to be no more than a minute long. NO PERSONAL ANNOUNCEMENTS WILL BE ALLOWED.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">📵</span>
                            During the wedding ceremony and the speeches before dinner, there will be NO PHONES or PERSONAL DEVICES OUT! All devices must be on Silent and put away during these times. We have a professional photographer and do not want her view obstructed. We encourage guests to take personal photos and use their devices as needed outside these times.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">💍</span>
                            We are having a Modern, Nontraditional, and Non-religious wedding, skipping many traditional wedding customs. We ask that everyone who attends respects our choices regarding what/which customs we decide to include.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">🎉</span>
                            We are inviting many people from our social/family circles. We understand that not everyone in our social/family circle is within yours and that not everyone may be a fan of everyone else. However, we expect that if you choose to attend, regardless of who else attends, the focus will be on the wedding and celebrating us officially tying the knot.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">🚫</span>
                            Underage drinking will not be ACCEPTED or TOLERATED! We have an unlimited non-alcoholic package. The unlimited non-alcoholic package includes things such as non-alcoholic cider, tea, and coffee. There are no excuses. If anyone is seen bending this, they will be asked to leave. This includes handing someone underage a drink. The venue is very strict about this and could kick us out if it occurs.
                        </li>
                    </ul>
                </div>

                <div className="px-5 md:px-20 p-5 md:p-10 mx-4 md:mx-16 mb-5">
                    <p className="text-3xl md:text-5xl font-semibold mt-6 text-center pb-5">
                        Clothing/Attire
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-6 md:space-y-10">
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">🚫</span>
                            NO CAUSAL WEAR: Do not wear jeans, t-shirts, sweat pants, or anything with rips, holes, or stains.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">👗</span>
                            COVERAGE WHILE BEING COMFORTABLE: Choose clothes that let you move around easily without accidentally showing anything. Avoid outfits that are too tight, too short, or too loose. You want to be able to move around without concern. Also, note that this is a June wedding, so the weather may be warm.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">👠</span>
                            PROPER SHOES: Opt for dress shoes, heels, or nice flats. Avoid Sneakers, Flip-Flops, or overly casual footwear. Please remember that the wedding ceremony is in a wooded area with uneven grounds.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">🧥</span>
                            DRESSY OUTERWEAR: If you need a jacket or coat, ensure it is dressy and matches your outfit. Please do not wear hoodies or casual jackets.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl md:text-2xl">🔵</span>
                            No PURPLE OR BLUE: This includes, but is not limited to, clothing that contains alternate-based colours with either purple or blue patterns.
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default RulesPage;