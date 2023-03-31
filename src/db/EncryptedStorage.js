import EncryptedStorage from 'react-native-encrypted-storage';


export const storeUserCreds = async (authState) => {
    try {
        console.log("kaydedilecek:", authState)
        await EncryptedStorage.setItem(
            "user_creds",
            JSON.stringify({
                isLoggedIn: true,
                ...authState
            })
        );
    } catch (error) {
        console.log("error", error)
    }
}

export const retrieveUserCreds = async () => {
    try {
        const creds = await EncryptedStorage.getItem("user_creds");

        if (creds !== undefined) {
            console.log("saved creds:", creds)
            return creds
        }
    } catch (error) {
        console.log("error:", error)
    }
}


export const removeUserCreds = async () => {//giriş yapmış kullanıcı bilgilerini kaldır
    try {
        await EncryptedStorage.removeItem("user_creds");
    } catch (error) {
        console.log("error:", error)
    }
}
