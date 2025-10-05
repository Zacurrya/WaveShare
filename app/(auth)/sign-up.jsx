import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { PhoneInput } from 'react-native-phone-entry';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

    const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      // 1. Create the user with all fields in camelCase format
      await signUp.create({
        username,
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // 2. Send the verification code to the user's email address
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code', // Use the correct strategy
      });

      // Show the verification screen
      setPendingVerification(true);
    } catch (err) {
      console.error('SIGN-UP ERROR:', JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active and redirect
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, log the response
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      console.error('VERIFICATION ERROR:', JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View>
        <Text>Verify your email address</Text> 
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
        <Text>Sign up</Text>
        <TextInput
          autoCapitalize="none"
          value={username}
          placeholder="Username"
          onChangeText={setUsername}
        />
        <TextInput
          autoCapitalize="none"
          value={firstName}
          placeholder="First Name"
          onChangeText={setFirstName}
        />
        <TextInput
          autoCapitalize="none"
          value={lastName}
          placeholder="Last Name"
          onChangeText={setLastName}
        />
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email Address"
          onChangeText={setEmailAddress}
        />
        <PhoneInput
            defaultValues={{
                countryCode: 'GB',
                callingCode: '+44'
            }}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
        />
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={onSignUpPress}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text>Sign in</Text>
          </Link>
        </View>
    </View>
  );
}