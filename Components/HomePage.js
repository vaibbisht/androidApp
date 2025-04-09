
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(null); 
  const [showPicker, setShowPicker] = useState(false); 

  const onChange = (event, selectedDate) => { 
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const submitDate = ()=>{
   
    alert(`selected date is ${date}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeView}>
        <Text style={styles.homeText}>Welcome to Home Page</Text>

        {/* Date Picker */}
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{date ? date.toLocaleDateString() : 'DD/MM/YY'}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker value={date || new Date()} mode="date" display="default" onChange={onChange} />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitDate}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FFC0',
  },
  homeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
    fontSize: 30,
    marginBottom: 20,
  },
  dateButton: { 
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: { 
    color: 'white',
    fontSize: 18,
  },
  submitButton: { 
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: { 
    color: 'white',
    fontSize: 20,
  },
});

export default HomePage;