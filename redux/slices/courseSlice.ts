import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  courseList: [
    {
      id: "1",
      name: "React Native Basics",
      thumbnail: "https://via.placeholder.com/150",
      description: "Learn the basics of React Native and build mobile apps.",
      long_description:
        "Learn how to build mobile applications using React Native. This course covers the fundamentals of React Native, including components, navigation, and state management.",
      objectives: [
        "Understand the basics of React Native framework.",
        "Build a simple mobile application from scratch.",
        "Learn about navigation and state management in React Native.",
      ],
      prerequisites: "Basic knowledge of JavaScript and React.",
      instructor: "John Doe",
      duration: "4 weeks",
      is_enroled: true,
    },
    {
      id: "2",
      name: "Advanced React Native",
      thumbnail: "https://via.placeholder.com/150",
      description: "Dive deeper into React Native and explore advanced topics.",
      long_description:
        "Learn how to build mobile applications using React Native. This course covers the fundamentals of React Native, including components, navigation, and state management.",
      objectives: [
        "Understand the basics of React Native framework.",
        "Build a simple mobile application from scratch.",
        "Learn about navigation and state management in React Native.",
      ],
      prerequisites: "Basic knowledge of JavaScript and React.",
      instructor: "John Doe",
      duration: "4 weeks",
      is_enroled: false,
    },
    {
      id: "3",
      name: "React Native for Web",
      thumbnail: "https://via.placeholder.com/150",
      description: "Learn how to use React Native for web development.",
      long_description:
        "Learn how to build mobile applications using React Native. This course covers the fundamentals of React Native, including components, navigation, and state management.",
      objectives: [
        "Understand the basics of React Native framework.",
        "Build a simple mobile application from scratch.",
        "Learn about navigation and state management in React Native.",
      ],
      prerequisites: "Basic knowledge of JavaScript and React.",
      instructor: "John Doe",
      duration: "4 weeks",
      is_enroled: false,
    },
  ],
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseData: (state, action: PayloadAction<any>) => {
      state.courseList = action.payload;
    },
  },
});
export const { setCourseData } = courseSlice.actions;

export default courseSlice.reducer;
