import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native'
import React, { useMemo } from 'react'
import { useLocalSearchParams, useRootNavigationState, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { setCourseData } from '@/redux/slices/courseSlice';
import { useAppDispatch } from '@/redux/store';

const CourseDetail = () => {
    const params = useLocalSearchParams();
    const { courseList } = useSelector((state: { course: any }) => state.course);
    const dispatch = useAppDispatch();
    const course = useMemo(() => {
        return courseList.find((item: any) => item.id === params.id);
    }, [params.id, courseList]);

    const handleEnroll = () => {
        const updatedCourse = courseList.map((item: any) => {
            if (item.id === params.id) {
                return {
                    ...item,
                    is_enroled: !item.is_enroled,
                };
            }
            return item;
        })
        dispatch(setCourseData(updatedCourse));
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{course.name}</Text>
            <Text style={styles.description}>{course.long_description}</Text>
            <Text style={styles.prerequisites}>Prerequisites: {course.prerequisites}</Text>
            <Text style={styles.objectivesTitle}>Course Objectives:</Text>
            {course.objectives.map((objective, index) => (
                <Text key={index} style={styles.objective}>{`- ${objective}`}</Text>
            ))}
            <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
            <Text style={styles.duration}>Duration: {course.duration}</Text>
            <Pressable onPress={handleEnroll} style={[styles.enrollButton, course?.is_enroled && { backgroundColor: "#bb3e03" }]}>
                <Text style={styles.enrollButtonText}>{course?.is_enroled ? "Enrolled" : "Mark as Enrolled"}</Text>
            </Pressable>
        </View>
    )
}

export default CourseDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#bb3e0308',
        borderRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    prerequisites: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic',
        color: '#777',
    },
    objectivesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    objective: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    instructor: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    duration: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    enrollButton: {
        backgroundColor: "#40916c",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    enrollButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    thumbnail: {
        marginTop: 40,
        marginBottom: 20,
        width: '100%',
        height: 200,
        borderRadius: 8,

    },
});