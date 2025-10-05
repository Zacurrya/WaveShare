import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LogIn } from 'lucide-react-native'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [username, setusername] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the username and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={username}
        placeholder="Username"
        onChangeText={(username) => setusername(username)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
        <LogIn />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 15 }}>
        <Text>Not a member? Click </Text><Link href="/sign-up">
          <Text style={{ color: 'blue' }}>here</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }, button: {
    flexDirection: 'row',
    gap: 45,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#37c1f8ff',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: 17,
    marginTop: 20
  }, buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: '60%',
    textAlign: 'left',
    fontSize: 16,
    height: 40,
    borderColor: '#020202ff',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  }
}

