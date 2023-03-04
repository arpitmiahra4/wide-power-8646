import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Styles from "../../styles/Home.module.css"
const Caraousel = () => {
  const slides = [
    {
      img: "https://img.utdstc.com/screen/6a7/c13/6a7c136af080efa11e4e79e4d747e74e566db7ef50d6f82a8af3e45f9f10d32a:400",
    },
    {
      img: "https://asset.vg247.com/Best-Survival-Games-VG247.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Best-Survival-Games-VG247.jpg",
    },
    {
      img: "https://c.files.bbci.co.uk/E909/production/_112375695_crucible976.jpg",
    },
    {
      img: "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1dx8G642rlGiebjWWDCymz/a2736f89518a4ec9753c43b45c5da6dc/ubicom-moregames-header-sparks_of_hope.jpg",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKy33S_fsIa3PWzmFE7rncfK-QvVmYTasDN6P3mhTpg-ieQUY4PvzTF6ipBnPC-JaEutg&usqp=CAU",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";
  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);
  return (
    <Flex
      w="full"
      p={10}
      alignItems="center"
      justifyContent="center"
      borderRadius={10}
    >
      <Flex w="full" overflow="hidden" borderRadius={20} className={Styles.ccc}>
        <Flex pos="relative" h="300px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Caraousel;
