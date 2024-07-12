import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { ourServices } from "../../../constants";

function Services() {
  return (
    <section className=" lg:py-24 py-4 h-screen snap-start" id="Services">
      <MaxWidthWrapper className="flex flex-col items-center gap-4 sm:gap-y-6 ">
        <div className="flex flex-col lg:flex-row items-center gap-4 ">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl ">
            What our <span className="relative px-2">Services </span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2  sm:gap-y-4 gap-2">
          {ourServices.map((service, index) => (
            <div
              className="flex flex-auto flex-row lg:flex-col md:gap-4 lg:px-8 xl:px-20 dark:bg-darkSecondary bg-white shadow-md rounded-2xl p-4 items-center"
              key={index}
            >
              <img
                className=" h-24   w-24 object-cover  "
                src={`/services/${index+1}.svg`}
                alt={`Service`}
              />
              <div className="md:text-lg md:leading-8 text-center space-y-1">
                <p className="font-medium ">{service.name}</p>
                <p className="text-xs ">{service.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Services;
