import { ArrowRight, ArrowLeft, Quote, Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Robert Fox",
      role: "UI/UX Designer",
      image: "/person1.jpg",
      review:
        "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
    },
    {
      id: 2,
      name: "Bessie Cooper",
      role: "Creative Director",
      image: "/person1.jpg",
      review:
        "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare.",
    },
    {
      id: 3,
      name: "Jane Cooper",
      role: "Photographer",
      image: "/person1.jpg",
      review:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra. Suspendisse et magna quis nibh accumsan venenatis.",
    },
  ];

  return (
    <section className="bg-muted-foreground py-16 w-full min-h-198.5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <h2 className="text-5xl font-semibold text-center text-[#18191C] mb-16">
          Clients Testimonial
        </h2>

        {/* Content */}

        <div className="flex items-center gap-10">

          {/* Left Arrow */}

          <button className="w-12 h-12 bg-white rounded-lg shadow flex items-center justify-center text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
            <ArrowLeft size={22} />
          </button>

          {/* Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">

            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                {/* Stars */}

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star className="text-[#FFA500] fill-[#FFA500]"
                      key={i}
                      size={18}
                     
                    />
                  ))}
                </div>

                {/* Review */}

                <p className="text-[#5E6670] leading-6 mb-10 text-[16px]">
                  "{item.review}"
                </p>

                {/* Bottom */}

                <div className="flex justify-between items-end">

                  <div className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-md text-[#18191C]">
                        {item.name}
                      </h3>

                      <p className="text-[#767F8C] text-[14px]">
                        {item.role}
                      </p>
                    </div>

                  </div>

                  <Quote
                    size={40}
                    className="text-gray-300 rotate-180"
                  />

                </div>

              </div>
            ))}

          </div>

      

          <button className="w-12 h-12 bg-white rounded-lg shadow flex items-center justify-center text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
            <ArrowRight size={22} />
          </button>

        </div>

        {/* swipe Button */}

        <div className="flex justify-center gap-2 mt-12">

          <div className="w-2 h-2 rounded-full bg-blue-200"></div>

          <div className="w-2 h-2 rounded-full bg-blue-200"></div>

          <div className="w-8 h-2 rounded-full bg-[#0A65CC]"></div>

          <div className="w-2 h-2 rounded-full bg-blue-200"></div>

          <div className="w-2 h-2 rounded-full bg-blue-200"></div>

        </div>

      </div>
    </section>
  );
};