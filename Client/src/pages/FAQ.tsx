import React, { useState } from 'react';

const FAQPage: React.FC = () => {
    const faqs = [
        {
            question: "Do I have to use this RSVP system?",
            answer: "Yes. This is how we organize and document information. Although it is nice to hear from you in person, by text, call, or any other form of communication, it will not be documented as an official RSVP."
        },
        {
            question: "Can I bring [insert person or thing's name] to your wedding?",
            answer: "If your invitation does not indicate a plus one in your RSVP and they have not received an invitation, then—no."
        },
        {
            question: "I got an invitation without receiving a plus one, yet I have a partner. Can I bring them?",
            answer: "If we are familiar with your partner/significant other and they are invited, they would have received their own RSVP invitation. This is because we require everybody in attendance to fill out some personal details, such as allergies while RSVPing. We ask that you do not do this for them independently, but if they need support, please assist them."
        },
        {
            question: "What about the children?",
            answer: "Although we are not having a completely child-free wedding, unless your child has gotten an RSVP or it was directly indicated on your invitation, they are not invited. You will need to arrange childcare if you intend to come. If not, we do understand."
        },
        {
            question: "When do I need to complete the RSVP?",
            answer: "Please complete all RSVPs by April 30th, 2025. We cannot guarantee space if you do not do so by then."
        },
        {
            question: "What do I do if I RSVP but something comes up?",
            answer: "We understand that life happens. You are able to change your RSVP up until Apr. 30th, 2025. If you need to change your RSVP after this date, please contact either Gina or Aaron directly."
        },
        {
            question: "Is there going to be assigned seating? Where am I sitting? I want to sit beside [insert name here]!",
            answer: "Yes, seating will be assigned, and you may not change your table or switch with guests at other tables. However, you are welcome to switch individual seats within your assigned table number. Exact seating arrangements will be finalized closer to the wedding date, and details will be provided at the reception due to potential last-minute adjustments. After the dinner portion, you are free to mingle and socialize as you like."
        },
        {
            question: "When will the reception end?",
            answer: "The venue's policy is that all guests and non-vendors must leave by 10 p.m. To support this transition, the bar will close at 9:30 p.m., and the music on the dance floor will fade."
        },
        {
            question: "Can I take photos? If so, how can I share them with you?",
            answer: "Yes, you can take personal pictures during most of the event. We will also have a photo booth that we strongly encourage guests to have fun with. However, all phones and personal devices must be put away and on silent during the ceremony and speeches just before dinner. Any photos you take during the festivities, you can share them with us on Google Photos (Link to come) if you would like."
        },
        {
            question: "What is the Parking like at Sea Cider?",
            answer: "Sea Cider does have event space parking and some overflow spaces. However, it is a cidery, and these spaces are limited as the Cidery will be in operation for the first few hours of the festivities. As such, we suggest you arrange some carpools or alternate travel if possible. Parking will be first come, first serve."
        },
        {
            question: "Is the entire event outdoors?",
            answer: "No. The wedding ceremony will be outside in a wooded area. The Cider hour will also be outdoors on their patio. The reception will be inside Sea Cider's Hall."
        },
        {
            question: "What do we do if it rains?",
            answer: "If rain is forecasted on our wedding day, the venue will hand out umbrellas—first come, first serve—and cover the patio with event tents. Nevertheless, we ask that you plan your outfit and dress accordingly."
        },
        {
            question: "What kind of food will you be serving for Dinner?",
            answer: "The dinner will consist of a mix of American and Indian food and will be made to accommodate many dietary restrictions/allergies and spice tolerances. It will be served buffet style, and a sign indicating dietary restrictions will be posted in front of each item. Dessert will also be served similarly."
        },
        {
            question: "Is there an Open Bar? What does the bar have?",
            answer: "No, we've opted for a partially open bar. This open aspect includes unlimited cider from pre-selected varieties as well as non-alcoholic beverages. Whereas, beer, wine, spirits, and signature cocktails representing the bride and groom will be available for purchase at bar."
        },
        {
            question: "Should we bring Wedding gifts? What would the happy couple like? Do you have a registry?",
            answer: "No. Since we are not having a traditional wedding, we are not asking for gifts. In fact, we ask that guests do not bring gifts, as space at the venue will be limited. Instead, we are doing a wishing well to accept cards filled with sage wisdom, happy wishes, and/or monetary contributions to our honeymoon."
        },
        {
            question: "What is the Itinerary?",
            answer: "Unfortunately, we will not have the final programs made until much, much closer to the wedding date. Sometime before the wedding date, we will email PDFs of the itinerary and have some printed out at the wedding."
        },
        {
            question: "Is there an after-party?",
            answer: "There are no official after-parties, although rumor has it there might be a few celebratory drinks at the [insert hotel name] Pub."
        },
        {
            question: "Are there other events? Brunch?",
            answer: "Unfortunately, there are no other official wedding-related events planned."
        },
        {
            question: "What is the Dress Code?",
            answer: "It is Semi-Formal, but please refer to our Dress Code page for details."
        },
        {
            question: "Can I wear red to your wedding?",
            answer: "Yup. We are not having a traditional or religious wedding and do not care about the colors' significance."
        },
        {
            question: "I have [dress, suit, tie, etc.] with just A LITTLE PURPLE/BLUE, can I wear it?",
            answer: "No. These colors are reserved for the wedding party only, sorry."
        },
        {
            question: "Will there be a virtual wedding?",
            answer: "No. We want everyone to enjoy the wedding without worrying about tech or streaming issues. We are sorry if you miss it or are unable to make it."
        },
        {
            question: "Are you providing accommodations? Can we stay with you?",
            answer: "If you're traveling from out of town for the wedding or need a place to stay, please arrange your own accommodations. If you need help finding options or recommendations, check out our list of accommodations. Unfortunately, we won't be able to host anyone at our home during the wedding weekend, including the days leading up to and following the event. We appreciate your understanding and hope you find a comfortable place to stay!"
        },
        {
            question: "I am coming in one [insert date here]; wanna hang out? I can help with wedding prep/clean up!",
            answer: "Thank you for your offer, but we will have to decline. We will be swamped leading up to the wedding and want to prevent managing too many cooks in the kitchen. We will also be unavailable afterwards as we will be enjoying a mini-honeymoon."
        },
        {
            question: "Who do I talk to if I have a random question that is not here?",
            answer: "If you have read all the questions here and still have lingering questions, please do not immediately run to the Bride or Groom. Please try and reach out to one of the wedding party first."
        }
    ];

    return (
        <div className="flex flex-col items-center w-full min-h-screen text-black pt-10 pb-20 md:pt-[15vh]">
            <div className="flex flex-col items-center px-4 md:px-0">
                <h2 className="mt-5 text-center text-2xl font-bold tracking-tight md:text-5xl">FAQ</h2>
                <p className="mt-3 text-lg md:text-3xl">
                    Frequently asked questions
                </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200 px-4 md:px-0">
                {faqs.map((faq, index) => (
                    <div className="py-5" key={index}>
                        <details className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                                <span > {faq.question}</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <p className="group-open:animate-fadeIn mt-3 text-neutral-700">
                                {faq.answer}
                            </p>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage;