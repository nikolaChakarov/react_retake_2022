import { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Slider = ({ images }) => {
    const [index, setIndex] = useState(0);
    const [length, setLength] = useState(0);

    const goLeft = (num) => {
        index <= 0 ? setIndex(length) : setIndex((prev) => prev - num);
    };

    const goRight = (num) => {
        index >= length ? setIndex(0) : setIndex((prev) => prev + num);
    };

    useEffect(() => {
        setLength(images.length - 1);
    }, [images]);

    return (
        <SliderContainer className="slider-container">
            <div className="slider-wrapper">
                <img src={images[index]?.image_link} alt="alt_img" />
                <div className="arrow-left">
                    <ChevronLeft onClick={() => goLeft(1)} />
                </div>
                <div className="arrow-right">
                    <ChevronRight onClick={() => goRight(1)} />
                </div>
            </div>
        </SliderContainer>
    );
};

const SliderContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;

    .slider-wrapper {
        height: 500px;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        overflow: hidden;
    }

    .arrow-right,
    .arrow-left {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--orange);
        color: #fff;

        svg {
            font-size: 40px;
        }

        cursor: pointer;
    }

    .arrow-left {
        left: -20px;
    }

    .arrow-right {
        right: -20px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default Slider;
