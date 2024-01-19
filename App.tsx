/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [products, setProducts] = React.useState([]);
  const [viewMode, setViewMode] = React.useState(VIEW_MODES.LIST);
  React.useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Products:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  const toggleViewMode = () => {
    setViewMode(viewMode === VIEW_MODES.LIST ? VIEW_MODES.GRID : VIEW_MODES.LIST);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor}/>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/256/3917/3917132.png' }} style={styles.searchIcon}/>
            <TextInput style={styles.searchInput} placeholder="Search Product..."/>
          </View>
          <View style={styles.productsAndCoinsContainer}>
            <View style={styles.myProductsContainer}>
              <Text style={styles.myProducts}>My Products</Text>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/748/748073.png' }} style={styles.searchIcon}/>
            </View>
            <View style={styles.myCoinsContainer}>
              <Text style={styles.myCoins}>My Coins</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View>
          <Section title="Available Products">
            <View>
              <View style={styles.viewModeToggleContainer}>
                <Text style={styles.viewModeToggleText}>View Mode: {viewMode}</Text>
                <Text style={styles.viewModeToggle} onPress={toggleViewMode}>Switch View</Text>
              </View>
              <View style={viewMode === VIEW_MODES.LIST ? styles.productsContainerList : styles.productsContainerGrid}>
                {products.map((product, index) => (
                  <View key={index} style={viewMode === VIEW_MODES.LIST ? styles.productItem : styles.productItemGrid}>
                    <Image source={{ uri: product.image }} style={styles.productImage}/>
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#8775A9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  productsAndCoinsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  myProductsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 50,
    borderRadius: 5,
    width: 150,
    height: 50,
  },
  myProducts: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  myCoins: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  myCoinsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginLeft: 50,
    borderRadius: 5,
    width: 120,
    height: 50
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
  },
  productImage: {
    width: '180%',
    height: 150,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 16,
    marginTop: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  viewModeToggleContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  viewModeToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  viewModeToggle: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  productsContainerList: {
    flexDirection: 'column',
    marginTop: 16,
  },
  productsContainerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productItemGrid: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
  },
});

export default App;
