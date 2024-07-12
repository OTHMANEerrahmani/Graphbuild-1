import MaxWidthWrapper from "../components/MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className=" h-16  relative snap-start py-1">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200 " />

        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0 ">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
