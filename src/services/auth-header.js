export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        console.log(user)
        return {"origin": user.accessToken};
    } else {
        return {};
    }
}