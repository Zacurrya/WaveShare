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
            {/* <EnableNFCButton style={styles.enableNFCButton} /> */}
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
    paddingVertical: 24
  },
  header : {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 10,
  },
  content: {
    alignItems: 'center',
  }
}