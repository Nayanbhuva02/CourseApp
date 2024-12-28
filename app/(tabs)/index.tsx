import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const route = useRouter();
  const { courseList } = useSelector((state) => state.course);

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.courseName}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        route?.push({ pathname: `courseDetail`, params: { id: item?.id } })
      }}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View >
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courseList}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 40, paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#bb3e0308',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#bb3e03',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});