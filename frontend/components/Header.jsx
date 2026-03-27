const Header = () => {
  return (
    <header className="w-full bg-[#022A5E] shadow-md  md:px-6 py-4 flex items-center relative">
      <div className="absolute left-6">
        <img src="/logo.png" alt="Logo" className="w-[50px] md:w-auto h-10" />
      </div>

      <h1 class=" text-sm lg:text-4xl mx-auto  font-bold text-white">
        MERN STACK MACHINE TEST
      </h1>
    </header>
  );
};

export default Header;
