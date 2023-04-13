import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// 파이어베이스 앱 통신
const app = initializeApp(firebaseConfig);
// 유저 정보 가져오기
const auth = getAuth();
// 구글 계정 Provider
const provider = new GoogleAuthProvider()
// 파이어베이스 데이터베이스
const database = getDatabase(app);

// ====================================================== [ACTION] ======================================================

// 구글 로그인 팝업창 통신
export async function LOGIN(){
    return  await signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // 토큰
            const token = credential.accessToken;

            // 유저 정보
            const user = result.user;
            return user

        })
        .catch((error) => {
        // 에러코드
        const errorCode = error.code;
        // 에러 메시지
        const errorMessage = error.message;
        alert(`Google 로그인을 위한 통신중 에러가 발생했습니다 \n ${errorMessage}`)

        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

// 구글 로그아웃 통신
export async function LOGOUT(){
    return await signOut(auth)
        .then(() => null)
        .catch((error) => {
            // 에러 메시지
            const errorMessage = error.message;
            alert(`Google 로그아웃을 위한 통신중 에러가 발생했습니다 \n ${errorMessage}`)
         });
}


// 구글 로그인 스테이터스 체크 통신
export function USER_STATE_CHANGE(callback){
    onAuthStateChanged(auth, async (user)=> {
        // 1. 사용자가 있는 경우에 (로그인한 경우)
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser)
    })
}


async function adminUser(user) {
    // 2. 사용자가 어드민 권한을 가지고 있는지 확인!
    // 3. {...user, isAdmin: true/false  }
    return await get(ref(database, 'admins'))
        .then((snapshot)=>{
            if(snapshot.exists()){
                const admins = snapshot.val()
                const isAdmin = admins.includes(user.uid)// 파이어베이스 에 저장된 admins 데이터에 user.uid 가 있는지 확인
                return {...user, isAdmin}
            }
            return user
        })
}

