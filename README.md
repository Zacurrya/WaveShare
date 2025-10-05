# WaveShare: NFC Contact Sharing

A simple and modern React Native Expo application that allows users to write their contact information to a blank NFC tag, turning it into a digital business card.

This app provides a seamless user experience with secure authentication, passive NFC detection, and clear feedback. A user can sign in, press a button to "arm" the NFC writer, and simply tap their phone to a compatible tag to instantly create a vCard.

✨ Features
Secure Authentication: Powered by Clerk for easy and secure user sign-in.

One-Tap Writing: Passively listens for NFC tags and writes the user's contact data with a single tap.

vCard Format: Encodes user data into the standard vCard format, ensuring compatibility with all modern smartphones (iOS and Android).

Modern UI: Clean and intuitive interface built with custom components and icons from Lucide React Native.

Cross-Platform: Built with Expo for a consistent experience on both Android and iOS (NFC writing is primarily tested on Android).

🛠️ Tech Stack
Framework: React Native with Expo & Expo Router

NFC: react-native-nfc-manager

Authentication: @clerk/clerk-expo

UI & Icons: Lucide React Native

⚙️ Prerequisites
Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)

Yarn or npm

Expo CLI

Android Studio for the Android emulator or device setup.

A physical Android device with NFC capabilities for testing.

A blank, writable NFC tag (e.g., NTAG213, NTAG215, NTAG216).

🚀 Getting Started
1. Clone the Repository
Bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install Dependencies
Bash

npm install
# or
yarn install
3. Set Up Environment Variables
This project uses Clerk for authentication, which requires a publishable key.

Create a file named .env in the root of the project.

Add your Expo Clerk Publishable Key to this file. You can get this from your Clerk dashboard.

.env

EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
4. Run the Application
This application uses native code and cannot be run in the Expo Go app. You must use a development build.

Bash

npx expo run:android
The command will automatically build and install the development client on your connected device or running emulator.

📖 How to Use
Launch the app on your Android device.

Sign in using one of the configured authentication methods.

Once signed in, tap the "Start Searching" button. The status text will update to "Ready to scan!".

Bring a blank, writable NFC tag close to your phone's NFC antenna (usually on the back, near the top).

Hold the tag steady until you see a "Success" alert.

Your contact card is now written to the tag! You can test it by scanning the tag with another smartphone.


