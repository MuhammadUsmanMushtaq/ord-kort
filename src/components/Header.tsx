import { BookOpen, Linkedin, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="text-blue-500" />
                Swedish Vocabulary Flashcards
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/muhammad-usman-78491149/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:usman820901@gmail.com"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                  <img
                    src="https://muhammad-usman.netlify.app/images/profile_pic.jpg"
                    alt="Muhammad Usman"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800">
                  Muhammad Usman
                </p>
                <p className="text-xs text-gray-500">Software Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
