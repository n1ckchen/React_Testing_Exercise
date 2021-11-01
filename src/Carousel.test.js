import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function () {
  render(<Carousel />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

// // // Part 3: Bug! Left arrow
// // // As you may have noticed, the left arrow and the right arrow both do the same thing: move to the next image in the
// image array.Write a(failing) test that checks for this bug.In other words,
//   // write a test that expects that when you’re on the second image,
//   clicking the left arrow will move you to the first image.Once you’ve written a failing test, fix the app so that your test turns green.

// // // Part 4: Bug! Exhausting the image array
// // // As you may have noticed, if you’re on the last image and try to move forward,
// or if you’re on the first image and try to move backward, you get an error.To fix this, let’s just hide the
// // left arrow on the first image and the right arrow on the last.

// // // Write a (failing) test to check that the left arrow is missing when you’re on the first image,
// and that the right arrow is missing when you’re on the last image.Then fix the bug so that your test turns green.

it("hides and shows arrows appropriately", function () {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  // expect the left arrow to be missing, but the right button to be present.
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward, expect both arrow to exist
  fireEvent.click(getByTestId("right-arrow"));
  // expect the left arrow to be missing, but the right button to be present.
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward again, expect only the right arrow to be missing
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});

it("works when you click on the left arrow", function () {
  const { getByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  // move to the right
  fireEvent.click(rightArrow);

  // move back to the left, expect the first image to show
  fireEvent.click(leftArrow);
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});
