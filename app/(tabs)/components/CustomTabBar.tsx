import { SvgIcon } from '@/assets/svgs';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Routes = ['index', 'explore'];

const CustomTabBar = ({
  state,
  descriptors,
  navigation
}: {
  state: { routes: Array<{ key: string; name: string }>; index: number };
  descriptors: { [key: string]: { options: { tabBarLabel?: string; title?: string } } };
  navigation: {
    emit: (event: { type: string; target: string; canPreventDefault: boolean }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}) => {
  const renderTabIcon = (route, isFocused) => {
    if (route.name === Routes[0]) {
      return (
        <SvgIcon.HomeIcon height={20} width={20} fill={"#fff"} />

      )
    } else if (route.name === Routes[1]) {
      return (
        <SvgIcon.EnroledIcon height={20} width={20} fill={"#fff"} />
      )
    } else {
      return null
    }
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        if (!Routes?.includes(route?.name)) return
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.selectedTabItem, route.name === Routes[1] && styles.lastTabItem]}
          >
            {renderTabIcon(route, isFocused)}
            <Text style={{ color: "#fff", fontWeight: "bold", }}>
              {options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#9b2226',
    elevation: 5,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 12,
    paddingHorizontal: 32,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    gap: 8,
    width: "48%",
    backgroundColor: "#bb3e0366",
  },
  selectedTabItem: {
    backgroundColor: "#bb3e03",
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastTabItem: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  }
});

export default CustomTabBar;