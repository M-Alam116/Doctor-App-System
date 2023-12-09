import ReviewCard from "./Reviewcard";
export default function Review() {
  const reviewData = [
    {
      id: 1,
      name: "Muhammad Alam",
      image: "/client1.png",
      rating: 5,
      review:
        "Having availed their medical services, I can confidently say they stand out in providing the best care. The staff is attentive, and the medical attention is thorough and thoughtful.",
    },
    {
      id: 2,
      name: "Vesta Shufelt",
      image: "/client2.png",
      rating: 5,
      review:
        "I've found a reliable healthcare partner in them. The medical services are not only top-notch but also delivered with a genuine concern for the patient's well-being. Highly recommended.",
    },
    {
      id: 3,
      name: "Manazar Butt",
      image: "/client3.png",
      rating: 5,
      review:
        "From the moment you walk in, it's evident that patient care is their priority. The medical services are not only effective but also delivered with a focus on making patients feel valued and heard.",
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
