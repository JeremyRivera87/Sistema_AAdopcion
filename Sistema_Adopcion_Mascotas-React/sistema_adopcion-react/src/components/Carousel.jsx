import React, { useState } from "react";
import "../styles/Carousel.css";

const Carousel = () => {
  const slides = [
    {
      img: "https://placekitten.com/600/350",
      title: "Adopta un amigo",
      desc: "Encuentra mascotas que buscan un hogar lleno de amor."
    },
    {
      img: "https://place-puppy.com/600x350",
      title: "Proceso de adopción fácil",
      desc: "En pocos pasos podrás iniciar el proceso de adopción."
    },
    {
      img: "https://placekitten.com/601/350",
      title: "Mascotas vacunadas",
      desc: "Todas las mascotas están en buen estado de salud."
    }
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-container">
      <button className="arrow left" onClick={prevSlide}>❮</button>

      <div className="carousel-slide">
        <img src={slides[index].img} alt="slide" />
        <h2>{slides[index].title}</h2>
        <p>{slides[index].desc}</p>
      </div>

      <button className="arrow right" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Carousel;
