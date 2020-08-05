import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              SearchScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              FavouritesScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
