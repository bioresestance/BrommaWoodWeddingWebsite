const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen text-black pt-[15vh] pb-20">
      <div className="p-6 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to our wedding RSVP website! Your privacy is very important to
          us. This Privacy Policy outlines how we handle and protect the
          personal information you share with us.
        </p>

        <h2 className="text-4xl font-semibold mt-6 mb-2">
          What Information We Collect
        </h2>
        <p className="mb-2">
          We may collect the following personal information from you:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Name</li>
          <li>
            Contact information (e.g., phone number, email address, mailing
            address)
          </li>
          <li>Dietary preferences or other RSVP-related details</li>
        </ul>

        <h2 className="text-4xl font-semibold mt-6 mb-2">
          How We Use Your Information
        </h2>
        <p className="mb-2">
          The information you provide will be used solely for wedding-related
          purposes, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Confirming your RSVP</li>
          <li>Planning wedding logistics (e.g., meal preferences)</li>
          <li>Sending thank-you cards after the wedding</li>
        </ul>
        <p className="mb-4">
          We will not use your information for any purpose unrelated to the
          wedding and its associated activities.
        </p>

        <h2 className="text-4xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          This website uses cookies to enhance functionality and improve your
          experience. Specifically, we use:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Session Cookies:</strong> These are essential for managing
            login sessions and ensuring secure navigation within the site. They
            do not collect personal data beyond what is necessary for site
            operation.
          </li>
        </ul>
        <p className="mb-4">
          By using this website, you consent to the use of cookies as outlined
          in this Privacy Policy.
        </p>

        <h2 className="text-4xl font-semibold mt-6 mb-2">Data Sharing</h2>
        <p className="mb-4">
          Your information will not be shared, sold, or disclosed to any third
          parties, except as required by law or for essential wedding planning
          purposes (e.g., providing guest counts to the venue).
        </p>

        <h2 className="text-4xl font-semibold mt-6 mb-2">
          Data Retention and Deletion
        </h2>
        <p className="mb-2">
          We will retain your information only until it is no longer needed for
          wedding-related purposes. After the wedding:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>All collected information will be permanently deleted.</li>
          <li>
            Backups containing your data will also be deleted during this
            process.
          </li>
        </ul>
        <p className="mb-4">
          No copies of your information will be kept after this deletion.
        </p>

        <h2 className="text-4xl font-semibold mt-6 mb-2">Data Security</h2>
        <p className="mb-4">
          We are committed to ensuring that your information is secure.
          Appropriate technical measures are in place to protect your data from
          unauthorized access or disclosure.
        </p>

        <h2 className="text-4xl font-semibold mt-6 mb-2">Your Consent</h2>
        <p className="mb-4">
          By providing your information on this website, you consent to its use
          as outlined in this Privacy Policy. If you have any questions or
          concerns, please reach out to us directly.
        </p>

        <p className="mb-4">
          Thank you for helping us celebrate this special occasion!
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
