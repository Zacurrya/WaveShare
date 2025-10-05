import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import NfcManager, { NfcEvents, ndef, NfcTech } from 'react-native-nfc-manager';
import { SmartphoneNfc } from 'lucide-react-native';
import { useUser } from '@clerk/clerk-expo';

// Initialize the NFC Manager
NfcManager.start();

const createVCardString = (fullName) => {
    const safeName = fullName || '';
    const vCard = `BEGIN:VCARD
    VERSION:3.0
    FN: ${safeName}
    TEL;TYPE=CELL:+447555494219
    END:VCARD`;
    return vCard;
}

const PassiveNfcWriter = () => {
    const [isNfcEnabled, setIsNfcEnabled] = useState(false);
    const { user } = useUser();
    const [isReadyToWrite, setIsReadyToWrite] = useState(false);
    const [status, setStatus] = useState('Tap button to prepare for writing');

    useEffect(() => {
        // 1. Define the callback for the tag discovery event
        const handleTagDiscovery = async (tag) => {
        // Check if we are in "writing mode"
        if (!isReadyToWrite) {
            console.log('NFC tag discovered, but not in writing mode.');
            return;
        }

        // We only want to write once, so disable writing mode immediately
        setIsReadyToWrite(false);
        setStatus('Phone detected! Sharing Contacts...');

        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);

            // Encode the vCard string into NDEF format
            const fullName = user?.fullName || `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
            const bytes = ndef.encodeMessage([
            ndef.mimeRecord('text/vcard', createVCardString(fullName)),
            ]);

            // Write the NDEF message to the tag
            await NfcManager.ndefHandler.writeNdefMessage(bytes);
            Alert.alert('Success', 'Contact has been written to the tag.');
            setStatus('Write successful! Tap button to prepare again.');

        } catch (ex) {
            console.warn('NFC write error', ex);
            setStatus('Write failed. Please try again.');
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
        };
        
        // Register Event Listener
        NfcManager.setEventListener(NfcEvents.DiscoverTag, handleTagDiscovery);

        // Cleanup function to remove the listener on component unmount
        return () => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        };
    }, [isReadyToWrite, user?.fullName, user?.firstName, user?.lastName]);

    const armForWriting = () => {
        if (isNfcEnabled) {
            setIsNfcEnabled(false);
            setStatus('Tap button to prepare for writing');
        } else {
            setIsReadyToWrite(true);
            setStatus('Ready to scan! Bring a tag near the phone.');
            setIsNfcEnabled(true);
        }

    };

    return (
        <View style={styles.container}>
        <Text style={styles.statusText}>{status}</Text>
        <TouchableOpacity style={styles.button} onPress={armForWriting}>
            <SmartphoneNfc />
            <Text style={styles.buttonText}>{isNfcEnabled ? 'Stop Searching' : 'Start Searching'}</Text>
        </TouchableOpacity>
        </View>
    );
    };

export default PassiveNfcWriter;

const styles = {
    container: {
        marginTop: 50,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        width: 180,
        paddingHorizontal: 15,
        paddingVertical: 11,
        backgroundColor: '#37c1f8ff',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        borderRadius: 17,
        marginTop: 20
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 12
    }
}