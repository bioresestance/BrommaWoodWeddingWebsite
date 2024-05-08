interface HeaderProps {
  showDropdown: boolean;
}

const Header = ({ showDropdown }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-5 shadow-xl md:px-10 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex items-center">
        <img
          className="w-36 h-36 rounded-full"
          src="https://picsum.photos/400/500"
          alt="Profile"
        />
      </div>

      <div className="text-5xl font-bold text-center">
        Bromma and Wood Wedding
      </div>

      {showDropdown && (
        <div className="relative">
          {/* <MenuIcon className="w-6 h-6 cursor-pointer md:hidden" /> */}
          <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              Link 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              Link 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              Link 3
            </a>
          </div>
        </div>
      )}
      {!showDropdown && <div className="relative"></div>}
    </header>
  );
};

export default Header;
