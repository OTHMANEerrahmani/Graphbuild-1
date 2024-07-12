import { Contact, Hero, Pricing, Services, Testmonials } from "./Sections";
import { styles } from "../../styles";
import { pricingOptions } from "../../constants";
import { isAuthenticated } from "../../helpers/PrivateRouter";
import Footer from "./Sections/Footer";

export default function Home() {
  const array = [1, 2, 3];
  return (
    <section
      className="dark:text-white w-full overflow-y-auto no-scrollbar"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <div className="bg-slate-50 dark:bg-darkPrimary">
        {/* Hero */}

        <Hero />

        {/* Services */}

        <Services />

        {/* Testmonials */}

        <Testmonials />

        {/* pricing  */}
        <div
          className="flex flex-col items-center justify-center text-center my-4 space-y-8 md:h-screen snap-start"
          id="Pricing"
        >
          <h2
            className={`${styles.heroHeadText}  box-border m-0 font-semibold leading-tight tracking-tight border-solid`}
          >
            Simple, Transparent Pricing
          </h2>
          <div className="flex md:flex-row items-center justify-center md:space-x-2 space-y-2 md:space-y-0 flex-col mt-4 mx-4 ">
            {pricingOptions.map((item, index) => {
              return <Pricing key={index} pricingOption={item} />;
            })}
          </div>
        </div>

        {/* contact */}
        {!isAuthenticated() && (
          <div
            className="flex flex-col items-center leading-7 text-center md:mx-10 space-y-8 snap-start"
            id="Contact"
          >
            <Contact />
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}
