import React from "react";

const images = [
  { id: 1, src: "/events/event1.jpg", title: "New Year Celebration" },
  { id: 2, src: "/events/event2.jpg", title: "Club Night" },
  { id: 3, src: "/events/event3.jpg", title: "Sports Day" },
  { id: 4, src: "/events/event4.jpg", title: "Music Evening" },
];

export default function Gallery() {
  return (
    <section className="py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">
        Events & Updates
      </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-2 text-center font-medium bg-yellow-50">
              {img.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
