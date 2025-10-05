import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import SignOutButton from "@/components/SignOutButton";
import EnableNFCButton from "@/components/EnableNFCButton";

export default function Page() {

  return (
    <>
     {/* --- SHOW USER IS SIGNED IN --- */}
      <View style={styles.container}>
        <SignedIn>
          <View style={styles.header}>
            <SignOutButton style={styles.signOutButton} />
          </View>
          <View style={styles.content}>
            <EnableNFCButton style={styles.enableNFCButton} />
          </View>
          
        </SignedIn>
        {/* --- SIGN IN/SIGN UP FORM WHEN USER IS NOT SIGNED IN --- */}
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut>
      </View>
    </>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  header : {
    alignItems: 'flex-end',
    paddingRight: 20,
    height: 65,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  content: {
    alignItems: 'center',
  }
}