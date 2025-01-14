import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isGoing = queryParams.get('isGoing');
    return (
        <div className="flex flex-col items-center w-full min-h-screen text-black pt-[15vh] pb-20 px-4 md:px-0">
            <p className="text-5xl font-bold text-black rounded-full p-12 pr-16">
                {isGoing === 'yes' ? 'We are excited to see you there!' : 'Sorry to hear you can\'t make it.'}
            </p>
            <div>
                <br />
                <br />
                {isGoing === 'yes' && (
                    <>
                        <p>
                            We have sent you an email with the confirmation, but you are welcome to make changes to your RSVP up until <u>April 30th, 2025</u>.
                        </p>
                        <p className='text-3xl'>
                            In the meantime:
                        </p>
                        <br />
                        <ul className="list-disc list-inside">
                            <li>
                                Read more on the venue <Link to="/venue" className='text-blue-500'>Here</Link>.
                            </li>
                            <li>
                                Plan your stay in Victoria by reading our hotel recommendations <Link to="/hotels" className='text-blue-400'>Here</Link>.
                            </li>
                            <li>
                                Ensure that you understand our Wedding Rules <Link to="/rules" className='text-blue-400'>Here</Link>.
                            </li>
                            <li>
                                Read about some common questions you may have <Link to="/faq" className='text-blue-400'>Here</Link>.
                            </li>
                        </ul>
                    </>
                )}
                {isGoing !== 'yes' && (
                    <>
                        <p className='text-3xl'>
                            We're sorry to miss you!
                        </p>
                        <br />
                        <p>
                            If your plans change, you can update your RSVP anytime before <u>April 30th, 2025</u>.
                        </p>
                        <br />
                        <p>
                            In the meantime, feel free to explore our website for more information about the event.
                        </p>
                    </>
                )}

                <div className="mt-8">
                    <Link to="/user">
                        <button className="bg-blue-400 text-white px-4 py-2 rounded mr-4">
                            Return to RSVP Details
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="bg-purple-400 text-white px-4 py-2 rounded">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;