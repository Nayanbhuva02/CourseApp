import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, FlatList, Text, TouchableOpacity, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';

export default function TabTwoScreen() {
  const route = useRouter();
  const { courseList: enrolledList } = useSelector((state) => state.course);
  const courseList = useMemo(() => {
    return enrolledList.filter((item) => item.is_enroled) || [];
  }, [enrolledList]);

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
  // return (
  // <ParallaxScrollView
  //   headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
  //   headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
  //   <ThemedView style={styles.titleContainer}>
  //     <ThemedText type="title">Explore</ThemedText>
  //   </ThemedView>
  //   <ThemedText>This app includes example code to help you get started.</ThemedText>
  //   <Collapsible title="File-based routing">
  //     <ThemedText>
  //       This app has two screens:{' '}
  //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
  //       <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
  //     </ThemedText>
  //     <ThemedText>
  //       The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
  //       sets up the tab navigator.
  //     </ThemedText>
  //     <ExternalLink href="https://docs.expo.dev/router/introduction">
  //       <ThemedText type="link">Learn more</ThemedText>
  //     </ExternalLink>
  //   </Collapsible>
  //   <Collapsible title="Android, iOS, and web support">
  //     <ThemedText>
  //       You can open this project on Android, iOS, and the web. To open the web version, press{' '}
  //       <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
  //     </ThemedText>
  //   </Collapsible>
  //   <Collapsible title="Images">
  //     <ThemedText>
  //       For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
  //       <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
  //       different screen densities
  //     </ThemedText>
  //     <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
  //     <ExternalLink href="https://reactnative.dev/docs/images">
  //       <ThemedText type="link">Learn more</ThemedText>
  //     </ExternalLink>
  //   </Collapsible>
  //   <Collapsible title="Custom fonts">
  //     <ThemedText>
  //       Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
  //       <ThemedText style={{ fontFamily: 'SpaceMono' }}>
  //         custom fonts such as this one.
  //       </ThemedText>
  //     </ThemedText>
  //     <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
  //       <ThemedText type="link">Learn more</ThemedText>
  //     </ExternalLink>
  //   </Collapsible>
  //   <Collapsible title="Light and dark mode components">
  //     <ThemedText>
  //       This template has light and dark mode support. The{' '}
  //       <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
  //       what the user's current color scheme is, and so you can adjust UI colors accordingly.
  //     </ThemedText>
  //     <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
  //       <ThemedText type="link">Learn more</ThemedText>
  //     </ExternalLink>
  //   </Collapsible>
  //   <Collapsible title="Animations">
  //     <ThemedText>
  //       This template includes an example of an animated component. The{' '}
  //       <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
  //       the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
  //       to create a waving hand animation.
  //     </ThemedText>
  //     {Platform.select({
  //       ios: (
  //         <ThemedText>
  //           The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
  //           component provides a parallax effect for the header image.
  //         </ThemedText>
  //       ),
  //     })}
  //   </Collapsible>
  // </ParallaxScrollView>
  // );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
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
