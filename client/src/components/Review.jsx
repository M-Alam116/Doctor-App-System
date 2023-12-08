import ReviewCard from "./Reviewcard";
export default function Review() {
  const reviewData = [
    {
      id: 1,
      name: "Muhammad Alam",
      image: "/client1.png",
      rating: 5,
      review:
        "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    },
    {
      id: 2,
      name: "Vesta Shufelt",
      image: "/client2.png",
      rating: 5,
      review:
        "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    },
    {
      id: 3,
      name: "Manazar Butt",
      image: "/client3.png",
      rating: 5,
      review:
        "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    },
  ];

  return (
    <section className="container">
      <h1 className="page-heading">What Our Client Says?</h1>

      <div className="mt-[3.5rem] grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4rem] lg:gap-[2rem]">
        {reviewData.map((data) => (
          <ReviewCard
            key={data.id}
            image={data.image}
            name={data.name}
            review={data.review}
            rating={data.rating}
          />
        ))}
      </div>
    </section>
  );
}
