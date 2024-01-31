import { Carousel } from "@mantine/carousel";
import { Center, Flex, Image } from "@mantine/core";
import React from "react";
import styles from "./NotesPreview.module.css";
import NoteIcon from "@assets/icons/note.svg?react";

interface NotesPreviewProps {}

const NotesPreview: React.FC<NotesPreviewProps> = ({}) => {
  return (
    <Carousel withIndicators height="500px">
      <Carousel.Slide>
        <Center p="lg">
          <Image
            src="https://images.unsplash.com/photo-1560692830-04adc2f31119?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="No way!"
          />
        </Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center p="lg">
          <Image
            src="https://images.unsplash.com/photo-1560692830-0a8209e6f526?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="No way!"
          />
        </Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Flex p="lg" align="center" justify="center" h="100%">
          <NoteIcon className={styles.icon} />
        </Flex>
      </Carousel.Slide>
    </Carousel>
  );
};

export default NotesPreview;
