import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton';
import {icons, images, SIZES, COLORS, FONTS, constants} from '../../constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFormik} from 'formik';
import {LoginRequest} from '../../types/request/login';
import {loginValidation} from '../../validations/login';
import FormInput from '../../components/formElements/Input';
interface LoginFormProps {
  navigation: StackNavigationProp<any>;
}

const Login: React.FC<LoginFormProps> = props => {
  const {navigation} = props;
  const [focus, setFocus] = useState<string>('');
  const {
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: (values: LoginRequest) => {
      console.log(values);
      navigation.navigate('Home');
    },
  });
  const _changeText = (field: string, text: string) => {
    setFieldValue(field, text);
    handleChange(field);
  };
  const _blurText = (field: string) => {
    handleBlur(field);
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? '40%' : '30%',
        }}>
        <ImageBackground
          source={images.loginBackground}
          style={{flex: 1, justifyContent: 'flex-end'}}
          resizeMode="cover">
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Image source={icons.back} style={styles.backImage} />
            </TouchableOpacity>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={[COLORS.transparent, COLORS.black]}
              style={{
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding,
              }}>
              <Text style={styles.signIn}>Sign In</Text>
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
    );
  };
  const renderDetail = () => {
    return (
      <View style={styles.signInBG}>
        <Text style={styles.signInDetailText}>Welcome</Text>
        <Text style={styles.signInDetailText2}>Please enter account information</Text>
        <KeyboardAvoidingView>
          <FormInput
            name={'username'}
            label={'Username'}
            value={values.username}
            onBlur={_blurText}
            keyboardType={'default'}
            onChangeText={_changeText}
            error={errors.username}
            touched={touched.username}
          />
          <FormInput
            name={'password'}
            label={'Password'}
            value={values.password}
            onBlur={_blurText}
            keyboardType={'default'}
            onChangeText={_changeText}
            secureTextEntry={true}
            error={errors.password}
            touched={touched.password}
          />
        </KeyboardAvoidingView>
        <View style={{justifyContent: 'center'}}>
          <CustomButton
            buttonText="Login"
            buttonContainerStyle={{
              paddingVertical: 10,
              borderRadius: 20,
            }}
            colors={[COLORS.primary, COLORS.primary]}
            onPress={() => handleSubmit()}
          />

          <Text style={{textAlign: 'center', color: 'black', marginTop: 5}}>
            Or Login With
          </Text>
          <View
            style={styles.buttonGrid}>
            <View
              style={styles.buttonFb}>
              <Image
                source={icons.facebook}
                style={{tintColor: 'white', width: 20, height: 20}}
              />
            </View>
            <View
              style={styles.buttonTw}>
              <Image
                source={icons.twitter}
                style={{tintColor: 'white', width: 20, height: 20}}
              />
            </View>
            <View
              style={styles.buttonG}>
              <Image
                source={icons.google}
                style={{tintColor: 'white', width: 20, height: 20}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
      <StatusBar barStyle="light-content" />

      {renderHeader()}

      {renderDetail()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activeInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  pasiveInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  backImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
    margin: 20,
  },
  signIn: {
    ...FONTS.largeTitle,
    color: COLORS.white,
    lineHeight: 45,
    textAlign: 'center',
    height: '100%',
    fontWeight: 'bold',
  },
  signInBG: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
  },
  signInDetailText: {
    ...FONTS.h1,
    marginTop: SIZES.radius,
    width: '70%',
    color: COLORS.black,
  },
  signInDetailText2: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  buttonGrid:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonFb:{
    backgroundColor: '#1354AB',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonTw:{
    backgroundColor: '#0AAAFD',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonG:{
    backgroundColor: '#F55B5B',
    padding: 10,
    borderRadius: 20,
  }
});
export default Login;
