export interface IconicDish {
  name: string;
  type: 'vegetarian' | 'non-vegetarian' | 'dessert' | 'beverage';
  description: string;
  keyIngredients: string[];
  originCity: string;
  imageUrl: string;
}

export interface RegionalCuisine {
  id: string;
  region: 'north' | 'south' | 'east' | 'west' | 'northeast';
  name: string;
  statesIncluded: string[];
  spiceProfile: string;
  cookingPhilosophy: string;
  iconicDishes: IconicDish[];
  culinaryTraditions: string;
}

export const REGIONAL_CUISINES: RegionalCuisine[] = [
  {
    id: 'north-indian-heritage',
    region: 'north',
    name: 'Awadhi, Mughlai & Punjabi Culinary Traditions',
    statesIncluded: ['Punjab', 'Uttar Pradesh', 'Rajasthan', 'Kashmir', 'Delhi'],
    spiceProfile: 'Warm aromatic spices (Green & Black Cardamom, Saffron, Cinnamon, Cumin, Garam Masala)',
    cookingPhilosophy: 'Slow-cooking in clay tandoors and sealed brass handis (Dum Pukht) to infuse deep aromatic broths with butter, ghee, and cashew pastes.',
    iconicDishes: [
      {
        name: 'Dal Makhani',
        type: 'vegetarian',
        description: 'Slow-simmered whole black lentils (urad) and kidney beans cooked over wood embers for 18 hours with churned butter and cream.',
        keyIngredients: ['Black Urad Dal', 'Tomatoes', 'White Butter', 'Fenugreek Leaves (Kasturi Methi)'],
        originCity: 'Amritsar & Delhi',
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Awadhi Dum Biryani',
        type: 'non-vegetarian',
        description: 'Fragrant aged Basmati rice layered with marinated meat, kewra water, and saffron milk, sealed with dough and slow-steamed.',
        keyIngredients: ['Aged Long-grain Basmati Rice', 'Saffron', 'Star Anise', 'Ghee'],
        originCity: 'Lucknow',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Rajasthani Dal Baati Churma',
        type: 'vegetarian',
        description: 'Hard wheat flour dough balls baked over charcoal, dipped in melted cow ghee, accompanied by five-lentil Panchmel dal and sweetened wheat churma.',
        keyIngredients: ['Whole Wheat Flour', 'Ghee', 'Panchmel Dal (5 Lentils)', 'Jaggery'],
        originCity: 'Jaipur & Udaipur',
        imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Kashmiri Kahwa',
        type: 'beverage',
        description: 'Delicate green tea infused with whole saffron strands, cinnamon bark, crushed green cardamom, and slivered almonds.',
        keyIngredients: ['Kashmiri Saffron', 'Almonds', 'Cardamom', 'Cinnamon'],
        originCity: 'Srinagar',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      }
    ],
    culinaryTraditions: 'Served in traditional brass thaalis or hand-beaten copper katoris; renowned for hospitable family banquets (Dastarkhwan).',
  },
  {
    id: 'south-indian-heritage',
    region: 'south',
    name: 'Dravidian, Chettinad & Malabar Coastal Traditions',
    statesIncluded: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
    spiceProfile: 'Black Peppercorns, Mustard Seeds, Curry Leaves, Tamarind, Coconut, Star Anise & Kalpasi (Black Stone Flower)',
    cookingPhilosophy: 'Harmonious balancing of sour tamarind, fresh grated coconut, fermented rice batter, and freshly tempered spices in clay urulis.',
    iconicDishes: [
      {
        name: 'Kerala Sadya on Banana Leaf',
        type: 'vegetarian',
        description: 'A grand feast of 24-28 vegetarian delicacies including Avial, Sambar, Olan, Thoran, Kalan, and Payasam served on a fresh plantain leaf.',
        keyIngredients: ['Red Matta Rice', 'Coconut Milk', 'Curry Leaves', 'Plantain'],
        originCity: 'Thiruvananthapuram & Kochi',
        imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chettinad Pepper Chicken',
        type: 'non-vegetarian',
        description: 'Fiery, deeply flavorful chicken roasted with freshly stone-ground tellicherry black pepper, fennel seeds, and roasted coconut.',
        keyIngredients: ['Tellicherry Peppercorns', 'Kalpasi', 'Shallots (Sambar Onions)', 'Curry Leaves'],
        originCity: 'Karaikudi (Chettinad)',
        imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Mysore Masala Dosa',
        type: 'vegetarian',
        description: 'Crispy fermented rice and lentil crepe smeared inside with red garlic-chili chutney and filled with spiced potato mash.',
        keyIngredients: ['Fermented Rice-Urad Batter', 'Red Chili Garlic Chutney', 'Spiced Potatoes', 'Coconut Chutney'],
        originCity: 'Mysuru',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'South Indian Filter Coffee',
        type: 'beverage',
        description: 'Strong, aromatic chicory-infused coffee decoction brewed in a brass drip filter, frothed with boiled whole milk in a stainless steel dabarah.',
        keyIngredients: ['Arabica & Robusta Coffee Beans', 'Chicory', 'Fresh Full-Cream Milk'],
        originCity: 'Chennai & Madurai',
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      }
    ],
    culinaryTraditions: 'Eaten traditionally with fingers on freshly cut banana leaves, starting from salt and pickles at the top left to rice in the center.',
  },
  {
    id: 'east-indian-heritage',
    region: 'east',
    name: 'Bengali, Odia & Maithil Sweet & Seafood Traditions',
    statesIncluded: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'],
    spiceProfile: 'Panch Phoron (5-spice blend of cumin, brown mustard, fenugreek, nigella, fennel), Mustard Oil & Poppy Seeds (Posto)',
    cookingPhilosophy: 'Subtle balance between sweet and pungent flavors, celebrated freshwater fish preparations, and artisanal cottage cheese (Chhena) confectionery.',
    iconicDishes: [
      {
        name: 'Shorshe Ilish (Hilsa in Mustard Gravy)',
        type: 'non-vegetarian',
        description: 'Tender Hilsa fish gently steamed in freshly ground yellow and black mustard paste with green chilies in pure cold-pressed mustard oil.',
        keyIngredients: ['Hilsa Fish', 'Ground Mustard Paste', 'Green Chilies', 'Kachi Ghani Mustard Oil'],
        originCity: 'Kolkata',
        imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chhena Poda (Baked Cottage Cheese Cake)',
        type: 'dessert',
        description: 'Fresh kneaded cottage cheese mixed with sugar, cardamom, and cashew nuts, wrapped in sal leaves and baked until caramelized golden brown.',
        keyIngredients: ['Fresh Cow Milk Chhena', 'Semolina', 'Cardamom', 'Caramelized Sugar'],
        originCity: 'Nayagarh (Odisha)',
        imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Aloo Posto with Luchi',
        type: 'vegetarian',
        description: 'Diced potatoes cooked in a velvety white poppy seed paste with green chilies, accompanied by puffed deep-fried refined flour breads.',
        keyIngredients: ['Potatoes', 'White Poppy Seeds (Posto)', 'Green Chilies', 'Mustard Oil'],
        originCity: 'Kolkata & Burdwan',
        imageUrl: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&q=80',
      }
    ],
    culinaryTraditions: 'Meals are served sequentially course-by-course (bitter shukto first, followed by lentils, vegetables, fish, chutney, and finishing with mishti sweets).',
  },
  {
    id: 'west-indian-heritage',
    region: 'west',
    name: 'Gujarati, Maharashtrian & Goan Coastal Traditions',
    statesIncluded: ['Gujarat', 'Maharashtra', 'Goa', 'Rajasthan (West)'],
    spiceProfile: 'Kokum, Goda Masala, Jaggery, Coconut, Kashmiri Red Chili, Asafetida (Hing)',
    cookingPhilosophy: 'Harmonious blending of sweet and savory notes in Gujarati vegetarian gastronomy, coupled with smoky Malvani and Portuguese-influenced Goan seafood marinades.',
    iconicDishes: [
      {
        name: 'Gujarati Royal Thali',
        type: 'vegetarian',
        description: 'A lavish array including Khaman Dhokla, Undhiyu (winter vegetable pot), sweet-and-sour Gujarati Dal, Kadhi, and soft Phulkas with Aamras.',
        keyIngredients: ['Gram Flour (Besan)', 'Raw Banana & Yam', 'Jaggery', 'Pigeon Pea Dal (Tuvar)'],
        originCity: 'Ahmedabad & Surat',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Goan Fish Curry (Xitt Codi)',
        type: 'non-vegetarian',
        description: 'Kingfish simmered in a creamy gravy of grated fresh coconut, fiery Kashmiri red chilies, and tangy dried Kokum fruit.',
        keyIngredients: ['Kingfish', 'Fresh Coconut Milk', 'Kokum Petals', 'Goan Red Chilies'],
        originCity: 'Panaji (Goa)',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Puran Poli with Katachi Amti',
        type: 'dessert',
        description: 'Soft whole-wheat flatbread stuffed with sweet cooked chana dal and nutmeg-jaggery paste, smeared with pure homemade ghee.',
        keyIngredients: ['Chana Dal', 'Jaggery', 'Nutmeg & Cardamom', 'Ghee'],
        originCity: 'Pune & Nagpur',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      }
    ],
    culinaryTraditions: 'Extensive use of Kokum and buttermilk (Chhaas) to aid digestion in hot climate; strict adherence to seasonal ingredients.',
  }
];
